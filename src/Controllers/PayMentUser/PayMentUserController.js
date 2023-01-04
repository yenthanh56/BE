const {
	OrderProduct,
	UserOrdered,
} = require("../../Models/PayMentUser/PayMentUser");

const userPayMentController = {
	createOrder: async (req, res) => {
		try {
			// const {
			// 	username,
			// 	address,
			// 	city,
			// 	district,
			// 	ward,
			// 	phone,
			// 	titleProduct,
			// 	amount,
			// 	priceItem,
			// 	priceTotal,
			// 	image,
			// 	paymentBy,
			// 	userorder,
			// } = req.body;

			const newOrder = await new OrderProduct(req.body);
			const userOrder = await newOrder.save();
			if (req.body.userorder) {
				const userorder = UserOrdered.findById(req.body.userorder);
				await userorder.updateOne({
					$push: { orders: userOrder._id },
				});
			}
			res.status(200).json(userOrder);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// get all userOrder
	getAllUserOrder: async (req, res) => {
		try {
			const usersOrder = await OrderProduct.find();
			res.status(200).json(usersOrder);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// get id user order
	getAnUser: async (req, res) => {
		try {
			const userOrder = await UserOrdered.findById(
				req.params.id
			).populate("orders");
			return res.status(200).json(userOrder);
		} catch (error) {
			return res.status(500).json(error);
		}
	},

	deleteUserOrder: async (req, res) => {
		try {
			await UserOrdered.updateMany(
				{ orders: req.params.id },
				{ $pull: { orders: req.params.id } }
			);
			// const deleteOrdered = await OrderProduct.findByIdAndDelete(
			// 	req.params.id
			// );
			await OrderProduct.findByIdAndDelete(req.params.id);
			return res.status(200).json("delete successfully");
		} catch (error) {
			return res.status(500).json(error);
		}
	},
};

module.exports = userPayMentController;
