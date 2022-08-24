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
        var userTableQuery="CREATE TABLE IF NOT EXISTS orders (id VARCHAR(255) PRIMARY KEY, date DATE, userId VARCHAR(255))"
        connection.query(userTableQuery,function(err,result){
            if(err)throw err;
            // console.log(result);
            // console.log("table created")
            if(result.warningCount === 0){
                console.log("Orders table created!");
            }
        })
    }
})

router.get('/',(req,res)=>{
    var query="SELECT *FROM orders";
    connection.query(query,(err,rows)=>{
        if(err)throw err
        res.send(rows)
    })
    
})
router.post('/',(req,res)=>{
    const id=req.body.id
    const date=req.body.date
    const userId=req.body.userId
   
    var query="INSERT INTO orders (id,date,userId) VALUES (?, ?, ?)";

    connection.query(query, [id, date, userId], (err) => {
        if(err){
            res.send({'message' : 'duplicate entry'})
        }else{
            res.send({'message' : 'orders created!'})
        }
    })
})
router.put('/',(req,res)=>{
    const id=req.body.id
    const date=req.body.date
    const userId=req.body.userId

    var query="UPDATE orders SET date=? ,userId=? WHERE id=?";

    connection.query(query,[date,userId,id],(err,rows)=>{
        if(err)console.log(err);
        if(rows.affectedRows>0){
            res.send({'message':'orders updated'})
        }else{
            res.send({'message':'orders not found'})
        }
        // res.send(rows)
    })
})
router.delete('/:id',(req,res)=>{
    const id=req.params.id

    var query="DELETE FROM orders WHERE id=?";

    connection.query(query,[id],(err,rows)=>{
        if(err)console.log(err);

        if(rows.affectedRows>0){
            res.send({'message':'orders deleted'})
        }else{
            res.send({'message':'orders not found'})
        }
    })
})
router.get('/:id',(req,res)=>{
   const id=req.params.id

   var query="SELECT * FROM orders WHERE id=?";

   connection.query(query,[id],(err,row)=>{
    if(err)console.log(err);

    res.send(row)
   })
})

module.exports=router