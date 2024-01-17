import SupportAgentModel from "../schema/SupportAgentSchema.js";
import tryCatch from "../middleware/tryCatch.js";

export const createSupportAgent = tryCatch(async (req, res ) => {
	const { name, email, phone, description } = req.body;
	const existingUser = await SupportAgentModel.find({ email });

	if (existingUser.length !== 0) {
		console.log(existingUser);
		throw new Error("User exists with this email");
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
	res.json({ status: "agent created successfully", agent });
});
