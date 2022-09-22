const { Router } = require('express')
const ClientController = require('./app/Controllers/ClientController')
const ProductsController = require('./app/Controllers/ProductsController')

const routes = new Router()
routes.get('/clientes', ClientController.getClients)
routes.post('/clientes', ClientController.registerClient)
// routes.put('/clientes', ClientController.updateClient)
routes.post('/clientesDelete', ClientController.deleteClient)
routes.get('/produtos', ProductsController.getProducts)
routes.post('/produtos', ProductsController.registerProduct)
routes.post('/produtosDelete', ProductsController.deleteProduct)
module.exports = routes