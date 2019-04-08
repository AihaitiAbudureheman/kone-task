import React, { Component } from "react";
import Nav from "../views/navbar";
import Banner from "../views/banner";
import { withRouter } from "react-router-dom";
import Alert from "../views/alert";

class Add extends Component {
  constructor(props) {
    super(props);
    this.take = this.take.bind(this);
    this.publish = this.publish.bind(this);
    this.gotoHome = this.gotoHome.bind(this);

    this.state = {
      equipmentNumber: "",
      address: "",
      contractStartDate: "",
      contractEndDate: "",
      status: "",
      saved: true
    };
  }

  gotoHome = () => {
    this.props.history.push("/");
  };

  take = e => {
    switch (e.target.name) {
      case "equipmentNumber":
        return this.setState({ equipmentNumber: e.target.value });
      case "address":
        return this.setState({ address: e.target.value });
      case "contractStartDate":
        return this.setState({ contractStartDate: e.target.value });
      case "contractEndDate":
        return this.setState({ contractEndDate: e.target.value });
      case "status":
        return this.setState({ status: e.target.value });
      default:
        return this.setState({
          equipmentNumber: "",
          address: "",
          contractStartDate: "",
          contractEndDate: "",
          status: ""
        });
    }
  };

  publish = () => {
    const asset = {
      equipmentNumber: this.state.equipmentNumber,
      address: this.state.address,
      contractStartDate: this.state.contractStartDate,
      contractEndDate: this.state.contractEndDate,
      status: this.state.status
    };

    fetch("/kone-task/equipment", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "omit",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(asset)
    })
      .then(res => res.json())
      .then(res => {
        this.gotoHome();
        this.setState({ saved: true });
        console.log("saved successfully.");
      })
      .catch(err => {
        this.setState({ saved: false });
        console.log("Saving error...", err);
      });
  };

  render() {
    return (
      <div className="App">
        <Nav />
        <Banner
          title="Add More Assets"
          subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        />
        {!this.state.saved ? <Alert /> : null}
        <form>
          <div className="form-row m-2">
            <div className="col-md-4 mb-3">
              <label>Equipment number</label>
              <input
                type="text"
                className="form-control"
                id="validationDefault01"
                placeholder="wse234590876"
                value={this.state.equipmentNumber}
                onChange={this.take}
                name="equipmentNumber"
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Address</label>
              <input
                type="text"
                className="form-control"
                id="validationDefault02"
                placeholder=""
                value={this.state.address}
                onChange={this.take}
                name="address"
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label>Contract start date</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="validationDefaultUsername"
                  placeholder=""
                  aria-describedby="inputGroupPrepend2"
                  value={this.state.contractStartDate}
                  onChange={this.take}
                  name="contractStartDate"
                  required
                />
              </div>
            </div>
          </div>
          <div className="form-row m-2">
            <div className="col-md-6 mb-3">
              <label>Contract end date</label>
              <input
                type="text"
                className="form-control"
                id="validationDefault03"
                placeholder=""
                value={this.state.contractEndDate}
                onChange={this.take}
                name="contractEndDate"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Status</label>
              <input
                type="text"
                className="form-control"
                id="validationDefault04"
                placeholder=""
                value={this.state.status}
                onChange={this.take}
                name="status"
                required
              />
            </div>
          </div>
          <button
            className="btn btn-success"
            type="button"
            onClick={this.publish.bind(this)}
          >
            Add Asset
          </button>
        </form>
      </div>
    );
  }
}
export default withRouter(Add);
