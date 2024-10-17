import jwt, { JwtPayload } from "jsonwebtoken";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { configDotenv } from "dotenv";
configDotenv();

// Weryfikacja czy użytkownik jest zalogowany
export const loginVerifier: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | any => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    (req as Request & { user?: unknown }).user = {
      id: decoded.id,
      email: decoded.email,
      assignedTasks: decoded.assignedTasks || [],
    };
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
