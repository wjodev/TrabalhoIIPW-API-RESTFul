const express = require("express");
const app = express();


app.use(express.json());


const adminRoutes = require('./routes/AdminRoutes');
const imovelRoutes = require('./routes/ImovelRoutes');

app.use('/admin', adminRoutes)
app.use('/imovel', imovelRoutes)

//servidor
app.listen(5000,()=>{
    console.log(`API rodando na porta 5000`)
})