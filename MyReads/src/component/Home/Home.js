import React, { Component } from "react";
import { Link  } from "react-router-dom";
import { Shelfs } from "../../Constant/constant";
import BookItem from "../BookItem/BookItem";
import PropTypes from "prop-types";

class Home extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  static propTypes = {
    allBooks: PropTypes.array.isRequired,
    onBookChanged:PropTypes.func.isRequired
  };
  componentDidMount() {}

  render() {
    console.log(this.props.allBooks);

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books"></div>
              <ol className="books-grid">
                {this.props.allBooks.map(book => {
                  if (book.shelf === Shelfs.currentRead) {
                    return (
                      <li key={book.id}>
                        <BookItem
                          book={book}
                          onBookChanged={this.props.onBookChanged}
                        />
                      </li>
                    );
                  }
                })}
              </ol>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books"></div>
              <ol className="books-grid">
                {this.props.allBooks.map(book => {
                  if (book.shelf === Shelfs.wantRead) {
                    return (
                      <li key={book.id}>
                        <BookItem
                          book={book}
                          onBookChanged={this.props.onBookChanged}
                        />
                      </li>
                    );
                  }
                })}
              </ol>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books"></div>
              <ol className="books-grid">
                {this.props.allBooks.map(book => {
                  if (book.shelf === Shelfs.read) {
                    return (
                      <li key={book.id}>
                        <BookItem
                          book={book}
                          onBookChanged={this.props.onBookChanged}
                        />
                      </li>
                    );
                  }
                })}
              </ol>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/Search">
            {" "}
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
