import React from 'react';
import './styles.css';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom";


const SearchBar = ({ value, changeInput, chatFriends }) => (
  <div className='searchBar-wrap'>
    <SearchIcon className='searchBar-icon' />
    <input
      type='text'
      placeholder='Name'
      value={value}
      onChange={changeInput}
    />
    <button className="chatbtn" onClick={ chatFriends }>Chat</button>
  </div>
);

export default SearchBar;
