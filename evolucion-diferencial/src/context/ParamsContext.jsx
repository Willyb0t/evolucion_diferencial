import React, {useState, createContext} from "react";

export const ParamsContext = createContext();

export const ParamsContextProvider = props => {
    const [elements,setElements] = useState(4);
    const [generaciones, setGeneraciones] = useState(3);
    const [boton, setboton] = useState(false);

    return(
        <ParamsContext.Provider value={{elements,setElements, generaciones, setGeneraciones, boton, setboton}}>
            {props.children}
        </ParamsContext.Provider>
    )
}