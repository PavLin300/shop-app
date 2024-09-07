import { useState } from "react";
import { ColorContext } from "./color-hooks";
import {v4} from "uuid";
import colorData from "./color-data.json";
import { useEffect } from "react";

function ColorProvider({children}) {
    const [colors, setColors] = useState(colorData);

    const addColor = (title, color)=>{
        const newColors = [...colors, {title, color, id:v4(), rating: 0}];
        setColors(newColors);
    }

    const rateColor = (id, rating)=>{
        const newColors = colors.map((color)=>color.id === id ? {...color, rating} : color);
        setColors(newColors);
    }

    const removeColor = (id)=>{
        const newColors = colors.filter((color)=>color.id !== id);
        setColors(newColors);
    }

    useEffect(()=>{
        alert("Срабатывает после каждого рендеринга");
    })

    useEffect(()=>{
        alert("Срабатывает после изменения значения colors");
    },[colors])

    useEffect(()=>{
        alert("Срабатывает только раз при первом рендеринге");
        return ()=>alert("Сработает при удалении компонента");
    },[])
    
    return (  
        // используем провайдер контекста и передаем объект с массивом цветов и функциями 
        <ColorContext.Provider value={{colors, addColor, rateColor, removeColor}}> 
            {children}
        </ColorContext.Provider>
    );
}

export default ColorProvider;