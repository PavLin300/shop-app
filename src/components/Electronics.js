import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import getProducts from "./getProducts";
import ErrorComponent from "./ErrorComponent";
import SortingComponent from "./SortingComponent";
function Electronics() {
	const [electronics, setElectronics] = useState();
	const [error, setError] = useState();
	const [sortingType, setSortingType] = useState();
	useEffect(() => {
		getProducts("electronics")
			.then((res) => {
				if (!res.length) {
					setError(true);
				} else {
					setElectronics(res);
				}
			})
			.catch((err) => setError(err));
	}, []);

	useEffect(() => {
		if (sortingType === "az") {
			electronics?.sort((a, b) => b.price - a.price);
		} else {
			electronics?.sort((a, b) => a.price - b.price);
		}
	}, [sortingType, electronics]);

	return (
		<>
			{error ? (
				<ErrorComponent />
			) : (
				<>
					{electronics && (
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

					<ProductList products={electronics} />
				</>
			)}
		</>
	);
}

export default Electronics;
