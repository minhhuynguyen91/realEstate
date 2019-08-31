const express = require('express');

const routes = express.Router();


var homeController = require('./home');
var productController = require('./product');
var categoryController = require('./category');
var authController = require('./auth');
var userController = require('./user'); 


routes.route('/')
  .get(homeController.index);

routes.route('/products/new')
  .get(productController.new);

routes.route('/products')
  .get(productController.index)
  .post(productController.post);

routes.route('/products/:id') 
  .get(productController.id)
  .put(productController.put)
  .delete(productController.delete);

routes.route('/products/:id/edit')
  .get(productController.edit);


routes.route('/categories/new')
  .get(categoryController.new);

routes.route('/categories')
  .post(categoryController.post);

routes.route('/login') 
  .get(authController.get)
  .post(authController.post);

routes.route('/logout') 
  .get(authController.logout);

routes.route('/user')
  .post(userController.create);


module.exports = routes;