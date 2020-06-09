import React, { Fragment } from "react";
import PropTypes from 'prop-types';

BookItem.propTypes = {
  onBookChanged: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired
}
export default function BookItem(props) {
  const handleChange = (shelf,book) => {
    onBookChanged(shelf,book)
  }
  const {book, onBookChanged,shelf } = props;
  return  (
  <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks?book.imageLinks.thumbnail:null}")` }}></div>
      <div className="book-shelf-changer">
        <select defaultValue={book.shelf?book.shelf:shelf}  onChange={(e) => handleChange(e.target.value,book)}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
  <div className="book-title">{book.title}</div>
    <div className="book-authors">{book.authors?book.authors.map(name=> <Fragment key={Math.random()}>{name}<br/></Fragment>):"no authors"}</div>
  </div>);
}
