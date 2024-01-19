import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateSupportTicket = () => {
	const [ticket, setTicket] = useState({
		topic: "",
		description: "",
		dateCreated: Date.now(),
		severity: "",
		type: "",
		assignedTo: "",
		status: "New",
		resolvedOn: null,
	});

	const [agents, setAgents] = useState([]);

	useEffect(() => {
		const getSupportAgents = async () => {
			try {
				const res = await axios.get("http://localhost:5000/api/support-agents");
				const availableAgents = res.data;
				setAgents(availableAgents);
			} catch (err) {
				console.log(err);
			}
		};
		getSupportAgents();
	}, []);

	useEffect(() => {
		async function getAssignedAgent() {
			if (ticket.status === "Assigned") {
				try {
					const res = await axios.get(
						"http://localhost:5000/api/support-agents/getAgent"
					);
					console.log(res.data);
					setTicket({
						...ticket,
						assignedTo: agents[res.data.assignedAgentIndex].name,
					});
					console.log(res.data);
				} catch (err) {
					console.log(err);
				}
			}
		}
		getAssignedAgent();
	}, [ticket.status]);

	const handleTopicChange = (e) => {
		setTicket({ ...ticket, topic: e.target.value });
	};
	const handleDescriptionChange = (e) => {
		setTicket({ ...ticket, description: e.target.value });
	};

	const handleDateCreatedChange = (date) => {
		setTicket({ ...ticket, dateCreated: date });
	};

	const handleSeverityChange = (e) => {
		setTicket({ ...ticket, severity: e.target.value });
	};
	const handleTypeChange = (e) => {
		setTicket({ ...ticket, type: e.target.value });
	};

	const handleStatusChange = async (e) => {
		setTicket({ ...ticket, status: e.target.value });
	};
	const handleResolvedOnChange = (date) => {
		setTicket({ ...ticket, resolvedOn: date });
	};

	const handleCreateTicket = async () => {
		setTicket({
			topic: "",
			description: "",
			dateCreated: Date.now(),
			severity: "",
			type: "",
			assignedTo: "",
			status: "New",
			resolvedOn: null,
		});
		try {
			const res = await axios.post(
				"http://localhost:5000/api/support-tickets",
				ticket
			);
			console.log(res);
			alert("Ticket created successfully");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="card">
			<h3>Create Support Ticket</h3>
			<div className="card-body d-flex justify-content-center">
				<div>
					<label className="p-2">Topic</label>
					<input value={ticket.topic} onChange={(e) => handleTopicChange(e)} />
					<br />
					<label className="p-2">Description</label>
					<input
						value={ticket.description}
						onChange={(e) => handleDescriptionChange(e)}
					/>
					<br />
					<label className="p-2">Date Created</label>
					<DatePicker
						selected={ticket.dateCreated}
						onChange={(date) => handleDateCreatedChange(date)}
					/>
					<br />
					<label className="p-2">Severity</label>
					<input
						value={ticket.severity}
						onChange={(e) => handleSeverityChange(e)}
					/>
					<br />
					<label className="p-2">Type</label>
					<input value={ticket.type} onChange={(e) => handleTypeChange(e)} />
					<br />
					<label className="p-2">Status</label>
					<select value={ticket.status} onChange={(e) => handleStatusChange(e)}>
						<option>New</option>
						<option>Assigned</option>
						<option>Resolved</option>
					</select>
					<br />
					{ticket.status === "Assigned" && (
						<div>
							<label className="p-2">Assigned To</label>
							<input defaultValue={ticket.assignedTo} readOnly />
						</div>
					)}
					<br />
					{ticket.status === "Resolved" && (
						<>
							<label className="p-2">Resolved On</label>
							<DatePicker
								selected={ticket.resolvedOn}
								onChange={(date) => handleResolvedOnChange(date)}
							/>
							<br />
						</>
					)}
					<button className="btn btn-primary" onClick={handleCreateTicket}>Create Ticket</button>
				</div>
			</div>
		</div>
	);
};

export default CreateSupportTicket;
