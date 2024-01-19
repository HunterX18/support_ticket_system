import axios from "axios";
import { useState, useEffect } from "react";
import Ticket from "../components/Ticket";
import { API_URL } from "../api_url";

const GetSupportTickets = () => {
	const [tickets, setTickets] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [pages, setPages] = useState(0);
	const [filter, setFilter] = useState({
		status: "",
		assignedTo: "",
		severity: "",
	});
	const [agents, setAgents] = useState([]);
	const [filteredAgents, setFilteredAgents] = useState([]);
	const [showDropdown, setShowDropdown] = useState(false);
	const [searchAgent, setSearchAgent] = useState("");
	const [sortParam, setSortParam] = useState("");
	const limit = 2;

	const handleChangeCurrentPage = (page) => {
		setCurrentPage(page);
	};

	const handleStatusChange = (e) => {
		setFilter({ ...filter, status: e.target.value });
		console.log(e.target.value);
	};

	const handleSeverityChange = (e) => {
		setFilter({ ...filter, severity: e.target.value });
		console.log(e.target.value);
	};

	const handleAssignedChange = (e) => {
		// console.log(e.target.value);
		setSearchAgent(e.target.value);
		if (e.target.value !== "") setShowDropdown(true);
		else {
			setShowDropdown(false);
			setFilter({ ...filter, assignedTo: "" });
		}
		const filteredAgents1 = agents.filter((agent) =>
			agent.name.includes(e.target.value)
		);
		setFilteredAgents(filteredAgents1);
	};

	const handleAssignedChangeConfirm = (e) => {
		setFilter({ ...filter, assignedTo: e.target.value });
		setSearchAgent(e.target.value);
		setShowDropdown(false);
		console.log(e.target.value);
	};

	const handleFilter = async () => {
		console.log(filter);
		try {
			const res = await axios.get(
				`${API_URL}/api/support-tickets?page=${currentPage}&limit=${limit}&status=${filter.status}&severity=${filter.severity}&assignedTo=${filter.assignedTo}`
			);
			setTickets(res.data.tickets);
			// setFilteredTickets(res.data.tickets);
			setPages(Math.ceil(res.data.noOfTickets / limit));
		} catch (err) {
			console.log(err);
		}
	};

	const handleSortParam = (e) => {
		setSortParam(e.target.value);
		console.log(e.target.value);
	};

	const handleSort = () => {
		const sortedTickets = tickets.sort(
			(a, b) =>
				new Date(a[sortParam]).getTime() - new Date(b[sortParam]).getTime()
		);
		// console.log(sortParam, new Date(tickets[0][sortParam]).getTime());
		setTickets(sortedTickets);
	};

	useEffect(() => {
		async function getAgents() {
			try {
				const res = await axios.get(`${API_URL}/api/support-agents`);
				setAgents(res.data);
			} catch (err) {
				console.log(err);
			}
		}
		getAgents();
	}, []);

	useEffect(() => {
		async function getTickets() {
			try {
				const res = await axios.get(
					`${API_URL}/api/support-tickets?page=${currentPage}&limit=${limit}&status=${filter.status}&severity=${filter.severity}&assignedTo=${filter.assignedTo}`
				);
				setTickets(res.data.tickets);
				// setFilteredTickets(res.data.tickets);
				setPages(Math.ceil(res.data.noOfTickets / limit));
			} catch (err) {
				console.log(err);
			}
		}
		getTickets();
	}, [currentPage]);

	return (
		<div>
			<div className="d-flex justify-content-start p-1">
				<div className="d-flex m-1">
					<label className="p-1">Status</label>
					<select
						className="form-select form-select-sm"
						value={filter.status}
						onChange={(e) => handleStatusChange(e)}
					>
						<option value="">None</option>
						<option value="New">New</option>
						<option value="Assigned">Assigned</option>
						<option value="Resolved">Resolved</option>
					</select>
				</div>
				<div className="d-flex m-1">
					<label className="p-1">Severity</label>
					<select
						className="form-select form-select-sm"
						value={filter.severity}
						onChange={(e) => handleSeverityChange(e)}
					>
						<option value="">None</option>
						<option value="Low">Low</option>
						<option value="Medium">Medium</option>
						<option value="High">High</option>
					</select>
				</div>
				<div className="d-flex m-1">
					<label className="p-1">Assigned</label>
					<input
						className="input-group input-group-sm"
						value={searchAgent}
						onChange={(e) => handleAssignedChange(e)}
					/>
					{showDropdown && (
						<div className="dropdown">
							<ul className="dropdown-menu">
								{filteredAgents.map((agent) => (
									<li key={agent._id} className="dropdown-item">
										<input
											onClick={(e) => handleAssignedChangeConfirm(e)}
											key={agent._id}
											value={agent.name}
											readOnly
										/>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
				<button className="btn btn-primary btn-sm m-1" onClick={handleFilter}>
					Filter
				</button>
			</div>
			<div className="d-flex w-25 m-1 justify-content-start">
				<div className="d-flex">
					<label className="p-1">Sort</label>
					<select
						className="form-select form-select-sm"
						value={sortParam}
						onChange={(e) => handleSortParam(e)}
					>
						<option value="dateCreated">Date Created</option>
						<option value="resolvedOn">Resolved on</option>
					</select>
				</div>
				<button className="btn btn-primary btn-sm" onClick={handleSort}>
					Sort
				</button>
			</div>

			{tickets &&
				tickets.map((ticket, ind) => (
					<Ticket
						ind={ind}
						ticket={ticket}
						key={ticket._id}
						setTickets={setTickets}
						tickets={tickets}
					/>
				))}
			<ul className="pagination">
				{[...Array(pages)].map((_, ind) => (
					<li className="page-item">
						<button
							className="page-link"
							onClick={() => handleChangeCurrentPage(ind + 1)}
						>
							{ind + 1}
						</button>
					</li>
				))}
			</ul>
			<br />
		</div>
	);
};

export default GetSupportTickets;
