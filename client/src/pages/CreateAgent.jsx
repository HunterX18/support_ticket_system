import { useState } from "react";
import axios from "axios";
import { API_URL } from "../api_url";

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
			const res = await axios.post(`${API_URL}/api/support-agents`, agent);
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
		<div className="card">
			<h1>Create Agent</h1>
			<div className="card-body d-flex justify-content-center">
				<div>
					<label className="p-2">Name</label>
					<input value={agent.name} onChange={(e) => handleNameChange(e)} />
					<br />
					<label className="p-2">Email</label>
					<input value={agent.email} onChange={(e) => handleEmailChange(e)} />
					<br />
					<label className="p-2">Phone</label>
					<input value={agent.phone} onChange={(e) => handlePhoneChange(e)} />
					<br />
					<label className="p-2">Description</label>
					<input
						value={agent.description}
						onChange={(e) => handleDescriptionChange(e)}
					/>
					<br />
					<button className="btn btn-primary" onClick={handleCreateAgent}>
						Create Agent
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateAgent;
