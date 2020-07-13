import React from "react";
import { css } from "@emotion/core";
import ScaleLoader from "react-spinners/ScaleLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Spinner = () => {
  return (
    <ScaleLoader
      css={override}
      height={95}
      width={10}
      color={"#E47D31"}
      loading
    />
  );
};

export default Spinner;
