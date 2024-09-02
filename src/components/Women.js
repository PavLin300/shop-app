import { useEffect, useState } from "react";
import getProducts from "./getProducts";
import ProductList from "./ProductList";
import ErrorComponent from "./ErrorComponent";
import SortingComponent from "./SortingComponent";
function Women() {
	const [womenClothes, setWomenClothes] = useState();
	const [error, setError] = useState();
	const [sortingType, setSortingType] = useState();
	useEffect(() => {
		getProducts("women's clothing")
			.then((res) => {
				if (!res.length) {
					setError(true);
				} else {
					setWomenClothes(res);
				}
			})
			.catch((err) => setError(err));
	}, []);

	useEffect(() => {
		if (sortingType === "az") {
			womenClothes?.sort((a, b) => b.price - a.price);
		} else {
			womenClothes?.sort((a, b) => a.price - b.price);
		}
	}, [sortingType, womenClothes]);
	return (
		<>
			{error ? (
				<ErrorComponent />
			) : (
				<>
					{womenClothes && (
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

					<ProductList products={womenClothes} />
				</>
			)}
		</>
	);
}

export default Women;
