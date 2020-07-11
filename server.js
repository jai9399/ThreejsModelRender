const express = require('express');
const app = express();
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.resolve('./')));
app.get('/',function(){
    res.sendFile('./index.html');
})
app.listen(3000,()=>{
   console.log('Server Started!');
});
