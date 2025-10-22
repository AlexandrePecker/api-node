import { defineConfig } from 'drizzle-kit';

if(!process.env.DATABASE_URL) {
    throw new Error('É necessário a URL do banco de dados.')
}

export default defineConfig({
    dialect:'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL
    },
    out: './drizzle',
    schema: './src/database/schema.ts',
})