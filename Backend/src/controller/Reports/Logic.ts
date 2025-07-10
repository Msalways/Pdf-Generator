import { NextFunction, Request, Response } from "express";
import { assessmentData } from "../../data/data";

import generateReportHTML from "./../../templates/generate-report";
import path from "path";
import { mkdirSync } from "fs";
import generatePDFOnHTML from "../../Reusables/generate-pdf-on-html";
import { fileURLToPath } from "url";
import prisma from "../../config/prisma/client";
import { buildResolvedConfig } from "./resolveValues";
import generateReportHtml from "./../../templates/generate-report";
// Remove fileURLToPath and use CommonJS globals for __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// __filename and __dirname are available as globals in CommonJS, no need to redeclare

export function generateDynamicConfig(sampleData: any) {
  const formatKey = (key: string) => {
    return key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const traverse = (obj: any, path = "") => {
    let result: Record<string, any> = {};

    for (const key in obj) {
      const value = obj[key];
      const currentPath = path ? `${path}.${key}` : key;

      if (
        value === null ||
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        result[formatKey(key)] = currentPath;
      } else if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === "object") {
          value.forEach((item, index) => {
            const subResult = traverse(item, `${currentPath}[${index}]`);
            result = { ...result, ...subResult };
          });
        } else {
          result[formatKey(key)] = currentPath;
        }
      } else if (typeof value === "object") {
        const subResult = traverse(value, currentPath);
        result = { ...result, ...subResult };
      }
    }

    return result;
  };

  const fieldMappings = traverse(sampleData);

  return {
    title: `Auto Report for ${sampleData.assessment_id}`,
    sections: {
      "Auto Section": fieldMappings,
    },
  };
}

const generateReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { sessionId } = req.body;
    const reportData = assessmentData.find((d) => d.session_id === sessionId);

    if (!reportData) throw new Error("Report data not found");

    const config = generateDynamicConfig(reportData);
    const resolvedConfig = buildResolvedConfig(reportData, config);

    const html = generateReportHtml({ config: resolvedConfig });

    const fileName = `${sessionId}-${reportData.assessment_id}.pdf`;
    const pdfPath = path.join(__dirname, "../../../reports", fileName);
    mkdirSync(path.dirname(pdfPath), { recursive: true });

    await generatePDFOnHTML(html, pdfPath);

    await prisma.reports.create({
      data: { sessionId, reportPath: pdfPath, fileName },
    });

    res.status(200).send("Report generated successfully");
  } catch (error) {
    next(error);
  }
};

const listReport = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await prisma.reports.findMany({
      select: {
        id: true,
        fileName: true,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

const dynamicReportGeneration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jsonData: data } = req.body;
    console.log(data);

    const { session_id, assessment_id } = data;

    if (!session_id || !assessment_id) {
      throw new Error("Session ID and Assessment ID are required");
    }

    const config = generateDynamicConfig(data);
    const resolvedConfig = buildResolvedConfig(data, config);
    const html = generateReportHtml({ config: resolvedConfig });

    const fileName = `${session_id}-${assessment_id}.pdf`;
    const pdfPath = path.join(__dirname, "../../../reports", fileName);
    mkdirSync(path.dirname(pdfPath), { recursive: true });

    await generatePDFOnHTML(html, pdfPath);

    await prisma.reports.create({
      data: { sessionId: session_id, reportPath: pdfPath, fileName },
    });

    res.status(200).send("Report generated successfully");
  } catch (error) {
    next(error);
  }
};

const downloadReport = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { reportId } = req.params;
    if (!reportId) {
      throw new Error("Missing required query parameter: id");
    }
    const report = await prisma.reports.findUnique({
      where: { id: String(reportId) },
      select: {
        reportPath: true,
        fileName: true,
      },
    });
    if (!report) {
      throw new Error("Report not found");
    }
    res.download(report.reportPath, (err) => {
      if (err) {
        console.error("Error downloading report:", err);
        res.status(500).send("Error downloading report");
      } else {
        console.log("Report downloaded successfully");
      }
    });
  } catch (error) {
    next(error);
  }
};

export { generateReport, listReport, downloadReport, dynamicReportGeneration };
