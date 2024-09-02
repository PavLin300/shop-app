import { useEffect, useState } from "react";
import getProducts from "./getProducts";
import ProductList from "./ProductList";
import ErrorComponent from "./ErrorComponent";
import SortingComponent from "./SortingComponent";
function Jewelery() {
	const [jewelery, setJewelery] = useState();
	const [error, setError] = useState();
	const [sortingType, setSortingType] = useState();
	useEffect(() => {
		getProducts("jewelery")
			.then((res) => {
				if (!res.length) {
					setError(true);
				} else {
					setJewelery(res);
				}
			})
			.catch((err) => setError(err));
	}, []);

	useEffect(() => {
		if (sortingType === "az") {
			jewelery?.sort((a, b) => b.price - a.price);
		} else {
			jewelery?.sort((a, b) => a.price - b.price);
		}
	}, [sortingType, jewelery]);
	return (
		<>
			{error ? (
				<ErrorComponent />
			) : (
				<>
					{jewelery && (
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

					<ProductList products={jewelery} />
				</>
			)}
		</>
	);
}

export default Jewelery;
