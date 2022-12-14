const { UserOrdered } = require("../Models/PayMentUser/PayMentUser.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authController = {
	register: async (req, res) => {
		try {
			const salt = await bcrypt.genSalt(10);
			const { username, email, password, cf_password } = req.body;
			const hasPass = await bcrypt.hash(password, salt);

			// create
			const newUser = await new UserOrdered({
				username,
				password: hasPass,
				cf_password,
				email,
			});
			const createNewUsers = await newUser.save();

			return res.status(200).json(createNewUsers);
		} catch (error) {
			return res.status(500).json(error);
		}
	},
	login: async (req, res) => {
		const { username, password } = req.body;
		const user = await UserOrdered.findOne({
			username,
		});

		try {
			if (!user) {
				return res.status(403).json("username wrong");
			}
			const passwordValid = await bcrypt.compare(password, user.password);

			if (!passwordValid) {
				return res.status(403).json("password wrong");
			}
			if (user && passwordValid) {
				// error when deployment get AccessToken
				// const accessToken = jwt.sign(
				// 	{
				// 		id: user.id,
				// 		admin: user.admin,
				// 	},
				// 	process.env.JWT_TOKEN_NAME,
				// 	{ expiresIn: "30d" }
				// );
				const { password, ...other } = user._doc;
				// user.accessToken = accessToken;
				return res.status(200).json({ ...other });
			}
		} catch (error) {
			return res.status(500).json(error);
		}
	},

	logout: async (req, res) => {
		try {
			return res.status(200).json("Logout Successfully");
		} catch (error) {
			return res.status(500).json("Error Server");
		}
	},
};

module.exports = authController;
