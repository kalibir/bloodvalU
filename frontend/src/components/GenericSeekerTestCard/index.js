import React, {useState} from "react";
import {rem} from "polished";
import styled from "styled-components";
import {SmallBlueButton, SmallGreenButton, SmallRedButton} from "../../style/GlobalButtons";
import AreYouSureModal from "../AreYouSure";
import {createTestRequestAction, deleteTestAction} from "../../store/actions/offeredTestActions";
import {useDispatch} from "react-redux";
import UploadTestResultsModal from "../UploadTestResultsModal";

const TestCard = styled.div`
  width: ${rem("320px")};
  height: ${rem("160px")};
  background: #e5e5e5;
  padding: 10px;
  border: 1px solid #d3d4d8;
  border-radius: 4px;
  display: flex;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
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
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const CardBlueButton = styled(SmallBlueButton)`
  width: 150px;
  height: 30px;
  margin: 0 5px 0 5px;
  font-size: 12px;
`;

const CardGreenButton = styled(SmallGreenButton)`
   width: 100px;
  height: 30px;
  font-size: 12px;
`

const CardRedButton = styled(SmallRedButton)`
  width: 70px;
  height: 30px;
  font-size: 12px;
`;

const BlindButton = styled.div`
   width: 80px;
   height: 30px;
`

const GenericSeekerTestCard = ({
                                   handleShowEditModal,
                                   handleEditTest,
                                   test,
                               }) => {

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
                    id={test.id}
                />
            ) : null}
            {showCustomersModal ?
                <UploadTestResultsModal handleCloseUploadResults={handleCloseUploadResults} test_type={test.test_type}
                                        testID={test.id}/> : null}
            <TextContainer>
                <Text>{test.test_type}</Text>
                <PointContainer>{test.points_cost} pts</PointContainer>
            </TextContainer>
            <BottomContainer>
                {test.no_of_customers ?
                    <CardGreenButton onClick={e => setShowCustomersModal(true)}>Customers</CardGreenButton>
                    : <BlindButton></BlindButton>
                }
                <CardBlueButton onClick={e => handleShowEditModal(e, test)}>edit description</CardBlueButton>
                <CardRedButton onClick={e => setSureModal(true)}>delete</CardRedButton>
            </BottomContainer>
        </TestCard>
    );
};

export default GenericSeekerTestCard;
