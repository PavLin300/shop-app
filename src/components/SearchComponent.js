import "../styles/searchComponent.css";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
function SearchComponent({ value, onSearch = (f) => f }) {
	return (
		<div className='searchComponent'>
			<form
				onSubmit={(event) => {
					event.preventDefault();
				}}
			>
				<input type='text' value={value} onChange={onSearch} />
				<HiMiniMagnifyingGlass style={{ cursor: "pointer" }} size={30} />
			</form>
		</div>
	);
}

export default SearchComponent;
