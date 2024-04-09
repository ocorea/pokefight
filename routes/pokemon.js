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
            param('info').notEmpty().escape().trim(),
            
        ]
    }
       
    router.get('/pokemon/:id/:info',validatePokeInfo(), (req, res) => {
        try {
            const result = validationResult(req);
             if (result.isEmpty()) {
                const data = matchedData(req);
                Pokemon.findById(data.id, data.info).then((result) => {
                    res.json(result);
                });

             }
           
         } catch (error) {
             console.log(error);
             res.status(500).send('Internal server error');
         }
     });
              

module.exports = router;