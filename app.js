const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
const router = require('./routers/index')

app.use(router.routes()).use(router.allowedMethods())


const port = process.env.PORT || 443
app.listen(port, () => console.log('Server listening on', port))