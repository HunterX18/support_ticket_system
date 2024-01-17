export const createSupportTicket = async (req, res, next) => {
	try {
		res.json({ message: "success" });
	} catch (err) {
		next(err);
	}
};

export const getSupportTickets = async (req, res, next) => {
	try {
		res.json({ message: "success" });
	} catch (err) {
		next(err);
	}
};
