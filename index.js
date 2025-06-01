require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require("./routers/userRouter");
const methodOverride = require('method-override');

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

app.use("/user", userRoutes);

// app.get('/', async (req, res) => {
//     try {
//         const [todos] = await db.query("SELECT * FROM user");
//         res.send(todos);
//         //res.render('index', { todos });
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// app.get('/id', async (req, res) => {
//     try {
//         const [todos] = await db.query(`SELECT id FROM user`);
//         res.send(todos);
//         //res.render('index', { todos });
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// app.put('/signUpUser', async (req, res) => {
//     try {
//         const { id, nickname, password } = req.body;
//         await db.query(`INSERT INTO user(id, nickname, password) VALUES (?,?,?)`, [id, nickname, password]);

//         res.status(200).send({ message : "회원가입 완료!"});
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// // ✅ 2. ToDo 추가
// app.post('/todos', async (req, res) => {
//     const { title } = req.body;
//     try {
//         await db.query("INSERT INTO todos (title) VALUES (?)", [title]);
//         res.redirect('/');
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// // ✅ 3. ToDo 완료 처리
// app.put('/todos/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         await db.query("UPDATE todos SET completed = TRUE WHERE id = ?", [id]);
//         res.redirect('/');
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// // ✅ 4. ToDo 삭제
// app.delete('/todos/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         await db.query("DELETE FROM todos WHERE id = ?", [id]);
//         res.redirect('/');
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
