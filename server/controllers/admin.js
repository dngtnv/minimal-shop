const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/user.js');
const Product = require('../models/product.js');
const Order = require('../models/order.js');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, $or: [{ role: 'admin' }, { role: 'consultant' }] });
    if (!user) {
      const error = new Error('A user with this email could not be found.');
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Wrong password!');
      error.statusCode = 401;
      throw error;
    }
    res
      .status(200)
      .json({ message: 'Login successful!', user: { userId: user._id, email: user.email, role: user.role } });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (!products) {
      const error = new Error('Could not find products.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Fetched products successfully.', products });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getDashboard = async (req, res, next) => {
  try {
    const users = await User.find({ role: 'customer' });
    const orders = await Order.find();
    const totalEarnings = orders.reduce((acc, order) => acc + order.total, 0);
    const averageEarnings = totalEarnings / orders.length;

    res.status(200).json({
      message: 'Fetched dashboard data successfully.',
      users: users.length,
      orders: orders.length,
      totalEarnings,
      averageEarnings,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate('user.userId').sort({ createdAt: -1 }).limit(5);
    if (!orders) {
      const error = new Error('Could not find orders.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Fetched orders successfully.', orders });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }

    const { name, category, price, shortDesc, description } = req.body;

    if (!req.files || req.files.length === 0) {
      const error = new Error('No images provided.');
      error.statusCode = 422;
      throw error;
    }

    const imageUrl = req.files.map((file) => file.path.replace(/\\/g, '/'));
    const product = new Product({
      name,
      category,
      price,
      long_desc: description,
      short_desc: shortDesc,
      img1: imageUrl[0],
      img2: imageUrl[1],
      img3: imageUrl[2],
      img4: imageUrl[3],
    });

    const result = await product.save();

    res.status(201).json({ message: 'Product created!', productId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }

    const productId = req.params.productId;
    const { name, category, price, shortDesc, description } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      const error = new Error('Could not find product.');
      error.statusCode = 404;
      throw error;
    }

    product.name = name;
    product.category = category;
    product.price = price;
    product.short_desc = shortDesc;
    product.long_desc = description;

    const result = await product.save();

    res.status(200).json({ message: 'Product updated!', product: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);
    if (!product) {
      const error = new Error('Could not find product.');
      error.statusCode = 404;
      throw error;
    }

    clearImage(product.img1);
    clearImage(product.img2);
    clearImage(product.img3);
    clearImage(product.img4);
    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: 'Product deleted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
