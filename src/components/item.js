import React, { Component } from 'react';

const Item = (props) => {
  return(
      <tr>
        <td>{props.make}</td>
        <td>{props.model}</td>
        <td>{props.price}</td>
      </tr>
  );
};



export default Item;