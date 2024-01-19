const Dropdown = ({ list, ticket, setTicket, setShowDropdown }) => {
	const handleSelectAssignedTo = (e) => {
		setTicket({ ...ticket, assignedTo: e.target.value });
		setShowDropdown(false);
	};

	return (
		<div className="dropdown">
			<ul className="dropdown-menu">
				{list &&
					list.map((agent) => (
						<li key={agent.__id} className="dropdown-item">
							<input
								defaultValue={agent.name}
								onClick={(e) => handleSelectAssignedTo(e)}
							/>
							<br />
						</li>
					))}
			</ul>
		</div>
	);
};

export default Dropdown;
