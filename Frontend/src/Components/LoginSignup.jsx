import React from "react"
import "../CSS/features.css"
import "../CSS/utility.css"
import { Link } from "react-router-dom";



function LoginSignup() {
  

  return (
    <>
      <h1 className="center heading">Login / Signup</h1>

<div>
  <div className="login">
    

      <div className="ag-courses_item">
        
        <Link to="/login" className="ag-courses-item_link">
          <div className="ag-courses-item_bg"></div>
  
          <div className="ag-courses-item_title">
            <div>
              <img src="/static/svg/components/filter.svg" alt="" width="40px" className="invert"/>
            </div>
            Login
          </div>
  
          <div className="ag-courses-item_date-box">
            Login to Mecha AI to Axcess all the features
          </div>
        </Link>
      </div>

      <div className="ag-courses_item">
        <a href="/signup" className="ag-courses-item_link">
          <div className="ag-courses-item_bg"></div>
  
          <div className="ag-courses-item_title">
            <div>
              <img src="/static/svg/components/crop.svg" alt="" width="40px" className="invert"/>
            </div>
            Signup
          </div>
  
          <div className="ag-courses-item_date-box">
            Create an account on Mecha AI
          </div>
        </a>
      </div>

    
  </div>
  
  
</div>   

    </>
  )
}

export default LoginSignup
