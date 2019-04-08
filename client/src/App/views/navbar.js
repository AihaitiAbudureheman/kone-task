import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.take = this.take.bind(this);

    this.state = {
      term: ""
    };
  }

  take = e => {
    return this.setState({ term: e.target.value });
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
          Kone Task
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to={"/"} className="nav-link">
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add more
              </Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0" onSubmit={this.searchIt}>
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Equipment number...Etc 764343298"
              aria-label="Search"
              id="search"
              value={this.state.term}
              onChange={this.take}
              name="term"
            />
            <Link to={`/details/${this.state.term}`} className="nav-link">
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                type="button"
              >
                Search
              </button>
            </Link>
          </form>
        </div>
      </nav>
    );
  }
}
export default Navbar;
