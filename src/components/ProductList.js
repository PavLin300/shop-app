import Card from "./Card";
import { ThreeDots } from "react-loader-spinner";
function ProductList({ products }) {
	return (
		<div style={{ display: "flex", padding: 50, flexWrap: "wrap" }}>
			{products ? (
				products.map((item, index) => (
					<Card {...item} key={item.id} index={index} />
				))
			) : (
				<div style={{ margin: "auto" }}>
					<ThreeDots color='#aab396' />
				</div>
			)}
		</div>
	);
}

export default ProductList;
