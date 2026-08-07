import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Pure static SPA — no dev proxy or backend needed.
export default defineConfig({
  plugins: [react()],
});
