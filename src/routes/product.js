const express = require("express");
const router = express.Router();

const productController = require("../app/controller/ProductController");

router.get("/", productController.showProduct);
router.post("/add", productController.addProduct);
router.get("/update/:id", productController.showProductID);
router.put("/update/:id", productController.updateProduct);
router.delete("/delete", productController.deleteProduct);

module.exports = router;