import DatePicker from "react-datepicker";
import axios from "axios";
import { useState } from "react";
import { API_URL } from "../api_url";

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
		const res = await axios.put(`${API_URL}/api/support-tickets`, thisTicket);
		window.location.reload();
		console.log(res.data);
	};

	return (
		// <div className="card" style={{ width: "18rem" }}>
		// 	<div className="card-body">
		// 		<div className="row align-items-center">
		// 			<div className="col-auto">
		// 				<label className="col-form-label">Topic</label>
		// 			</div>
		// 			<div className="col-auto">
		// 				<input
		// 					class="form-control"
		// 					type="text"
		// 					value={ticket.topic}
		// 					aria-label="Disabled input example"
		// 					disabled
		// 					readonly
		// 				></input>
		// 			</div>
		// 		</div>
		// 		<p>Topic: {ticket.topic}</p>
		// 		<p>Description: {ticket.description}</p>
		// 		<p>Date Created: {ticket.dateCreated}</p>
		// 		<p>Severity: {ticket.severity}</p>
		// 		<p>Type: {ticket.type}</p>
		// 		<p>Assigned to: {ticket.assignedTo}</p>
		// 		<p>Status: {ticket.status}</p>
		// 		{ticket.status === "Resolved" ? (
		// 			<p>Resolved on: {ticket.resolvedOn}</p>
		// 		) : (
		// 			<>
		// 				<label>Resolved On</label>
		// 				<DatePicker
		// 					selected={thisTicket.resolvedOn}
		// 					onChange={(date) => handleResolvedOnChange(date)}
		// 				/>
		// 				<button onClick={handleConfirmChange}>Confirm Change</button>
		// 			</>
		// 		)}
		// 	</div>

		// </div>
		<div className="card" style={{ margin: "10px" }}>
			<div className="card-body d-flex justify-content-evenly">
				<div>
					<div class="row g-3 align-items-end">
						<div className="col-auto">
							<label className="col-form-label">Topic</label>
						</div>
						<div className="col-auto">
							<input value={ticket.topic} className="form-control" readOnly />
						</div>
					</div>
					<div class="row g-3 align-items-center">
						<div className="col-auto">
							<label className="col-form-label">Description</label>
						</div>
						<div className="col-auto">
							<input
								value={ticket.description}
								className="form-control"
								readOnly
							/>
						</div>
					</div>
					<div class="row g-3 align-items-center">
						<div className="col-auto">
							<label className="col-form-label">Date Created</label>
						</div>
						<div className="col-auto">
							<input
								value={new Intl.DateTimeFormat("en-US", {
									year: "numeric",
									month: "2-digit",
									day: "2-digit",
								}).format(new Date(ticket.dateCreated))}
								className="form-control"
								readOnly
							/>
						</div>
					</div>
					<div class="row g-3 align-items-center">
						<div className="col-auto">
							<label className="col-form-label">Severity</label>
						</div>
						<div className="col-auto">
							<input
								value={ticket.severity}
								className="form-control"
								readOnly
							/>
						</div>
					</div>
				</div>
				<div>
					<div class="row g-3 align-items-center">
						<div className="col-auto">
							<label className="col-form-label">Type</label>
						</div>
						<div className="col-auto">
							<input value={ticket.type} className="form-control" readOnly />
						</div>
					</div>
					<div class="row g-3 align-items-center">
						<div className="col-auto">
							<label className="col-form-label">Assigned to</label>
						</div>
						<div className="col-auto">
							<input
								value={ticket.assignedTo}
								className="form-control"
								readOnly
							/>
						</div>
					</div>
					<div class="row g-3 align-items-center">
						<div className="col-auto">
							<label className="col-form-label">Status</label>
						</div>
						<div className="col-auto">
							<input value={ticket.status} className="form-control" readOnly />
						</div>
					</div>
					{ticket.status === "Resolved" ? (
						<div class="row g-3 align-items-center">
							<div className="col-auto">
								<label className="col-form-label">Resolved on</label>
							</div>
							<div className="col-auto">
								<input
									value={new Intl.DateTimeFormat("en-US", {
										year: "numeric",
										month: "2-digit",
										day: "2-digit",
									}).format(new Date(ticket.resolvedOn))}
									className="form-control"
									readOnly
								/>
							</div>
						</div>
					) : (
						<div className="row g-3 align-items-center">
							<div className="col-auto">
								<label className="col-form-label">Resolved On</label>
							</div>
							<div className="col-auto">
								<DatePicker
									selected={thisTicket.resolvedOn}
									onChange={(date) => handleResolvedOnChange(date)}
								/>
							</div>
							<div className="col-auto">
								<button
									className="btn btn-primary"
									onClick={handleConfirmChange}
								>
									Confirm Change
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Ticket;
