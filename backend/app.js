const express =require("express")
const mysql = require("mysql2")
const port = 4000

const app =express()
const dbConfig = {
    host: 'localhost',
    user: 'demouser',
    password: 'evangadi2023',
    database: 'demoapp',
    connectionLimit:10
}
const connection = mysql.createPool(dbConfig);

// connection.connect(function (err){
//     if (err) throw err;
//     console.log("connected")
// })
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("testing")
})


// Allow CORS to all 
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE" // what matters here is that OPTIONS is present
    );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

app.post("/add-employee",(req,res)=>{
console.log(req.body)
const sql = `INSERT INTO employee_test (first_name, last_name, email, password)
 VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.password}')`;
connection.query(sql,function(err,result){
    if (err) throw err;
    
 console.log("1 recored inserted")
})
const response ={
    status:'success',
    message:'employee added succesfully',
}
res.status(200).json(response)
})

app.post("/login",(req,res)=>{
    console.log(req.body)
    const sql=`SELECT * FROM employee_test WHERE email = '${req.body.email}' AND password = '${req.body.password}'`
    connection.query(sql,function(err,result){
        if (err) throw err;
        
     console.log(result)
     if (result.length>0) {
        const response ={
            status:'success',
            message:'employee login succesfully',
        }
        res.status(200).json(response)
        
     }else{
        const response ={
            status:'failure',
            message:'login failed0',
        }
        res.status(200).json(response)
        
     }
    })
   
})
app.listen(port,()=>console.log(`listening on port ${port}`))