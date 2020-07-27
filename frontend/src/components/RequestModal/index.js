import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { BaseStatusButton } from "../../style/GlobalButtons/";
import { DarkBlueButton, WhiteButton } from "../../style/GlobalButtons/";
import { rem } from "polished";
import { connect, useDispatch } from "react-redux";
import { Select } from "../../style/GlobalInputs";
import { createBloodRequestAction } from "../../store/actions/bloodRequestActions";
import { useHistory } from "react-router";
import ToggleButton from "../../components/ToggleButton";

const modalFade = keyframes`
  from{opacity: 0}
  to{opacity: 1}
`;

const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  z-index: 999;
  animation: 0.3s ${modalFade};
`;

const ModalForm = styled.form`
  width: 352px;
  height: 240px;
  background: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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
  width: 60%;
  border-radius: 4px;
  border: 1px solid #a1a4b1;
  color: #a1a4b1;
  margin-left: 8px;
  font-size: 9pt;
`;

const CheckboxWrapper = styled.div`
  width: 100%;
  height: fit-content;
  height: 24px;
  display: flex;
  align-items: center;
`;

const RequestCheckBoxInput = styled.input`
  width: 16px;
  height: 16px;
  margin-right: 16px;
`;

const ModalBtnWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 16px;
  margin-bottom: 8px;
`;

const CustomWhiteButton = styled(WhiteButton)`
  width: 63px;
  height: 32px;
`;

const CustomDarkBlueButton = styled(DarkBlueButton)`
  width: 82px;
  height: 32px;
  margin-left: 16px;
`;

const RequestModal = ({ closeModal, modalData, handleEditRequest }) => {
  const dispatch = useDispatch();
  const [canSubmit, setCanSubmit] = useState(true);
  const { push } = useHistory();
  const [requestData, setRequestData] = useState({
    blood_group: modalData ? modalData.blood_group : "",
    is_for_covid: modalData ? modalData.is_for_covid : false,
    is_urgent: modalData ? modalData.is_urgent : false,
    is_renewable: modalData ? modalData.is_renewable : false,
    valid_until: modalData ? modalData.valid_until : "",
  });

  const onChangeHandler = (event, property) => {
    const value = event.currentTarget.value;
    setRequestData({ ...requestData, [property]: value });
  };
  const handleCheckBox = (property) => {
    setRequestData({ ...requestData, [property]: !requestData[property] });
  };
  const handleSubmit = async (e) => {
    if (canSubmit) {
      setCanSubmit(false);
      e.preventDefault();
      const response = await dispatch(createBloodRequestAction(requestData));
      if (response.status < 300) closeModal();
      setCanSubmit(true);
    }
  };

  return (
    <ModalWrapper>
      <ModalForm
        onSubmit={
          modalData ? (e) => handleEditRequest(e, modalData.id, requestData) : handleSubmit
        }>
        {modalData ? null : (
          <BloodGroupDropDown
            required
            defaultValue={requestData.blood_group}
            onChange={(e) => onChangeHandler(e, "blood_group")}>
            <option value={requestData.blood_group} disabled>
              Select Blood Type
            </option>
            <option value="O-">O-</option>
            <option value="O+">O+</option>
            <option value="A-">A-</option>
            <option value="A+">A+</option>
            <option value="B-">B-</option>
            <option value="B+">B+</option>
            <option value="AB-">AB-</option>
            <option value="AB+">AB+</option>
          </BloodGroupDropDown>
        )}
        {modalData ? null : (
          <ValidityWrapper>
            Valid until:
            <RequestValidity
              required
              defaultValue={requestData.valid_until}
              onChange={(e) => onChangeHandler(e, "valid_until")}
              type="date"
            />
          </ValidityWrapper>
        )}
        <CheckboxWrapper>
          <ToggleButton
            toggleValue={requestData.is_urgent}
            handleClick={(e) => handleCheckBox("is_urgent")}
          />
          <p>Urgent</p>
        </CheckboxWrapper>
        <CheckboxWrapper>
          <ToggleButton
            toggleValue={requestData.is_renewable}
            handleClick={(e) => handleCheckBox("is_renewable")}
          />
          Renewable
        </CheckboxWrapper>
        <CheckboxWrapper>
          <ToggleButton
            toggleValue={requestData.is_for_covid}
            handleClick={(e) => handleCheckBox("is_for_covid")}
          />
          Is for Covid
        </CheckboxWrapper>
        <ModalBtnWrapper>
          <CustomWhiteButton onClick={closeModal}>Cancel</CustomWhiteButton>
          <CustomDarkBlueButton>Confirm</CustomDarkBlueButton>
        </ModalBtnWrapper>
      </ModalForm>
    </ModalWrapper>
  );
};

export default RequestModal;
