import React from 'react'

const index = (props) => {
  return (
  <section className="section">
      <h2>Descripción</h2>
      <div className="description" dangerouslySetInnerHTML={{__html:props.des}}>
      </div>
  </section>)
}


export default index;
