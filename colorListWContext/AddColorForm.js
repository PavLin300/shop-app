import { useState } from "react";
import { useColors } from "./color-hooks";

function AddColorForm({onNewColor = f=>f}) {
    const {addColor} = useColors(); // получаем функцию для добавления
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("#000000");
    const submit = (event)=>{
        event.preventDefault();
        addColor(title, color);
        setTitle("");
        setColor("#000000");
    }
    return (  
        <form onSubmit={submit}>
            <input 
                type="text" 
                value={title}
                onChange={event=>setTitle(event.target.value)}
                required
                placeholder="color title"
            />
            <input 
                type="color" 
                value={color}
                onChange={event=>setColor(event.target.value)}
                required
            />
            <button>Add Color</button>
        </form>
    );
}

export default AddColorForm;