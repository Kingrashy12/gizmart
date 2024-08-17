import { RequestHandler } from "express";

const useToken: RequestHandler = (req, res, next) => {
  const token = req.cookies.userToken; // Access the token from the cookie
  if (token) {
    req.userToken = token; // Attach token to the request object for global access
  }
  next();
};

export default useToken;
