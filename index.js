const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const process = require('process');

(async () => {
    const inputPath = process.argv[2];
    const outputPath = process.argv[3];

    if (!inputPath || !outputPath) {
        console.error('Usage: node index.js <input.html> <output.pdf>');
        process.exit(1);
    }

    const pupConfig = {headless: true};
    if (process.env.PUPPETEER_NO_SANDBOX) {
        pupConfig.args = ['--no-sandbox', '--disable-setuid-sandbox'];
    }

    const browser = await puppeteer.launch(pupConfig);
    const page = await browser.newPage();

    const htmlFilePath = path.resolve(inputPath);
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf-8');

    await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });

    await page.evaluate(() => {
        const mathjaxSetup = document.createElement('script');
        mathjaxSetup.textContent = `
            window.MathJax = {
                tex: {
                    inlineMath: [['$', '$']]
                },
            };
        `;
        document.head.appendChild(mathjaxSetup);

        const mathjaxScript = document.createElement('script');
        mathjaxScript.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
        mathjaxScript.async = true;
        document.head.appendChild(mathjaxScript);
    });

    await page.waitForFunction(() => {
        return window.MathJax && MathJax.typesetPromise;
    });

    await page.evaluate(() => {
        return MathJax.typesetPromise();
    });

    await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: {
            top: '0.5in',
            bottom: '0.5in',
            left: '0.5in',
            right: '0.5in',
        },
    });

    console.log(`PDF saved as ${outputPath}`);

    await browser.close();
})();
