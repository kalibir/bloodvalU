import React from "react";
import {useState} from "react";
import styled from "styled-components";
import {rem} from "polished";
import {useDispatch} from "react-redux";
import {PointContainer} from "../../../GenericDonorTestCard";
import {BaseStatusButton} from '../../../../style/GlobalButtons'
import {applyToRequestActionInAll} from "../../../../store/actions/bloodRequestActions";
import acceptedIcon from "../../../../assets/icons/accepted.png"
import expiredIcon from "../../../../assets/icons/expired.png"
import urgentIcon from "../../../../assets/icons/urgent.png"
import onProgressIcon from "../../../../assets/icons/on_progress.png"

const BarWrapper = styled.div`
  width: 100%;
`;

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
`;

const RedButton = styled(BaseStatusButton)`
  background-color: #D33449;
`;

const TextWrapper = styled.div`
  display: flex;
  text-align: left;
  align-items: center;
  width: 35%;
  height: 100%;
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 100%;
`

const IconWrapper = styled(ButtonWrapper)`
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const InfoIcons = styled.img`
    width: ${rem("30px")};
    height: ${rem("30px")};
`

const RequestIsActiveSign = styled(PointContainer)`
    width: ${rem("82px")};
    height: ${rem("28px")};
    font-size: ${rem("12px")};
    border-radius: 100px;
    border: 3px solid #71B774;
    justify-content: center;
`


const GenericMiniDonorRequestBar = ({ handleApply,
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




    return (
        <BarWrapper>
            <RequestBar>
                <TextWrapper> Request {id}</TextWrapper>

                <IconWrapper>{
                    status === "CL" & logged_in_donor_applied === true & logged_in_donor_is_selected === false ?
                        <InfoIcons src={onProgressIcon}/>
                        : logged_in_donor_is_selected ?
                        <InfoIcons src={acceptedIcon}/>
                        : null}</IconWrapper>

                <IconWrapper >{is_urgent ?
                    <InfoIcons src={urgentIcon}/> : null}</IconWrapper>

                <ButtonWrapper> {logged_in_donor_applied ?
                    is_valid ? <RedButton onClick={e => handleApply(e, id)}>Cancel</RedButton> :
                        <RequestIsActiveSign >Active</RequestIsActiveSign>
                    : <GreenButton onClick={e => handleApply(e, id)}>Apply</GreenButton>
                }
                </ButtonWrapper>

                <IconWrapper>{is_valid ? null :
                    <InfoIcons src={expiredIcon}/>}</IconWrapper>
            </RequestBar>
        </BarWrapper>
    );
};

export default GenericMiniDonorRequestBar;
