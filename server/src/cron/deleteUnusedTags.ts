import { deleteUnusedTags } from '@/controllers'
import { cron } from '@elysiajs/cron'

export const deleteUnusedTagsCron = cron({
	name: 'Delete Unused Tags',
	pattern: '0 2 * * *',
	async run() {
		try {
			const result = await deleteUnusedTags()
			console.log(`${result.count} unused tags deleted.`)
			console.log('Below are the tags deleted:')
			result.tags.forEach((tag, i) => {
				console.log(` ${i + 1}. ${tag}`)
			})
		} catch (error) {
			console.error('Error deleting unused tags:', error)
		}
	},
})
