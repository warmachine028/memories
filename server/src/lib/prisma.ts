//? https://github.com/prisma/prisma/discussions/23533#discussioncomment-8838160
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool } from '@neondatabase/serverless'
import { PrismaClient } from '@prisma/client'

const neon = new Pool({ connectionString: Bun.env.DATABASE_URL })
const adapter = new PrismaNeon(neon)
const prismaClientSingleton = () => new PrismaClient({ adapter })

declare global {
	var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') {
	globalThis.prismaGlobal = prisma
}
