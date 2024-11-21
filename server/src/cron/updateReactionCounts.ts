import { deleteUnusedTags, updateAllReactionCounts } from '@/controllers'
import { cron } from '@elysiajs/cron'

export const updateReactionCountsCron = cron({
	name: 'Update Reaction Counts',
	pattern: '0 2 * * *',
	async run() {
		try {
			await updateAllReactionCounts()
			console.log(`Reaction counts updated.`)
		} catch (error) {
			console.error('Error updating reaction counts:', error)
		}
	},
})
