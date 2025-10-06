import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
      registerType: 'autoUpdate', // automatically updates service worker
      manifest: {
        name: 'Not So Bad',
        short_name: 'Not So Bad',
        description: 'See the positive in your life! After all, it is Not So Bad.',
        start_url: '/not-so-bad',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: '/icons/not-so-bad-icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/not-so-bad-icon.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      }
    })],
  base: "/not-so-bad",
  server: {
    open: true
  }
})
