import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import { nitro } from 'nitro/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: process.env.SITE_BASE || '/',
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackStart({ prerender: { enabled: true, crawlLinks: false } }),
    nitro(),
    viteReact(),
    tailwindcss(),
  ],
  server: { host: '127.0.0.1', port: 3000 },
})
