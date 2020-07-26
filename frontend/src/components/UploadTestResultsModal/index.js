import React, {useEffect, useRef, useState} from "react";
import styled, {keyframes} from "styled-components";
import {BaseStatusButton, WhiteLabel} from "../../style/GlobalButtons/";
import {DarkBlueButton, WhiteButton} from "../../style/GlobalButtons/";
import {rem} from "polished";
import {connect, useDispatch} from "react-redux";
import {Select} from "../../style/GlobalInputs";
import {createBloodRequestAction} from "../../store/actions/bloodRequestActions";
import {useHistory} from "react-router";
import Spinner from "../GenericSpinner";
import {getCustomersAction, uploadTestResultsAction} from "../../store/actions/offeredTestActions";
import {DonorSubBar} from "../GenericSeekerRequestBar";
import CustomerBar from "./CustomerCard";
import {applyToRequestOnMap} from "../../store/actions/mapActions";

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
  left: 0;
  z-index: 999;
  animation: 0.3s ${modalFade};
`;

const ModalForm = styled.form`
  flex-direction: column;
  padding: 1rem;
  min-width: 352px;
  width: 700px;
  max-height: 500px;
  overflow: auto;
  background: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  
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
  padding: 5px;
  margin-left: 5px;
  width: auto;
  height: auto;
`;

const CloseBtn = styled(CustomWhiteButton)`
  margin-top: 1rem;
  margin-left: 0;
`

const CustomDarkBlueButton = styled(DarkBlueButton)`
  width: 82px;
  height: 32px;
  margin-left: 16px;
`;

const DownloadButton = styled(BaseStatusButton)`
  background-color: #121232;
  width: 175px;
`;

const Title = styled.h1`
  display: flex;
`

const TitleWrapper = styled.div`
  display: flex;
  width: 80%;
`


const UploadTestResultsModal = ({testID, test_type, handleCloseUploadResults}) => {
    const dispatch = useDispatch()
    const [customers, setCustomers] = useState(null)

    const handleUpdateCustomers = (customerObj) => {
        const newCustomers = [...customers]
        const index = customers.findIndex(
            (donor) => donor.id === customerObj.id
        )
        newCustomers[index] = customerObj
        setCustomers(newCustomers)
    }

    useEffect(() => {
        // TODO dispatch get customers
        const fetchCustomers = async (ID) => {
            const form = new FormData()
            form.append("test_id", ID);
            const response = await dispatch(getCustomersAction(form))
            if (response.status < 300) setCustomers(response.data)
        }
        fetchCustomers(testID)
    }, [dispatch])


    return (
        <ModalWrapper>
            <ModalForm>
                <TitleWrapper>
                    <Title>{test_type}</Title>
                </TitleWrapper>
                {customers ? customers.map(customer => <CustomerBar handleUpdateCustomers={handleUpdateCustomers} testID={testID}
                                                                    customer={customer} key={customer.id}/>) :
                    <Spinner/>}
                <CloseBtn onClick={handleCloseUploadResults}>CLOSE</CloseBtn>
            </ModalForm>
        </ModalWrapper>
    );
};

export default UploadTestResultsModal;
