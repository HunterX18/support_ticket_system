export const createSupportAgent = async (req, res, next) => {
	try {
		res.send("success");
	} catch (err) {
		next(err);
	}
};
