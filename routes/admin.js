const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");

/*<=========================PRODUCT ROUTERS====================>*/

/* `router.get('/', adminController.getProducts);` is creating a route for the HTTP GET request method
on the root path ('/') of the application. When a GET request is made to this route, the
`getProducts` function from the `adminController` module will be executed. */
router.get("/get-products", adminController.getProducts);

/* `router.post('/add-product',adminController.postProducts)` is creating a route for the HTTP POST
request method on the path '/add-product' of the application. When a POST request is made to this
route, the `postProducts` function from the `adminController` module will be executed. This route is
typically used to add a new product to the application. */
router.post("/add-product", adminController.postProducts);

/* `router.get('/get-product/:productId',adminController.getProduct)` is creating a route for the HTTP
GET request method on the path '/get-product/:productId' of the application. When a GET request is
made to this route with a specific `productId` parameter, the `getProduct` function from the
`adminController` module will be executed. This route is typically used to retrieve a specific
product from the application based on its `productId`. */
router.get("/get-product/:productId", adminController.getProduct);

/* `router.put('/edit-product',adminController.editProduct)` is creating a route for the HTTP PUT
request method on the path '/edit-product' of the application. When a PUT request is made to this
route, the `editProduct` function from the `adminController` module will be executed. This route is
typically used to update an existing product in the application. */
router.post("/edit-product/:productId", adminController.editProduct);

/* `router.delete('/delete-product/:productId',adminController.deleteProduct)` is creating a route for
the HTTP DELETE request method on the path '/delete-product/:productId' of the application. When a
DELETE request is made to this route with a specific `productId` parameter, the `deleteProduct`
function from the `adminController` module will be executed. This route is typically used to delete
an existing product from the application. */
router.delete("/delete-product/:productId", adminController.deleteProduct);

/*<=========================END OF PRODUCT ROUTERS====================>*/

/*<=========================COLLECTION ROUTERS====================>*/
/* `router.get('/get-collections',adminController.getCollections)` is creating a route for the HTTP GET
request method on the path '/get-collections' of the application. When a GET request is made to this
route, the `getCollections` function from the `adminController` module will be executed. This route
is typically used to retrieve all collections from the application. */
router.get("/get-collections", adminController.getCollections);

/* `router.post('/add-collection',adminController.postCollection)` is creating a route for the HTTP
POST request method on the path '/add-collection' of the application. When a POST request is made to
this route, the `postCollection` function from the `adminController` module will be executed. This
route is typically used to add a new collection to the application. */
router.post("/add-collection", adminController.postCollection);

/* `router.put('/edit-collection/:collectionId',adminController.editCollection)` is creating a route
for the HTTP PUT request method on the path '/edit-collection/:collectionId' of the application.
When a PUT request is made to this route with a specific `collectionId` parameter, the
`editCollection` function from the `adminController` module will be executed. This route is
typically used to update an existing collection in the application. */
router.post("/edit-collection/:collectionId", adminController.editCollection);

/* The above code is defining a route for a GET request to retrieve a specific collection by its ID.
The route is defined using the Express router and is handled by the `getCollection` function in the
`adminController`. */
router.get("/get-collection/:collectionId", adminController.getCollection);

/* `router.delete('/delete-collection/:collectionId',adminController.deleteCollection)` is creating a
route for the HTTP DELETE request method on the path '/delete-collection/:collectionId' of the
application. When a DELETE request is made to this route with a specific `collectionId` parameter,
the `deleteCollection` function from the `adminController` module will be executed. This route is
typically used to delete an existing collection from the application. */
router.delete(
  "/delete-collection/:collectionId",
  adminController.deleteCollection
);

/*<=========================END OF COLLECTION ROUTERS====================>*/

/*<=========================BANNER ROUTERS====================>*/
/* `router.get('/get-banners',adminController.getBanners)` is creating a route for the HTTP GET request
method on the path '/get-banners' of the application. When a GET request is made to this route, the
`getBanners` function from the `adminController` module will be executed. This route is typically
used to retrieve all banners from the application. */
router.get("/get-banners", adminController.getBanners);

/* `router.post('/add-banner',adminController.postBanner)` is creating a route for the HTTP POST
request method on the path '/add-banner' of the application. When a POST request is made to this
route, the `postBanner` function from the `adminController` module will be executed. This route is
typically used to add a new banner to the application. */
router.post("/add-banner", adminController.postBanner);

/* `router.get("/get-banner/:bannerId", adminController.getBanner);` is creating a route for the HTTP
GET request method on the path '/get-banner/:bannerId' of the application. When a GET request is
made to this route with a specific `bannerId` parameter, the `getBanner` function from the
`adminController` module will be executed. This route is typically used to retrieve a specific
banner from the application based on its `bannerId`. */
router.get("/get-banner/:bannerId", adminController.getBanner);

