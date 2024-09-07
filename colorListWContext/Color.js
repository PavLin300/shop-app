import StarRating from "./StarRating";
import { FaTrash } from "react-icons/fa";
import { useColors } from "./color-hooks";


function Color({id, title, color, rating}){
    const {rateColor, removeColor} = useColors(); // получаем функции для оценки и удаления
    return (
        <section>
            <h1>{title}</h1>
            <button onClick={()=>removeColor(id)}>
                <FaTrash/>
            </button>
            <div style={{height: 80, width: 500, background: color, textAlign: 'center'}}>
                <StarRating
                    selectedStars={rating}
                    onRate={(rating)=>rateColor(id, rating)}
                />
            </div>
        </section>
    );
}

export default Color;