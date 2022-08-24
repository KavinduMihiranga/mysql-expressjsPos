const express=require('express')

const mysql=require('mysql')
const db=require('../configs/db.configs')
const connection=mysql.createConnection(db.database)

const router=express.Router()
connection.connect(function(err){
    if(err){
        console.log(err)
    }else{
        console.log('connected to the mysql')
        var userTableQuery="CREATE TABLE IF NOT EXISTS order_detail (odid VARCHAR(255) ,oid VARCHAR(255), code VARCHAR(255), price DOUBLE,qty DOUBLE)"
        connection.query(userTableQuery,function(err,result){
            if(err)throw err;
            // console.log(result);
            // console.log("table created")
            if(result.warningCount === 0){
                console.log("order_detail table created!");
            }
        })
    }
})

router.get('/',(req,res)=>{
    var query="SELECT *FROM order_detail";
    connection.query(query,(err,rows)=>{
        if(err)throw err
        res.send(rows)
    })
    
})
router.post('/',(req,res)=>{
    const odid=req.body.odid
    const oid=req.body.oid
    const code=req.body.code
    const price=req.body.price
    const qty=req.body.qty
   
    var query="INSERT INTO order_detail (odid,oid,code,price,qty) VALUES (?, ?, ?, ?, ?)";

    connection.query(query, [odid,oid, code, price,qty], (err) => {
        if(err){
            res.send({'message' : 'duplicate entry'})
        }else{
            res.send({'message' : 'order_detail created!'})
        }
    })
})
router.put('/',(req,res)=>{
    const odid=req.body.odid
    const oid=req.body.id
    const code=req.body.date
    const price=req.body.price
    const qty=req.body.qty

    var query="UPDATE order_detail SET oid=?,code=?, price=? ,qty=? WHERE odid=?";

    connection.query(query,[oid,code,price,qty,odid],(err,rows)=>{
        if(err)console.log(err);
        if(rows.affectedRows>0){
            res.send({'message':'order_detail updated'})
        }else{
            res.send({'message':'order_detail not found'})
        }
        // res.send(rows)
    })
})
router.delete('/:odid',(req,res)=>{
    const odid=req.params.odid

    var query="DELETE FROM order_detail WHERE odid=?";

    connection.query(query,[odid],(err,rows)=>{
        if(err)console.log(err);

        if(rows.affectedRows>0){
            res.send({'message':'order_detail deleted'})
        }else{
            res.send({'message':'order_detail not found'})
        }
    })
})
router.get('/:odid',(req,res)=>{
   const odid=req.params.odid

   var query="SELECT * FROM order_detail WHERE odid=?";

   connection.query(query,[odid],(err,row)=>{
    if(err)console.log(err);

    res.send(row)
   })
})

module.exports=router