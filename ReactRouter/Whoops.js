import { useLocation } from "react-router-dom";

function Whoops() {
	let location = useLocation();
	return (
		<div>
			<h1>Resourse not found at {location.pathname}</h1>
		</div>
	);
}

export default Whoops;
