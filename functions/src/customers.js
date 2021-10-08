const {connectDb} = require ("./db")
const { updateOrder } = require("./orders")

exports.getCustomers = (req, res) => {
    const db = connectDb()
    const { page, num } = req.query
    let query = db.collection("customers").orderBy("create_at","desc")
    if(page > 1) {
        query = query.offset(20 * (page - 1))
    }
    query = (num) ? query.limit(num) : query.limit(20)
    query.get()
    .then(collection => {
        const customers = collection.docs.map(doc => {
            let customer = doc.data()
            customer.id = doc.id
            return customer
        })
        res.send({
            data: customers,
            records: customers.length,
            page: 1,
        })
        .catch(err => res.status(500).send(err))
    })
}

//  create customers
exports.createCustomers = (req, res) => {
    if(!req.body.fname || !req.body.lname || !req.body.email) {
        res.status(401).send({message: "Invalid request"})
        return
    }
    const db = connectDb()
    db.collection("client").add(req.body)
    .then(docRef => res.status(201).send({ id: docRef.id}))
    .catch(err => res.status(500).send(err))
}


// get all customers
exports.getAllCustomers = (req, res) => {
    const db = connectDb()
    db.collection("client").get()
    .then(collection => {
        const client = collection.docs.map(doc => {
            let customer = doc.data()
            customer.id = doc.id
            return customer
        })
        res.send(client)
    })
    .catch(err => res.status(500).send(err))
}
    

// get customer by Id
exports.getCustomerById = (req, res) => {
    const db = connectDb()
    const { customerId } = req.params
    db.collection("client").doc(customerId).get()
    .then( doc => {
        let client = doc.data()
        customer.id = doc.id
        res.send(client)
    })
    .catch(err => res.status(500).send(err))
}


// update a customer
exports.updateCustomer = (req, res) => {
    const db = connectDb()
    const { customerId } = req.params
    db.collection("client").doc(customerId).update(req.body)
    .then(() => res.status(202).send({ message: "updated"}))
    .catch(err => res.status(500).send(err))
}


// delete a customer
exports.deleteCustomer = (req, res) => {
    const db = connectDb()
    const { customerId } = req.params
    db.collection("customer").doc( customerId ).delete()
    .then(() => res.status(202).send({ message : "deleted "}))
    .catch(err => res.status(500).send(err))
}