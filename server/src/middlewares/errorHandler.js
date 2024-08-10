import { ApiError } from "./ApiError.js"


const errorHandler=(err,req,res,next)=>{
  if (err instanceof ApiError){
    return res.status(err.statusCode).json({
      status:'error',
      message:err.message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    })
  }
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
});
};
export {errorHandler}