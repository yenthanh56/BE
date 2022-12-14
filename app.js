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
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session()); //
app.use(cors({ origin: true }));
app.use(cookieParser());
mongoose.connect(
	process.env.MONGOOSEDB,

	() => {
		console.log("Connect Mongoose");
	}
);

app.use(express.json()); // dùng để khi tạo dữ liệu mới xác nhận

app.use("/v1/userauth", userRouter);
app.use("/v1/dealhot", dealRouter);
app.use("/v1/auth", authRouter);

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

app.listen(PORT, () => {
	console.log(`Example app listening on ${PORT}`);
});
