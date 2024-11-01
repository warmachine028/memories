import swagger from '@elysiajs/swagger'

export const docs = swagger({
	path: '/docs',
	provider: 'scalar',
	documentation: {
		info: {
			title: 'Memories API',
			version: '1.0.0',
			description: 'API documentation',
			contact: {
				email: 'contact@memories.com',
			},
			license: {
				name: 'MIT',
				url: 'https://github.com/warmachine028/memories?tab=MIT-1-ov-file',
			},
		},
		tags: [
			{
				name: 'Root',
				description: 'Memories Server API',
			},
			{
				name: 'Users',
				description: 'Routes related to users',
			},
			{
				name: 'Posts',
				description: 'Routes related to posts',
			},
			{
				name: 'Tags',
				description: 'Routes related to tags',
			},
			{
				name: 'Reactions',
				description: 'Routes related to reactions',
			},
			{
				name: 'Comments',
				description: 'Routes related to comments',
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
				},
			},
		},
	},
})
