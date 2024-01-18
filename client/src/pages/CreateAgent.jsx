import { useState } from "react";
import axios from "axios";

const CreateAgent = () => {
	const [agent, setAgent] = useState({
		name: "",
		email: "",
		phone: "",
		description: "",
	});

	const handleNameChange = (e) => {
		setAgent({ ...agent, name: e.target.value });
	};
	const handleEmailChange = (e) => {
		setAgent({ ...agent, email: e.target.value });
	};
	const handlePhoneChange = (e) => {
		setAgent({ ...agent, phone: e.target.value });
	};
	const handleDescriptionChange = (e) => {
		setAgent({ ...agent, description: e.target.value });
	};
	const handleCreateAgent = async () => {
		try {
			const res = await axios.post(
				"http://localhost:5000/api/support-agents",
				agent
			);
			console.log(res.data);
			setAgent({
				name: "",
				email: "",
				phone: "",
				description: "",
			});
			alert("agent created successfully");
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div>
			<h1>Create Agent</h1>
			<label>Name</label>
			<input value={agent.name} onChange={(e) => handleNameChange(e)} />
			<br />
			<label>Email</label>
			<input value={agent.email} onChange={(e) => handleEmailChange(e)} />
			<br />
			<label>Phone</label>
			<input value={agent.phone} onChange={(e) => handlePhoneChange(e)} />
			<br />
			<label>Description</label>
			<input
				value={agent.description}
				onChange={(e) => handleDescriptionChange(e)}
			/>
			<br />
			<button onClick={handleCreateAgent}>Create Agent</button>
		</div>
	);
};

export default CreateAgent;
