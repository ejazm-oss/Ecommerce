const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('./routes/AuthRouter');
const categoryRoutes = require('./routes/CategoryRoutes');
const productRoutes = require('./routes/ProductRoutes');
const cartRoutes = require('./routes/CartRoute')
const addressRoutes = require('./routes/AddressRouter');
const orderRoutes = require('./routes/OrderRoute');
const statusRoutes = require("./routes/AdminOrderRoute")
require('dotenv').config();

require('./config/db')

app.use(express.json());

app.use(cors({
    origin: '*'
}))
app.use('/auth', authRouter);
app.use('/api', categoryRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
app.use('/address', addressRoutes);
app.use('/order', orderRoutes);
app.use('/status', statusRoutes);

app.get('/', (req,res) =>{
   res.send("Welcome")
})
const PORT = process.env.PORT || 4000

app.listen(PORT, () =>{
    console.log(`Server listening on ${PORT}`)
})