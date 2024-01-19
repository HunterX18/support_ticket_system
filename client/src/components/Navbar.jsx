
const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-body tertiary position-static">
			<div class="container-fluid">
				<a class="navbar-brand" href="/">
					Supportify
				</a>
				<button
					class="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item">
							<a class="nav-link" href="/">
								Create Ticket
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/tickets">
								Show Tickets
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="/createAgent">
								Create Agent
							</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
