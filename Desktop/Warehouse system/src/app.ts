import Express, { Request, Response, NextFunction } from "express";
import { configDotenv } from "dotenv";
import employeeRoutes from "./routes/employees";
import categoriesRoutes from "./routes/categories";
import productRoutes from "./routes/products";
import warehouseLocationRoutes from "./routes/warehouseLocations";
import errorHandler from "./middleware/errorHandler";

configDotenv();
const app = Express();
const port: string | number = process.env.PORT || 3000;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "POST, PUT, GET, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // that works;
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  }
  next();
});
app.use(errorHandler);
app.use(warehouseLocationRoutes);
app.use(employeeRoutes);
app.use(categoriesRoutes);
app.use(productRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
