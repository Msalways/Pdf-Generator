import puppeteer from "puppeteer";

const generatePDFOnHTML = async (
  htmlContent: string,
  filePath: string
) => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle0" });

  await page.pdf({
    path: filePath,
    format: "A4",
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `
      <div style="font-size:10px; text-align:center; width:100%; margin-top:10px;">
        <span>Watch Your Health Report</span>
      </div>
    `,
    footerTemplate: `
      <div style="font-size:10px; width:100%; text-align:center; margin-bottom:10px;">
        Page <span class="pageNumber"></span> of <span class="totalPages"></span>
      </div>
    `,
    margin: {
      top: "80px", // space for header
      bottom: "60px", // space for footer
      left: "20px",
      right: "20px",
    },
  });

  await browser.close();
};

export default generatePDFOnHTML
