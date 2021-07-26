const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require('http-proxy-middleware')

const port = process.env.PORT || 9005
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const apiPaths = {
  '/api/v4/websocket': {
    target: 'http://localhost:8065',
    pathRewrite: {
      '^/api/v4/websocket': '/api/v4/websocket',
    },
    changeOrigin: true,
    ws: true,
  },
  '/api': {
    target: 'http://localhost:8065',
    pathRewrite: {
      '^/api': '/api',
    },
    changeOrigin: true,
  },
  '/plugins': {
    target: 'http://localhost:8065',
    pathRewrite: {
      '^/plugins': '/plugins',
    },
    changeOrigin: true,
  },
  '/static/plugins/': {
    target: 'http://localhost:8065',
    pathRewrite: {
      '^/static/plugins/': '/static/plugins/',
    },
    changeOrigin: true,
  },
  '/sockjs-node/': {
    target: 'http://localhost:8065',
    pathRewrite: {
      '^/sockjs-node/': '/sockjs-node/',
    },
    changeOrigin: true,
    // ws: true,
  },
}

const isDevelopment = process.env.NODE_ENV !== 'production'

app
  .prepare()
  .then(() => {
    const server = express()

    if (isDevelopment) {
    //   server.use('/api/v4/websocket', createProxyMiddleware(apiPaths['/api/v4/websocket']))
      server.use('/api', createProxyMiddleware(apiPaths['/api']))
    //   server.use('/plugins', createProxyMiddleware(apiPaths['/plugins']))
    //   server.use('/static/plugins/', createProxyMiddleware(apiPaths['/static/plugins/']))
    //   server.use('/sockjs-node/', createProxyMiddleware(apiPaths['/sockjs-node/']))
    }

    server.all('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) {
        throw err
      }
      console.log(`> Ready on http://localhost:${port}`)
    })
  })
  .catch((err) => {
    console.log('Error:::::', err)
  })
