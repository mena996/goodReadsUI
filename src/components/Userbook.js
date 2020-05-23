import React, {useState, useEffect} from 'react';
import Buttons from './Buttons';
import axios from 'axios';
import { UserContext } from "../App";

const Userbook = () => {
  const { user } = React.useContext(UserContext);
    console.log("userbook",user?.user?.username);
    const [userBook, setUserBook] = useState([]);
    const user = React.useContext(UserContext);
    console.log(user)
    useEffect(()=>{
        axios.get('http://localhost:5000/books/shelf/5ec44c25e2ca3c6021d28b61').then((res)=>{
            setUserBook(res.data);
            console.log(res.data);
        });
    }, []);
    return ( 
        <div className="container col-12">
            <div className="row m-1">
            <div>
            <Buttons/>
            </div>
            <div>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Cover</th>
                    <th scope="col">Name</th>
                    <th scope="col">Author</th>
                    <th scope="col">Avg Rate</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Sheleve</th>
                    </tr>
                </thead>
                <tbody>
                {
                    userBook.map(userbook=>{
                        return(
                            <tr>
                            <td>{userbook.book.image}</td>  
                            <td>{userbook.book.name}</td>
                            <td>{userbook.book.author.firstName +" "+userbook.book.author.lastName}</td>
                            <td>3</td>
                            <td>5</td>
                            <td>3</td>
                            </tr>
                        )
                         } )
                }
                </tbody>
            </table>
            </div>
        </div>
        </div>
     );
}
 
export default Userbook;