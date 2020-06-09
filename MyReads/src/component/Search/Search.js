import React, { Component } from "react";
import { Link } from 'react-router-dom'
import * as BookApi from "../../BooksAPI";
import BookItem from "../BookItem/BookItem";
import PropTypes from "prop-types";

class Search extends Component {
  static propTypes = {
    allSelectedBooks: PropTypes.array,
    results: PropTypes.array,
    onBookChanged: PropTypes.func.isRequired,
    searchQuery: PropTypes.string

  };
  state = {
    allSelectedBooks: [],
    results: [],
    searchQuery: ""
  }
  searchQuery = (query) => {
    console.log(query)
    this.setState({ searchQuery: query, allSelectedBooks: this.props.allBooks }, this.searchBooks)
  }
  rememberShelfs(result) {
    result.forEach(allBooks => {
      let selectedBooks = this.state.allSelectedBooks.filter(Book => Book.id === allBooks.id)
      selectedBooks.map((e) => {
        return allBooks.shelf = e.shelf
      })
    })
  }
  searchBooks() {
    if (this.state.searchQuery === '' || this.state.searchQuery === undefined) {
      return this.setState({ results: [] })
    }
    if (this.state.searchQuery.trim().length > 0) {
      BookApi.search(this.state.searchQuery.trim())
        .then(result => {
          if (result.error) {
            return this.setState({ results: [] })
          }
          else {
            this.rememberShelfs(result);
          }
          this.setState({ results: result })
        })
    }
  }


  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>

          <div className="search-books-input-wrapper">
            {/*
                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                You can find these search terms here:
                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text" placeholder="Search by title or author" value={this.state.searchQuery}
              onChange={(event) => {
                this.searchQuery(event.target.value)
              }} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchQuery !== "" && this.state.results.map((book) =>
              <BookItem key={book.id} onBookChanged={this.props.onBookChanged} shelf="none" book={book} />)}
            {/* { this.state.searchQuery===""||this.state.results.length<=0&&<p>No search result for this query try again</p>} */}

          </ol>
        </div>
      </div>
    );
  }
}
export default Search;

