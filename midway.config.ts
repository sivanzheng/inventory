import path from 'path'
// eslint-disable-next-line node/no-unpublished-import
import react from '@vitejs/plugin-react'
import { defineConfig } from '@midwayjs/hooks-kit'

export default defineConfig({
    vite: {
        plugins: [react()],
        resolve: {
            alias: {
                '@src': path.resolve(__dirname, './src')
            }
        }
    },
})
