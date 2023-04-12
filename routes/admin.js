const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')

/* `router.get('/', adminController.getProducts);` is creating a route for the HTTP GET request method
on the root path ('/') of the application. When a GET request is made to this route, the
`getProducts` function from the `adminController` module will be executed. */
router.get('/', adminController.getProducts);

/* `router.post('/add-product',adminController.postProducts)` is creating a route for the HTTP POST
request method on the path '/add-product' of the application. When a POST request is made to this
route, the `postProducts` function from the `adminController` module will be executed. This route is
typically used to add a new product to the application. */
router.post('/add-product',adminController.postProducts)

/* `router.put('/edit-product',adminController.editProduct)` is creating a route for the HTTP PUT
request method on the path '/edit-product' of the application. When a PUT request is made to this
route, the `editProduct` function from the `adminController` module will be executed. This route is
typically used to update an existing product in the application. */
router.put('/edit-product/:productId',adminController.editProduct)

/* `router.delete('/delete-product/:productId',adminController.deleteProduct)` is creating a route for
the HTTP DELETE request method on the path '/delete-product/:productId' of the application. When a
DELETE request is made to this route with a specific `productId` parameter, the `deleteProduct`
function from the `adminController` module will be executed. This route is typically used to delete
an existing product from the application. */
router.delete('/delete-product/:productId',adminController.deleteProduct)

module.exports = router;
