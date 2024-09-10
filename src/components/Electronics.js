import { useEffect, useState, useRef, useTransition } from "react";
import ProductList from "./ProductList";
import getProducts from "./getProducts";
import ErrorComponent from "./ErrorComponent";
import SortingComponent from "./SortingComponent";
import SearchComponent from "./SearchComponent";
import filterProducts from "./filterProducts";
import { ThreeDots } from "react-loader-spinner";
function Electronics() {
	const [electronics, setElectronics] = useState();
	const [error, setError] = useState();
	const [sortingType, setSortingType] = useState();
	const savedProducts = useRef();
	const [inputValue, setInputValue] = useState("");
	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		getProducts("electronics")
			.then((res) => {
				if (!res.length) {
					setError(true);
				} else {
					savedProducts.current = res;
					setElectronics(res);
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
						{electronics && (
							<SortingComponent
								sortingType={sortingType}
								onClick={() => {
									if (sortingType === "az") {
										setSortingType(sortingType.split("").reverse().join(""));
										electronics.sort((a, b) => b.price - a.price);
									} else if (sortingType === "za") {
										setSortingType("az");
										electronics.sort((a, b) => a.price - b.price);
									} else {
										setSortingType("az");
									}
								}}
							/>
						)}
						{electronics && (
							<SearchComponent
								value={inputValue}
								onSearch={(event) => {
									setInputValue(event.target.value);
									startTransition(() => {
										setElectronics(
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
						<ProductList products={electronics} />
					)}
				</>
			)}
		</>
	);
}

export default Electronics;
