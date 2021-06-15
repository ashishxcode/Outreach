import React, { Fragment } from "react";
import spinner from "../../img/spinner.gif";

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: "50px", margin: "auto", display: "block" }}
        alt='Loading...'
      />
    </Fragment>
  );
};

export default Spinner;
