require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

//#region require router
const userRoutes = require("./routers/userRouter");
const quizRoutes = require("./routers/quizRouter");
const recordRoutes = require("./routers/recordRouter");
//#endregion

const app = express();
const PORT = process.env.PORT || 3000;
// app.set('view engine', 'ejs');
// app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(methodOverride('_method'));

//#region 미들웨이
app.use((req, res, next) => {
    console.log("요청 : ", req.method, req.url);
    next();
});
//#endregion

//user
app.use("/user", userRoutes);
app.use("/quiz", quizRoutes);
app.use("/record", recordRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
