const errorHandler = (error, req, res, next) => {
	return res
		.status(error.statusCode == undefined ? 400 : error.statusCode)
		.send(error.message);
};

export default errorHandler;
