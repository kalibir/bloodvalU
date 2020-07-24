import React, {useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import {BaseStatusButton} from "../../style/GlobalButtons/";
import {DarkBlueButton, WhiteButton} from "../../style/GlobalButtons/";
import {rem} from "polished";
import {connect, useDispatch} from "react-redux";
import {Select} from "../../style/GlobalInputs";
import {createBloodRequestAction} from "../../store/actions/bloodRequestActions";
import {useHistory} from "react-router";
import Spinner from "../GenericSpinner";
import {getCustomersAction} from "../../store/actions/offeredTestActions";

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
  height: 24px;
  border-radius: 4px;
  border: 1px solid #a1a4b1;
  color: #a1a4b1;
  margin-left: 8px;
  font-size: 9pt;
`;

const CheckboxWrapper = styled.div`
  width: 100%;
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

const UploadTestResultsModal = ({testID}) => {
    const dispatch = useDispatch()
    const [customers, setCustomers] = useState()

    useEffect(() => {
        // TODO dispatch get customers
        const fetchCustomers = async (ID) => {
            const response = await dispatch(getCustomersAction({test_id: ID}))
            if (response.status < 300) setCustomers(response.data)
        }
        fetchCustomers(testID)
    }, [dispatch])


    return (
        <ModalWrapper>
            <ModalForm>
                {customers ? customers.map(customer => {
                    return (<h1>{customer.id}</h1>)
                }) : <Spinner/>}
            </ModalForm>
        </ModalWrapper>
    );
};

export default UploadTestResultsModal;
