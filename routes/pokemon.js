const express = require('express');
const router = express.Router()
const { query, validationResult, matchedData, param } = require('express-validator')

//call the MongoDB client
const mongoClient = require('../data_services/mongoose_client');

//the schema, models classes exist in the Mongodb client created
const pokemonSchema = new mongoClient.Schema({});
const Pokemon = mongoClient.model('Pokemon', pokemonSchema, 'pokes');


//TODO: Validation inputs

router.get('/pokemon', (req, res) => {
    try {
        Pokemon.find({}).then((result) => {
    
            res.json(result);
        });
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal server error');
        
    }

});

// /pokemon/:id
const  validatePoke=()=> {
    return [
        param('id').notEmpty().escape().trim()
    ]
}

router.get('/pokemon/:id',validatePoke(), (req, res) => {
    try {
           const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const id = req.params.id;
            Pokemon.findById(id).then((result) => {
                res.json(result);
            });
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error');
        }
    });

    ///pokemon/:id/:info
    const validatePokeInfo=()=>{
        return [
            param('id').notEmpty().escape().trim(),
            param('name').notEmpty().escape().trim(),
            param('type').notEmpty().escape().trim(),
            param('base').notEmpty().isNumeric
        ]
    }
       
    router.get('/pokemon/:id/:info',validatePokeInfo(), (req, res) => {
        try {
            const errors = validationResult(req, resp);
             if (result.isEmpty()) {
                const data = matchedData(req);
                console.log('DATA:' + data);
                res.send({'name':resp.data.name});
             }
             const id = req.params.id;
             const name = req.params.name;
             const type = req.params.type;
             const base = req.params.base;
             Pokemon.findById( id, name, type, base).then((result) => {
                 res.json(result);
             });
         } catch (error) {
             console.log(error);
             res.status(500).send('Internal server error');
         }
     });
              

module.exports = router;