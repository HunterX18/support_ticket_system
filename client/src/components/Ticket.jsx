import DatePicker from "react-datepicker";
import axios from "axios";
import { useState } from "react";

const Ticket = ({ ticket, tickets, setTickets, ind }) => {
	const [thisTicket, setThisTicket] = useState(ticket);

	const handleResolvedOnChange = (date) => {
		setThisTicket({ ...thisTicket, resolvedOn: date, status: "Resolved" });
		setTickets([
			...tickets.slice(0, ind),
			thisTicket,
			...tickets.slice(ind + 1),
		]);
	};

	const handleConfirmChange = async () => {
		console.log(thisTicket);
		const res = await axios.put(
			"http://localhost:5000/api/support-tickets",
			thisTicket
		);
		window.location.reload();
		console.log(res.data);
	};

	return (
		<div>
			<p>Topic: {ticket.topic}</p>
			<p>Description: {ticket.description}</p>
			<p>Date Created: {ticket.dateCreated}</p>
			<p>Severity: {ticket.severity}</p>
			<p>Type: {ticket.type}</p>
			<p>Assigned to: {ticket.assignedTo}</p>
			<p>Status: {ticket.status}</p>
			{ticket.status === "Resolved" ? (
				<p>Resolved on: {ticket.resolvedOn}</p>
			) : (
				<>
					<label>Resolved On</label>
					<DatePicker
						selected={thisTicket.resolvedOn}
						onChange={(date) => handleResolvedOnChange(date)}
					/>
					<button onClick={handleConfirmChange}>Confirm Change</button>
				</>
			)}
		</div>
	);
};

export default Ticket;
