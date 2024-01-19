import { Schema } from "mongoose";
import mongoose from "../utils/Database.js";

const supportTicketSchema = new Schema({
	topic: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	dateCreated: {
		type: Date,
		required: true,
	},
	severity: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		required: true,
	},
	assignedTo: {
		type: String,
	},
	status: {
		type: String,
		required: true,
	},
	resolvedOn: {
		type: Date,
	},
});

const SupportTicketModel = mongoose.model("SupportTicket", supportTicketSchema);
export default SupportTicketModel;
