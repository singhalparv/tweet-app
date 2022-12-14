import { Modal } from "bootstrap";
import { useEffect, useState } from "react"
import { Card, Container, ModalBody, ModalHeader } from "react-bootstrap";
import { FaUserSecret } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Menu from "./NavBar"
import { ShowUserList } from "./ShowUsersList";
export function ViewAllUsers()
{
    let username=''
    let[usersList,setusersList]=useState([])
    let location =useLocation();
    let navigate=useNavigate();
    function fetchallUsers(){
        fetch(`getallusers`,{
            method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
        }).then((res)=>{
            return res.json()
        }).then(data=>{
            usersList=data;
            setusersList(usersList)
        })
    }
    useEffect(()=>{
        fetchallUsers()
    },[])
    console.log(usersList)
    return(
        <div>
        <Menu/>
        <h1>All Users</h1>
        <Container>
        {
            usersList.map(function(user,index){
                return(
                <ShowUserList users={user}></ShowUserList>
                )
                }
            )
        }
        </Container>
        </div>
    )
}