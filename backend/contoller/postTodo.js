import { db } from "../index.js";

export const getTodo = async (req, res) => {
    const { todo, fdate, tdate, repeat, completed } = req.body.newdata;
    console.log(req.body.newdata);
    try {
        await db.query("INSERT INTO todo (todo,fdate,tdate,completed,repeat) VALUES($1,$2,$3,$4,$5)", [todo, fdate, tdate, completed, repeat]).
            then(() => { console.log("Done Inserting"), res.json("Succes") }).
            catch((err) => { console.log(err), res.json("Error") });
    } catch (err) {
        console.log("err")
        res.json("Error")
    }

}

export const sendTodo = async (req, res) => {
    const now = new Date();
    const isMonday = now.getDay() === 1;
    const isFirstDay = now.getDate() === 1;
    const isFirstYear = now.getMonth() === 0 && now.getDate() === 1;

    const fdate = req.body.fdate;
    console.log(fdate);
    try {
        const response = await db.query("SELECT * FROM todo");
        const data = response.rows;
        const newArr = [];
        data.forEach((e) => {
            if (e.completed === "false") {
                if (e.repeat === "Daily") {
                    newArr.push(e);
                } else if (e.repeat === "Weekly" && isMonday) {
                    newArr.push(e)
                } else if (e.repeat === "Monthly" && isFirstDay) {
                    newArr.push(e)
                } else if (e.repeat === "Yearly" && isFirstYear) {
                    newArr.push(e)
                } else {
                    // newArr.push(e);
                }
            }
        })
        console.log(newArr, "Goty");
        res.json(newArr);
    } catch (err) {
        console.log(err);
        res.json("Error");
    }
}

export const getTodosNextWeek = async (req, res) => {
    const today = new Date();
    const response = await db.query("SELECT * FROM todo WHERE completed = 'false'");
    const data = response.rows;
    const newArr = [];


    console.log(data);


    for (let item of data) {

        const fdate = new Date(item.fdate);
        const tdate = new Date(item.tdate);

        if (today >= fdate && today <= tdate) {
            newArr.push(item);
        }
    }


    console.log('Filtered Items:', newArr);
    res.json(newArr);
};

export const updateTodo = async (req, res) => {
    const todo = req.body.todo;

    try {
        await db.query("UPDATE todo SET completed = true WHERE todo = $1", [todo.todo]);
        console.log("Done")
    }
    catch (err) {
        console.log(err);
    }
}

export const getAll = async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM todo");
        return res.json(response.rows);
    } catch (err) {
        console.log(err);
    }
}
