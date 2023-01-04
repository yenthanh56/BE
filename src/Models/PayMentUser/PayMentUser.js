const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			minlength: 6,
			maxlength: 20,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			minlength: 20,
			maxlength: 50,
		},
		password: {
			type: String,
			required: true,
		},
		admin: {
			type: Boolean,
			default: false,
		},
		role: {
			type: String,
			default: false,
		},
		avatar: {
			type: String,
			default:
				"https://images.unsplash.com/photo-1660554042520-db71c7fea8d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
		},
		orders: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "OrderProduct",
			},
		],
	},
	{ timeStamp: true }
);

const OrderProductScheme = new mongoose.Schema(
	{
		username: { type: String, require: true },
		address: {
			type: String,
			require: true,
			minlength: 10,
			maxlength: 100,
		},
		city: {
			type: String,
			require: true,
			minlength: 10,
			maxlength: 100,
		},
		district: {
			type: String,
			require: true,
		},
		ward: {
			type: String,
			require: true,
		},
		phone: {
			type: Number,
			minlength: 10,
			maxlength: 10,
			require: true,
		},

		titleProduct: [String],
		amount: [
			{
				type: Number,
				require: true,
			},
		],
		priceItem: [String],
		priceTotal: {
			type: String,
			require: true,
		},
		image: [String],
		paymentBy: {
			type: String,
			require: true,
		},

		userorder: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "UserOrdered",
		},
	},
	{ timestamps: true }
);

const OrderProduct = mongoose.model("OrderProduct", OrderProductScheme);
const UserOrdered = mongoose.model("UserOrdered", UserScheme);
module.exports = { OrderProduct, UserOrdered };
