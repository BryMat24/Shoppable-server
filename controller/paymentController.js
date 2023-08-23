const midtransClient = require('midtrans-client');
const { Cart, Order, OrderDetail, Address, sequelize } = require('../models');

class Controller {
    static async processPayment(req, res, next) {
        const t = await sequelize.transaction();
        try {
            const { amount, address } = req.body;
            const { streetAddress, city, state, country, postalCode } = address;

            if (!amount) throw { name: "InvalidPaymentAmount" }

            const userAddress = await Address.create({ streetAddress, city, state, country, postalCode, UserId: req.user.id });
            const cart = await Cart.findAll({ where: { UserId: req.user.id } });
            const order = await Order.create({ UserId: req.user.id, AddressId: userAddress.id }, { transaction: t });
            const orderDetail = cart.map((el) => {
                return {
                    OrderId: order.id,
                    ProductId: el.ProductId,
                    quantity: el.quantity,

                }
            })
            await OrderDetail.bulkCreate(orderDetail, { transaction: t });

            let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: `${process.env.MIDTRANS_SERVER_KEY}`
            });

            const timeStamp = Date.now();
            const randomNumber = Math.floor(Math.random * 100000)

            let parameter = {
                "transaction_details": {
                    "order_id": `${timeStamp}-${randomNumber}`,
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
            await t.commit();
            res.status(200).json({ midtransToken, orderId: order.id });
        } catch (err) {
            await t.rollback();
            next(err);
        }
    }
}

module.exports = Controller;