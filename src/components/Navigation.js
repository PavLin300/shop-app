import "../styles/navigation.css";
import { Link } from "react-router-dom";
function Navigation() {
	return (
		<div className='navigation'>
			<div className='container'>
				<nav>
					<ul>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='electronics'>Electronics</Link>
						</li>

						<li>
							<Link to='jewelery'>Jewelery</Link>
						</li>

						<li>
							<Link to='men'>Men's clothing</Link>
						</li>

						<li>
							<Link to='women'>Women's clothing</Link>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
}

export default Navigation;
