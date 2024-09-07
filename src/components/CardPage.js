import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import "../styles/cardPage.css";
import { CartContext } from "./CartContext";
function CardPage() {
	const { id } = useParams();
	const [foundProduct, setFoundProduct] = useState();
	const { addToCart } = useContext(CartContext); // получаем корзину и ф-цию добавления из контекста
	useEffect(() => {
		async function getProducts() {
			let response = await fetch("https://fakestoreapi.com/products");
			let result = await response.json();
			setFoundProduct(result.filter((product) => product.id === +id));
		}
		getProducts();
	}, [id]);

	return (
		<>
			{foundProduct &&
				foundProduct.map((item, i) => (
					<div className='cardPage' key={i}>
						<img
							src={item.image}
							alt=''
							width={400}
							height={500}
							style={{ borderRadius: 20 }}
						/>
						<div className='cardPageText'>
							<h1>{item.title}</h1>
							<p>{item.description}</p>
							<br />
							<p>
								<span style={{ fontWeight: "bold" }}>Category: </span>
								{item.category}
							</p>
							<div style={{ display: "flex", gap: 10 }}>
								<span style={{ fontWeight: "bold" }}>Rating: </span>
								<div style={{ display: "inline-block" }}>
									<div style={{ display: "flex", alignItems: "center" }}>
										{item.rating.rate}
										<CiStar color='yellow' />
									</div>
								</div>
							</div>
							<p>
								<span style={{ fontWeight: "bold" }}>Count: </span>
								{item.rating.count}
							</p>
							<br />
							<p style={{ fontSize: 25 }}>
								<span style={{ fontWeight: "bold" }}>Price: </span>
								{item.price} $
							</p>
							<button
								className='buyButton'
								onClick={() => {
									addToCart(foundProduct[0]);
								}}
							>
								Buy
							</button>
						</div>
					</div>
				))}
		</>
	);
}

export default CardPage;
