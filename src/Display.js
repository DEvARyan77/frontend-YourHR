import { useState,useEffect } from "react"
import Login from "./Login"
import Signup from "./Signup"
import './Display.css'

function Display({displayed}){
    const [display,setDisplay] = useState(displayed)
    const [element,setelement] = useState(null)
    function move(e){
        const image = document.getElementById(e.target.id+'UFO')
        let space =  0;
        if(e.target.value.length<24){
            space = (e.target.value.length)*8
        }
        else if(e.target.value.length>=24){
            space = 24*8
        }
        image.style.transform = `translateX(${space}px)`
    }
    useEffect(() => {
        if (display === 0) {
            setelement(<Login move = {move}/>);
        } else {
            setelement(<Signup move = {move} />);
        }
    }, [display]);
    return(
        <div >
            <div id="mainDiv">
                <div id="EntryDiv">
                    {element}
                </div>
                <div id="question">
                    {display===0 && <p>Don't have an account? <span onClick={()=>setDisplay(1)} style={{cursor:'default'}}>Signup</span></p>}
                    {display===1 && <p>Have an account? <span onClick={()=>setDisplay(0)} style={{cursor:'default'}}>Login</span></p>}
                </div>
            </div>
        </div>
    )
}

export default Display
