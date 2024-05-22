import React,{ useContext, useState } from "react";
import "./style.css";
import recoil from "../assets/recoil.svg";
import { ParamsContext } from "../context/ParamsContext";

function Sidebar() {
  const [isHover, setIsHover] = useState(false);
  const [isClicked, setIsClicked] = useState(">");
  //const [valor, setValor] = useState(4);
  //const [genVal, setGenVal] = useState(3);
  //const [pulsed, setIsPulsed] = useState(false);
  const { boton, setboton, elements, setElements, generaciones, setGeneraciones } = useContext(ParamsContext);
  const change = ()=>{
    setIsHover((prev)=> !prev);
    if (isClicked === ">"){
        setIsClicked("<")
    }else if(isClicked === "<"){
        setIsClicked(">")
    }
  }

  const clicked = () =>{
    setboton(true);
  }
  return (
    <aside style={{alignSelf:'start'}} className={`sidebar ${isHover ? "active" : ""}`}>
      <div className="open-btn" onClick={change}>
        <span className="material-symbols-outlined" id="boton-p">{isClicked}</span>
      </div>
      <div className="wrapper">
        <div className="top__wrapper">
          <div className="header">
            <span className="header-logo">
              <img src={recoil} alt="" />
            </span>
            <div className="header-details">
              <p className="h6">Maria Fernanda Estrada Carbajal</p>
              <p className="h6">Jesus Elian Peralta Chavez</p>
            </div>
          </div>
          <div className="">
              <p className="h6">Universidad Autonoma del Estado de Mexico</p>
          </div>
          <div className="">
              <p className="h6">Ingenieria en Computacion</p>
          </div>
          <div className="">
              <span className="h6">Maestro: Luis Enrique Ledezma Fuentes</span>
          </div>
          <div className="header-details">
              <span className="h6">Tema: Evolucion Diferencial</span>
          </div>
          <p style={{marginTop:'-2px'}} className="h6">Elige el numero de elementos en la familia:</p>
          <div className="search-box">
            <span style={{marginTop:'-7px'}} className=" material-symbols-outlined search-icon">
              Elementos
            </span>
            <input style={{marginTop:'-7px'}} className="" type="range" min={4} max={6} step={1} value={elements} name="NElements" onChange={e => setElements(e.target.value)}/>
          </div>
          <p className="h6">{elements}</p>
          <p style={{marginTop:'-5px'}} className="h6">Elige el numero de generaciones:</p>
          <div className="search-box">
            <span style={{marginTop:'-7px'}} className=" material-symbols-outlined search-icon">
              Generaciones
            </span>
            <input style={{alignContent:'center', marginLeft:'-20px', marginTop:'-7px'}} className="" type="range" min={3} max={5} step={1} value={generaciones} name="NElements" onChange={e => setGeneraciones(e.target.value)}/>
          </div>
          <p className="h6">{generaciones}</p>
          <button value={boton} style={{overflow:'visible', marginTop:'-5px'}} type="button" className="btn btn-outline-warning" onClick={clicked}>Realizar evolucion diferencial</button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;