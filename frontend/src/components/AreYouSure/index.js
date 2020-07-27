import React, {useState} from "react";
import styled, {keyframes} from "styled-components";
import {BaseStatusButton} from "../../style/GlobalButtons/";
import {DarkBlueButton, WhiteButton} from "../../style/GlobalButtons/";
import {connect, useDispatch} from "react-redux";
import {rem} from "polished";
import {useHistory} from "react-router";
import {createTestRequestAction, deleteTestAction} from "../../store/actions/offeredTestActions";
import {MiddleTitle, SmallTitle} from "../../style/GlobalTitles";
import {deleteRequestAction} from "../../store/actions/bloodRequestActions";

const DropDownAnimation = keyframes`
  from {
    top: -300px;
    opacity: 0;
  }
  to {
    top: 0;
    opacity: 1;
  }
`;


const ModalWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center; 
  background-color: rgba(0, 0, 0, 0.6);  
  animation-name: ${DropDownAnimation};
  animation-duration: 0.6s;
  
`;

const Modal = styled.div`
  width: 352px;
  height: 163px;
  background: white;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const QuestionContainer = styled.div`
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const YesButton = styled(DarkBlueButton)`
  width: ${rem("106px")};
  height: ${rem("48px")};
  
  color: #8B0000;
  background: #fff;
  border: 2px solid #8B0000;
  font-weight: 500;
  
  :hover {
    color: #FF0000;
    background: #fff;
    border: 2px solid #FF0000;
    font-size: 18px;
  }
  :active {
    color: #FF0000;
    background: #fff;
    border: 2px solid #FF0000;
    font-size: 18px;
  }
`


const AreYouSureModal = ({
                             closeModal,
                             context,
                             handleDeleteTest,
                             handleDeleteRequest,
                             handleDeleteSeekerProfile,
                             handleDeleteDonorProfile,
                             id
                         }) => {
    const dispatch = useDispatch();
    const {push} = useHistory();


    const handleWhichDelete = (e, ID) => {
        if (context === "request") {
            handleDeleteRequest(e, ID)
        }
        if (context === "test") {
            handleDeleteTest(e, ID)
        }
        if (context === "seekerprofile") {
            handleDeleteSeekerProfile(e, ID)
        }
        if (context === "donorprofile") {
            handleDeleteDonorProfile(e, ID)
        }
    }

    return (
        <ModalWrapper>
            <Modal>
                <QuestionContainer>
                    <MiddleTitle>
                        Are you sure?
                    </MiddleTitle>
                </QuestionContainer>
                <ButtonContainer>
                    <WhiteButton onClick={closeModal}>
                        Back
                    </WhiteButton>
                    <YesButton onClick={e => handleWhichDelete(e, id)}>
                        Delete
                    </YesButton>
                </ButtonContainer>
            </Modal>
        </ModalWrapper>
    );
};

export default AreYouSureModal;
