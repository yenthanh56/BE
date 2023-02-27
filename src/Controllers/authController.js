const { UserOrdered } = require("../Models/PayMentUser/PayMentUser.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authController = {
	register: async (req, res) => {
		try {
			const salt = await bcrypt.genSalt(10);
			const { username, email, password, cf_password } = req.body;
			const hasPass = await bcrypt.hash(password, salt);
			const hasPassCf = await bcrypt.hash(cf_password, salt);
			// create
			const newUser = new UserOrdered({
				username,
				password: hasPass,
				cf_password: hasPassCf,
				email,
			});
			const createNewUsers = await newUser.save();

			res.status(200).json(createNewUsers);
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
				// const token = jwt.sign(
				// 	{
				// 		id: user.id,
				// 		admin: user.admin,
				// 	},
				// 	process.env.JWT_TOKEN_NAME,
				// 	{ expiresIn: "1d" }
				// );
				const { password, cf_password, ...others } = user._doc;
				// user.accessToken = accessToken;
				// res.cookie("access_token", token, {
				// 	httpOnly: true,
				// 	SameSite: true,
				// })
				res.status(200).json({ ...others });
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

	googleLogin: async (req, res) => {
		const { email } = req.body;

		try {
			const user = await UserOrdered.findOne({
				email,
			});
			if (user) {
				const token = jwt.sign(
					{ id: user._id },
					process.env.JWT_TOKEN_NAME,
					{ expiresIn: "30d" }
				);

				res.cookie("access_token", token, {
					httpOnly: true,
				})
					.status(200)
					.json(user._doc);
			} else {
				const newUser = new UserOrdered({
					...req.body,
					fromGoogle: true,
				});
				const savedUser = await newUser.save();
				const token = jwt.sign(
					{ id: savedUser._id },
					process.env.JWT_TOKEN_NAME,
					{ expiresIn: "30d" }
				);
				res.cookie("access_token", token, {
					httpOnly: true,
				})
					.status(200)
					.json(savedUser._doc);
			}
		} catch (err) {
			console.log(err);
		}
	},
};

module.exports = authController;
