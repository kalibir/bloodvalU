import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const BtnContainer = styled.div`
  width: 64px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  padding: 4px;
  border: ${(props) => (props.active ? "2px solid #43A047" : "2px solid #D33449")};
  transition: all 0.5s;
  background-color: ${(props) => (props.active ? "#43A047" : "none")};
  cursor: pointer;
`;

const ToggleBtn = styled.button`
  width: 16px;
  height: 16px;
  background: ${(props) => (props.active ? "white" : "#D33449 ")};
  border: none;
  border-radius: 50%;
  transform: ${(props) => (props.active ? "translate(34px, 0)" : "translate(0, 0)")};
  transition: 0.5s;
  cursor: pointer;
`;

const ToggleButton = () => {
  const [active, toggleActive] = useState(false);
  const activeHandler = (e) => {
    toggleActive(!active);
  };
  return (
    <BtnContainer active={active}>
      <ToggleBtn active={active}></ToggleBtn>
    </BtnContainer>
  );
};

export default ToggleButton;
