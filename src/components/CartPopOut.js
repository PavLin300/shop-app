import { useContext } from "react";
import "../styles/cartPopOut.css";
import { IoMdClose } from "react-icons/io";
import { CartContext } from "./CartContext";
import CartListElem from "./CartListElem";
import { AnimatePresence, motion } from "framer-motion";
function CartPopOut({ isVisible, onClose = (f) => f }) {
	const { cart } = useContext(CartContext);
	return (
		<AnimatePresence>
			{isVisible && (
				<div className='bgPopOut'>
					<motion.div
						key='modal'
						initial={{ opacity: 0, y: 0, x: "70%" }}
						animate={{ opacity: 1, y: "50%", x: "70%" }}
						transition={{ duration: 0.3 }}
						exit={{ y: "-50%", opacity: 0 }}
						className='cartPopOut'
					>
						<IoMdClose
							className='closeSvg'
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
							<>
								<h2 style={{ marginBottom: 10 }}>Your Cart</h2>
								<AnimatePresence>
									{cart.map((product) => (
										<CartListElem key={product.id} {...product} />
									))}
								</AnimatePresence>
							</>
						) : (
							<h1 style={{ textAlign: "center", marginTop: 20 }}>
								No products yet...
							</h1>
						)}
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}

export default CartPopOut;
