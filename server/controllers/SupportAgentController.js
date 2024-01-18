import SupportAgentModel from "../schema/SupportAgentSchema.js";
import tryCatch from "../middleware/tryCatch.js";
import DuplicateAgentError from "../utils/errors/duplicate-agent-error.js";
import {
	getAgentIndex,
	getTotalAgents,
	setAgentIndex,
	setTotalAgents,
} from "../utils/PersistentData.js";

export const createSupportAgent = tryCatch(async (req, res) => {
	const { name, email, phone, description } = req.body;
	const existingUser = await SupportAgentModel.find({ email });

	if (existingUser.length !== 0) {
		throw new DuplicateAgentError("agent already exists with this email");
	}

	const agent = new SupportAgentModel({
		name,
		email,
		phone,
		description,
		active: true,
		dateCreated: Date.now(),
	});
	await agent.save();

	let totalAgents = getTotalAgents();
	setTotalAgents(totalAgents + 1);

	res.json({ status: "agent created successfully", agent });
});

export const assignAgent = tryCatch(async (req, res) => {
	let agentIndex = getAgentIndex();
	res.json({ assignedAgentIndex: agentIndex });
});

export const getSupportAgents = tryCatch(async (req, res) => {
	const agents = await SupportAgentModel.find({});
	setTotalAgents(agents.length);
	res.json(agents);
});
