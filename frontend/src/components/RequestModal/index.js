import React, {useState} from "react";
import styled from "styled-components";
import {BaseStatusButton} from "../../style/GlobalButtons/";
import {DarkBlueButton, WhiteButton} from "../../style/GlobalButtons/";
import {rem} from "polished";
import {connect, useDispatch} from "react-redux";
import {Select} from "../../style/GlobalInputs";
import {createBloodRequestAction} from "../../store/actions/bloodRequestActions";
import {useHistory} from "react-router";

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
`;

const ModalForm = styled.form`
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
  width: 60%;
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

const RequestModal = ({closeModal, modalData, handleEditRequest}) => {
    const dispatch = useDispatch()
    const {push} = useHistory()
    const [requestData, setRequestData] = useState({
        blood_group: modalData ? modalData.blood_group : "",
        is_for_covid: modalData ? modalData.is_for_covid : false,
        is_urgent: modalData ? modalData.is_urgent : false,
        is_renewable: modalData ? modalData.is_renewable : false,
        valid_until: modalData ? modalData.valid_until : "",
    })

    console.log("req data", requestData)

    const onChangeHandler = (event, property) => {
        const value = event.currentTarget.value;
        setRequestData({...requestData, [property]: value});
    };
    const handleCheckBox = (event, property) => {
        setRequestData({...requestData, [property]: !requestData[property]});
    };
    const handleSubmit = async e => {
        e.preventDefault()
        const response = await dispatch(createBloodRequestAction(requestData))
        if (response.status < 300) closeModal()
    }

    return (
        <ModalWrapper>
            <ModalForm onSubmit={modalData ? e=> handleEditRequest(e, modalData.id, requestData) : handleSubmit}>
                <BloodGroupDropDown required defaultValue={requestData.blood_group}
                                    onChange={(e) => onChangeHandler(e, "blood_group")}>
                    <option value={requestData.blood_group} disabled>Select Blood Type</option>
                    <option value="O-">O-</option>
                    <option value="O+">O+</option>
                    <option value="A-">A-</option>
                    <option value="A+">A+</option>
                    <option value="B-">B-</option>
                    <option value="B+">B+</option>
                    <option value="AB-">AB-</option>
                    <option value="AB+">AB+</option>
                </BloodGroupDropDown>
                <ValidityWrapper>
                    Valid until:
                    <RequestValidity required defaultValue={requestData.valid_until}
                                     onChange={(e) => onChangeHandler(e, "valid_until")} type="date"/>
                </ValidityWrapper>
                <CheckboxWrapper>
                    <RequestCheckBoxInput defaultChecked={requestData.is_urgent}
                                          onChange={(e) => handleCheckBox(e, "is_urgent")} type="checkbox"/>
                    Urgent
                </CheckboxWrapper>
                <CheckboxWrapper>
                    <RequestCheckBoxInput defaultChecked={requestData.is_renewable}
                                          onChange={(e) => handleCheckBox(e, "is_renewable")}
                                          type="checkbox"/>
                    Renewable
                </CheckboxWrapper>
                <CheckboxWrapper>
                    <RequestCheckBoxInput defaultChecked={requestData.is_for_covid}
                                          onChange={(e) => handleCheckBox(e, "is_for_covid")}
                                          type="checkbox"/>
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

export default RequestModal


