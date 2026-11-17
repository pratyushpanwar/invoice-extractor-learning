import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/AppError.js";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);

  if(err instanceof AppError){
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    });
  }

   // express.json() throws a SyntaxError for malformed JSON.
  if (err instanceof SyntaxError && "status" in err && err.status === 400) {
    return res.status(400).json({
      success: false,
      message: "Invalid JSON"
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
};
