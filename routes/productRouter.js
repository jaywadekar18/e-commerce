const express = require('express');
const router = express.Router()
const Product = require('../models/productModel');
const auth = require('../middleware/auth');
const admin =require('../middleware/admin')
const ErrorHandler = require('../services/ErrorHandlers')
router.route('/')
    .get( async (req, res,next) => {

        try {
            const data = await Product.find().select('-updatedAt -__v');

            res.json(data)
        }
        catch (err) {
            next(ErrorHandler.serverError(err.message));
        }

    })
    .post(  async (req, res ,next) => {
        try {
            const user = new Product(req.body)
            const result =await user.save();

            res.json('Data received!!')
        }
        catch (err) {
            next(ErrorHandler.serverError(err.message));
        }
    })
    .put(auth ,admin, async (req, res,next) => {

        try {
            console.log(req.body)
           const data= await Product.updateOne({_id : req.body._id}, {
                $set: {
                  name: req.body.name,
                  brand:req.body.brand,
                  countInStock: req.body.countInStock,
                  price:req.body.price,
                  //image:req.body.image,
                 // category:req.body.category,
                 //// rating:req.body.rating,
                 // description:req.body.description,
            
                }
              })
              if(!data){
                next(ErrorHandler.notFoundError('Could not find data '));
              }

            res.json(data)
        }
        catch (err) {
            console.log(err)
            next(ErrorHandler.serverError(err.message));
        }

    })
    router.route('/:id')
    .delete( async (req, res,next) => {

        try {
            const data = await Product.deleteOne({_id : req.params.id});
            if(!data){
                next(ErrorHandler.notFoundError('Could not find data '));
                
            }

            res.json(data)
        }
        catch (err) {
            next(ErrorHandler.serverError(err.message));
        }

    })
    .get( async (req, res,next) => {

        try {
            const data = await Product.find({_id : req.params.id});
            if(!data){
                next(ErrorHandler.notFoundError('Could not find data '));
                
            }

            res.json(data)
        }
        catch (err) {
            next(ErrorHandler.serverError(err.message));
        }

    })
    router.route('/search/:name')
    .get( async (req, res,next) => {

        try {
            const data = await Product.find({
                $or: [
                    {name : { "$regex" :  req.params.name, $options: 'i'}},
                    {brand : { "$regex" :  req.params.name, $options: 'i'}}
                ]
            })
            if(!data){
                next(ErrorHandler.notFoundError('Could not find data '));
                
            }
            
            res.json(data)
        }
        catch (err) {
            next(ErrorHandler.serverError(err.message));
        }

    })
    




    

module.exports = router;