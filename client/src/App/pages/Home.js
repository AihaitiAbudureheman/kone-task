import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Nav from "../views/navbar";
import Banner from "../views/banner";
import { DEFAULT_SEARCH_LIMIT } from '../../config';

class Home extends Component {
  // Initialize the state
  constructor(props) {
    super(props);
    this.state = {
      assets: []
    };
    this.gotoDetails = this.gotoDetails.bind(this);
  }

  // Fetch the assets on first mount
  componentDidMount() {
    this.getAssets();
  }

  gotoDetails = (item) => {
    this.props.history.push(`/details/${item}`);
  }

  /**
   * Fetch assets collections based on limit
   */
  getAssets = () => {
    fetch(`/kone-task/equipment/search?limit=${DEFAULT_SEARCH_LIMIT}`)
      .then(res => res.json())
      .then(res => this.setState({ assets: res }));
  };
  render() {
    //Use this when connect to the real DB
    const { assets } = this.state;
    return (
      <div className="App">
        <Nav />
        <Banner
          title="Welcomne Onboard!"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Equipment number</th>
              <th scope="col">Address</th>
              <th scope="col">Contract start date</th>
              <th scope="col">Contract end date</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((item, index) => (
              <tr onClick={this.gotoDetails.bind(this, item.equipmentNumber)} key={item.equipmentNumber}>
                <th scope="row">{index}</th>
                <td>{item.equipmentNumber}</td>
                <td>{item.address}</td>
                <td>{item.contractStartDate}</td>
                <td>{item.contractEndDate}</td>
                <td>{item.status === "Running" ? (
                <span className="badge badge-success badge-pill">
                  {item.status}
                </span>
              ) : (
                <span className="badge badge-danger badge-pill">
                  {item.status}
                </span>
              )}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default withRouter(Home);
