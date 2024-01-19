import axios from "axios";
import { useState, useEffect } from "react";
import Ticket from "../components/Ticket";

const GetSupportTickets = () => {
	const [tickets, setTickets] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [pages, setPages] = useState(0);
	const [filter, setFilter] = useState({
		status: "New",
		assignedTo: "",
		severity: "Low",
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
		else setShowDropdown(false);
		const filteredAgents1 = agents.filter((agent) =>
			agent.name.includes(e.target.value)
		);
		setFilteredAgents(filteredAgents1);
	};

	const handleAssignedChangeConfirm = (e) => {
		setFilter({ ...filter, assignedTo: e.target.value });
		setSearchAgent(e.target.value);
		setShowDropdown(false);
	};

	const handleFilter = () => {
		console.log(filter);
	};

	const handleSortParam = (e) => {
		setSortParam(e.target.value);
	};

	const handleSort = () => {
		console.log(sortParam);
	};

	useEffect(() => {
		async function getAgents() {
			try {
				const res = await axios.get("http://localhost:5000/api/support-agents");
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
					`http://localhost:5000/api/support-tickets?page=${currentPage}&limit=${limit}`
				);
				setTickets(res.data.tickets);
				setPages(Math.ceil(res.data.noOfTickets / limit));
			} catch (err) {
				console.log(err);
			}
		}
		getTickets();
	}, [currentPage]);

	return (
		<div>
			{tickets &&
				tickets.map((ticket) => <Ticket ticket={ticket} key={ticket._id} />)}
			{[...Array(pages)].map((_, ind) => (
				<button onClick={() => handleChangeCurrentPage(ind + 1)}>
					{ind + 1}
				</button>
			))}
			<br />
			<label>Filter by Status</label>
			<select value={filter.status} onChange={(e) => handleStatusChange(e)}>
				<option value="New">New</option>
				<option value="Assigned">Assigned</option>
				<option value="Resolved">Resolved</option>
			</select>
			<br />
			<label>Filter by Severity</label>
			<select value={filter.severity} onChange={(e) => handleSeverityChange(e)}>
				<option value="Low">Low</option>
				<option value="Medium">Medium</option>
				<option value="High">High</option>
			</select>
			<br />
			<label>Filter by Assigned to</label>
			<input value={searchAgent} onChange={(e) => handleAssignedChange(e)} />
			{showDropdown &&
				filteredAgents.map((agent) => (
					<>
						<br />
						<input
							onClick={(e) => handleAssignedChangeConfirm(e)}
							key={agent._id}
							value={agent.name}
							readOnly
						/>
					</>
				))}
			<br />
			<button onClick={handleFilter}>Filter</button>
			<br />
			<label>Sort by </label>
			<select value={sortParam} onChange={(e) => handleSortParam(e)}>
				<option value="dateCreated">Date Created</option>
				<option value="resolvedOn">Resolved on</option>
			</select>
			<br />
			<button onClick={handleSort}>Sort</button>
		</div>
	);
};

export default GetSupportTickets;
