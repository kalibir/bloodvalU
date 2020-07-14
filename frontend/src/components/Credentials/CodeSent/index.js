import { Link } from "react-router-dom";
import React from "react";

const CodeSent = () => {

  return (
    <div>
        <h2>Registration</h2>
        <p>
          Thanks for your registration. Please check your email for the validation code.
        </p>
              <Link to="">
                <button>Next</button>
              </Link>
    </div>
  );
};

export default CodeSent;
