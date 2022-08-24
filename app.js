const express = require('express')
const order_detail = require('./routes/orderDetail')
const order = require('./routes/order')
const item = require('./routes/item')
const user = require('./routes/user')
const app = express();

const port=4000;
// is we use json object
app.use(express.json());
app.use('/order_detail',order_detail)
app.use('/order',order)
app.use('/item',item)
app.use('/users',user)

app.get('/',(req,res)=>{
    console.log('get-request-comming!')
    res.send('get-req-came-for/route')
})
app.listen(port,(req,res)=>{
    console.log(`Express app listening on port ${port}`);
})