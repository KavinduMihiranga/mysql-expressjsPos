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
        var userTableQuery="CREATE TABLE IF NOT EXISTS items (code VARCHAR(255) PRIMARY KEY, name VARCHAR(255), price DOUBLE,qty DOUBLE)"
        connection.query(userTableQuery,function(err,result){
            if(err)throw err;
            // console.log(result);
            // console.log("table created")
            if(result.warningCount === 0){
                console.log("Item table created!");
            }
        })
    }
})

router.get('/',(req,res)=>{
    var query="SELECT *FROM items";
    connection.query(query,(err,rows)=>{
        if(err)throw err
        res.send(rows)
    })
    
})
router.post('/',(req,res)=>{
    const code=req.body.code
    const name=req.body.name
    const price=req.body.price
    const qty=req.body.qty
   
    var query="INSERT INTO items (code,name,price,qty) VALUES (?, ?, ?, ?)";

    connection.query(query, [code, name, price, qty], (err) => {
        if(err){
            res.send({'message' : 'duplicate entry'})
        }else{
            res.send({'message' : 'items created!'})
        }
    })
})
router.put('/',(req,res)=>{
    const code=req.body.code
    const name=req.body.name
    const price=req.body.price
    const qty=req.body.qty

    var query="UPDATE items SET name=?, price=? ,qty=? WHERE code=?";

    connection.query(query,[name,price,qty,code],(err,rows)=>{
        if(err)console.log(err);
        if(rows.affectedRows>0){
            res.send({'message':'items updated'})
        }else{
            res.send({'message':'items not found'})
        }
        // res.send(rows)
    })
})
router.delete('/:code',(req,res)=>{
    const code=req.params.code

    var query="DELETE FROM items WHERE code=?";

    connection.query(query,[code],(err,rows)=>{
        if(err)console.log(err);

        if(rows.affectedRows>0){
            res.send({'message':'items deleted'})
        }else{
            res.send({'message':'code not found'})
        }
    })
})
router.get('/:code',(req,res)=>{
   const code=req.params.code

   var query="SELECT * FROM items WHERE code=?";

   connection.query(query,[code],(err,row)=>{
    if(err)console.log(err);

    res.send(row)
   })
})

module.exports=router