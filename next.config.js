const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        config.module.rules.push({
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader',
            ],
          })
    
        // Important: return the modified config
        return config
      },
    }
  }

  return {
    /* config options for all phases except development here */
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        config.module.rules.push({
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader',
            ],
          })
    
        // Important: return the modified config
        return config
      },
  }
}