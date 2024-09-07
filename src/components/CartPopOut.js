import { useContext } from "react";
import "../styles/cartPopOut.css";
import { IoMdClose } from "react-icons/io";
import { CartContext } from "./CartContext";
function CartPopOut({ onClose = (f) => f }) {
	const { cart } = useContext(CartContext);
	return (
		<div className='bgPopOut'>
			<div className='cartPopOut'>
				<IoMdClose
					size={30}
					onClick={onClose}
					style={{
						cursor: "pointer",
						position: "absolute",
						top: 10,
						right: 19,
					}}
				/>

				{cart.length ? (
					<ul>
						{cart.map((product, i) => (
							<li key={i}>{product.title}</li>
						))}
					</ul>
				) : (
					<h1>No products yet...</h1>
				)}
			</div>
		</div>
	);
}

export default CartPopOut;
