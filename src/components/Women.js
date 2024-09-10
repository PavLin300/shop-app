import { useEffect, useState, useRef, useTransition } from "react";
import getProducts from "./getProducts";
import ProductList from "./ProductList";
import ErrorComponent from "./ErrorComponent";
import SortingComponent from "./SortingComponent";
import SearchComponent from "./SearchComponent";
import filterProducts from "./filterProducts";
import { ThreeDots } from "react-loader-spinner";
function Women() {
	const [womenClothes, setWomenClothes] = useState();
	const [error, setError] = useState();
	const [sortingType, setSortingType] = useState();
	const savedProducts = useRef();
	const [inputValue, setInputValue] = useState("");
	const [isPending, startTransition] = useTransition();
	useEffect(() => {
		getProducts("women's clothing")
			.then((res) => {
				if (!res.length) {
					setError(true);
				} else {
					savedProducts.current = res;
					setWomenClothes(res);
				}
			})
			.catch((err) => setError(err));
	}, []);

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
						{womenClothes && (
							<SortingComponent
								sortingType={sortingType}
								onClick={() => {
									if (sortingType === "az") {
										setSortingType(sortingType.split("").reverse().join(""));
										womenClothes.sort((a, b) => b.price - a.price);
									} else {
										setSortingType("az");
										womenClothes.sort((a, b) => a.price - b.price);
									}
								}}
							/>
						)}
						{womenClothes && (
							<SearchComponent
								value={inputValue}
								onSearch={(event) => {
									setInputValue(event.target.value);
									startTransition(() => {
										setWomenClothes(
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
						<ProductList products={womenClothes} />
					)}
				</>
			)}
		</>
	);
}

export default Women;
