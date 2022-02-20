var mongo = require('mongodb');
const mongoose = require('mongoose');
const RealEstate = mongoose.model('realEstate');
const District = mongoose.model('District');


exports.index = function(req, res) {
  RealEstate.find()
    .then((realEstates) => {
      res.render('realEstates/index', {session: req.session, realEstates: realEstates})
    })

    .catch((err) => {res.send(err)})
}


exports.id = function(req, res) {
  var objectId = mongo.ObjectId(req.params.id);
  RealEstate.aggregate([
    {
      $match : {_id : objectId},
    },
    {
      $lookup: 
      {
        from: 'districts',
        localField: 'districtId',
        foreignField: '_id',
        as: 'districtData'
      }
    }
  ]).then((realEstate) => {
    var marked = require('marked')
    realEstate[0].content = marked(realEstate[0].content)
    var newsImageLinks = realEstate[0].img_link.split(";").filter(String);

    res.render('realEstates/show', {
      session : req.session,
      product : product[0],
      category : product[0].catData[0],
      productImgs: newsImageLinks
    })
  })
}

exports.new = function(req, res) {
  const realEstate = {};
  District.find()
    .then((districts) => {
        res.render('realEstates/new', {
        session : req.session,
        action : "/realEstates",
        districts,
        realEstate
      })

    })

    .catch((err) => {
      console.log(err);
      res.send('cannot get the districts');
    })

}

exports.post = function(req, res) {
  // 1/ push the product Id to the category
  // 2/ update the categoryId
  District.findOne({'name' : req.body.districtName})
    .then((category) => {
      var newImageLink = req.body.img_link.replace(/\r?\n|\r/g, '');

      const product = new Product
        ({
          title : req.body.title,
          content: req.body.content,
          img_link: newImageLink,
          img_thumbnail: req.body.img_thumbnail,
          quantity: req.body.quantity,
          note: req.body.note,
          displayOrder: (req.body.displayOrder) ? req.body.displayOrder : 999,
          frontPage: (req.body.frontPage == "on") ? true : false,
          categoryId : category._id
        });

      product.save()
        .then((product) => {
          category.updateOne({
            $push : {productIds: product._id}
          })
            .then(() => {
              res.redirect('/')
            })

            .catch((err) => {
              console.log(err);
              res.send('Cannot update the category')
            })
          
        })

        .catch((err) => {
          console.log(err);
          res.send('Cannot create the product');
        });

    })

    .catch((err) => {
      console.log(err);
      res.send('Cannot find the category')
    });


}

exports.edit = function(req, res) {
  var objectId = mongo.ObjectId(req.params.id)
  Category.find()
    .then((categories) => {
      Product.findOne({'_id' : objectId})
      .then((product) => { 
        product.img_link = product.img_link.replace(/;/g, ';\\r\\n');
  
        res.render('products/edit', {
          session : req.session,
          action : "/products/" + objectId + '?_method=put',
          categories,
          product
        })
      })

      .catch((err) => {
        console.log(err);
        res.send('Cannot get the product')
      });
    })

    .catch((err) => {
      console.log(err);
      res.send('Cannot get the categories')
    })

}

exports.put = function(req, res) {
  // 1 - Remove the productIds then update it with the current category 
  // 2 - Update the category ID from product
  var objectId = mongo.ObjectId(req.params.id)
  Product.findOne({'_id' : objectId})
    .then((product) => {
      Category.findOne({'_id' : product.categoryId })
        .then((oldCat) => {
          oldCat.updateOne({ $pull : { productIds: objectId } })
          .then(() => {
            Category.findOne({ 'name' : req.body.categoryName })
              .then((newCat) => {
                newCat.updateOne({ $push : {productIds: objectId} })
                  .then(() => {
                    var newImageLink = req.body.img_link.replace(/\r?\n|\r/g, '');

                    product.updateOne({
                    title : req.body.title,
                    content: req.body.content,
                    img_link: newImageLink,
                    img_thumbnail: req.body.img_thumbnail,
                    quantity: req.body.quantity,
                    note: req.body.note,
                    displayOrder: (req.body.displayOrder) ? req.body.displayOrder : 999,
                    frontPage: (req.body.frontPage == "on") ? true : false,
                    categoryId : newCat._id
                  })
                    .then(() => {
                      res.redirect('/')
                    })

                    .catch((err) => {
                      console.log(err);
                      res.send('Cannot update the product')
                    });
                  })

                  .catch((err) => {
                    console.log(err);
                    res.send('Cannot update the new category')
                  })
              })

              .catch((err) => {
                console.log(err);
                res.send('Cannot find the new category');
              });
          })
        })

        .catch((err) => {
          console.log(err);
          res.send('Cannot remove the old category');
        });
    })

    .catch((err) => {
      console.log(err);
      res.send('Cannot find the product');
    });
}

// 1 - Remove related data from the category
// 2 - Remove the product
exports.delete = function(req, res) {
  const objectId = new mongo.ObjectId(req.params.id);
  Category.findOne({'productIds': objectId})
    .then((cat) => {
      cat.update({$pull : {productIds: objectId}})
        .then(() => {
          Product.deleteOne({'_id' : objectId})
            .then(() => {
              res.redirect('/products')
            })

            .catch((err) => {
              res.send('Cannot delete product')
            })
        })

        .catch((err) =>{
          res.send('Cannot remove product ID from category')
        })
    })

    .catch((err) => {
      res.send('Cannot find category')
    })

}