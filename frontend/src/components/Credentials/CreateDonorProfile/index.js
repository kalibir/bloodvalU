import {PageContainer} from "../../../style/GlobalWrappers";
import {Select, SmallInput} from "../../../style/GlobalInputs";
import {DarkBlueButton} from "../../../style/GlobalButtons";
import React from "react";
import {connect} from "react-redux";

const CreateDonorProfile = (props) => {

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

const mapStateToProps = (state) => {
    console.log("state", state);
    return {
        registrationReducer: state.registrationReducer,
        errorReducer: state.errorReducer,
        authReducer: state.authReducer,
    };
};

export default connect(mapStateToProps)(CreateBaseUser);