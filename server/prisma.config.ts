import { defineConfig } from '@prisma/config';

export default defineConfig({
  datasource: {
    url: Bun.env.DATABASE_URL,
  },
});
