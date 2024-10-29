import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import pg from "pg";
import router from "./routes/postTodo.js"

const app = express();
const port = 5000;

export const db = new pg.Client({
    user: "postgres",
    password: "Nikhil",
    database: "Learning",
    host: "localhost",
    port: 5432
});

db.connect().then(() => { console.log("Connected to Database") }).catch((err) => { console.log("Error Occured") });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Backend is Running");
})

app.use("/", router)

app.listen(port, () => {
    console.log(`Listening on the Following ${port}`);
})
