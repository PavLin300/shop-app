import { createContext, useContext } from "react";

const ColorContext = createContext(); // создаем контекст

const useColors = ()=>useContext(ColorContext); // создаем кастомный хук, который возвращает объект с контекста

export {ColorContext, useColors}