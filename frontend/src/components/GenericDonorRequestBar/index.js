import React from "react";
import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { BaseStatusButton } from "../../style/GlobalButtons/";
import { rem } from "polished";
import { useDispatch } from "react-redux";
import { applyToRequestActionInAll } from "../../store/actions/bloodRequestActions";
import acceptedIcon from "../../assets/icons/accepted.png";
import expiredIcon from "../../assets/icons/expired.png";
import urgentIcon from "../../assets/icons/urgent.svg";
import onProgressIcon from "../../assets/icons/on_progress.png";
import { PointContainer } from "../GenericDonorTestCard";
import O_negative from "../../assets/icons/O_negative.svg";
import O_positive from "../../assets/icons/O_positive.svg";
import AB_negative from "../../assets/icons/AB_negative.svg";
import AB_positive from "../../assets/icons/AB_positive.svg";
import A_negative from "../../assets/icons/A_negative.svg";
import A_positive from "../../assets/icons/A_positive.svg";
import B_negative from "../../assets/icons/B_negative.svg";
import B_positive from "../../assets/icons/B_positive.svg";

const BarWrapper = styled.div`
  //width: 445px;
  width: 100%;
`;

// STYLES FOR ANIMATION
const heightAnimation = keyframes`
  from { max-height: 0; overflow: hidden;}
  to{ max-height: 300px; transition: max-height 5s;}
`;

const RequestBar = styled.div`
  display: grid;
  width: 100%;
  height: 48px;
  grid-template-areas: "text status urgent blood button valid arrow";
  grid-template-columns: 2fr 1fr 1fr 35px 1fr 1fr 1fr;
  background-color: #ffffff;
  border-bottom: 1px solid #d9d9d9;
  align-items: center;
  grid-gap: 8px;
  cursor: pointer;
`;

const GreenButton = styled(BaseStatusButton)`
  background-color: #43a047;
`;

const RedButton = styled(BaseStatusButton)`
  background-color: #d33449;
`;

const TextWrapper = styled.div`
  display: flex;
  height: 35px;
  grid-area: text;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  grid-area: button;
`;

const IconWrapper = styled(ButtonWrapper)`
  grid-area: status;
`;

const UrgentWrapper = styled(ButtonWrapper)`
  grid-area: urgent;
`;

const BloodDiv = styled(TextWrapper)`
  grid-area: blood;
  height: 35px;
  background-color: darkred;
  border-radius: 50%;
  padding: 2px;
`;

const Type = styled.img`
  color: white;
`;

const BarArrowWrapper = styled(ButtonWrapper)`
  grid-area: arrow;
  justify-self: end;
  margin-right: 24px;
`;

const BarArrowRight = styled.i`
  border: solid #757575;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(-45deg);
`;

const SeekerInfo = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 23px;
  padding-right: 27px;
  color: #121232;
  border: 1px solid #d3d4d8;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  animation: 1s ${heightAnimation};
`;

const SeekerInfoHeader = styled.div`
  width: 100%;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const CompanyName = styled.p`
  font-size: 18px;
`;

const RequestPoints = styled.p`
  font-size: 13px;
  color: #43a047;
`;

const SeekerInfoBodyWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const SeekerInfoBody = styled.ul`
  width: 100%;
  margin-top: 16px;
`;

const SeekerInfoBodyLine = styled.li`
  width: 100%;
  margin-bottom: 8px;
  list-style: none;
  font-size: 13px;
`;

const InfoIcons = styled.img`
  width: ${rem("30px")};
  height: ${rem("30px")};
`;

const UrgentIcon = styled.img`
  width: ${rem("30px")};
  height: ${rem("30px")};
`;

const RequestIsActiveSign = styled(PointContainer)`
  width: ${rem("82px")};
  height: ${rem("28px")};
  font-size: ${rem("12px")};
  border-radius: 100px;
  border: 3px solid #71b774;
  justify-content: center;
`;

