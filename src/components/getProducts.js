async function getProducts(category) {
	let response = await fetch(
		`https://fakestoreapi.com/products/category/${category}`
	);
	let result = await response.json();

	return result;
}

export default getProducts;
