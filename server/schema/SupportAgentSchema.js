import { Schema } from "mongoose";
import mongoose from "../utils/Database.js";

const supportAgentSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	active: {
		type: Boolean,
		required: true,
	},
	dateCreated: {
		type: Date,
		required: true,
	},
});

const SupportAgentModel = mongoose.model("SupportAgent", supportAgentSchema);
export default SupportAgentModel;
