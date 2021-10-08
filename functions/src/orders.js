const {connectDb} = require("./db")

// create order
exports.createNewOrder = (req, res) => {
    const db = connectDb()
    db.collection("purchase").add(req.body)
    .then(docRef => res.status(201).send({ id: docRef.id}))
    .catch(err => res.status(500).send(err))
}

// get all orders 
exports.getAllOrders = (req, res) => {
    const db = connectDb()
    db.collection("purchase").get()
    .then(collection => {
        const purchase = collection.docs.map(doc => {
            let order = doc.data()
            order.id= doc.id
            return order
        })
        res.send(purchase)
    })
    .catch(err => res.status(500).send(err))
}


// get order by id
exports.getOrdersById = (req, res) => {
    const db = connectDb()
    const { orderId} = req.params
    db.collection("purchase").doc(orderId).get()
    .then( doc => {
        let purchase = doc.data
        order.id = doc.id
        res.send(purchase)
    })
    .catch(err=> res.status(500).send(err))
}


// update a(n) order
exports.updateOrder = (req, res) => {
    const { orderId } = req.params
    const db = connectDb()
    db.collection("purchase").doc(orderId).update(req.body)
    .then(() => res.status(202).send({ message: "updated"})) 
    .catch(err=> res.status(500).send(err))
}



// delete a(n) order
exports.deleteOrder = (req, res) => {
    const db = connectDb()
    const { orderId } = req.params
    db.collection("purchase").doc(orderId).delete()
    .then(() => res.status(202).send({ message : "deleted "}))
    .catch(err => res.status(500).send(err))
}