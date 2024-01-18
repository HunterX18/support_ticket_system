const Dropdown = ({ list, ticket, setTicket, setShowDropdown }) => {
	const handleSelectAssignedTo = (e) => {
		setTicket({ ...ticket, assignedTo: e.target.value });
		setShowDropdown(false);
	};

	return (
		<div className="agents-list">
			{list &&
				list.map((agent) => (
					<div key={agent.__id}>
						<input
							defaultValue={agent.name}
							onClick={(e) => handleSelectAssignedTo(e)}
						/>
						<br />
					</div>
				))}
		</div>
	);
};

export default Dropdown;
