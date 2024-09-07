import "../styles/navigation.css";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
function Navigation({ onCart = (f) => f }) {
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

				<div style={{ cursor: "pointer" }} onClick={onCart}>
					<IoCartOutline size={25} />
				</div>
			</div>
		</div>
	);
}

export default Navigation;
