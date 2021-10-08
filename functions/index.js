const functions = require("firebase-functions");
const express = require("express")
const cors = require("cors")

const {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct} = require("./src/products")
const {getAllOrders, getOrdersById, createNewOrder, updateOrder, deleteOrder} = require("./src/orders")
const {getAllCustomers, getCustomerById, createCustomers, updateCustomer, deleteCustomer} = require("./src/customers")

const app = express()
app.use(cors())

app.get("/products/productId", getProductById)
app.get("/products", getAllProducts)
app.post("/products", createProduct)
app.patch("/products/:productId", updateProduct)
app.delete("/products/:productId", deleteProduct)

app.get("/orders", getAllOrders)
app.get("/orders", getOrdersById)
app.patch("/orders", updateOrder)

app.get("/customers", getAllCustomers)
app.get("/customers", getCustomerById)
app.patch("/customers", updateCustomer)


exports.app = functions.https.onRequest(app)