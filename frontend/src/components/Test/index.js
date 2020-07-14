import React from "react";
import {
    ChooseRoleButton,
    DarkBlueButton
} from "../../style/GlobalButtons";
import {BaseInput, BigInput} from "../../style/GlobalInputs";
import {BlackTitle, RedTitle} from "../../style/GlobalTitles";
import {PageContainer} from "../../style/GlobalWrappers";
import {BigBloodTypeIcon} from "../../style/GlobalIcons";


function Template(props) {
  return (
      <PageContainer>
          <br></br>
        <RedTitle>RedTitle</RedTitle>
          <BigBloodTypeIcon>O-</BigBloodTypeIcon>
        <br></br>
       <DarkBlueButton>Confirm</DarkBlueButton>
          <p>.</p>
          <BaseInput placeholder="some text"/>
          <br></br>
          <BigInput placeholder="placeholder"/>
          <br></br>
          <ChooseRoleButton>Becoming a donor</ChooseRoleButton>
          <BlackTitle>BlackTitle</BlackTitle>
      </PageContainer>
  );
}

export default Template;
