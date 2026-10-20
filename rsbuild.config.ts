import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginTailwindcss } from '@rsbuild/plugin-tailwindcss'
import { tanstackStart } from '@tanstack/react-start/plugin/rsbuild'

export default defineConfig({
  server: {
    port: 3000,
  },
  source: {
    define: {
      'import.meta.env.PUBLIC_BETTER_AUTH_URL': JSON.stringify(
        process.env.PUBLIC_BETTER_AUTH_URL,
      ),
    },
  },
  plugins: [pluginReact(), pluginTailwindcss(), tanstackStart()],
})
