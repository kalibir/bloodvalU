import React, {useState} from "react";
import {rem} from "polished";
import styled from "styled-components";
import {SmallBlueButton, SmallGreenButton, SmallRedButton} from "../../style/GlobalButtons";
import AreYouSureModal from "../AreYouSure";
import {createTestRequestAction, deleteTestAction} from "../../store/actions/offeredTestActions";
import {useDispatch} from "react-redux";
import UploadTestResultsModal from "../UploadTestResultsModal";

const TestCard = styled.div`
  width: ${rem("290px")};
  height: ${rem("150px")};
  background: #FFF;
  border: 1px solid #d3d4d8;
  border-radius: 4px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 ${rem("12px")} ${rem("12px")} 0;
`;

const Text = styled.p`
  width: 100%;
  font-weight: 500;
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 23px;
  line-height: 25px;
  color: #121232;
`;

const PointContainer = styled.span`
  min-width: ${rem("84px")};
  max-width: fit-content;
  height: ${rem("30px")};
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  letter-spacing: 0.16px;
  color: #43a047;
  //text-transform: uppercase;
`;

const TextContainer = styled.div`
  width: 80%;
  height: ${rem("42px")};
  margin-right: ${rem("17px")};
  //text-transform: capitalize;
`;

const BottomContainer = styled.div`
  height: ${rem("40px")};
  width: ${rem("250px")};
  display: flex;
  justify-content: space-between;
`;

const CardBlueButton = styled(SmallBlueButton)`
  width: 60px;
  height: 30px;
  font-size: 12px;
`;

const CardGreenButton = styled(SmallGreenButton)`
   width: 80px;
  height: 30px;
  font-size: 12px;
`

const CardRedButton = styled(SmallRedButton)`
  width: 60px;
  height: 30px;
  font-size: 12px;
`;

const BlindButton = styled.div`
   width: 80px;
   height: 30px;
`

const GenericSeekerTestCard = ({
                                   test: {
                                       id,
                                       test_type,
                                       seeker_name,
                                       points_cost,
                                       expiry_date,
                                       created,
                                       no_of_customers,
                                       is_expired,
                                   },
                               }) => {
    console.log("is bought", no_of_customers)

    const [sureModal, setSureModal] = useState(false);
    const [showCustomersModal, setShowCustomersModal] = useState(false)
    const dispatch = useDispatch()

    const closeModal = () => {
        setSureModal(false);
    };

    const handleDeleteTest = async (e, testID) => {
        e.preventDefault();
        const response = await dispatch(deleteTestAction(testID));
        if (response.status < 300) closeModal();
    };

    const handleCloseUploadResults = e => {
        setShowCustomersModal(false)
    }

    return (
        <TestCard>
            {sureModal ? (
                <AreYouSureModal
                    handleDeleteTest={handleDeleteTest}
                    closeModal={closeModal}
                    context={"test"}
                    id={id}
                />
            ) : null}
            {showCustomersModal ? <UploadTestResultsModal handleCloseUploadResults={handleCloseUploadResults} test_type={test_type} testID={id}/>: null}
            <TextContainer>
                <Text>{test_type}</Text>
                <PointContainer>{points_cost} pts</PointContainer>
            </TextContainer>
            <BottomContainer>
                { no_of_customers ?
                    <CardGreenButton onClick={e => setShowCustomersModal(true)}>Customers</CardGreenButton>
                    : <BlindButton></BlindButton>
                }
                <CardBlueButton>edit</CardBlueButton>
                <CardRedButton onClick={e => setSureModal(true)}>delete</CardRedButton>
            </BottomContainer>
        </TestCard>
    );
};

export default GenericSeekerTestCard;
