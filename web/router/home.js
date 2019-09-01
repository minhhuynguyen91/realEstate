var mongo = require('mongodb');
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Category = mongoose.model('Category');

exports.index = function(req, res) {

  if (req.query.cat) 
  {
    var objectId = mongo.ObjectId(req.query.cat)
    Category.find().sort({'displayOrder':1})
      .then((categories) => {
        Category.aggregate([
        {
          $match : {_id : objectId} 
        },

        {
          $lookup:
          {
            from: 'products',
            localField: 'productIds',
            foreignField: '_id',
            as : 'catProducts'
          }
        }
      ]).sort({'displayOrder' : 1}).then((products) => {
          
          res.render('homes/index', 
          {
            session: req.session,
            products: products[0].catProducts,
            categories
          });
        })

        .catch((err) => {
          console.log(err);
          res.send('Cannot get the category');
        });    
      })

      .catch((err) => {
        console.log(err);
        res.send('Cannot get the categories')
      })
    
  }
  
  else 
  {
    Category.find().sort({'displayOrder':1})
      .then((categories) => {
        Product.find().sort({'displayOrder': 1})
          .then((products) => {
            res.render('homes/index', 
            {
              session: req.session,
              products, categories
            })
          })

          .catch((err) => {
            console.log(err);
            res.send('Cannot get the products')
          })
      })

      .catch((err) => {
        console.log(err);
        res.send('Cannot find category')
      })
  }
}