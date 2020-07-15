import React, {useState} from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import {MiddleTitle, SmallTitle} from "../../../style/GlobalTitles";
import {BigInput, Select, SmallInput} from "../../../style/GlobalInputs";
import {DarkBlueButton, WhiteButton} from "../../../style/GlobalButtons";
import {PageContainer} from "../../../style/GlobalWrappers";

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

const AddressInput = styled(BigInput)`
    width: ${rem("256px")};
`;

const HouseNumberInput = styled(BigInput)`
    width: ${rem("64px")};
`;

const WhiteButtonWithMargin = styled(WhiteButton)`
    margin-right: ${rem("16px")};
`

export const DonorValidationPageOne = (props) => {

    const onChangeHandler = (event, property) => {
        const value = event.currentTarget.value;
        // setDonorInfo({...donorInfo, [property]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("This is a submit function.")

        // from Luna-project
        //donorInfo is just a name, correct it later!!!

        // const form = new FormData()
        // form.append('first_name', donorInfo.first_name)
        // form.append('last_name', donorInfo.last_name)
        // form.append('gender', donorInfo.gender)
        // form.append('birthday', donorInfo.birthday)
        // form.append('blood_group', donorInfo.blood_group)
        // form.append('phone_number', donorInfo.phone_number)
        // form.append('email', donorInfo.email)

        // const response = await dispatch(createRestaurantAction(form));
        // if (response.status < 300) {
        //     console.log("woohooo", response)
        //     const restaurantId = response.data.id
        //     history.push(`/restaurants/${restaurantId}`)
        // }

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
                            <BigInput type="email" placeholder="sherlock@holmes.com"
                                      onChange={(e) => onChangeHandler(e, "email")} required/>
                        </div>
                    </InputPairContainer>

                    <InputPairContainer>
                        <div>
                            <InputTitle>Password</InputTitle>
                            <BigInput type="password" placeholder="password"
                                      onChange={(e) => onChangeHandler(e, "password")} required/>
                        </div>
                    </InputPairContainer>

                    <InputPairContainer>
                        <div>
                            <InputTitle>Repeat password</InputTitle>
                            <BigInput type="password" placeholder="repeat password"
                                      onChange={(e) => onChangeHandler(e, "password2")} required/>
                        </div>
                    </InputPairContainer>

                    <InputPairContainer>
                        <div>
                            <InputTitle>Verification code</InputTitle>
                            <BigInput type="text" placeholder="123456"
                                      onChange={(e) => onChangeHandler(e, "validation_code")} required/>
                        </div>
                    </InputPairContainer>

                    <ButtonContainer>
                        <DarkBlueButton>Continue</DarkBlueButton>
                    </ButtonContainer>

                </FormContainer>

            </FormWrapper>

        </PageContainer>
    )
}


export const DonorValidationPageTwo = (props) => {

    const onChangeHandler = (event, property) => {
        const value = event.currentTarget.value;
        // setDonorInfo({...donorInfo, [property]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("This is a submit function.")

        // from Luna-project
        //donorInfo is just a name, correct it later!!!

        // const form = new FormData()
        // form.append('first_name', donorInfo.first_name)
        // form.append('last_name', donorInfo.last_name)
        // form.append('zip', donorInfo.zip)
        // form.append('street', donorInfo.street)
        // form.append('city', donorInfo.city)
        // form.append('country', donorInfo.country)
        // form.append('birthday', donorInfo.birthday)
        // form.append('gender', donorInfo.gender)
        // form.append('blood_group', donorInfo.blood_group)
        // form.append('phone_number', donorInfo.phone_number)
        // form.append('email', donorInfo.email)
        // form.append('validation_code', donorInfo.validation_code)
        // form.append('password', donorInfo.password)
        // form.append('password2', donorInfo.password2)

        // const response = await dispatch(createRestaurantAction(form));
        // if (response.status < 300) {
        //     console.log("woohooo", response)
        //     const restaurantId = response.data.id
        //     history.push(`/restaurants/${restaurantId}`)
        // }

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
                            <InputTitle>First Name</InputTitle>
                            <SmallInput type="text" placeholder="Sherlock"
                                        onChange={(e) => onChangeHandler(e, "first_name")} required/>
                        </div>

                        <div>
                            <InputTitle>Last Name</InputTitle>
                            <SmallInput type="text" placeholder="Holmes"
                                        onChange={(e) => onChangeHandler(e, "last_name")} required/>
                        </div>
                    </InputPairContainer>

                    <InputPairContainer>
                        <div>
                            <InputTitle>Gender</InputTitle>
                            <Select onChange={(e) => onChangeHandler(e, "gender")} required>
                                <option value="male">male</option>
                                <option value="female">female</option>
                                <option value="other">other</option>
                            </Select>
                        </div>

                        <div>
                            <InputTitle>Birthday</InputTitle>
                            <SmallInput type="date" value="1854-01-06" onChange={(e) => onChangeHandler(e, "birthday")}
                                        required/>
                        </div>
                    </InputPairContainer>

                    <InputPairContainer>
                        <div>
                            <InputTitle>Blood Group</InputTitle>
                            <Select onChange={(e) => onChangeHandler(e, "blood_group")} required>
                                <option value="O-">O-</option>
                                <option value="O+">O+</option>
                                <option value="A-">A-</option>
                                <option value="A+">A+</option>
                                <option value="B-">B-</option>
                                <option value="B+">B+</option>
                                <option value="AB-">AB-</option>
                                <option value="AB+">AB+</option>
                            </Select>
                        </div>

                        <div>
                            <InputTitle>Phone Number</InputTitle>
                            <SmallInput type="text" placeholder="+44 20 7224 3688"
                                        onChange={(e) => onChangeHandler(e, "phone_number")} required/>
                        </div>
                    </InputPairContainer>


                    <InputPairContainer>
                        <div>
                            <InputTitle>Address</InputTitle>
                            <AddressInput type="text" placeholder="Baker Street"
                                          onChange={(e) => onChangeHandler(e, "street")} required/>
                        </div>

                        <div>
                            <InputTitle>Nr.</InputTitle>
                            <HouseNumberInput type="text" placeholder="221B"
                                              onChange={(e) => onChangeHandler(e, "house_number")} required/>
                        </div>
                    </InputPairContainer>

                    <InputPairContainer>
                        <div>
                            <InputTitle>Zip code</InputTitle>
                            <SmallInput type="text" placeholder="NW1 London" onChange={(e) => onChangeHandler(e, "zip")}
                                        required/>
                        </div>

                        <div>
                            <InputTitle>Country</InputTitle>
                            <SmallInput type="text" placeholder="England"
                                        onChange={(e) => onChangeHandler(e, "country")} required/>
                        </div>
                    </InputPairContainer>

                    <ButtonContainer>
                        <WhiteButtonWithMargin>Back</WhiteButtonWithMargin>
                        <DarkBlueButton>Register</DarkBlueButton>
                    </ButtonContainer>

                </FormContainer>
            </FormWrapper>
        </PageContainer>
    )
}