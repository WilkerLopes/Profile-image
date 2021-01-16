const puppeteer = require('puppeteer');

class ImageService {
    async getPage() {
        const options = { headless: true }
        const browser = await puppeteer.launch(options)

        return await browser.newPage()
    }

    async image(html, dimensions) {
        dimensions = dimensions ? dimensions : { width: 500, height: 500 }

        const page = await this.getPage()

        await page.setContent(html)
        await page.setViewport(dimensions)

        const file = await page.screenshot({ type: 'png' })
        return file
    }

    async pdf(html, dimensions) {
        dimensions = dimensions ? dimensions : { width: 500, height: 500 }

        const page = await this.getPage()

        await page.setContent(html)
        await page.setViewport(dimensions)

        const file = await page.pdf({ format: 'A4' });
        return file
    }
}

module.exports = new ImageService();