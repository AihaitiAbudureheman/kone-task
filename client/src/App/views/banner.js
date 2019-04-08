import React from "react";

export default props => {
  return (
    <div className="jumbotron">
      <div className="container">
        <h1>{props.title}</h1>
        <p>{props.subtitle}</p>
      </div>
    </div>
  );
};
