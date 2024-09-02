import { useEffect, useState } from "react";
import getProducts from "./getProducts";
import ProductList from "./ProductList";
import ErrorComponent from "./ErrorComponent";
import SortingComponent from "./SortingComponent";
function Men() {
	const [menClothes, setMenClothes] = useState();
	const [error, setError] = useState();
	const [sortingType, setSortingType] = useState();
	useEffect(() => {
		getProducts("men's clothing")
			.then((res) => {
				if (!res.length) {
					setError(true);
				} else {
					setMenClothes(res);
				}
			})
			.catch((err) => setError(err));
	}, []);

	useEffect(() => {
		if (sortingType === "az") {
			menClothes?.sort((a, b) => b.price - a.price);
		} else {
			menClothes?.sort((a, b) => a.price - b.price);
		}
	}, [sortingType, menClothes]);
	return (
		<>
			{error ? (
				<ErrorComponent />
			) : (
				<>
					{menClothes && (
						<SortingComponent
							sortingType={sortingType}
							onClick={() => {
								if (sortingType) {
									setSortingType(sortingType.split("").reverse().join(""));
								} else {
									setSortingType("az");
								}
							}}
						/>
					)}

					<ProductList products={menClothes} />
				</>
			)}
		</>
	);
}

export default Men;
