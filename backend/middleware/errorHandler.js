/**
 * Centralized error handling middleware
 */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API endpoint '${req.originalUrl}' does not exist on EMBER & BEAN server.`,
  });
};

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose Bad ObjectId
  if (err.name === 'CastError') {
    message = `Resource not found with identifier: ${err.value}`;
    statusCode = 404;
  }

  // Handle Mongoose Validation Error
  if (err.name === 'ValidationError') {
    message = Object.values(err.errors).map((val) => val.message).join(', ');
    statusCode = 400;
  }

  // Handle Mongoose Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value entered for ${field}. Please use another value.`;
    statusCode = 400;
  }

  console.error(`💥 [API Error] ${req.method} ${req.originalUrl} - ${message}`);

  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};
