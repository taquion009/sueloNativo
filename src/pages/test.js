import React from "react";
import axios from 'axios';

const Test = () => {
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post("/api/update-stock",
      {
        id:17941756769
      }
      ).then((data) => {
          console.log(data.data)
      })
      .catch((error) => {
          console.log(error)
        });
  };
  
    return (
      <>
        <h1>Test</h1>
        <form onSubmit={handleSubmit}>
          <button type="submit">Submit</button>
        </form>
      </>
    );
    
}

export default Test;