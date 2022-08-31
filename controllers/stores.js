
const Store = require('../models/Stores');

//GET method
exports.getStores =  async (req, res, next) => {
    try {

        const store = await Store.find();

        return res.status(200).json({
        success: true, 
        count: this.getStores.length,
        data: stores
        });
        

    } catch (err) {
        console.error(error);
        res.status(500).json({error: 'server error'});

    }
    
     };



// POST method


exports.addStores =  async (req, res, next) => {
    try {

       const store = await Store.create(req.body);
       return res.status(200).json({
        success: true,
        data: store
       });    

    } catch (err) {
        console.error(error);
        if(err.code===11000){
            return res.status(400).json({error: 'This store already exists'});
        }
        res.status(500).json({error: 'server error'});

    }
    
     };