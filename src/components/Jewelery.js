import { useEffect, useRef, useState, useTransition } from "react";
import getProducts from "./getProducts";
import ProductList from "./ProductList";
import ErrorComponent from "./ErrorComponent";
import SortingComponent from "./SortingComponent";
import filterProducts from "./filterProducts";
import SearchComponent from "./SearchComponent";
import { ThreeDots } from "react-loader-spinner";
function Jewelery() {
	const [jewelery, setJewelery] = useState();
	const [error, setError] = useState();
	const [sortingType, setSortingType] = useState();
	const savedProducts = useRef();
	const [inputValue, setInputValue] = useState("");
	const [isPending, startTransition] = useTransition();
	useEffect(() => {
		getProducts("jewelery")
			.then((res) => {
				if (!res.length) {
					setError(true);
				} else {
					setJewelery(res);
					savedProducts.current = res;
				}
			})
			.catch((err) => setError(err));
	}, []);

	// useEffect(() => {
	// 	if (sortingType === "az") {
	// 		jewelery?.sort((a, b) => b.price - a.price);
	// 	} else {
	// 		jewelery?.sort((a, b) => a.price - b.price);
	// 	}
	// }, [sortingType, jewelery]);
	return (
		<>
			{error ? (
				<ErrorComponent />
			) : (
				<>
					<div
						style={{
							display: "flex",
							gap: 30,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{jewelery && (
							<SortingComponent
								sortingType={sortingType}
								onClick={() => {
									if (sortingType === "az") {
										setSortingType(sortingType.split("").reverse().join(""));
										jewelery.sort((a, b) => b.price - a.price);
									} else {
										setSortingType("az");
										jewelery.sort((a, b) => a.price - b.price);
									}
								}}
								// onClick={() => {
								// 	if (sortingType) {
								// 		setSortingType(sortingType.split("").reverse().join(""));
								// 	} else {
								// 		setSortingType("az");
								// 	}
								// }}
							/>
						)}
						{jewelery && (
							<SearchComponent
								value={inputValue}
								onSearch={(event) => {
									setInputValue(event.target.value);
									startTransition(() => {
										setJewelery(
											filterProducts(savedProducts.current, event.target.value)
										);
									});
								}}
							/>
						)}
					</div>

					{isPending ? (
						<div style={{ display: "flex", justifyContent: "center" }}>
							<ThreeDots color='#aab396' />
						</div>
					) : (
						<ProductList products={jewelery} />
					)}
				</>
			)}
		</>
	);
}

export default Jewelery;
