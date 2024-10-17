import puppeteer from 'puppeteer'
const sleep = (ms) => new Promise((res) => setTimeout(res, ms))

const takeSnapShot = async () => {
	// Replace with your actual deployed URL
	const url = 'https://memories-canary.vercel.app'
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.setViewport({ width: 1920, height: 1080 })
	await page.goto(url)
	await sleep(3000)
	await page.screenshot({ path: '.github/preview.png' })
	await browser.close()
}

takeSnapShot()
