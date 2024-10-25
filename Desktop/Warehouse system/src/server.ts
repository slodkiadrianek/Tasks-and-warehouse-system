import { configDotenv } from "dotenv";
configDotenv();
const port: string | number = process.env.PORT || 3000;
import { app } from "./app.js";
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
