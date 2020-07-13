import React, { useState } from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;
    height: 95%;
`;

const FormContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    gap: 0px 34px;
`;

const handleSubmit = (e) => {
    console.log("This is a submit function.")
}


export const DonorRegistrationPage = (props) => {
    return (
        // <div>Hello world</div>
        <FormWrapper onSubmit={handleSubmit}>
            <FormContainer>
                <input/>
            </FormContainer>
        </FormWrapper>
    )
}