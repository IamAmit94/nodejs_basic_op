import express from "express";
import {v4 as uuid} from "uuid";

const app = express();
const PORT = 3000;

app.use(express.json());

const taskArray = [];


// @ creating the task
app.post("/tasks", (req, res) => {
    try {
        console.log("creating the task ===== ");

        const {title, description} = req.body;

        if(!title || !description) {
            return res.status(400).json({message: "Please provide both title and description !"});
        }

        const newTask = {
            id: uuid(),
            title,
            description,
            status: "pending"
        }

        taskArray.push(newTask);

        return res.status(201).json({
            message: "Task created successfully !",
            task: newTask
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error while creating the Task ", 
            error: error.message
         });
    }
})

// Fetch all the task
app.get("/tasks", (req, res) => {
    try {
            return res.status(200).json(taskArray);

    } catch (error) {
        // Handle any errors that occur during task retrieval
        return res.status(500).json({ message: "Error retrieving tasks", error: error.message });
    
    }
})

// @ Fetching the task by ID
app.get("/tasks/:id", (req, res) => {
    try {
        

        const {id} = req.params;
        console.log("Fetching task for ID : ",id);

        if(!id) return res.status(406).json({
            message: "Please provide the ID "

        })

        const taskIndex = taskArray.find(task => task.id === id);

        if(taskIndex === -1) {
            return res.status(404).json({message: "Task not found !"})
        }

        return res.status(200).json(taskIndex)

    } catch (error) {
        return res.status(500).json({
            message: "Error while Fetching the Task ", 
            error: error.message
         });
    }
})

// updating the task
app.put("/tasks/:id", (req,res) => {
    try {

        const {id} = req.params;

        const taskIndex = taskArray.findIndex(task => task.id === id);

        if(taskIndex === -1) {
            return res.status(404).json({
                message: "task not found !"
            })
        }

        // if task found then update it

        const {title, description, status} = req.body;
        // console.log("TaskIndex =====>",taskIndex, "task========>", taskArray);
        // console.log('task[taskIndex]======',taskArray[taskIndex].title);
        if(title) taskArray[taskIndex].title = title;
        if(description) taskArray[taskIndex].description = description;
        if(status) taskArray[taskIndex].status = status;

         // Send the updated task in the response
         return res.status(200).json({
            message: "Task updated successfully",
            task: tasks[taskIndex],
        });
        
    } catch (error) {
        return res.status(500).json({
            message: "Error while Fetching the Task ", 
            error: error.message
         });
    }
})

// Deleting a Task
// @ Fetching the task by ID
app.delete("/tasks/:id", (req, res) => {
    try {
        

        const {id} = req.params;

        if(!id) return res.status(406).json({
            message: "Please provide the ID "
        });

        const taskIndex = taskArray.findIndex(task => task.id === id);

        if(taskIndex === -1) {
            return res.status(404).json({message: "Task not found !"})
        }

        taskArray.splice(taskIndex, 1);

        return res.status(200).json({message: "Task deleted successfully !"})

    } catch (error) {
        return res.status(500).json({
            message: "Error while Fetching the Task ", 
            error: error.message
         });
    }
})

// filter the task 
app.get("/tasks/status/:status", (req, res) => {
    try {

        const {status} = req.params;

        if(status !== "completed" && status !== "pending") {
            return res.status(400).json({
                message: "Please provide Completed or Pending Status"
            })
        }

        const filteredTasks = taskArray.filter(task => task.status === status);

        return res.status(200).json(filteredTasks);
        
    } catch (error) {
        return res.status(500).json({
            message: "Error while Fetching the Task with the status", 
            error: error.message
         }); 
    }
})


app.listen(PORT, () => {
    console.log("Server is running on port "+PORT)
});