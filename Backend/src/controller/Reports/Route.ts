import { Router } from "express";
import { downloadReport, generateReport, listReport } from "./Logic";

const router = Router();

router.post("/generate-report", generateReport);

router.get("/", listReport);

router.get("/download/:reportId", downloadReport);

export { router as ReportsRouter };
