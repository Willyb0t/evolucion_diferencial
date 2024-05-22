import React from "react";
import Sidebar from "../components/Sidebar";
import Frames from "../components/Frames";

const Home = () => {
  return (
    <div className="row">
      <div className="col">
        <Sidebar/>
      </div>
      <div className="col">
        <div style={{marginLeft:'-350px'}} className="col-mb-1">
          <Frames/>
        </div>
      </div>
    </div>
  )
}

export default Home