import CreateSupportTicket from "./pages/CreateSupportTicket";
import GetSupportTickets from "./pages/GetSupportTickets";
import CreateAgent from "./pages/CreateAgent";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Router>
				<Navbar />
				<Routes>
					<Route exact path="/" element={<CreateSupportTicket />} />
					<Route exact path="/tickets" element={<GetSupportTickets />} />
					<Route exact path="/createAgent" element={<CreateAgent />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
