import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
    plugins: [
        eslintPlugin(),
        vue()
    ],
    define: {
        'process.env': {
            DEVELOPMENT: true,
            API_URL: "http://localhost:5000"
        }
    },
    server: {
        port: 5050,
    },
})