import React, { useState } from "react";
import styled from "styled-components";
import { BaseStatusButton } from "../../style/GlobalButtons/";
import { DarkBlueButton, WhiteButton } from "../../style/GlobalButtons/";
import { connect, useDispatch } from "react-redux";
import { rem } from "polished";
import { useHistory } from "react-router";
import { createTestRequestAction } from "../../store/actions/offeredTestActions";
import {MiddleTitle, SmallTitle} from "../../style/GlobalTitles";

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


const AreYouSureModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { push } = useHistory();


  return (
    <ModalWrapper>
      <Modal>
        <QuestionContainer>
            <MiddleTitle>
                Are you sure?
            </MiddleTitle>
        </QuestionContainer>
          <ButtonContainer>
            <WhiteButton>
                Back
            </WhiteButton>
              <YesButton>
                  Yes
              </YesButton>
          </ButtonContainer>
      </Modal>
    </ModalWrapper>
  );
};

export default AreYouSureModal;
