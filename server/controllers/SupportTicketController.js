import SupportTicketModel from "../schema/SupportTicketSchema.js";
import tryCatch from "../middleware/tryCatch.js";
import {
	getAgentIndex,
	getTotalAgents,
	setAgentIndex,
	setTotalAgents,
} from "../utils/PersistentData.js";

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

	let agentIndex = getAgentIndex();
	let totalAgents = getTotalAgents();

	setAgentIndex((agentIndex + 1) % totalAgents);

	res.json({ status: "ticket created successfully", ticket });
});

export const getSupportTickets = tryCatch(async (req, res) => {
	const page = +req.query.page;
	const limit = +req.query.limit;
	const status = req.query.status;
	const severity = req.query.severity;
	const assignedTo = req.query.assignedTo;
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const allTickets = await SupportTicketModel.find({});
	const filteredTickets = allTickets.filter((ticket) => {
		return (
			ticket.status.includes(status) &&
			ticket.severity.includes(severity) &&
			ticket.assignedTo.includes(assignedTo)
		);
	});
	const tickets = filteredTickets.slice(startIndex, endIndex);
	res.json({ tickets, noOfTickets: filteredTickets.length });
});

export const editSupportTicket = tryCatch(async (req, res) => {
	const editedTicket = req.body;
	const newTicket = await SupportTicketModel.updateOne(
		{ _id: editedTicket._id },
		{
			resolvedOn: editedTicket.resolvedOn,
			status: "Resolved",
		}
	);
	res.json({ message: "success" });
});
