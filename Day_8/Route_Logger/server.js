import express from "express";
import { logger } from "./middleware/logger.js";

const students = [
  { id: 1, name: "Aman", course: "Backend" },
  { id: 2, name: "Riya", course: "Frontend" },
  { id: 3, name: "Kabir", course: "Full Stack" }
]


const app = express();
app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("Welcome to the Student Portal");
});

app.get("/about", (req, res) => {
  res.send("This portal is used to manage student data");
});

app.get("/students", (req, res) => {
  res.send(students);
});

app.get("/students/:id", (req, res) => {
  const { id } = req.params;
  const student = students.find(s => s.id === parseInt(id));
    if (student) {
        res.send(student);
    } else {
        res.status(404).send({ message: "Student not found" });
    }
});

app.post("/login", (req, res) => {
  res.send("Login route called");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});