const GenericDonorRequestBar = ({
  request: {
    id,
    status,
    blood_group,
    valid_until,
    is_valid,
    is_for_covid,
    is_urgent,
    logged_in_donor_is_selected,
    logged_in_donor_applied,
    is_renewable,
    created,
    points_value,
    no_of_applicants,
    seeker: { name, phone, email, website, street, zip_code, logo, country },
  },
}) => {
  const dispatch = useDispatch();
  const [showSeeker, setSeekerInfo] = useState(false);

  const showSeekerHandler = (event) => {
    setSeekerInfo(!showSeeker);
  };

  const handleApply = (e) => {
    console.log("in the apply handler");
    dispatch(applyToRequestActionInAll(id));
  };
  const renderBloodType = () => {
    if (blood_group === "O-") return O_negative;
    if (blood_group === "O+") return O_positive;
    if (blood_group === "A-") return A_negative;
    if (blood_group === "A+") return A_positive;
    if (blood_group === "B-") return B_negative;
    if (blood_group === "B+") return B_positive;
    if (blood_group === "AB-") return AB_negative;
    if (blood_group === "AB+") return AB_positive;
  };
  return (
    <BarWrapper>
      <RequestBar>
        <TextWrapper onClick={showSeekerHandler}> Request {id}</TextWrapper>

        <IconWrapper onClick={showSeekerHandler}>
          {(status === "CL") &
          (logged_in_donor_applied === true) &
          (logged_in_donor_is_selected === false) ? (
            <InfoIcons src={onProgressIcon} />
          ) : logged_in_donor_is_selected ? (
            <InfoIcons src={acceptedIcon} />
          ) : null}
        </IconWrapper>

        <UrgentWrapper onClick={showSeekerHandler}>
          {is_urgent ? <UrgentIcon src={urgentIcon} /> : null}
        </UrgentWrapper>
        <BloodDiv>
          <Type src={renderBloodType()} alt="blood_type" />
        </BloodDiv>
        <ButtonWrapper>
          {" "}
          {logged_in_donor_applied ? (
            is_valid ? (
              <RedButton onClick={handleApply}>Cancel</RedButton>
            ) : (
              <RequestIsActiveSign onClick={showSeekerHandler}>Active</RequestIsActiveSign>
            )
          ) : (
            <GreenButton onClick={handleApply}>Apply</GreenButton>
          )}
        </ButtonWrapper>

        <IconWrapper onClick={showSeekerHandler}>
          {is_valid ? null : <InfoIcons src={expiredIcon} />}
        </IconWrapper>

        <BarArrowWrapper onClick={showSeekerHandler}>
          {" "}
          <BarArrowRight
            style={showSeeker ? { transform: "rotate(45deg)" } : { transform: "rotate(-45deg)" }}
          />{" "}
        </BarArrowWrapper>
      </RequestBar>
      {showSeeker ? (
        <>
          <SeekerInfo
            name={"wrapper"}
            style={
              showSeeker ? { animationDirection: "normal" } : { animationDirection: "reverse" }
            }>
            <SeekerInfoHeader>
              <CompanyName>{name}</CompanyName>
              <RequestPoints>{points_value} pts</RequestPoints>
            </SeekerInfoHeader>
            <SeekerInfoBodyWrapper>
              <SeekerInfoBody>
                <SeekerInfoBodyLine>Address: {street}</SeekerInfoBodyLine>
                <SeekerInfoBodyLine>Phone: {phone}</SeekerInfoBodyLine>
                <SeekerInfoBodyLine>Requested group: {blood_group}</SeekerInfoBodyLine>
                <SeekerInfoBodyLine>For Covid: {is_for_covid ? "Yes" : "No"}</SeekerInfoBodyLine>
              </SeekerInfoBody>
              <SeekerInfoBody>
                <SeekerInfoBodyLine>City: {zip_code}</SeekerInfoBodyLine>
                <SeekerInfoBodyLine>E-mail: {email}</SeekerInfoBodyLine>
                <SeekerInfoBodyLine>Valid until: {valid_until}</SeekerInfoBodyLine>
              </SeekerInfoBody>
            </SeekerInfoBodyWrapper>
          </SeekerInfo>
        </>
      ) : null}
    </BarWrapper>
  );
};

export default GenericDonorRequestBar;
