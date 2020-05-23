import React, {useState, useEffect} from 'react';
import StarRatingComponent from 'react-star-rating-component';

const BookRate = (props)=> {
    const id = props.id
    const [rate, setRate] = useState({ rate: [], error: null, isloaded: false })

    useEffect(()=>{      
            // fetch(`http://localhost:5000/books/rate/${id}`)
            // .then(res => res.json())
            // .then(
            //   (result) => {
            //         setRate(result)
            //   },
            //   (error) => {
            //       console.log(error)
            //   }
            // )

    }, [])

    return (
        <div className="d-flex">
        <div>
              <StarRatingComponent
                name="staticRate"
                value={parseInt(rate.rate)|| 0}
                editing={false}
                renderStarIcon={() => <span className="fa fa-star"></span>}
              />
        </div>
        <div>  &nbsp;  &nbsp;-  {rate.count|| 0} rates</div>
        </div>
        )

    }
                      

 
export default BookRate;