const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

const User = require('../models/user.js');
const Order = require('../models/order');

const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  },
};

const nodemailerMailgun = nodemailer.createTransport(mg(auth));

exports.createOrder = async (req, res, next) => {
  try {
    const { cartList, total, user } = req.body;

    const userDoc = await User.findOne({ email: user.email });

    if (!userDoc) {
      const error = new Error('User not found!');
      error.statusCode = 404;
      throw error;
    }

    const order = new Order({
      products: cartList.map((product) => ({
        product: product.product,
        quantity: product.quantity,
      })),
      user: { ...user, userId: userDoc._id },
      total: total,
    });

    const result = await order.save();

    nodemailerMailgun.sendMail(
      {
        from: 'techshop@learning.com',
        to: user.email, // chi cho phep gui mail cho nhung email da duoc xac thuc tren mailgun
        subject: 'Order created!',
        html: `
        <h1>Xin chào ${user.name}</h1>
        <p>Phone: ${user.phone}</p>
        <p>Address: ${user.address}</p>
        <table>
          <thead>
            <tr>
              <th style="border:1px solid">Tên sản phẩm</th>
              <th style="border:1px solid">Hình ảnh</th>
              <th style="border:1px solid">Giá</th>
              <th style="border:1px solid">Số Lượng</th>
            </tr>
          </thead>
          <tbody>
            ${cartList
              .map(
                (product) => `
              <tr>
                <td style="border:1px solid;text-align:center">${product.product.name}</td>
                <td style="border:1px solid;text-align:center">
                  <img width='80px' src="${product.product.img1}" alt="${product.product.name}" />
                <td style="border:1px solid;text-align:center">${product.quantity}</td>
                <td style="border:1px solid;text-align:center">${product.total} VND</td>
              </tr>
            `
              )
              .join('')}
            <tr>
              <td style="border:1px solid" colspan="2">Thành tiền</td>
              <td style="border:1px solid">${total} VND</td>
            </tr>
          </tbody>
        </table>
        <h2>Tổng thanh toán:</h2>
        <p style="font-size:20px">${total} VND</p>
        <p style="font-size:20px">Cảm ơn bạn!</p>
        `,
      },
      (err, info) => {
        if (err) {
          console.error(err);
        } else {
          console.log(info);
        }
      }
    );

    res.status(201).json({ message: 'Order created!', orderId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      const error = new Error('User not found!');
      error.statusCode = 404;
      throw error;
    }

    const orders = await Order.find({ 'user.userId': userId }).populate('user.userId');
    if (!orders) {
      const error = new Error('Orders not found!');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: 'Orders fetched!', orders });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.getOrderDetail = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    if (!orderId) {
      const error = new Error('Order not found!');
      error.statusCode = 404;
      throw error;
    }

    const order = await Order.findById(orderId).populate('user.userId');
    if (!order) {
      const error = new Error('Order not found!');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({ message: 'Order fetched!', order });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};
