import Color from "./Color";
import { useColors } from "./color-hooks";

function ColorList(){
    const {colors} = useColors(); // получаем цвета
    if(!colors.length) return <div>No Colors Listed.</div>;
    return (
        <div className="color-list">
            {
                colors.map((color)=>(
                    <Color key={color.id} {...color}/>
                ))
            }
        </div>
    );

}

export default ColorList;