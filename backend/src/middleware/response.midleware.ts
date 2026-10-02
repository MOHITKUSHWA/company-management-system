/**
 * @param req
 * @param res
 * @param next
 */

/**
 * that is a middleware to send response in a standard format
 */

const resposnseMiddleware = (req: any, res: any, next: any) => {
  console.log("response middleware is working", res.error);

  res.success = (data: any, message: string = "Success") => {
    res.status(200).json({
      success: true,
      message,
      data,
    });
  };

  console.log("error response is working");
  res.error = (message: string = "Error", statusCode: number = 500) => {
    res.status(statusCode).json({
      success: false,
      message,
    });
  };

  next();
};

export default resposnseMiddleware;
