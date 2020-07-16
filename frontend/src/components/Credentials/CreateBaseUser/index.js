import React, {useState} from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import {ErrorPlaceholder, MiddleTitle, SmallTitle} from "../../../style/GlobalTitles";
import {BigInput, Select, SmallInput} from "../../../style/GlobalInputs";
import {DarkBlueButton, WhiteButton} from "../../../style/GlobalButtons";
import {PageContainer} from "../../../style/GlobalWrappers";
import {connect} from "react-redux";
import {validate} from "../../../store/actions/registrationActions";
import {useHistory} from "react-router";
import {Link} from "react-router-dom";
import {resetError} from "../../../store/actions/errorActions";

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    //background-color: darkorange;
`;

const FormContainer = styled.div`    
    display: flex;
    flex-flow: column;
    //background-color: burlywood;
`;

const InputPairContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${rem("24px")};
    width: ${rem("352px")};
`

const TitleContainer = styled(InputPairContainer)`
    justify-content: flex-start;
    margin-top: ${rem("48px")};
`

const MiddleTitle500 = styled(MiddleTitle)`
    font-weight: 500;
`


const ButtonContainer = styled(InputPairContainer)`
    justify-content: flex-end;
    margin: 0;
    //background-color: rosybrown;
`

const InputTitle = styled(SmallTitle)`
    margin-bottom: ${rem("8px")};
    font-weight: 500;
`

const Error = styled(ErrorPlaceholder)``

{/*<Link to={`${isDonor === "False" ? "/auth/signup/validation/seeker" : "/auth/signup/validation/donor"}`}>*/
}


const CreateBaseUser = ({registrationReducer: {isDonor, email}, dispatch, errorReducer: {error}}) => {
    const {push} = useHistory()

    const [userInfo, setUserInfo] = useState({
        email: `${email ? email : ""}`,
        code: "",
        password: "",
        password_repeat: "",
        is_donor: `${isDonor}`,
    })

    console.log("userInfo", userInfo)

    const onChangeHandler = (event, property) => {
        const value = event.currentTarget.value;
        setUserInfo({...userInfo, [property]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(resetError())
        console.log("This is a submit function.")
        const response = await dispatch(validate(userInfo));
        if (response.status < 300) {
            console.log("success!")
            // push(``)
        }

    }

    return (
        <PageContainer>

            <FormWrapper onSubmit={handleSubmit}>

                <FormContainer>

                    <TitleContainer>
                        <MiddleTitle500>Create an Account</MiddleTitle500>
                    </TitleContainer>

                    <InputPairContainer>
                        <div>
                            <InputTitle>E-mail</InputTitle>
                            <Error><p>{error === ("1" || "email") ? "Enter a valid email address" : null}</p></Error>
                            <BigInput value={userInfo.email} type="email" placeholder="sherlock@holmes.com"
                                      onChange={(e) => onChangeHandler(e, "email")} required/>
                        </div>
                    </InputPairContainer>

                    <InputPairContainer>
                        <div>
                            <InputTitle>Password</InputTitle>
                            <Error><p>{error === "3" ? "Passwords do not match!" : null}</p></Error>
                            <BigInput title="Password must be at least 4 characters" pattern=".{4,}" type="password" placeholder="password"
                                      onChange={(e) => onChangeHandler(e, "password")} required/>
                        </div>
                    </InputPairContainer>

                    <InputPairContainer>
                        <div>
                            <InputTitle>Repeat password</InputTitle>
                            <BigInput type="password" placeholder="repeat password"
                                      onChange={(e) => onChangeHandler(e, "password_repeat")} required/>
                        </div>
                    </InputPairContainer>

                    <InputPairContainer>
                        <div>
                            <InputTitle>Verification code</InputTitle>
                            <Error><p>{error === "2" ? "Validation code is incorrect" : null}</p></Error>
                            <BigInput type="text" placeholder="123456"
                                      onChange={(e) => onChangeHandler(e, "code")} required/>
                        </div>
                    </InputPairContainer>

                    <ButtonContainer>
                        <DarkBlueButton>Create</DarkBlueButton>
                    </ButtonContainer>

                </FormContainer>

            </FormWrapper>

        </PageContainer>
    )
}

const mapStateToProps = (state) => {
    console.log("state", state);
    return {
        registrationReducer: state.registrationReducer,
        errorReducer: state.errorReducer,
        authReducer: state.authReducer,
    };
};

export default connect(mapStateToProps)(CreateBaseUser);