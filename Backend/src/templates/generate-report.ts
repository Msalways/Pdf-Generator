import { readFileSync } from "fs";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { assesmentHandlebars } from "../config/handlebars/assesment";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generateReportHtml = (reportData: any) => {
  try {
    const objectPartialSource = readFileSync(
      path.join(__dirname, "./partials/object.hbs"),
      "utf8"
    );

    assesmentHandlebars.registerPartial("objectPartial", objectPartialSource);

    const templateHtml = readFileSync(
      path.join(__dirname, "template.html"),
      "utf-8"
    );
    const html = assesmentHandlebars.compile(templateHtml);
    const htmlWithData = html(reportData);
    // console.log("Generated HTML with data:", htmlWithData);

    return htmlWithData;
  } catch (error) {
    throw error;
  }
};

export default generateReportHtml;
