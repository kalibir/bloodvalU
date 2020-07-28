import React from "react";
import {useState} from "react";
import styled, {keyframes} from "styled-components";
import {BaseStatusButton} from "../../style/GlobalButtons/";
import {rem, backgroundImages} from "polished";
import {useDispatch} from "react-redux";
import {applyToRequestActionInAll} from "../../store/actions/bloodRequestActions";
import acceptedIcon from "../../assets/icons/Check.svg";
import expiredIcon from "../../assets/icons/expired.png";
import urgentIcon from "../../assets/icons/urgent.svg";
import onProgressIcon from "../../assets/icons/on_progress.png";
import {PointContainer} from "../GenericDonorTestCard";
import O_negative from "../../assets/icons/O_negative.svg";
import O_positive from "../../assets/icons/O_positive.svg";
import AB_negative from "../../assets/icons/AB_negative.svg";
import AB_positive from "../../assets/icons/AB_positive.svg";
import A_negative from "../../assets/icons/A_negative.svg";
import A_positive from "../../assets/icons/A_positive.svg";
import B_negative from "../../assets/icons/B_negative.svg";
import B_positive from "../../assets/icons/B_positive.svg";
import {Fade} from "react-reveal";
import ButtonSpinner from "../ButtonSpinner";
import SmallButtonSpinner from "../SmallButtonSpinner";
import Tooltip from "@material-ui/core/Tooltip";

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
  height: 38px;
  font-weight: 500;
  letter-spacing: 1.5px;
  background-color: #43a047;
`;

const RedButton = styled(BaseStatusButton)`
  height: 38px;
  font-weight: 500;
  letter-spacing: 1.5px;
  background-color: #d33449;
`;

const TextWrapper = styled.div`
  display: flex;
  height: 35px;
  grid-area: text;
  justify-content: flex-start;
  align-items: center;
  padding-left: 24px;
`;

const ButtonWrapper = styled.div`
  grid-area: button;
`;

const IconWrapper = styled(ButtonWrapper)`
  grid-area: status;
  height: 100%;
  display: flex;
  align-items: center;
`;

const ValidWrapper = styled(IconWrapper)`
  grid-area: valid;
`

const UrgentWrapper = styled(ButtonWrapper)`
  grid-area: urgent;
  height: 100%;
  display: flex;
  align-items: center;
`;

const BloodDiv = styled(TextWrapper)`
  grid-area: blood;
  height: 35px;
  border-radius: 50%;
  padding: 2px;
`;

const Type = styled.img`
  color: white;
`;

const BarArrowWrapper = styled(ButtonWrapper)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: ${rem("24px")};
  grid-area: arrow;
  margin-right: 24px;
  width: 100%;
  height: 100%;
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
  width: ${rem("38px")};
  height: ${rem("38px")};
`;

const UrgentIcon = styled.img`
  width: ${rem("38px")};
  height: ${rem("38px")};
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
                                        seeker: {name, phone, email, website, street, zip_code, logo, country},
                                    },
                                }) => {
    const dispatch = useDispatch();
    const [showSeeker, setSeekerInfo] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const showSeekerHandler = (event) => {
        setSeekerInfo(!showSeeker);
    };

    const handleApply = (e) => {
        setShowSpinner(true)
        dispatch(applyToRequestActionInAll(id));
        setShowSpinner(false)
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
        <Fade left>
            <BarWrapper>
                <RequestBar>
                    <TextWrapper onClick={showSeekerHandler}> Request {id}</TextWrapper>

                    <IconWrapper onClick={showSeekerHandler}>
                        {(status === "CL") &
                        (logged_in_donor_applied === true) &
                        (logged_in_donor_is_selected === false) ? (
                            <Tooltip title="On progress..." arrow><InfoIcons src={onProgressIcon}/></Tooltip>
                        ) : logged_in_donor_is_selected ? (
                            <Tooltip title="You are accepted." arrow><InfoIcons src={acceptedIcon}/></Tooltip>
                        ) : null}
                    </IconWrapper>

                    <UrgentWrapper onClick={showSeekerHandler}>
                        {is_urgent ? <Tooltip title="This request is urgent." arrow><UrgentIcon
                            src={urgentIcon}/></Tooltip> : null}
                    </UrgentWrapper>
                    <BloodDiv onClick={showSeekerHandler}>
                        <Tooltip title="Blood-group of request." arrow><Type src={renderBloodType()} alt="blood_type"/></Tooltip>
                    </BloodDiv>
                    <ButtonWrapper>
                        {" "}
                        {logged_in_donor_applied ? (
                            is_valid ? (
                                <Tooltip title="Click to cancel your apply." arrow><RedButton
                                    onClick={handleApply}>Cancel</RedButton></Tooltip>
                            ) : (
                                <Tooltip title="Another donor is accepted for this request." arrow><RequestIsActiveSign
                                    onClick={showSeekerHandler}>Active</RequestIsActiveSign></Tooltip>
                            )
                        ) : (
                            <Tooltip title="Click to apply to this request." arrow><GreenButton
                                onClick={handleApply}>{showSpinner ?
                                <SmallButtonSpinner/> : "Apply"}</GreenButton></Tooltip>
                        )}
                    </ButtonWrapper>

                    <ValidWrapper onClick={showSeekerHandler}>
                        {is_valid ? null : <InfoIcons src={expiredIcon}/>}
                    </ValidWrapper>

                    <Tooltip title="Click for more information." arrow>
                        <BarArrowWrapper onClick={showSeekerHandler}>
                            {" "}
                            <BarArrowRight
                                style={showSeeker ? {transform: "rotate(45deg)"} : {transform: "rotate(-45deg)"}}
                            />{" "}
                        </BarArrowWrapper>
                    </Tooltip>
                </RequestBar>
                {showSeeker ? (
                    <>
                        <SeekerInfo
                            name={"wrapper"}
                            style={
                                showSeeker ? {animationDirection: "normal"} : {animationDirection: "reverse"}
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
        </Fade>
    );
};

export default GenericDonorRequestBar;
