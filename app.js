const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const app = express();
const authRouter = require("./src/Router/auth");
const userRouter = require("./src/Router/user");
const dealRouter = require("./src/Router/deal");
// const passportSetup = require("./passport");

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

dotenv.config();

mongoose.connect(process.env.MONGOOSEDB, () => {
	console.log("Connect Mongoose");
});
app.use(
	cookieSession({
		name: "session",
		keys: ["thanhngo1"],
		maxAge: 24 * 60 * 60 * 100,
	})
);
app.use((req, res, next) => {
	res.header(
		"Access-Control-Allow-Headers, *, Access-Control-Allow-Origin",
		"Origin, X-Requested-with, Content_Type,Accept,Authorization",
		"https://storeapp-beta.vercel.app/"
	);
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
		return res.status(200).json({});
	}
	next();
});
const corsOptions = {
	origin: "https://storeapp-beta.vercel.app/",
	credentials: true,
	optionSuccessStatus: 200,
};

app.use(cookieParser());
app.use(express.json());

app.use(cors(corsOptions));

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
// const PORT = process.env.PORT || "3000";

// app.listen(PORT, () => {
// 	console.log(`Example app listening on ${PORT}`);
// });
app.listen("5000", () => {
	console.log("Server is running!");
});
