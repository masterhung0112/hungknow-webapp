const express = require('express')
const next = require('next')
const { createProxyMiddleware } = require('http-proxy-middleware')

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const options = {
  target: 'http://localhost:8065', // target host
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  xfwd: true,
  onProxyReqWs: (proxyReq, req, socket) => {
    socket.on('error', function (error) {
      console.warn('Websockets error.', error)
    })
  },
}

const isDevelopment = process.env.NODE_ENV !== 'production'

const wsProxy = createProxyMiddleware(options)

app
  .prepare()
  .then(() => {
    const server = express()

    if (isDevelopment) {
      server.use(['/api', '/plugins', '/static/plugins/', '*/sockjs-node/'], wsProxy)
    }

    server.all('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) {
        console.error(err)
      } else {
        console.log(`> Ready on http://localhost:${port}`)
      }
    })
  })
  .catch((err) => {
    console.log('Error:::::', err)
  })