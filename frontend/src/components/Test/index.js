import React from "react";
import {
    ChooseRoleButton,
    DarkBlueButton, WhiteButton
} from "../../style/GlobalButtons";
import {BigInput, SmallInput} from "../../style/GlobalInputs";
import {BigTitle, MiddleTitle, SmallTitle} from "../../style/GlobalTitles";
import {PageContainer} from "../../style/GlobalWrappers";
import GenericDonorTestCard from "../GenericDonorTestCard";


function Template(props) {
  return (
      <PageContainer>
          <br></br>
        <SmallTitle>RedTitle</SmallTitle>
          <BigTitle>First Page Title</BigTitle>
          <GenericDonorTestCard/>
          <WhiteButton>Back</WhiteButton>
        <br></br>
       <DarkBlueButton>Confirm</DarkBlueButton>
          <p>.</p>
          <BigInput type="text" placeholder="Street"/>
          <SmallInput type="text" placeholder="Country"/>
          <br></br>
          <ChooseRoleButton>Becoming a donor</ChooseRoleButton>
          <MiddleTitle>Your registration is now complete!</MiddleTitle>
      </PageContainer>
  );
}

export default Template;
