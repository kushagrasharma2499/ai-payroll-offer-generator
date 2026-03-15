const puppeteer = require("puppeteer");

async function generatePDF(html){

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Set viewport for proper rendering
    await page.setViewport({
        width: 1200,
        height: 0,       
        deviceScaleFactor: 1
    });

    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "20px", bottom: "20px", left: "20px", right: "20px" },
        scale: 0.9,       // slightly shrink to fit one page
        preferCSSPageSize: true
    });

    await browser.close();

    return pdf;

}

module.exports = generatePDF;