const jwt = require("jsonwebtoken");

const middleWareController = {
	verifyToken: async (req, res, next) => {
		const token = req.headers.token;
		console.log(token);
		if (token) {
			const accessToken = token.split(" ")[1];
			jwt.verify(accessToken, process.env.JWT_TOKEN_NAME, (err, user) => {
				if (err) {
					return res.status(403).json("Token is not valid");
				}
				req.user = user;
				next();
			});
		} else {
			return res.status(401).json("you're not authenticated");
		}
	},
	verifyTokenAndAdmin: async (req, res, next) => {
		middleWareController.verifyToken((req, res) => {
			if (req.user.id === req.params.id || req.user.admin) {
				next();
			} else {
				return res
					.status(403)
					.json("you're not allowed to delete other");
			}
		});
	},
};

module.exports = middleWareController;
