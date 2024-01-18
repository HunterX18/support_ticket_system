const Ticket = ({ ticket }) => {
	return (
		<div>
			<p>Topic: {ticket.topic}</p>
			<p>Description: {ticket.description}</p>
			<p>Date Created: {ticket.dateCreated}</p>
			<p>Severity: {ticket.severity}</p>
			<p>Type: {ticket.type}</p>
			<p>Assigned to: {ticket.assignedTo}</p>
			<p>Status: {ticket.status}</p>
			{ticket.status === "Resolved" && <p>Resolved on: {ticket.resolvedOn}</p>}
		</div>
	);
};

export default Ticket;
