import React, { useState } from 'react'

export default function Comment(props) {

  const asin = props.asin;
  console.log(asin);  
  let newRating = 0;
  let newText = '';
  function setNewRating(e)
  {
    newRating = e.target.value;
  }

  async function modComment(comment,rate)
  {
    const ENDPOINT = `https://striveschool-api.herokuapp.com/api/comments/` + asin ;


    let commentData = 
    {
      "comment": comment,
      "rate": rate,
      "elementId": asin,

    }

    const rawResponse = await fetch(ENDPOINT, {
      method: "PUT",
      headers: {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY3MmMyMjY0NGYxYjAwMTk1MmRmNjYiLCJpYXQiOjE3MTIwNjQyODYsImV4cCI6MTcxMzI3Mzg4Nn0.hH8z3VA8xb-jRgHYlaHokMNaA78h0TkPUP6ziV8Mick",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentData)
      
    });
    const content = await rawResponse.json();
  
    console.log(commentData);
  }

  async function delComment(asin)
  {
    console.log(asin);
    const ENDPOINT = `https://striveschool-api.herokuapp.com/api/comments/` + asin ;

    const rawResponse = await fetch(ENDPOINT, {
      method: "DELETE",
      headers: {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY3MmMyMjY0NGYxYjAwMTk1MmRmNjYiLCJpYXQiOjE3MTIwNjQyODYsImV4cCI6MTcxMzI3Mzg4Nn0.hH8z3VA8xb-jRgHYlaHokMNaA78h0TkPUP6ziV8Mick",
        'Content-Type': 'application/json'
      },
     
      
    });
    const content = await rawResponse.json();
  }

  const [selComm, setSelComm] = useState(false);
  const handleSelCom = () => {
    setSelComm(!selComm);
  }
  return (
    
    <div>
    <h4 style={{color: "red"}}>
      {props.comment.author}
    </h4>
    <h5 style={{color: "gold"}}>
      {props.comment.rate} stars
    </h5>
    <h6 onClick={handleSelCom}>
      {props.comment.comment}
    </h6>
    {selComm &&
      <>
        <textarea>

        </textarea>
        <div onChange={setNewRating}>
            <input type="radio" value="1" name="rating" /> 1
            <input type="radio" value="2" name="rating" /> 2
            <input type="radio" value="3" name="rating" /> 3
            <input type="radio" value="4" name="rating" /> 4
            <input type="radio" value="5" name="rating" /> 5
        </div>
        <button onClick={() => {
        
        let text = document.getElementsByTagName('textarea')[0];
        
        if(text){
          newText = text.value; 
          console.log("PUT", text.value , newRating);
          modComment("PUT",newText,newRating)
        }
        }}>
         Modify
      
        </button>

        <button onClick={() => {
          delComment(asin);
        }}>
         Delete
      
        </button>
      </>
     
    }
    </div>
 
  )
}
