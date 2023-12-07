// using promises method

const asyncHandler = (requestHadler) => {
  return (req, res, next) => {
    Promise.resolve(requestHadler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

// using trycatch method
// const asyncHandler = (fn) => async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res.status(err.code || 500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
// export {asyncHandler}
