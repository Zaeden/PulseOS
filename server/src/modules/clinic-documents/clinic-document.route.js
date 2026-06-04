import { Router } from "express";
import { upload } from "../../middlewares/upload.middleware.js";
import validate from "../../middlewares/validate.middleware.js";
import * as ClinicDocumentController from "./clinic-document.controller.js";
import { uploadClinicDocumentSchema } from "./clinic-document.dto.js";

const clinicDocumentRouter = Router();

clinicDocumentRouter.post(
  "/:clinicId/documents",
  upload.single("file"),
  validate(uploadClinicDocumentSchema),
  ClinicDocumentController.uploadClinicDocument,
);

export default clinicDocumentRouter;
