const { Order, OrderDetail, Product, Address } = require('../models');

class Controller {
    static async updateStatusOrder(req, res, next) {
        try {
            const id = req.params.id;
            const order = await Order.findByPk(id);
            if (!order) throw { name: "NotFound" };
            await order.update({ paymentStatus: "paid" });
            res.status(200).json({ message: "payment status has been updated" });
        } catch (err) {
            next(err)
        }
    }

    static async getOrderHistory(req, res, next) {
        try {
            const orders = await Order.findAll({
                where: {
                    UserId: req.user.id,
                    paymentStatus: 'paid',
                },
                include: {
                    model: Address
                },
                order: [['updatedAt', 'DESC']]
            });
            res.status(200).json(orders);
        } catch (err) {
            next(err)
        }
    }

    static async getOrderDetail(req, res, next) {
        try {
            const orderId = req.params.id;
            const orderDetail = await OrderDetail.findAll({
                where: { OrderId: orderId },
                include: {
                    model: Product
                }
            });

            res.status(200).json(orderDetail);
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

module.exports = Controller;