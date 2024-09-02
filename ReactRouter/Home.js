import { Link } from "react-router-dom";

function Home() {
	// Ссылки на стрaницы
	return (
		<div style={{ margin: "auto", width: 600, textAlign: "center" }}>
			<h1>[Company Website]</h1>

			<nav style={{ display: "flex", justifyContent: "space-between" }}>
				<Link to='about'>About</Link>
				<Link to='events'>Events</Link>
				<Link to='products'>Products</Link>
				<Link to='contact'>Contact Us</Link>
			</nav>
		</div>
	);
}

export default Home;
