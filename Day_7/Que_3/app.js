import express from "express";
import productRouter from "./routes/product_route.js";
import { errorHandler } from "./middleware/errorHandling.js";

const app = express();
app.use(express.json());

app.use("/products", productRouter);

app.use(errorHandler);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});