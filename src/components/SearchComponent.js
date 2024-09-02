import { useState } from "react";
import "../styles/searchComponent.css";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
function SearchComponent({ onSearch = (f) => f }) {
	const [value, setValue] = useState("");
	return (
		<div className='searchComponent'>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					onSearch(value);
				}}
			>
				<input
					type='text'
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<HiMiniMagnifyingGlass
					style={{ cursor: "pointer" }}
					size={30}
					onClick={() => onSearch(value)}
				/>
			</form>
		</div>
	);
}

export default SearchComponent;
