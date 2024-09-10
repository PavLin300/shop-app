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
import { CartContext } from "./CartContext";
import CartPopOut from "./CartPopOut";

function App() {
	const [products, setProducts] = useState();
	const [error, setError] = useState();
	const [sortingType, setSortingType] = useState();
	const savedProducts = useRef();
	const [inputValue, setInputValue] = useState("");
	const [isPending, startTransition] = useTransition();
	const [cart, setCart] = useState([]);
	const [showCart, setShowCart] = useState(false);
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

	let location = useLocation(); //получаем адрес

	const addToCart = (newProduct) => {
		if (cart.find((product) => product.id === newProduct.id)) return;
		setCart([...cart, newProduct]);
	};

	const deleteFromCart = (id) => {
		setCart(cart.filter((product) => product.id !== id));
	};
	return (
		// создаем провайдер контекста и передаем корзину и ф-цию добавления
		<CartContext.Provider value={{ cart, addToCart, deleteFromCart }}>
			<CartPopOut
				isVisible={showCart}
				onClose={(event) => {
					setShowCart(!showCart);
				}}
			/>

			<Navigation
				onCart={(event) => {
					setShowCart(!showCart);
				}}
			/>
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
									if (sortingType === "az") {
										setSortingType(sortingType.split("").reverse().join(""));
										products.sort((a, b) => b.price - a.price);
									} else {
										setSortingType("az");
										products.sort((a, b) => a.price - b.price);
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
		</CartContext.Provider>
	);
}

export default App;
