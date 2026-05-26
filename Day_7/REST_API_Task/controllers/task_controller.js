let tasks = [
    { id: 1, title: "Revise Node.js", completed: false },
    { id: 2, title: "Practice Express routes", completed: true }
];

export const getTasks = async (req, res) => {
    try {
        res.json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getTaskById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const task = tasks.find(t => t.id === id);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const createTask = async (req, res) => {
    try {
        const { title, completed } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        const newTask = {
            id: tasks.length + 1,
            title,
            completed: completed || false
        };
        tasks.push(newTask);
        res.status(201).json(newTask);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = tasks.findIndex(t => t.id === id);
        if (index !== -1) {
            const deletedTask = tasks.splice(index, 1);
            res.status(200).json({ message: "Task deleted" });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

