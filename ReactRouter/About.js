import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
function About() {
	return (
		<div>
			<h1>[About]</h1>
			<div
				style={{ display: "flex", justifyContent: "space-around", width: 500 }}
			>
				<Link to='services'>Services</Link>
				<Link to='history'>History</Link>
				<Link to='location'>Location</Link>
			</div>
			<Outlet />{" "}
			{/*Компонент, который отображает дочерний компонент в зависимости от адреса*/}
		</div>
	);
}

export default About;
