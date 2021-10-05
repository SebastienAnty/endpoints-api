const {connectDb} = require("./db")

// getAllProducts
exports.getAllProducts = (req, res) => {
    const db = connectDb()
    db.collection("clothes").get()
    .then(collection => {
        const clothes = collection.docs.map(doc => {
            let item = doc.data()
            item.id = doc.id
            return item
        })
        res.send(clothes)
    })
    .catch(err => res.status(500).send(err))
}
// getProductById
exports.getProductById = (req, res) => {
    // connect to database
    const db = connectDb()
    // get productId from req.params
    const { productId } = req.params
    // get document from collection
    db.collection("clothes").doc(productId).get()
        .then(doc => {
            let item = doc.data()
            item.id = doc.id
            //return document
            res.send(item)
        })
        .catch(err => res.status(500).send(err))
}

// createProduct

// updateProduct 

// deleteProduct