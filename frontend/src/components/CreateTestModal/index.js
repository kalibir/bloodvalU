import React from "react";
import styled from "styled-components";
import { BaseStatusButton } from "../../style/GlobalButtons/";
import { DarkBlueButton, WhiteButton } from "../../style/GlobalButtons/";
import { rem } from "polished";

const ModalWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  width: 352px;
  height: 163px;
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

const ModalBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 24px;
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

const CreateTestModal = () => {
  return (
    <ModalWrapper>
      <Modal>
        <TitleInputWrapper>
          Title:
          <TitleInput />
        </TitleInputWrapper>
        <PointsInputWrapper>
          Points:
          <PointsInput type="number" />
        </PointsInputWrapper>

        <ModalBtnWrapper>
          <CustomWhiteButton>Cancel</CustomWhiteButton>
          <CustomDarkBlueButton>Confirm</CustomDarkBlueButton>
        </ModalBtnWrapper>
      </Modal>
    </ModalWrapper>
  );
};

export default CreateTestModal;
