import React from "react";
import styled from "styled-components";
import { rem } from "polished";
import {BloodValU} from "../../style/GlobalTitles";
import {PageContainer} from "../../style/GlobalWrappers";
import {ChooseRoleButton} from "../../style/GlobalButtons";

const LandPageContainer = styled(PageContainer)`
    //background-color: lightcoral;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: center;
`

const ContentWrapper = styled.div`
    //background-color: cadetblue;
    display: flex;
    flex-flow: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: calc(100% - 320px);
    margin-top: ${rem("104px")};
`

const WelcomeText = styled.div`
    font-size: ${rem("14px")};
    color: #505565;
    margin-top: ${rem("32px")};
    margin-bottom: ${rem("72px")};
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:  ${rem("736px")};
    //background-color: darkorange;
`

export const LandingPage = () => {
    return (
        <LandPageContainer>
            <ContentWrapper>
                <BloodValU text="Welcome to bloodval" black={32} red={48} />
                <WelcomeText>Let’s start creating your profile. Are you interested in</WelcomeText>
                <ButtonWrapper>
                    <ChooseRoleButton>Becoming a donor</ChooseRoleButton>
                    <ChooseRoleButton>Becoming a recipient</ChooseRoleButton>
                </ButtonWrapper>
            </ContentWrapper>
        </LandPageContainer>
    )
}