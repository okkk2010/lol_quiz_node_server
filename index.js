require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

//#region require router
const userRoutes = require("./routers/userRouter");
const quizRoutes = require("./routers/quizRouter");
const recordRoutes = require("./routers/recordRouter");
const tierRoutes = require("./routers/tierRouter");
//#endregion

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

//#region 미들웨이
app.use((req, res, next) => {
    console.log("요청 : ", req.method, req.url);
    next();
});
//#endregion

app.use("/user", userRoutes);
app.use("/quiz", quizRoutes);
app.use("/record", recordRoutes);
app.use("/tier", tierRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
