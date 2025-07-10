import { Router } from "express";
import {
  downloadReport,
  dynamicReportGeneration,
  generateReport,
  listReport,
} from "./Logic";

const router = Router();

router.post("/generate-report", generateReport);

router.post("/generate-dynamic-report", dynamicReportGeneration);

router.get("/", listReport);

router.get("/download/:reportId", downloadReport);

export { router as ReportsRouter };
