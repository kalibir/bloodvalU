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
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    gap: 10px 34px;
`;

const InputContainer = styled.div`
    background-color: rosybrown;
`


export const DonorValidationPage = (props) => {

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
        // <div>Hello world</div>
        <FormWrapper onSubmit={handleSubmit}>
            <FormContainer>
                <input type="text" placeholder="first name" onChange={(e) => onChangeHandler(e, "first_name")} required />
                <input type="text" placeholder="last name" onChange={(e) => onChangeHandler(e, "last_name")} required />
                <input type="text" placeholder="zip" onChange={(e) => onChangeHandler(e, "zip")} required />
                <input type="text" placeholder="street" onChange={(e) => onChangeHandler(e, "street")} required />
                <input type="text" placeholder="city" onChange={(e) => onChangeHandler(e, "city")} required />
                <input type="text" placeholder="country" onChange={(e) => onChangeHandler(e, "country")} required />
                <input type="date" placeholder="birthday" onChange={(e) => onChangeHandler(e, "birthday")} required />
                <select placeholder="gender" onChange={(e) => onChangeHandler(e, "gender")}>
                    <option value="other">other</option>
                    <option value="female">female</option>
                    <option value="male">male</option>
                </select>
                <select placeholder="blood group" onChange={(e) => onChangeHandler(e, "blood_group")}>
                    <option value="O-">O-</option>
                    <option value="O+">O+</option>
                    <option value="A-">A-</option>
                    <option value="A+">A+</option>
                    <option value="B-">B-</option>
                    <option value="B+">B+</option>
                    <option value="AB-">AB-</option>
                    <option value="AB+">AB+</option>
                </select>
                <input placeholder="phone number" onChange={(e) => onChangeHandler(e, "phone_number")} required />
                <input type="email" placeholder="e-mail" onChange={(e) => onChangeHandler(e, "email")} required />
                <input type="text" placeholder="validation code" onChange={(e) => onChangeHandler(e, "validation_code")} required />
                <input type="password" placeholder="password" onChange={(e) => onChangeHandler(e, "password")} required />
                <input type="password" placeholder="repeat password" onChange={(e) => onChangeHandler(e, "password2")} required />
            </FormContainer>
            <div>
                <button>Submit</button>
                <button>Cancel</button>
            </div>
        </FormWrapper>
    )
}