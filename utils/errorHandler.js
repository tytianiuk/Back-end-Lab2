export const handleError = (error) => {
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map((err) => err.message);
    return {
      status: 400,
      message: 'Validation failed',
      errors,
    };
  }

  if (error.code === 11000) {
    return {
      status: 400,
      message: `Duplicate key error: ${Object.keys(error.keyValue).join(
        ', ',
      )} must be unique.`,
    };
  }

  return {
    status: 500,
    message: 'Internal Server Error',
    error: error.message,
  };
};
