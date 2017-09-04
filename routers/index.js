const router = require('koa-router')()

const home = require('./home')
const api = require('./api')
const page = require('./page')

router.use('/', home.routes(), home.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())
router.use('/page', page.routes(), page.allowedMethods())


const customerService = require('./customerService');
const jwt = require('../middlewares/jwt');
const authenticate = require('../middlewares/authenticate');

router.get('/customer', (ctx,next)=> {
    ctx.body = customerService.getCustomers();
});

router.get('/customer/:id', jwt,(ctx,next) =>{
    if (customerService.getCustomer(ctx.params.id)) {
        ctx.body = customerService.getCustomer(ctx.params.id);
    }
    else {
        ctx.status = 404;
        ctx.body = {"error": "There is no customer with that id"};
    }
});

router.post('/customer', jwt,(ctx,next) =>{
    ctx.body = customerService.postCustomer(ctx.request.body);
});

router.post('/login', (ctx,next) =>{
    authenticate(ctx);
});



module.exports = router