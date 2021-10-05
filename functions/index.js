const functions = require("firebase-functions");
const express = require("express")
const {getAllProducts, getProductById} = require("./src/products")

const app = express()

app.get("/products/productId", getProductById)
app.get("/products", getAllProducts)

exports.app = functions.https.onRequest(app)