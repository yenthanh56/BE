const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const app = express();
const expressSession = require("express-session");
const authRouter = require("./src/Router/auth");
const userRouter = require("./src/Router/user");
const dealRouter = require("./src/Router/deal");
const passportSetup = require("./passport");

// social
const authSocialRouter = require("./src/Router/authSocial");

// user order Route
const PayMentUserRoute = require("./src/Router/PayMentUser/PayMentUser");

// Today Sugguest
const forYouRoute = require("./src/Router/Today/forYou");
const momBabyRoute = require("./src/Router/MomBaby/MomBaby");
const oneBuyThreeRoute = require("./src/Router/OneBuyThree/OneBuyThree");
const superMarketSaleRoute = require("./src/Router/SuperMarketSale/SuperMarketSale");
const dealSaleRoute = require("./src/Router/DealSale/DealSale");
const cheaperRoute = require("./src/Router/Cheaper/Cheaper");
const newProductRoute = require("./src/Router/Newproduct/Newproduct");
const fashionNewStarRoute = require("./src/Router/Fashionnewstart/Fashionnewstart");

const session = require("express-session");
dotenv.config();

app.use(
	cookieSession({
		name: "session",
		keys: ["thanhngo1"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

// app.use(
// 	bodyParser.urlencoded({
// 		extended: false,
// 	})
// );

// app.use(bodyParser.json());
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Credentials", true);
	next();
});
// app.use(
// 	cors({
// 		origin: "http://localhost:3000",
// 	})
// );

app.use(passport.initialize());
app.use(passport.session());
// Add the line below, which you're missing:

// app.use(cors({ origin: true }));
// app.use(cookieParser());

app.use(
	cors({
		origin: "https://tiki-app-alpha.vercel.app",
		// origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

mongoose.connect(
	process.env.MONGOOSEDB,

	() => {
		console.log("Connect Mongoose");
	}
);

// app.use(express.json()); // dùng để khi tạo dữ liệu mới xác nhận
// const regenerate = (callback) => {
// 	console.log("regenerating");
// 	callback();
// };
// const save = (callback) => {
// 	console.log("saving");
// 	callback();
// };
// app.use((req, res, next) => {
// 	req.session.regenerate = regenerate;
// 	req.session.save = save;
// 	next();
// });
// app.use(passport.session());

app.use("/v1/userauth", userRouter);
app.use("/v1/dealhot", dealRouter);
app.use("/v1/auth", authRouter);
app.use("/auth", authSocialRouter);

// user Order
app.use("/v1/userorder", PayMentUserRoute);

// Today's Suggestions
app.use("/v1/foryou", forYouRoute);
app.use("/v1/mombaby", momBabyRoute);
app.use("/v1/onebuythree", oneBuyThreeRoute);
app.use("/v1/supermarketsale", superMarketSaleRoute);
app.use("/v1/dealsale", dealSaleRoute);
app.use("/v1/cheaper", cheaperRoute);
app.use("/v1/newproduct", newProductRoute);
app.use("/v1/fashionnewstart", fashionNewStarRoute);
const PORT = process.env.PORT || "3000";

// app.listen(PORT, () => {
// 	console.log(`Example app listening on ${PORT}`);
// });
app.listen("4000", () => {
	console.log("Server is running!");
});
