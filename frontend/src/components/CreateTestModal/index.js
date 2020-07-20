import React, { useState } from "react";
import styled from "styled-components";
import { BaseStatusButton } from "../../style/GlobalButtons/";
import { DarkBlueButton, WhiteButton } from "../../style/GlobalButtons/";
import { connect, useDispatch } from "react-redux";
import { rem } from "polished";
import { useHistory } from "react-router";
import { createTestRequestAction } from "../../store/actions/offeredTestActions";

const ModalWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
`;

const Modal = styled.div`
  width: 352px;
  background: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding-left: 32px;
`;

const TitleInputWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  align-items: center;
`;

const TitleInput = styled.input`
  width: 160px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #a1a4b1;
  color: #a1a4b1;
  margin-left: 8px;
`;

const PointsInputWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  align-items: center;
`;

const PointsInput = styled.input`
  width: 57px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #a1a4b1;
  color: #a1a4b1;
  margin-left: 8px;
  font-size: 9pt;
`;

const ExpiryDateInputWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  align-items: center;
`;

const ExpiryDateInput = styled.input`
  width: 160px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #a1a4b1;
  color: #a1a4b1;
  margin-left: 8px;
`;

const ModalBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const CustomWhiteButton = styled(WhiteButton)`
  width: 63px;
  height: 28px;
`;

const CustomDarkBlueButton = styled(DarkBlueButton)`
  width: 82px;
  height: 28px;
  margin-left: 16px;
`;

const CreateTestModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const [testData, settestData] = useState({
    test_type: "",
    expiry_date: "",
    points_cost: "",
  });

  const onChangeHandler = (event, property) => {
    const value = event.currentTarget.value;
    settestData({ ...testData, [property]: value });
    console.log(testData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(createTestRequestAction(testData));
    if (response.status < 300) closeModal();
  };

  return (
    <ModalWrapper>
      <Modal>
        <TitleInputWrapper>
          Title:
          <TitleInput onChange={(e) => onChangeHandler(e, "test_type")} />
        </TitleInputWrapper>

        <ExpiryDateInputWrapper>
          Expiry Date:
          <ExpiryDateInput
            required
            onChange={(e) => onChangeHandler(e, "expiry_date")}
            type="date"
          />
        </ExpiryDateInputWrapper>

        <PointsInputWrapper>
          Points:
          <PointsInput required onChange={(e) => onChangeHandler(e, "points_cost")} type="number" />
        </PointsInputWrapper>

        <ModalBtnWrapper>
          <CustomWhiteButton onClick={closeModal}>Cancel</CustomWhiteButton>
          <CustomDarkBlueButton onClick={handleSubmit}>Confirm</CustomDarkBlueButton>
        </ModalBtnWrapper>
      </Modal>
    </ModalWrapper>
  );
};

export default CreateTestModal;
