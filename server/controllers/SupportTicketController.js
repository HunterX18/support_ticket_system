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
	const startIndex = (page - 1) * limit;
	const endIndex = page * limit;
	const allTickets = await SupportTicketModel.find({});
	const tickets = allTickets.slice(startIndex, endIndex);
	res.json({ tickets, noOfTickets: allTickets.length });
});
