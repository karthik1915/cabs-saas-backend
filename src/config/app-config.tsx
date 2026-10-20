import packageJson from '../../package.json'

const currentYear = new Date().getFullYear()

export const APP_CONFIG = {
  name: 'CABBITX',
  version: packageJson.version,
  copyright: `© ${currentYear}, Aahrbitx.`,
  meta: {
    title: 'Managed Cab booking Application',
    description: 'Modern cab booking saas application',
  },
}
