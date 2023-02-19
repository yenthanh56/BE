const mongoose = require("mongoose");

const UserScheme = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		cf_password: {
			type: String,
		},
		password: {
			type: String,
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
		fromGoogle: {
			type: Boolean,
			default: false,
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
		username: { type: String, required: true },
		address: {
			type: String,
			required: true,
			minlength: 10,
			maxlength: 100,
		},
		city: {
			type: String,
			required: true,
			minlength: 10,
			maxlength: 100,
		},
		district: {
			type: String,
			required: true,
		},
		ward: {
			type: String,
			required: true,
		},
		phone: {
			type: Number,
			minlength: 10,
			maxlength: 10,
			required: true,
		},

		titleProduct: [String],
		amount: [
			{
				type: Number,
				required: true,
			},
		],
		priceItem: [String],
		priceTotal: {
			type: String,
			required: true,
		},
		image: [String],
		paymentBy: {
			type: String,
			required: true,
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
