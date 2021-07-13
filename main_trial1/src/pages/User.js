import { useParams } from "react-router-dom";
import {Route} from "react-router-dom";

import Team2 from "../components/Team2";

import { Link } from "react-router-dom";
import { useAuth } from "./LoginSignup/contexts/AuthContext"
import {db} from "./LoginSignup/firebase.js"
//import a from "./LoginSignup/contexts/AuthContext"
import {useEffect, useRef, useState} from "react";
import { Form, Button, Card, Alert ,Row,Col,Container} from "react-bootstrap"
import firebase from "firebase";
import FinalNav from "../components/FinalNav"
import { Redirect } from "react-router";
import '../App.css'


/*const DUMMY_DATA = [
    { id : 'Saumya', teams: [
        {
            teamID : 'KotaFriends',
            contacts :['Neha', 'Sunanda' , 'Anshika']
        },
        {
            teamID :'SARRR',
            contacts : ['Richa','Riya', 'Anubhuti', 'Radhika']
        }
        
    ]},
    {
        id:'Riya',
        teams: [
            {
                teamID : 'SARRR',
                contacts : ['Richa','Saumya', 'Anubhuti', 'Radhika']
            }
        ]
    }
]*/


const User = () =>{

    //important state variables
    const { currentUser } = useAuth();
    const newTeamRef = useRef();
    //const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [object, setObject]=useState({});
    const params = useParams();


    
    //const object = DUMMY_DATA[params.userID];
    
    //[contacts,setContacts] = setState([]);
    //console.log(object);
    useEffect(()=>{
        db.collection('users').where('email','==',currentUser.email).get().then(obj=>{
            //obj.docs.forEach(doc=>console.log(doc.data()));
            //console.log(obj.docs[0].data());
            setObject(obj.docs[0].data());
        });
    },[])
    

    
    return (<div>
    { currentUser ? (
    <div >
        <FinalNav></FinalNav>
        <Route path="/user/:userID" exact>
        <Container
        className=" align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
    >
            <Card style={{padding: 40 }} className='Welcome2TeamCard'>
            <h1>Welcome to Teams, {object&&object.name}!</h1>
            <h6>Which team page you would like to go to?</h6>
            </Card>
            <Row>
            {object.teams&&object.teams.map((team)=>(
                    <Col><div style={{paddingTop: 40}}>
                        <Link to= {'/user/vc/'+object.email+'/'+team.teamID}>
                        <Button className='team-button'><h5>{team.teamID}</h5></Button>
                        </Link>
                        </div>
                    </Col>
                ))}
            </Row>
            
        </Container>
        </Route>
        
        <Route path= {"/user/vc/:userID/:teamID"}>
            <Team2 object = {object}/>
        </Route>
        
    </div>) : (
        <Redirect to={"/login"}></Redirect>
    )}</div>);
}

export default User;