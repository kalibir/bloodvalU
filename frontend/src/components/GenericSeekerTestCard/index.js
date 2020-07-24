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
  background: #ffffff;
  border: 1px solid #d3d4d8;
  border-radius: 4px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 32px;
`;

const Text = styled.p`
  width: 100%;
  font-weight: 500;
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 16px;
  line-height: 22px;
  color: #121232;
`;

const PointContainer = styled.span`
  min-width: ${rem("84px")};
  max-width: fit-content;
  padding: 5px;
  height: ${rem("30px")};
  font-weight: 500;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.16px;
  color: #43a047;
  border: 1px solid #71b774;
  border-radius: 4px;
  text-transform: uppercase;
`;

const TextContainer = styled.div`
  width: 80%;
  height: ${rem("42px")};
  margin-right: ${rem("17px")};
  text-transform: capitalize;
`;

const BottomContainer = styled.div`
  height: ${rem("40px")};
  width: ${rem("144px")};
  display: flex;
  justify-content: space-between;
`;

const CardBlueButton = styled(SmallBlueButton)`
  width: 60px;
  height: 30px;
  font-size: 12px;
`;

const CardGreenButton = styled(SmallGreenButton)`
    width: 60px;
  height: 30px;
  font-size: 12px;
`

const CardRedButton = styled(SmallRedButton)`
  width: 60px;
  height: 30px;
  font-size: 12px;
`;

const GenericSeekerTestCard = ({
                                   test: {
                                       id,
                                       test_type,
                                       seeker_name,
                                       points_cost,
                                       expiry_date,
                                       created,
                                       is_bought,
                                       is_expired,
                                   },
                               }) => {

    const [sureModal, setSureModal] = useState(false);
    const [showCustomersModal, setShowCustomersModal] = useState(false)
    const dispatch = useDispatch()

    const closeModal = () => {
        console.log("in the close modal");
        setSureModal(false);
    };

    const handleDeleteTest = async (e, testID) => {
        e.preventDefault();
        console.log("in da delete test func", testID)
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
                <PointContainer>{points_cost}</PointContainer>
            </TextContainer>
            <BottomContainer>
                <CardGreenButton onClick={e => setShowCustomersModal(true)}>Customers</CardGreenButton>
                <CardBlueButton>edit</CardBlueButton>
                <CardRedButton onClick={e => setSureModal(true)}>delete</CardRedButton>
            </BottomContainer>
        </TestCard>
    );
};

export default GenericSeekerTestCard;
