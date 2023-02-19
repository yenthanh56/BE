const Deal = require("../Models/Deal");
const dealHotController = {
	createDealHot: async (req, res) => {
		try {
			const newDealhot = await new Deal(req.body);
			// title: req.body.title,
			// image: req.body.image,
			// description: req.body.description,
			// price: req.body.price,
			// priceOld: req.body.priceOld,
			// star: req.body.star,
			// percent: req.body.percent,
			// dealhot: req.body.dealhot,
			// titleSell: req.body.titleSell,
			// sell: req.body.sell,
			// slug: req.body.slug,

			const createNewDealHot = await newDealhot.save();

			return res.status(200).json(createNewDealHot);
		} catch (error) {
			return res.status(500).json(error);
		}
	},
	getAllDealHot: async (req, res) => {
		try {
			const deals = await Deal.find();
			return res.status(200).json(deals);
		} catch (error) {
			return res.status(500).json(error);
		}
	},
	// detail
	id: async (req, res) => {
		try {
			// const { id } = req.query;

			const dealsSlug = await Deal.findById(req.params.id);
			return res.status(200).json(dealsSlug);
		} catch (error) {
			return res.status(500).json(error);
		}
	},
	// delete
	delete: async (req, res) => {
		try {
			await Deal.findByIdAndDelete(req.params.id);
			return res.status(200).json("Delete Successfully");
		} catch (error) {
			return res.status(500).json(error);
		}
	},
	// edit
	edit: async (req, res) => {
		try {
			await Deal.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			});
			return res.status(200).json("edit Successfully");
		} catch (error) {
			return res.status(500).json(error);
		}
	},

	search: async (req, res) => {
		const query = req.query.q;
		try {
			const deals = await Deal.find({
				title: { $regex: query, $options: "i" },
			}).limit(40);
			return res.status(200).json(deals);
		} catch (error) {
			next(error);
		}
	},
};

module.exports = dealHotController;
