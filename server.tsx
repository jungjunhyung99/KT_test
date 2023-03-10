const express2 = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path2 = require('path');
const data2 = require('./data');

dotenv.config();
const app2 = express();
app2.use(express2.json());
app2.use(express2.urlencoded({ extended: true }));
data2
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/sokiosk', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const Product = mongoose.model(
  'products',
  new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    price: Number,
    calorie: Number,
    category: String,
  })
);

app2.get('/api/categories', (req, res) => res.send(data2.categories));

app2.get('/api/products', async (req, res) => {
  const { category } = req.query;
  const products = await Product.find(category ? { category } : {});
  res.send(products);
});

app2.get('/api/products/seed', async (req, res) => {
  // await Product.remove({});
  const products = await Product.insertMany(data2.products);
  res.send({ products });
});

app2.post('/api/products', async (req, res) => {
  const newProduct = new Product(req.body);
  const savedProduct = await newProduct.save();
  res.send(savedProduct);
});

app2.delete('/api/products/:id', async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  res.send(deletedProduct);
});

const Order = mongoose.model(
  'order',
  new mongoose.Schema(
    {
      number: { type: Number, default: 0 },
      orderType: String,
      paymentType: String,
      isPaid: { type: Boolean, default: false },
      isReady: { type: Boolean, default: false },
      inProgress: { type: Boolean, default: true },
      isCanceled: { type: Boolean, default: false },
      isDelivered: { type: Boolean, default: false },
      totalPrice: Number,
      taxPrice: Number,
      orderItems: [
        {
          name: String,
          price: Number,
          quantity: Number,
        },
      ],
    },
    {
      timestamps: true,
    }
  )
);

app2.post('/api/orders', async (req, res) => {
  const lastOrder = await Order.find().sort({ number: -1 }).limit(1);
  const lastNumber = lastOrder.length === 0 ? 0 : lastOrder[0].number;
  if (
    !req.body.orderType ||
    !req.body.paymentType ||
    !req.body.orderItems ||
    req.body.orderItems.length === 0
  ) {
    return res.send({ message: 'Data is required.' });
  }
  const order = await Order({ ...req.body, number: lastNumber + 1 }).save();
  res.send(order);
});
app2.get('/api/orders', async (req, res) => {
  const orders = await Order.find({ isDelivered: false, isCanceled: false });
  res.send(orders);
});
app2.put('/api/orders/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    if (req.body.action === 'ready') {
      order.isReady = true;
      order.inProgress = false;
    } else if (req.body.action === 'deliver') {
      order.isDelivered = true;
    } else if (req.body.action === 'cancel') {
      order.isCanceled = true;
    }
    await order.save();
    res.send({ message: 'Done' });
  } else {
    req.status(404).message('Order not found');
  }
});
app2.get('/api/orders/queue', async (req, res) => {
  const inProgressOrders = await Order.find(
    { inProgress: true, isCanceled: false },
    'number'
  );
  const servingOrders = await Order.find(
    { isReady: true, isDelivered: false },
    'number'
  );
  res.send({ inProgressOrders, servingOrders });
});
app2.delete('/api/orders/:id', async (req, res) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  res.send(order);
});
app2.use(express2.static(path2.join(__dirname, '/build')));
app2.get('*', (req, res) => {
  res.sendFile(path2.join(__dirname, '/build/index.html'));
});
const port = process.env.PORT || 5000;
app2.listen(port, () => console.log(`serve at http://localhost:${port}`));
