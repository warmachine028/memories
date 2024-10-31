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
			schemas: {
				Error: {
					type: 'object',
					properties: {
						message: { type: 'string' },
					},
				},
				Post: {
					type: 'object',
					properties: {
						id: { type: 'string' },
						title: { type: 'string' },
						description: { type: 'string' },
						imageUrl: { type: 'string' },
						authorId: { type: 'string' },
						author: {
							type: 'object',
							properties: {
								id: { type: 'string' },
								username: { type: 'string' },
							},
						},
						createdAt: { type: 'string' },
						updatedAt: { type: 'string' },
					},
				},
				User: {
					type: 'object',
					properties: {
						id: { type: 'string' },
						firstName: { type: 'string' },
						lastName: { type: 'string' },
						imageUrl: { type: 'string' },
						email: { type: 'string' },
						createdAt: { type: 'string' },
						updatedAt: { type: 'string' },
					},
				},
				Tag: {
					type: 'object',
					properties: {
						id: { type: 'string' },
						name: { type: 'string' },
						createdAt: { type: 'string' },
						updatedAt: { type: 'string' },
					},
				},
				Reaction: {
					type: 'object',
					properties: {
						id: { type: 'string' },
						type: { type: 'string' },
						createdAt: { type: 'string' },
						updatedAt: { type: 'string' },
					},
				},
				Comment: {
					type: 'object',
					properties: {
						id: { type: 'string' },
						content: { type: 'string' },
						createdAt: { type: 'string' },
						updatedAt: { type: 'string' },
					},
				},
			},
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
				},
			},
		},
	},
})
