import { Form, Button, Card, Alert ,Row,Col,Navbar, Nav} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.css';
//import {Link} from 'react-router-dom'
import { useAuth } from "../pages/LoginSignup/contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { useState } from "react";

//navigation bar component

function FinalNav(){
    //important state variables
    const [error,setError] = useState();
    const { logout,currentUser } = useAuth()
    const history = useHistory()

    //logout function

    async function handleLogout() {
        setError("")
    
        try {
          await logout()
          history.push("/login")
        } catch {
          setError("Failed to log out")
        }
      }

   return(
    
    <Navbar bg="dark" variant="dark">
       <Navbar.Brand>
           MyClone
       </Navbar.Brand>
       <Nav  class = "navbar-nav ml-auto" >
           <Button variant="link" onClick={handleLogout} style={{backgroundColor:"grey"}}>LogOut</Button>
       </Nav>
       
       <Nav>
           <Link to ={'/user/'+currentUser.email} style={{paddingLeft:40, color:"white"}}>Home</Link>
       </Nav>
    </Navbar>

   )
}

export default FinalNav;