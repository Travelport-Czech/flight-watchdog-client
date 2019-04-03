const path = require('path')
const Hapi = require('hapi')

const rootPath = '../.dist-client'
const rootPathEmail = '../.dist-server'
const rootClientJs = path.join(__dirname, rootPath + '/index.js')
const rootClientJsMap = path.join(__dirname, rootPath + '/index.js.map')
const emailClientJs = path.join(__dirname, rootPathEmail + '/index.js')
const emailClientJsMap = path.join(__dirname, rootPathEmail + '/index.js.map')
const rootWebDir = path.join(__dirname, './httpPages')

const initServer = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 8080,
    routes: { log: { collect: true } }
  })

  await server.register(require('inert'))

  server.route({
    method: 'GET',
    path: '/client/index.js',
    handler: function(request, h) {
      return h.file(rootClientJs)
    }
  })

  server.route({
    method: 'GET',
    path: '/client/index.js.map',
    handler: function(request, h) {
      return h.file(rootClientJsMap)
    }
  })

  server.route({
    method: 'GET',
    path: '/client/email.js',
    handler: function(request, h) {
      return h.file(emailClientJs)
    }
  })

  server.route({
    method: 'GET',
    path: '/client/email.js.map',
    handler: function(request, h) {
      return h.file(emailClientJsMap)
    }
  })

  server.route({
    method: 'GET',
    path: '/',
    handler: function(request, h) {
      return h.file(rootWebDir + '/index.html')
    }
  })

  server.route({
    method: 'GET',
    path: '/lowerPriceEmail',
    handler: function(request, h) {
      return h.file(rootWebDir + '/lowerPriceEmail.html')
    }
  })

  return server
}

let server

const start = async () => {
  try {
    console.log('Starting HAPI server...')
    server = await initServer()
    console.log('Server starter.')
    server.events.on('log', (event, tags) => {
      if (tags.error) {
        console.log(event);
      }
    })
    server.events.on({ name: 'request', channels: 'app' }, (request, event, tags) => {
      if (tags.error) {
        console.log(event);
      }
    })
    await server.start()
  } catch (err) {
    console.log('Start server error', err)
    return
  }
}
const stop = async () => {
  await server.stop()
}

start()


