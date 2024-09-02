import { FaSortAmountUp } from "react-icons/fa";
import { FaSortAmountDown } from "react-icons/fa";
function SortingComponent({ onClick = (f) => f, sortingType }) {
	return (
		<div style={{ paddingTop: 30, width: 30 }} onClick={onClick}>
			{sortingType === "az" ? (
				<FaSortAmountUp color='white' cursor={"pointer"} size={30} />
			) : (
				<FaSortAmountDown color='white' cursor={"pointer"} size={30} />
			)}
		</div>
	);
}

export default SortingComponent;
