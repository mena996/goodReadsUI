import React from "react";

 const Buttons = (props)=> {

        return (
                <div className="wrapper">
                <ul className="list-unstyled components" id="buttons">
                    <li>
                        <button type="button"className="btn btn-info" onClick={()=>{ props.handleState(0);}} >All</button>
                    </li>
                    <li>
                        <button type="button" className="btn btn-info" onClick={()=>{ props.handleState(1);}} >Read</button>
                    </li>
                    <li>
                        <button type="button" className="btn btn-info">Currently Reading</button>
                    </li>
                    <li>
                        <button type="button" className="btn btn-info">Want To Read</button>
                    </li>
                </ul>
                </div> 
        )

}
export default Buttons;
