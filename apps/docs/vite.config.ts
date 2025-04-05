import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tailwindcss from '@tailwindcss/vite'
import { compileTemplate } from '@vue/compiler-sfc'
import { readFile } from 'fs/promises'
import { optimize as optimizeSvg } from 'svgo'
import type { Plugin } from 'vite'

class ReadSvgFileError extends Error {
  // @ts-ignore
  readonly #classname = 'ReadSvgFileError'

  constructor(message: string, options: ErrorOptions) {
    super(message, options)
  }
}

const readSvgFile = async (path: string): Promise<string | ReadSvgFileError> => {
  try {
    return await readFile(path, 'utf-8')
  } catch (error) {
    if (error instanceof Error) {
      return new ReadSvgFileError(error.message, { cause: error })
    }

    return new ReadSvgFileError(`Failed to read SVG file: ${path}`, { cause: error })
  }
}

const vueSvgLoaderPlugin = (): Plugin => {
  const svgRegex = /\.svg(\?(raw|component|skipsvgo))?$/

  return {
    name: 'vite-plugin-svg-loader',
    enforce: 'pre',

    async load(id) {
      if (!id.match(svgRegex)) {
        return
      }

      const [path, query] = id.split('?', 2)

      const importType = query

      if (importType === 'url') {
        return
      }

      const svg = await readSvgFile(id)

      if (svg instanceof ReadSvgFileError) {
        console.error(svg.message)
        return
      }

      if (importType === 'raw') {
        return `export default ${JSON.stringify(svg)}`
      }

      const optimizedSvg = optimizeSvg(svg, { path }).data

      const { code } = compileTemplate({
        id: JSON.stringify(path),
        source: optimizedSvg,
        filename: path,
        transformAssetUrls: false,
      })

      return `${code}\nexport default { render }`
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), tailwindcss(), vueSvgLoaderPlugin()],
})
