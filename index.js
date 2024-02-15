

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

const express =require("express");
const cors = require("cors");
const dotenv = require( "dotenv" );
dotenv.config()
const stripe = require('stripe')(
    process.env.STRIPE_KEY
    ); 

    const app = express()
    app.use(cors({origin:true}))

    app.use(express.json())

    app.get("/", (req, res) => {
        res.status(200).json({
            message:"Success",
        });
    });


    app.post("/payment/create", async(req, res)=> {
        const total = req.query.total;

        if(total > 0){
            const paymentIntent = await stripe.paymentIntents.create({
                amount : total,
                currency:"usd"
            });
            console.log(paymentIntent);
            // res.status(201).json(paymentIntent);
    
            res.status(201).json({
                clientSecret: paymentIntent.client_secret
            })
        }else{
            res.status(403).json({
                message:'The amount must be greater than zero'});
        }
        
        
    })

//   app.post("/webhook", async (request, response) => {
//     const sig = request.headers["stripe-signature"];
//     let event;
//     try {
//       event = stripe.webhooks.constructEvent(
//         request.body,
//         sig,
//         process.env.STRIPE_WEBHOOK_SECRET
//       );
//     } catch (err) {
//       return response.status(400).send(`Webhook Error: ${err.message}`);
//     }
//     // Handle the checkout.session.completed event here
//     console.log("event.type ", event.type)
//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object as Stripe.Checkout.Session;
//       console.log("Payment received!");
//       response.json({received: true});
//     } else {
//       response.json({received: false});
//     }
//   });
                
                
            
            
            
            
            
//      = require('express').Router();
// const stripe = require('stripe')('sk_test_51I98XJHq7KLrZQ6l2hYWGbVjRwuNMFgpOtPzxdEvkfD  
        


    // exports.api =onRequest(app)

    app.listen(5000, (err)=>{
        if(err)  throw err; 
        console.log("Server is running on port: 5000, http://localhost:5000");
    })


//const bodyParser=require('body-parser');
    


