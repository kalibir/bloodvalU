import React from "react";
import {useState} from "react";
import styled from "styled-components";
import {BaseStatusButton} from "../../style/GlobalButtons/";
import {rem} from "polished";

const BarWrapper = styled.div`
  //width: 445px;
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
  padding-left: 23px;
  padding-right: 27px;
  cursor: pointer;
`;

const GreenButton = styled(BaseStatusButton)`
  background-color: #43a047;
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

const TextWrapper = styled.div`
  text-align: left;
  width: 30%;
  margin-right: -8%;
`

// const GenericDonorRequestBar = () => {
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
                                        seeker:{name, phone, email, website, street, zip_code, logo, country}

                                    }
                                }) => {
    const [showSeeker, setSeekerInfo] = useState(false);

    const showSeekerHandler = (event) => {
        setSeekerInfo(!showSeeker);
    };

    return (
        <BarWrapper>
            <RequestBar onClick={showSeekerHandler}>
                {/*Request 10*/}
                <TextWrapper> Request {id}</TextWrapper>
                <GreenButton onClick={() => {
                    console.log("Clicked")
                }}>Apply</GreenButton>
                <BarArrowRight></BarArrowRight>
            </RequestBar>
            {showSeeker ? (
                <>
                    <SeekerInfo name={"wrapper"}>
                        <SeekerInfoHeader>
                            <CompanyName>MediLab Inc AG</CompanyName>
                            <RequestPoints>7000 pts</RequestPoints>
                        </SeekerInfoHeader>
                        <SeekerInfoBodyWrapper>
                            <SeekerInfoBody>
                                <SeekerInfoBodyLine>Phone: 079 345 7689</SeekerInfoBodyLine>
                                <SeekerInfoBodyLine>City: Zurich</SeekerInfoBodyLine>
                                <SeekerInfoBodyLine>Zip Code: 8005</SeekerInfoBodyLine>
                            </SeekerInfoBody>
                            <SeekerInfoBody>
                                <SeekerInfoBodyLine>Phone: 079 345 7689</SeekerInfoBodyLine>
                                <SeekerInfoBodyLine>City: Zurich</SeekerInfoBodyLine>
                            </SeekerInfoBody>
                        </SeekerInfoBodyWrapper>
                    </SeekerInfo>
                </>
            ) : null}
        </BarWrapper>
    );
};

export default GenericDonorRequestBar;
