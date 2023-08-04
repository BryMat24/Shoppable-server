const midtransClient = require('midtrans-client');
const { Cart, Order, OrderDetail } = require('../models');


class Controller {
    static async processPayment(req, res, next) {
        try {
            const { amount } = req.body;
            if (!amount) throw { name: "InvalidPaymentAmount" }

            const cart = await Cart.findAll({ where: { UserId: req.user.id } });
            const order = await Order.create({ UserId: req.user.id });
            const orderDetail = cart.map((el) => {
                return {
                    OrderId: order.id,
                    ProductId: el.ProductId,
                    quantity: el.quantity,

                }
            })
            await OrderDetail.bulkCreate(orderDetail);

            let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: `${process.env.MIDTRANS_SERVER_KEY}`
            });

            let parameter = {
                "transaction_details": {
                    "order_id": `order-${order.id}-development`,
                    "gross_amount": `${amount}`
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "email": `${req.user.email}`,
                }
            };

            const midtransToken = await snap.createTransaction(parameter);
            res.status(200).json({ midtransToken, orderId: order.id });
        } catch (err) {
            consoler.log(err);
            next(err);
        }
    }
}

module.exports = Controller;