import { useContext } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CartContext } from "./CartContext";
import { motion } from "framer-motion";
function CartListElem({ id, title, price, image }) {
	const { deleteFromCart } = useContext(CartContext);
	return (
		<motion.div className='cartListElem' exit={{ x: "-110%" }}>
			<img src={image} alt='' width={100} height={100} />
			<div className='cartListElemText'>
				<div>
					<p>{title.length > 30 ? title.slice(0, 25) + "..." : title}</p>
					<p>{price}$</p>
				</div>

				<motion.div
					style={{ cursor: "pointer", alignSelf: "center" }}
					onClick={() => {
						deleteFromCart(id);
					}}
				>
					<RiDeleteBin6Line size={25} />
				</motion.div>
			</div>
		</motion.div>
	);
}

export default CartListElem;
