import Express, { Request, Response, NextFunction } from "express";
import { configDotenv } from "dotenv";

configDotenv();
const app = Express();
const port: string | number = process.env.PORT || 3000;

app.use(Express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "POST, PUT, GET, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // that works;
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  }
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
