import axios from "axios";
import { useState, useEffect } from "react";
import Ticket from "../components/Ticket";

const GetSupportTickets = () => {
	const [tickets, setTickets] = useState([]);

	useEffect(() => {
		async function getTickets() {
			try {
				const res = await axios.get(
					"http://localhost:5000/api/support-tickets"
				);
				setTickets(res.data.tickets);
			} catch (err) {
				console.log(err);
			}
		}
		getTickets();
	}, []);

	return (
		<div>
			{tickets &&
				tickets.map((ticket) => <Ticket ticket={ticket} key={ticket._id} />)}
		</div>
	);
};

export default GetSupportTickets;
