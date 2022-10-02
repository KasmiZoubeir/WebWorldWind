import fetch from 'node-fetch';
import { getLatLngObj } from "tle.js";


 

// var stripe  = require('stripe')('tst')
// var express = require('express');
// var cors=require('cors');
// var bodyParser = require('body-parser');
// var app = express();
// var router=express.Router();
//  app.use(bodyParser.urlencoded({extended : false}));
//  app.use(cors());
//  router.post('/processP',function (request,response){
//     var stripetoken = request.body.stripetoken;
//     var amountpayable = request.body.amount;
//     var charge = stripe.charge.create({
//         amount:amountpayable,
//         currency:'usd',
//         describe:'somme description node js',
//         source:stripetoken
//     },function(err,charge){
//         if(err)alert('err')
//         else response.send({success:true});
//     })
//  })
// app.use(router);
// app.listen(3333 , function(){
//     console.log('server started')
// })
const express = require("express");
const bodyparser = require('body-parser')
const app = express();
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
// const stripe = require("stripe")("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");
 
const cors = require('cors')
const puppeteer = require("puppeteer")
const fs=require("fs/promises") 

const getLatLngObj=require("tle.js")

const getLatLngObj=require("tle.js")
 fetch
app.post('/shipping_cost', async(req, res) => {
  const date= new Date();
async function getData() {
  try {
    const response = await fetch('https://tle.ivanstanojevic.me/api/tle/43694');
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    const result = await response.json();
    const res = await `${result.name} \n ${result.line1} \n ${result.line2}`
    const optionalTimestampMS = date.getTime() ;
    const latLonObj = getLatLngObj(res, optionalTimestampMS);
    console.log(latLonObj);
    return latLonObj;  
    // return res;
  } catch (err) {
    console.log(err);
}
}
 
 

  

  res.send(getData())
 
  
 
})
app.listen(5000, () => {
  console.log("App is listening on Port 5000")
})
