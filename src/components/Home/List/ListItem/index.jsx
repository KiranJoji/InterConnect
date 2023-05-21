import React from 'react';
import './styles.css';

const ListItem = ({
  item: { photoURL, displayName, gender, year, age },
}) => (
  <div className='listItem-wrap'>
    <img src={photoURL} alt='' />
    <header>
      <h4>{displayName}</h4>
      <span>{gender}</span>
    </header>
    <footer>
      <p>
        <b>Year: {year} </b> 
      </p>
      <p>
        <b>Age: {age}</b> 
      </p>
    </footer>
  </div>
);

export default ListItem;
