import React from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import { Route } from "react-router-dom";
import Search from "./component/Search/Search";
import Home from "./component/Home/Home";
import * as BookApi from "../src/BooksAPI";

class BooksApp extends React.Component {
  state = { allBooks: [] };
  componentDidMount() {
    BookApi.getAll().then(books => {
      this.setState({ allBooks: books });
    });
  }
  onBookChanged = (shelf, book) => {
    BookApi.update(book, shelf).then(res => {
      book.shelf = shelf;
      this.setState(prevState => ({
        ...prevState,
        allBooks: [...prevState.allBooks.filter(x => x.id !== book.id), book]
      }));
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <Home allBooks={this.state.allBooks} onBookChanged={this.onBookChanged} />
          )}
        />
        <Route
          exact
          path="/Search"
          render={() => <Search allBooks={this.state.allBooks} onBookChanged={this.onBookChanged}/>}
        />
      </div>
    );
  }
}

export default BooksApp;
