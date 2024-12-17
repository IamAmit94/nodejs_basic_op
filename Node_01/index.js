import express from "express";
import {v4 as uuid} from "uuid";


const app  = express();
const PORT = 3000;


app.use(express.json());


const taskArray = [];

// creating the task
app.post("/tasks", (req, res) => {
    try {
        const {title, description} = req.body;

        if(!title || !description) {
            return res.status(404).json({
                message: "Please provide both title and Description"
            })
        }

        const taskData = {
            title,
            description,
            id: uuid(),
            status: "pending"
        }

        taskArray.push(taskData);

        return res.status(200).json({
            message: "Task created successfully !",
            taskData
        })
    } catch (error) {
        res.status(400).json({
            message: "error while creating the task !",
            error: error.message
        })
    }
});

// Fetching all task
app.get("/tasks", (req, res) => {
    try {
        

        return res.status(200).json(taskArray)
    } catch (error) {
        res.status(400).json({
            message: "error while fetching all task !",
            error: error.message
        })
    }
});

// Fetching the task by Id
app.get("/tasks/:id", (req, res) => {
    try {
        
        const {id} = req.params;

        if(!id) {
            return res.status(404).json({
                message: "Please provide the task id !"
            })
        }


        const findTask = taskArray.find(task => task.id === id);

        if(findTask === undefined) {
            return res.status(400).json({
                message: "Task not found with the ID provided !"
            })
        }
        return res.status(200).json({
            message: "Task found successfully !",
            findTask
        })

    } catch (error) {
        res.status(400).json({
            message: "error while creating the task !",
            error: error.message
        })
    }
});

// updating the task
app.put("/tasks/:id", (req, res) => {
    try {
        
         
        const {id} = req.params;

        if(!id) {
            return res.status(404).json({
                message: "Please provide the task id !"
            })
        }

        const taskIndex = taskArray.findIndex(task => task.id === id);

        if(taskIndex === -1) {
             return res.status(400).json({
                message: "Task not found with the ID provided !"
            })
        }


        const {title, description, status} = req.body;
        if(title) taskArray[taskIndex].title = title;
        if(description) taskArray[taskIndex].description = description;
        if(status) taskArray[taskIndex].status = status;

        return res.status(200).json({
            message: "Fields updated successfully !",
        })

    } catch (error) {
        res.status(400).json({
            message: "error while creating the task !",
            error: error.message
        })
    }
});

// Deleting the task
app.delete("/tasks/:id", (req, res) => {
    try {
        const {id} = req.params;

        if(!id) {
            return res.status(404).json({
                message: "Please provide the task id !"
            })
        }

        const taskIndex = taskArray.findIndex(task => task.id === id);

        if(taskIndex === -1) {
             return res.status(400).json({
                message: "Task not found with the ID provided !"
            })
        }

        const delTask = taskArray.splice(taskIndex, 1);

        return res.status(200).json(delTask);
    } catch (error) {
        res.status(400).json({
            message: "error while creating the task !",
            error: error.message
        })
    }
});

// Fitering the task
app.get("/tasks/status/:status", (req, res) => {
    try {

        const {status} = req.params;

        if(status !== "pending" && status !== "completed") {
            return res.status(400).json({
                message: "Please provide Completed or Pending Status"
            })
        }


        const filterTask = taskArray.filter(task => task.status === status);

        return res.status(200).json(filterTask);

        
    } catch (error) {
        res.status(400).json({
            message: "error while creating the task !",
            error: error.message
        })
    }
});


app.listen(PORT, () => {
    console.log("Server is listning on port "+PORT);
})