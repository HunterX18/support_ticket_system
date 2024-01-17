import SupportTicketModel from "../schema/SupportTicketSchema.js";
import tryCatch from "../middleware/tryCatch.js";

export const createSupportTicket = tryCatch(async (req, res) => {
	const {
		topic,
		description,
		dateCreated,
		severity,
		type,
		assignedTo,
		status,
		resolvedOn,
	} = req.body;

	const ticket = new SupportTicketModel({
		topic,
		description,
		dateCreated,
		severity,
		type,
		assignedTo,
		status,
		resolvedOn,
	});

	await ticket.save();

	res.json({ status: "ticket created successfully", ticket });
});

export const getSupportTickets = tryCatch(async (req, res) => {
	const tickets = await SupportTicketModel.find({});
	res.json({ tickets });
});
