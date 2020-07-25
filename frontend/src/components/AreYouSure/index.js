import React, {useState} from "react";
import styled from "styled-components";
import {BaseStatusButton} from "../../style/GlobalButtons/";
import {DarkBlueButton, WhiteButton} from "../../style/GlobalButtons/";
import {connect, useDispatch} from "react-redux";
import {rem} from "polished";
import {useHistory} from "react-router";
import {createTestRequestAction, deleteTestAction} from "../../store/actions/offeredTestActions";
import {MiddleTitle, SmallTitle} from "../../style/GlobalTitles";
import {deleteRequestAction} from "../../store/actions/bloodRequestActions";

const ModalWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
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
`


const AreYouSureModal = ({
                             closeModal,
                             context,
                             handleDeleteTest,
                             handleDeleteRequest,
                             handleDeleteSeekerProfile,
                             handleDeleteDonorProfile,
                             id}) => {
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
