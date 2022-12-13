const moogose = require("mongoose");

const DealHotScheme = new moogose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		image: {
			type: [String],
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		priceOld: {
			type: Number,
			required: true,
		},
		star: {
			type: Number,
			required: true,
		},
		percent: {
			type: String,
			required: true,
		},
		dealhot: {
			type: String,
			required: true,
		},
		titleSell: {
			type: String,
			required: true,
		},
		sell: {
			type: Number,
			required: true,
		},
		slug: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const letData = moogose.model("Deal", DealHotScheme);

module.exports = letData;
