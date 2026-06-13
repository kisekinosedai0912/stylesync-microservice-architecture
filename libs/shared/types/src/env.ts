import { z } from 'zod'

export const envSchema = z.object({
    DATABASE_URL: z.string(),
    HOST: z.string(),
    PORT: z.string().default('5000'),
    FRONTEND_URL: z.string(),
    JWT_SECRET: z.string()
})

export type Env = z.infer<typeof envSchema>