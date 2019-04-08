import React, { Component } from "react";
import Nav from "../views/navbar";
import Banner from "../views/banner";

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: []
    };
  }

  // Fetch the single equipment details on first mount
  componentDidMount() {
    const equipmentNo = this.props.match.params.eqno;
    this.getAssetDetails(equipmentNo);
  }

  componentDidUpdate(prevProps, prevState) {
    // only update table if the data has changed
    if (prevProps.match.params.eqno !== this.props.match.params.eqno) {
      this.getAssetDetails(this.props.match.params.eqno);
    }
  }

  getAssetDetails = arg => {
    fetch(`/kone-task/equipment/${arg}`)
      .then(res => res.json())
      .then(res => this.setState({ detail: res }));
  };

  render() {
    const { docs } = this.state.detail;
    if (docs === undefined) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <Nav />
          <Banner
            title="Check The Details of the Selected Asset"
            subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          />
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Equipment number
              <span className="badge badge-light badge-pill">
                {docs[0].equipmentNumber}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Address
              <span className="badge badge-light badge-pill">
                {docs[0].address}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Contract start date
              <span className="badge badge-light badge-pill">
                {docs[0].contractStartDate}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Contract end date
              <span className="badge badge-light badge-pill">
                {docs[0].contractEndDate}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Status
              {docs[0].status === "Running" ? (
                <span className="badge badge-success badge-pill">
                  {docs[0].status}
                </span>
              ) : (
                <span className="badge badge-danger badge-pill">
                  {docs[0].status}
                </span>
              )}
            </li>
          </ul>
        </div>
      );
    }
  }
}

export default Details;
