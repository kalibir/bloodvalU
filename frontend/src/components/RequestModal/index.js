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
  position: fixed;
  z-index: 999;
`;

const Modal = styled.div`
  width: 352px;
  height: 240px;
  background: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding-left: 32px;
`;

const BloodGroupDropDown = styled.select`
  width: 288px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid #a1a4b1;
  color: #a1a4b1;
  margin-top: 12px;
`;

const ValidityWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 16px;
`;

const RequestValidity = styled.input`
  width: 57px;
  height: 17px;
  border-radius: 4px;
  border: 1px solid #a1a4b1;
  color: #a1a4b1;
  margin-left: 8px;
  font-size: 9pt;
`;

const CheckboxWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 16px;
`;

const RequestCheckBoxInput = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 16px;
`;

const ModalBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 24px;
  margin-top: 16px;
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

const RequestModal = () => {
  return (
    <ModalWrapper>
      <Modal>
        <BloodGroupDropDown>
          <option defaultValue={true}>Blood Group</option>
          <option value={null}>A</option>
          <option value={null}>B</option>
          <option value={null}>AB</option>
          <option>O</option>
        </BloodGroupDropDown>
        <ValidityWrapper>
          Valid until:
          <RequestValidity type="date"></RequestValidity>
        </ValidityWrapper>
        <CheckboxWrapper>
          <RequestCheckBoxInput type="checkbox" />
          Urgent
        </CheckboxWrapper>
        <CheckboxWrapper>
          <RequestCheckBoxInput type="checkbox" />
          Renewable
        </CheckboxWrapper>
        <CheckboxWrapper>
          <RequestCheckBoxInput type="checkbox" />
          Is for Covid
        </CheckboxWrapper>
        <ModalBtnWrapper>
          <CustomWhiteButton>Cancel</CustomWhiteButton>
          <CustomDarkBlueButton>Confirm</CustomDarkBlueButton>
        </ModalBtnWrapper>
      </Modal>
    </ModalWrapper>
  );
};

export default RequestModal;
