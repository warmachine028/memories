import { test, expect, describe, beforeAll, afterAll } from 'bun:test'

const PORT = Bun.env.PORT || 5000
const BASE_URL = `http://localhost:${PORT}`
const RATE_LIMIT = 1000
const RATE_LIMIT_WINDOW = 1000 * 60 // 1 minute in milliseconds

describe('Rate Limit Tests', () => {
	let startTime: number

	beforeAll(() => {
		startTime = Date.now()
	})

	afterAll(() => {
		const endTime = Date.now()
		console.log(`Total test duration: ${(endTime - startTime) / 1000} seconds`)
	})

	test('should allow requests up to the rate limit', async () => {
		for (let i = 0; i < RATE_LIMIT; i++) {
			const response = await fetch(BASE_URL)
			expect(response.status).toBe(200)
		}
	})

	test('should reject requests exceeding the rate limit', async () => {
		const response = await fetch(BASE_URL)
		expect(response.status).toBe(429)
	})

	test('should reset rate limit after the time window', async () => {
		// Wait for the rate limit window to pass
		await new Promise((resolve) => setTimeout(resolve, RATE_LIMIT_WINDOW))

		// Try a request after the window
		const response = await fetch(BASE_URL)
		expect(response.status).toBe(200)
	})
})