/* `router.put("/update-selected/:bannerId", adminController.updateSelectedBanner)` is creating a route
for the HTTP PUT request method on the path '/update-selected/:bannerId' of the application. When a
PUT request is made to this route with a specific `bannerId` parameter, the `updateSelectedBanner`
function from the `adminController` module will be executed. This route is typically used to update
the `selected` property of an existing banner in the application. */
router.put("/update-selected/:bannerId", adminController.updateSelectedBanner);

/* `router.put('/edit-banner/:bannerId',adminController.editBanner)` is creating a route for the HTTP
PUT request method on the path '/edit-banner/:bannerId' of the application. When a PUT request is
made to this route with a specific `bannerId` parameter, the `editBanner` function from the
`adminController` module will be executed. This route is typically used to update an existing banner
in the application. */
router.post("/edit-banner/:bannerId", adminController.editBanner);

/* `router.delete('/delete-banner/:bannerId',adminController.deleteCollection)` is creating a route for
the HTTP DELETE request method on the path '/delete-banner/:bannerId' of the application. When a
DELETE request is made to this route with a specific `bannerId` parameter, the `deleteCollection`
function from the `adminController` module will be executed. This route is typically used to delete
an existing banner from the application. */
router.delete("/delete-banner/:bannerId", adminController.deleteBanner);

/*<=========================END OF BANNER ROUTERS====================>*/

/*<=========================USER ROUTERS====================>*/
/* `router.get('/get-user',adminController.getBanners)` is creating a route for the HTTP GET request
method on the path '/get-user' of the application. When a GET request is made to this route, the
`getBanners` function from the `adminController` module will be executed. However, the route name
'get-user' is misleading as it suggests that the route is related to retrieving user data, but the
function being called is `getBanners` which suggests that it is related to retrieving banner data. */
router.get("/get-user", adminController.getUser);

/* `router.post('/add-user',adminController.postBanner)` is creating a route for the HTTP POST request
method on the path '/add-user' of the application. When a POST request is made to this route, the
`postBanner` function from the `adminController` module will be executed. This route is typically
used to add a new user to the application. */
router.post("/add-user", adminController.postUser);

/* `router.put('/edit-user/:userId',adminController.editBanner)` is creating a route for the HTTP PUT
request method on the path '/edit-user/:userId' of the application. When a PUT request is made to
this route with a specific `userId` parameter, the `editBanner` function from the `adminController`
module will be executed. This route is typically used to update an existing user in the application. */
router.put("/edit-user/:userId", adminController.editUser);

/* `router.delete('/delete-user/:userId',adminController.deleteCollection)` is creating a route for the
HTTP DELETE request method on the path '/delete-user/:userId' of the application. When a DELETE
request is made to this route with a specific `userId` parameter, the `deleteCollection` function
from the `adminController` module will be executed. This route is typically used to delete an
existing user from the application. However, the function being called is `deleteCollection`, which
is misleading as it suggests that it is related to deleting a collection, not a user. */
router.delete("/delete-user/:userId", adminController.deleteUser);

/*<=========================END OF USER ROUTERS====================>*/

/*<=========================CATEGORY ROUTERS====================>*/
/* `router.post('/add-category',adminController.postCategory)` is creating a route for the HTTP POST
request method on the path '/add-category' of the application. When a POST request is made to this
route, the `postCategory` function from the `adminController` module will be executed. This route is
typically used to add a new category to the application. */
router.post("/add-category", adminController.postCategory);

/* `router.get('/get-categories',adminController.getCategories)` is creating a route for the HTTP GET
request method on the path '/get-categories' of the application. When a GET request is made to this
route, the `getCategories` function from the `adminController` module will be executed. This route
is typically used to retrieve all categories from the application. */
router.get("/get-categories", adminController.getCategories);

/* `router.get('/get-category/:categoryId',adminController.getCategory)` is creating a route for the
HTTP GET request method on the path '/get-category/:categoryId' of the application. When a GET
request is made to this route with a specific `categoryId` parameter, the `getCategory` function
from the `adminController` module will be executed. This route is typically used to retrieve a
specific category from the application based on its `categoryId`. */
router.get("/get-category/:categoryId", adminController.getCategory);

/* `router.put('/edit-category/:categoryId',adminController.editCategory)` is creating a route for the
HTTP PUT request method on the path '/edit-category/:categoryId' of the application. When a PUT
request is made to this route with a specific `categoryId` parameter, the `editCategory` function
from the `adminController` module will be executed. This route is typically used to update an
existing category in the application. */
router.post("/edit-category/:categoryId", adminController.editCategory);

/* `router.delete('/delete-category/:categoryId',adminController.deleteCategory)` is creating a route
for the HTTP DELETE request method on the path '/delete-category/:categoryId' of the application.
When a DELETE request is made to this route with a specific `categoryId` parameter, the
`deleteCategory` function from the `adminController` module will be executed. This route is
typically used to delete an existing category from the application. */
router.delete("/delete-category/:categoryId", adminController.deleteCategory);

module.exports = router;
