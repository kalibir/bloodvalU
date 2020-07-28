import React, {useState} from "react";
import styled, {keyframes} from "styled-components";
import {BaseStatusButton} from "../../style/GlobalButtons/";
import {DarkBlueButton, WhiteButton} from "../../style/GlobalButtons/";
import {connect, useDispatch} from "react-redux";
import {rem} from "polished";
import {useHistory} from "react-router";
import {createTestRequestAction} from "../../store/actions/offeredTestActions";

const modalFade = keyframes`
  from{opacity: 0}
  to{opacity: 1}
`;

const ModalWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 64px);
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  animation: 0.3s ${modalFade};
`;

const Modal = styled.form`
  width: 352px;
  background: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 32px;
`;

const TitleInputWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
    justify-content: space-between;
  align-items: center;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`

const SmallLabel = styled.label`
  font-weight: bold;
`

const TitleInput = styled.input`
  width: 160px;
  height: 30px;
  padding: 5px;
  border-radius: 4px;

  border: 1px solid #a1a4b1;
  margin-left: 8px;
`;

const PointsInputWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PointsInput = styled.input`
  width: 160px;
  padding: 5px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #a1a4b1;
  margin-left: 8px;
  font-size: 9pt;
`;

const ExpiryDateInputWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
    justify-content: space-between;
  align-items: center;
`;

const ExpiryDateInput = styled.input`
  width: 160px;
  height: 30px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #a1a4b1;
  justify-content: space-between;
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
  height: 32px;
`;

const CustomDarkBlueButton = styled(DarkBlueButton)`
  width: 82px;
  height: 32px;
  margin-left: 16px;
`;

const InputBoxWrapper = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;


export const InputBox = styled.textarea`
  padding: 10px;
  resize: none;
  border-radius: 4px;
  width: 100%;
  height: 100%;
`;

const CreateTestModal = ({closeModal, modalData, handleEditTest}) => {
    const dispatch = useDispatch();
    const [testData, settestData] = useState({
        test_type: "",
        expiry_date: "",
        points_cost: "",
        details: modalData ? modalData.details : "",
    });
    console.log(testData);

    const onChangeHandler = (event, property) => {
        const value = event.currentTarget.value;
        settestData({...testData, [property]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData()
        form.append("test_type", testData.test_type)
        form.append("expiry_date", testData.expiry_date)
        form.append("points_cost", testData.points_cost)
        form.append("details", testData.details)
        const response = await dispatch(createTestRequestAction(form));
        if (response.status < 300) closeModal();
    };

    return (
        <ModalWrapper>
            <Modal onSubmit={modalData ? (e) => handleEditTest(e, modalData.id, testData) : handleSubmit}>
                {modalData ? null :
                    <>
                        <TitleInputWrapper>
                            <SmallLabel>Title</SmallLabel>
                            <TitleInput onChange={(e) => onChangeHandler(e, "test_type")}/>
                        </TitleInputWrapper>

                        <ExpiryDateInputWrapper>

                            <SmallLabel>Expiry Date:</SmallLabel>
                            <ExpiryDateInput
                                required
                                onChange={(e) => onChangeHandler(e, "expiry_date")}
                                type="date"
                            />
                        </ExpiryDateInputWrapper>

                        <PointsInputWrapper>

                            <SmallLabel>Points:</SmallLabel>
                            <PointsInput required onChange={(e) => onChangeHandler(e, "points_cost")} type="number"/>
                        </PointsInputWrapper>
                    </>
                }
                <InputBoxWrapper>
                    <Label htmlFor="description">Description:</Label>
                    <InputBox id="description" maxLength="300" value={testData.details} rows={11} cols="50" placeholder={`Describe the test...`}
                              onChange={(e) => onChangeHandler(e, "details")}/>
                </InputBoxWrapper>

                <ModalBtnWrapper>
                    <CustomWhiteButton onClick={closeModal}>Cancel</CustomWhiteButton>
                    <CustomDarkBlueButton>Confirm</CustomDarkBlueButton>
                </ModalBtnWrapper>
            </Modal>
        </ModalWrapper>
    );
};

export default CreateTestModal;
