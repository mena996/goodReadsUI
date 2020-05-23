import React, {useState, useEffect} from 'react';
import { Link , NavLink } from 'react-router-dom';
import BookRate from './RateResults';
import Reviews from './Reviews';
import ReviewForm from './Reviewform'; 
import { UserContext } from "../App";
import Popup from "reactjs-popup";

const Book = ({match: { params: { id } } })=> {
    const [book, setBook] = useState({ book: {}, error: null, isloaded: false })
    const [reviews,setReviews] = useState ({reviews: [], error:null , isloaded: false})
    const { user } = React.useContext(UserContext);
    const user_id = user? user.user._id: null
    const [open, setOpen] = useState(false)

    
    useEffect(()=>{
        fetch(`http://localhost:5000/books/${id}`)
            .then(res => res.json())
            .then(
              (result) => {
                    setBook({book:result, error:null, isloaded: true})
              },
              (error) => {
                    setBook({book:{}, error: error, isloaded: true})
              }
            )  

            fetch(`http://localhost:5000/reviews/${id}`)
            .then(res => res.json())
            .then(
              (result) => {
                    setReviews({reviews:result, error:null, isloaded: true})
              },
              (error) => {
                    setReviews({reviews:[], error: error, isloaded: true})
              }
            )  
    }, [])
    
    const submitHandler = (text, mode,book_id)=>{
        if(!user_id){
           setOpen(true)    
        }else{
            switch(mode){
                case "add":
                    fetch("http://localhost:5000/reviews",
                    {
                        method: "post",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            review:text,
                            book: id,
                            user: user_id,
                        }),
                    })
                    .then(res => res.json())
                    .then(
                    (result) => {
                        setReviews({reviews:[...reviews.reviews,result], error:null, isloaded: true})
                    },
                    (error) => {
                        alert("cannot add review! something went wrong\nnote:'You cannot send empty review'")
                    })
                    break
                case "edit":
                    fetch(`http://localhost:5000/reviews/${book_id}`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            review:text
                        }),
                    })
                    .then(res => res.json())
                    .then(
                    (result) => {
                        const newRev = reviews.reviews.map(review=>{
                            if(review._id == result._id) review = result
                            return review
                        })            
                        setReviews({reviews:newRev, error:null, isloaded: true})
                    },
                    (error) => {
                        alert("cannot edit this reviw! something went wrong\nnote:'You cannot send empty review'")
                    })
                }
            } 
        } 
    

    const deleteHandler = (id)=>{
        fetch(`http://localhost:5000/reviews/${id}`,{ method: "delete"})
        .then(res => res.json())
        .then(
          (result) => {
            const newRev = reviews.reviews.filter(review=>review._id != result._id)            
            setReviews({reviews:newRev, error:null, isloaded: true})
          },
          (error) => {
                alert("something went wrong")
          })
    }
    // ------------ render

    if (book.error) {
        return <div style={{
                            position: 'absolute', left: '50%', top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}> 404|Error </div>
    }else if(!book.isloaded) {
        return <div style={{
                            position: 'absolute', left: '50%', top: '50%',
                            transform: 'translate(-50%, -50%)'
                        }}>Loading... </div>
    }else {
        return (
        <div className="container">
            <Popup
                open={open}
                modal
                closeOnDocumentClick>
                <>
                    <a className="close" onClick={()=>setOpen(false)}>&times;</a>
                    <div className="container p-2">
                        <h5 className="text-center">WARNNING </h5>
                        <hr/>
                        <p>You have to Login first</p>
                        <hr/>
                        <div className="text-center">
                            <NavLink activeClassName="btn btn-info mr-2" to="/"> Login page </NavLink>
                            <button className="btn btn-dark ml-2" onClick={()=>setOpen(false)}>Close</button>
                        </div>
                    </div>
                </>
            </Popup>
            {/* Author section */}
            <div className="row mt-4">
                <div className="col-3">
                <div className="card" style={{width:"100%", height:"265px"}}>
                    <img className="card-img-top" src={book.book.image} alt="Card image"/>
                </div>
                </div>
                <div className="col-9">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">{book.book.name}</h4>
                            <hr/>
                            <div className="card-text">
                            <strong>By : </strong> &nbsp;<Link to={`/author/${book.book.author._id}`}>{book.book.author.firstName}&nbsp;{book.book.author.lastName}</Link>
                            <br/>
                            <strong>Category : </strong> &nbsp;<Link to="#">{book.book.category.name}</Link>
                            <br/>
                            <BookRate id={id}/>
                            </div>
                            <p className="card-text">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* reviews section */}
            {/* review form */}
            <div className="card  mt-5">
                <div className="card-header">Add your review review</div>
                <div className="card-body">
                    <ReviewForm submitHandler={submitHandler} review="" mode="add" id=""/>
                </div>
            </div>

            {/* reviews */}
            <div className="card  mt-5">
                <div className="card-header">Book's reviews</div>
                <div className="card-body">
                    <Reviews reviews ={reviews} submitHandler={submitHandler} deleteHandler={deleteHandler} user={user_id}/>
                </div>
            </div>

        </div>
        );
    }
           
}

 
export default Book;