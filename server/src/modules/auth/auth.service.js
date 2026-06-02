import { prisma } from "../../configs/db.js";
import { config } from "../../configs/env.js";
import client from "../../configs/redis.js";
import { sendEmail } from "../../services/email/email.service.js";
import { otpTemplate } from "../../services/email/templates/otp.template.js";
import { NotFoundError } from "../../utils/apiError.js";
import { generateOtp } from "../../utils/otp.js";
import {
  generateAccessToken,
  generateTokenPair,
  verifyRefreshToken,
} from "../../utils/token.js";

export const sendOtp = async (data) => {
  const { email, role } = data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      role: true,
    },
  });

  if (!user) {
    throw new BadRequestError("User not found");
  }

  if (user.role.slug !== role) {
    throw new BadRequestError("Invalid role selected");
  }

  // Geneate a new otp.
  const otp = generateOtp();

  const key = `otp:${email}`;

  // Store the otp in redis with 5 minutes expiry.
  await client.set(key, otp, {
    EX: 5 * 60,
  });

  // Send mail.
  await sendEmail({
    to: email,
    subject: "PulseOS Login OTP",
    html: otpTemplate(otp),
  });

  return;
};

export const verifyOtp = async (data) => {
  const { email, role, otp } = data;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      role: true,
    },
  });
  if (!user) {
    throw new NotFoundError("User not found");
  }

  if (user.role.slug !== role) {
    throw new BadRequestError("Invalid role selected");
  }

  const key = `otp:${email}`;

  const storedOtp = await client.get(key);

  if (!storedOtp) {
    throw new BadRequestError("OTP expired");
  }

  if (storedOtp !== otp) {
    throw new BadRequestError("Invalid OTP");
  }

  // Delete key from redis after successful verification.
  await client.del(key);

  // Generate access and refresh token JWT token.
  const { accessToken, refreshToken } = generateTokenPair({
    sub: user.id,
    email: user.email,
    role: user.role.slug,
    clinicId: user.clinicId,
  });

  // Store refresh token in db.
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // expires in 7 days
    },
  });

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      lastLoginAt: new Date(),
    },
  });

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role.slug,
      clinicId: user.clinicId,
    },
    accessToken,
    refreshToken,
  };
};

export const me = async (userId) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      role: true,
    },
  });

  if (!user) {
    throw new NotFoundError("User not found");
  }

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role.slug,
    clinicId: user.clinicId,
  };
};

export const refreshToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new UnauthorizedError("Refresh token is required");
  }

  const payload = verifyRefreshToken(refreshToken);

  const refreshTokenRecord = await prisma.refreshToken.findUnique({
    where: {
      token: refreshToken,
    },
  });

  if (!refreshTokenRecord) {
    throw new UnauthorizedError("Invalid refresh token");
  }

  if (refreshTokenRecord.revokedAt) {
    throw new UnauthorizedError("Refresh token has been revoked");
  }

  if (refreshTokenRecord.expiresAt < new Date()) {
    throw new UnauthorizedError("Refresh token has expired");
  }

  const accessToken = generateAccessToken({
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
    clinicId: payload.clinicId,
  });

  return {
    accessToken,
  };
};

export const logout = async (refreshToken) => {
  if (!refreshToken) {
    throw new UnauthorizedError("Refresh token is required");
  }

  const payload = verifyRefreshToken(refreshToken);

  await prisma.refreshToken.updateMany({
    where: {
      token: refreshToken,
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });

  return;
};
