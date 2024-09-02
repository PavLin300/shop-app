import { useEffect, useState } from "react";
import "../styles/general.css";
import ProductList from "./ProductList";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ErrorComponent from "./ErrorComponent";
import SortingComponent from "./SortingComponent";
import SearchComponent from "./SearchComponent";
function App() {
	const [products, setProducts] = useState();
	const [error, setError] = useState();
	const [sortingType, setSortingType] = useState();
	const [searchItem, setSearchItem] = useState();
	const [savedProducts, setSavedProducts] = useState();
	useEffect(() => {
		async function getProducts() {
			try {
				let response = await fetch("https://fakestoreapi.com/products");
				let result = await response.json();

				setProducts(result);
				setSavedProducts(result);
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

	useEffect(() => {
		if (!searchItem) {
			//если пустая строка отображаем сохраненый список
			setProducts(savedProducts);
		} else {
			setProducts(
				savedProducts?.filter((product) => product.title.startsWith(searchItem))
			);
		}
	}, [searchItem]);

	let location = useLocation(); //получаем адрес

	return (
		<>
			<Navigation />

			{error ? (
				<ErrorComponent />
			) : location.pathname.length > 1 ? (
				<Outlet />
			) : (
				<>
					<div
						style={{
							display: "flex",
							gap: 50,
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
						{products && <SearchComponent onSearch={setSearchItem} />}
					</div>

					<ProductList products={products} />
				</>
			)}
			{/* в зависимости от длины адреса отображаем внутренний компонент или дефолт список  */}
		</>
	);
}

export default App;
