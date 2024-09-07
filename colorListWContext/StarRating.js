import { FaStar } from "react-icons/fa";


const createArray = (length)=>[...Array(length)]; // создаем массив заданой длины 


const Star = ({selected = false, onSelect = f=>f}) => ( // функция по умолчанию простая заглушка
    <FaStar 
        color={selected ? "orange": "grey"} 
        onClick={onSelect}
        style={{width: '50px', height:'50px', cursor : 'pointer'}}
    />
)


function StarRating({totalStars = 5, selectedStars = 0, onRate = f=>f}){
    return(
        <>
            {
                createArray(totalStars).map((n,i) => //по сути массив нам нужен для итераций и метода map, который вернет нам компоненты Star
                    <Star 
                        key={i} 
                        selected={selectedStars > i} // устанавливаем выбрана звезда или нет в зависимости от индекса
                        onSelect={()=>onRate(i+1)}// эта функция сработает первой вызывая функцию onRate 
                    />
                )
            }
            <div>
                <span>{selectedStars} of {totalStars} stars</span>
            </div>
        </>
    );
}

export default StarRating;