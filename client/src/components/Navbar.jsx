import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<div>
			<Link to="/">Create Ticket</Link>
			<Link to="/tickets">Show All Tickets</Link>
			<Link to="/createAgent">Create Agent</Link>
		</div>
	);
};

export default Navbar;
