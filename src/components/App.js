import { useEffect, useRef, useState, useTransition } from "react";
import "../styles/general.css";
import ProductList from "./ProductList";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import SortingComponent from "./SortingComponent";
import SearchComponent from "./SearchComponent";
import filterProducts from "./filterProducts";
import { ThreeDots } from "react-loader-spinner";
function App() {
	const [products, setProducts] = useState();
	const [error, setError] = useState();
	const [sortingType, setSortingType] = useState();
	const savedProducts = useRef();
	const [inputValue, setInputValue] = useState("");
	const [isPending, startTransition] = useTransition();
	useEffect(() => {
		async function getProducts() {
			try {
				let response = await fetch("https://fakestoreapi.com/products");
				let result = await response.json();

				setProducts(result);
				savedProducts.current = result;
			} catch (error) {
				setError(error);
			}
		}
		getProducts();
	}, []);

	useEffect(() => {
		if (sortingType === "az") {
			products?.sort((a, b) => b.price - a.price);
		} else {
			products?.sort((a, b) => a.price - b.price);
		}
	}, [sortingType, products]);

	let location = useLocation(); //получаем адрес

	return (
		<>
			<Navigation />
			{/* в зависимости от длины адреса отображаем внутренний компонент или дефолт список  */}
			{error ? (
				<ErrorComponent />
			) : location.pathname.length > 1 ? (
				<Outlet />
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
						{products && (
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
						{products && (
							<SearchComponent
								value={inputValue}
								onSearch={(event) => {
									setInputValue(event.target.value);
									startTransition(() => {
										setProducts(
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
						<ProductList products={products} />
					)}
				</>
			)}
		</>
	);
}

export default App;
