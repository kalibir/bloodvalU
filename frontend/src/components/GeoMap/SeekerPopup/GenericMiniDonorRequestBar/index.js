import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import { useDispatch } from "react-redux";
import { PointContainer } from "../../../GenericDonorTestCard";
import { BaseStatusButton } from "../../../../style/GlobalButtons";
import acceptedIcon from "../../../../assets/icons/accepted.png";
import expiredIcon from "../../../../assets/icons/expired.png";
import urgentIcon from "../../../../assets/icons/urgent.svg";
import onProgressIcon from "../../../../assets/icons/on_progress.png";
import A_negative from "../../../../assets/icons/A_negative.svg";
import A_positive from "../../../../assets/icons/A_positive.svg";
import AB_negative from "../../../../assets/icons/AB_negative.svg";
import AB_positive from "../../../../assets/icons/AB_positive.svg";
import B_negative from "../../../../assets/icons/B_negative.svg";
import B_positive from "../../../../assets/icons/B_positive.svg";
import O_negative from "../../../../assets/icons/O_negative.svg";
import O_positive from "../../../../assets/icons/O_positive.svg";

const RequestBar = styled.div`
  width: 100%;
  height: 48px;
  background-color: #ffffff;
  border-bottom: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
`;

const GreenButton = styled(BaseStatusButton)`
  background-color: #43a047;
  padding: 0.3rem;
  height: 90%;
`;

const RedButton = styled(BaseStatusButton)`
  padding: 0.3rem;
  background-color: #d33449;
  height: 90%;
`;

const TextWrapper = styled.div`
  display: flex;
  text-align: left;
  align-items: center;
  height: 100%;
  width: 15%;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 100%;
`;

const IconWrapper = styled(ButtonWrapper)`
  width: 15%;
  display: flex;
  margin: 5px;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const RequestBarWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-areas: "text status urgent blood button valid";
  grid-template-columns: 1fr 1fr 1fr 35px 1fr 1fr;
  background-color: #ffffff;
  border-bottom: 1px solid #d9d9d9;
  grid-gap: 4px;
`;

const TextDiv = styled.div`
  display: flex;
  height: 35px;
  grid-area: text;
  justify-content: center;
  align-items: center;
`;

const StatusDiv = styled(TextDiv)`
  grid-area: status;
`;

const UrgentDiv = styled(TextDiv)`
  grid-area: urgent;
`;

const BloodDiv = styled(TextDiv)`
  grid-area: blood;
  height: 35px;
  //background-color: darkred;
  border-radius: 50%;
  padding: 2px;
`;
const ButtonDiv = styled(TextDiv)`
  grid-area: button;
`;
const ValidDiv = styled(TextDiv)`
  grid-area: valid;
`;

const BloodIconWrapper = styled(ButtonWrapper)`
  width: 15%;
  margin: 5px;
  background-color: darkred;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const InfoIcons = styled.img`
  width: ${rem("30px")};
  height: ${rem("30px")};
`;

const UrgentIcon = styled.img`
  width: ${rem("38px")};
  height: ${rem("38px")};
`;

const Type = styled.img`
  color: white;
`;

const RequestIsActiveSign = styled(PointContainer)`
  width: ${rem("82px")};
  height: ${rem("28px")};
  font-size: ${rem("12px")};
  border-radius: 100px;
  border: 3px solid #71b774;
  justify-content: center;
`;

const GenericMiniDonorRequestBar = ({
  handleApply,
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
    <RequestBarWrapper>
      <TextDiv>{id}</TextDiv>
      <StatusDiv>
        {(status === "CL") &
        (logged_in_donor_applied === true) &
        (logged_in_donor_is_selected === false) ? (
          <InfoIcons src={onProgressIcon} />
        ) : logged_in_donor_is_selected ? (
          <InfoIcons src={acceptedIcon} />
        ) : null}
      </StatusDiv>

      <UrgentDiv>{is_urgent ? <UrgentIcon src={urgentIcon} /> : null}</UrgentDiv>
      <BloodDiv>
        <Type src={renderBloodType()} alt="blood_type" />
      </BloodDiv>

      <ButtonDiv>
        {" "}
        {logged_in_donor_applied ? (
          is_valid ? (
            <RedButton onClick={(e) => handleApply(e, id)}>Cancel</RedButton>
          ) : (
            <RequestIsActiveSign>Active</RequestIsActiveSign>
          )
        ) : (
          <GreenButton onClick={(e) => handleApply(e, id)}>Apply</GreenButton>
        )}
      </ButtonDiv>

      <ValidDiv>{is_valid ? null : <InfoIcons src={expiredIcon} />}</ValidDiv>
    </RequestBarWrapper>
  );
};

export default GenericMiniDonorRequestBar;
