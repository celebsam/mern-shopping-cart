const notFound = (req, res) => {
   res.status(404).send("<h2>Page Not Found</h2>");
};

const errorHandler = (err, req, next) => {
   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
   res.status(statusCode);
   res.json({ message: err.message });
   stack: process.env.NODE_ENV === "production" ? null : err.stack;
};

export { notFound, errorHandler };
