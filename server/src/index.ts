Bun.serve({
	port: Bun.env.PORT || 5000,
	async fetch(req) {
		return new Response('Hello World');
	},
});
