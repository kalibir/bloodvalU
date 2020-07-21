import React from "react";
import styled from "styled-components";
import {rem} from "polished";
import {useDispatch} from "react-redux";
import {PointContainer} from "../../../GenericDonorTestCard";
import {BaseStatusButton} from '../../../../style/GlobalButtons'
import acceptedIcon from "../../../../assets/icons/accepted.png"
import expiredIcon from "../../../../assets/icons/expired.png"
import urgentIcon from "../../../../assets/icons/urgent.png"
import onProgressIcon from "../../../../assets/icons/on_progress.png"
import A_minus from '../../../../assets/icons/A_minus.svg'
import AB_minus from '../../../../assets/icons/AB_minus.svg'
import AB_plus from '../../../../assets/icons/AB_plus.svg'
import B_minus from '../../../../assets/icons/B_minus.svg'
import B_plus from '../../../../assets/icons/B_plus.svg'
import O_minus from '../../../../assets/icons/O_minus.svg'
import O_plus from '../../../../assets/icons/O_plus.svg'


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
  height: 90%
`;

const RedButton = styled(BaseStatusButton)`
  padding: 0.3rem;
  background-color: #D33449;
  height: 90%
`;

const TextWrapper = styled.div`
  display: flex;
  text-align: left;
  align-items: center;
  height: 100%;
  width: 15%;
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 100%;
`

const IconWrapper = styled(ButtonWrapper)`
  width: 15%;
  display: flex;
  margin: 5px;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const RequestBarWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-areas:
   "text status urgent blood button valid";
  grid-template-columns: 1fr 1fr 1fr 35px 1fr 1fr;
    background-color: #ffffff;
  border-bottom: 1px solid #d9d9d9;
  grid-gap: 4px;
`

const TextDiv = styled.div`
display: flex;
height: 35px;
grid-area: text;
  justify-content: center;
  align-items: center;
`
const StatusDiv = styled(TextDiv)`
grid-area: status;
`
const UrgentDiv = styled(TextDiv)`
  grid-area: urgent;
`
const BloodDiv = styled(TextDiv)`
  grid-area: blood;
  height: 35px;
  background-color: darkred;
  border-radius: 50%;
  padding: 2px;
`
const ButtonDiv = styled(TextDiv)`
  grid-area: button;
`
const ValidDiv = styled(TextDiv)`
  grid-area: valid;
`

const BloodIconWrapper = styled(ButtonWrapper)`
  width: 15%;
  margin: 5px;
  background-color: darkred;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const InfoIcons = styled.img`
    width: ${rem("30px")};
    height: ${rem("30px")};
`

const Type = styled.p`
  
  color: white;
`

const RequestIsActiveSign = styled(PointContainer)`
    width: ${rem("82px")};
    height: ${rem("28px")};
    font-size: ${rem("12px")};
    border-radius: 100px;
    border: 3px solid #71B774;
    justify-content: center;
`


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
                                            seeker: {name, phone, email, website, street, zip_code, logo, country}

                                        }
                                    }) => {
    const dispatch = useDispatch()

    const renderBloodType = () => {
        if(blood_group === "O-") return O_minus
        if(blood_group === "O+") return O_plus
        if(blood_group === "A-") return A_minus
        if(blood_group === "A+") return O_plus
        if(blood_group === "B-") return B_minus
        if(blood_group === "B+") return B_plus
        if(blood_group === "AB-") return AB_minus
        if(blood_group === "AB+") return AB_plus
    }

    return (
            <RequestBarWrapper>
                <TextDiv>{id}</TextDiv>
                <StatusDiv>{
                    status === "CL" & logged_in_donor_applied === true & logged_in_donor_is_selected === false ?
                        <InfoIcons src={onProgressIcon}/>
                        : logged_in_donor_is_selected ?
                        <InfoIcons src={acceptedIcon}/>
                        : null}</StatusDiv>

                <UrgentDiv>
                    {is_urgent ? <InfoIcons src={urgentIcon}/> : null}
                </UrgentDiv>
                <BloodDiv>
                    <Type>{blood_group}</Type>
                </BloodDiv>

                <ButtonDiv> {logged_in_donor_applied ?
                    is_valid ? <RedButton onClick={e => handleApply(e, id)}>Cancel</RedButton> :
                        <RequestIsActiveSign>Active</RequestIsActiveSign>
                    : <GreenButton onClick={e => handleApply(e, id)}>Apply</GreenButton>
                }
                </ButtonDiv>

                <ValidDiv>{is_valid ? null :
                    <InfoIcons src={expiredIcon}/>}
                </ValidDiv>
            </RequestBarWrapper>
    );
};

export default GenericMiniDonorRequestBar;
