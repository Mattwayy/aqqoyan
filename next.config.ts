import type { NextConfig } from 'next'
import path from 'path'

const nextConfig: NextConfig = {
  // Фиксирует предупреждение о множественных lockfile в workspace
  turbopack: {
    root: path.resolve(__dirname),
  },
}

export default nextConfig
