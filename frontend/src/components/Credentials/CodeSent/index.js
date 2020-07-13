import {Link} from "react-router-dom";
import React from "react";

const CodeSent = () => {

  return (
    <div>
        <h2>Registration</h2>
        <p>
          Thanks for your registration.
          <br />
          Our hard working monkeys are preparing a digital
          <br /> message called E-Mail that will be sent to you soon.
          <br />
          Since monkeys aren't good in writing the message could
          <br /> end up in your junk folder. Our apologies for any
          <br /> inconvenience.
        </p>
              <Link to="">
                <button>Next</button>
              </Link>
    </div>
  );
};

export default CodeSent;
