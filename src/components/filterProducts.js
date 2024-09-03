const filterProducts = (products, value) => {
	return products.filter(({ title }) =>
		title.toLowerCase().startsWith(value.toLowerCase())
	);
};

export default filterProducts;
