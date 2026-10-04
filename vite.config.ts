import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      '@': `${import.meta.dirname}/src`,
    },
  },

  server: {
    port: 5173,
    // host: true removed — do NOT expose dev server to the LAN
    headers: {
      // Prevent clickjacking
      'X-Frame-Options': 'DENY',
      // Block MIME-type sniffing
      'X-Content-Type-Options': 'nosniff',
      // Prevent cross-origin information leakage in Referer headers
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      // Cross-Origin Resource Policy
      'Cross-Origin-Resource-Policy': 'same-origin',
      // Permissions policy — disable unused browser APIs
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
      // Basic CSP — allows Vite HMR websocket + Google Fonts + self
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline'",   // 'unsafe-inline' required for Vite dev HMR
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "connect-src 'self' ws://localhost:5173",
        "img-src 'self' data:",
        "frame-ancestors 'none'",
      ].join('; '),
    },
  },

  build: {
    // Separate vendor chunks for better caching hygiene
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          forms: ['react-hook-form', '@hookform/resolvers', 'zod'],
          state: ['zustand', '@tanstack/react-query'],
        },
      },
    },
    // Don't expose source maps in production (information leak)
    sourcemap: false,
  },
});
