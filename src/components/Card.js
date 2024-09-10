import { useNavigate } from "react-router-dom";
import "../styles/card.css";
import { CiStar } from "react-icons/ci";
import { motion } from "framer-motion";

const variantsCard = {
	visible: (i) => ({
		// получаем индекс из параметра custom и делаем задержку
		opacity: 1,

		transition: { delay: i * 0.05 },
	}),

	hidden: {
		opacity: 0,
	},
};

function Card({ id, title, price, image, rating, index }) {
	let navigate = useNavigate();
	return (
		<motion.div
			variants={variantsCard}
			initial='hidden'
			animate='visible'
			custom={index}
			className='productCard'
			onClick={() => navigate(`/${id}`)}
		>
			<img src={image} alt='' />
			{/*product info*/}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					gap: 30,
					flexBasis: "30%",
				}}
			>
				{/*title*/}
				<div>
					<p style={{ fontWeight: "bold" }}>
						{title.length > 30 ? title.slice(0, 25) + "..." : title}
					</p>
				</div>
				{/*price and rating*/}
				<div style={{ display: "flex", justifyContent: "space-between" }}>
					<div>{price} $</div>
					<div>
						<div style={{ display: "flex" }}>
							{rating.rate}
							<CiStar size={20} />
						</div>
					</div>
				</div>
			</div>
		</motion.div>
	);
}

export default Card;
