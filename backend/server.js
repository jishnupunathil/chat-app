const express=require('express')

const app=express()


app.get('/',(req,res)=>{
    res.send('helloss world')
})

app.listen(5000,()=>{
    console.log('server connected to port 5000')
})
