const productModel = require("../model/product");

exports.products_get_all = (req, res) => {
  productModel
    .find()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            id: doc._id,
            name: doc.name,
            price: doc.price,
            request: {
              type: "GET",
              url: "http://localhost:5000/product/" + doc._id,
            },
          };
        }),
      };

      res.json(response);

      // res.json({
      //   message: "product total get",
      //   count: docs.length,
      //   products: docs,
      // });
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });

  // res.json({
  //   message: "product get",
  // });
};

exports.products_register_product = (req, res) => {
  const { name, price } = req.body;

  //데이터를 productModel에 저장할 내용 정리
  const product = new productModel({
    name,
    price,
  });

  product
    .save()
    .then((result) => {
      res.json({
        message: "success product posted",
        createdProduct: {
          id: result._id,
          name: result.name,
          price: result.price,
          request: {
            type: "GET",
            url: "http://localhost:5000/product/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });

  // res.json({
  //   message: "product posted",
  //   createdProduct: product,
  // });
};

exports.products_get_detail = (req, res) => {
  const productId = req.params.id; //url아이디를 params로 갖고와서 상수화
  productModel
    .findById(productId)
    .then((doc) => {
      if (doc) {
        return res.json({
          message: "successful product detail get",
          productInfo: {
            id: doc._id,
            name: doc.name,
            price: doc.price,
            request: {
              type: "GET",
              url: "http://localhost:5000/product",
            },
          },
        });
      } else {
        res.json({
          message: "No product Id",
        });
      }
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
};

exports.products_update_product = (req, res) => {
  const productId = req.params.id;

  const updatedOps = {};
  for (const ops of req.body) {
    updatedOps[ops.propName] = ops.value;
  }

  productModel
    .findByIdAndUpdate(productId, { $set: updatedOps })
    .then((result) => {
      res.json({
        message: "updated product",
        request: {
          type: "GET",
          url: "http://localhost:5000/product/" + productId,
        },
      });
    })
    .catch((err) => {
      res.json({
        message: err.message,
      });
    });

  // res.json({
  //   message: "product updated",
  // });
};

exports.products_delete_product = (req, res) => {
  const productId = req.params.id;
  productModel
    .findByIdAndDelete(productId)
    .then(() => {
      res.json({
        message: "product delete",
        request: {
          type: "GET",
          url: "http://localhost:5000/product",
        },
      });
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
};
