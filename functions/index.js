const functions = require("firebase-functions");
const express = require("express")
const cors = require("cors")
const {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct} = require("./src/products")

const app = express()
app.use(cors())

app.get("/products/productId", getProductById)
app.get("/products", getAllProducts)
app.post("/products", createProduct)
app.patch("/products/:productId", updateProduct)
app.delete("/products/:productId", deleteProduct)

exports.app = functions.https.onRequest(app)