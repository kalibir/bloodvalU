import React, {useState} from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import {connect, useDispatch} from "react-redux";

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


const InputContainer = styled.div`
    height: ${rem("140px")};
    width: ${rem("370px")};
    display: flex;
    flex-direction: column;
`;

const InputLabel = styled.label`
      border-radius: ${rem("30px")};
      border: none;
      width: ${rem("216px")};
      height: ${rem("38px")};
      background: #de3341;
      cursor: pointer;
      font-style: normal;
      font-weight: normal;
      line-height: ${rem("18px")};
      text-align: center;
      padding-top: ${rem("10px")};
      color: #ffffff;
      margin-top: ${rem("12px")};

      :hover {
          background-color: #de3360;
      }
      :active {
          background-color: #de3360;
      }
`

const InputFile = styled.input`
      display: none;
      
`


const ValidationSeeker = (props) => {
    /*const {authReducer} = props
    console.log("authReducer", authReducer)
    const history = useHistory()
    const dispatch = useDispatch()
    const [seekerInfo, setSeekerInfo] = useState({
        email: "",
        validation_code: "",
        password: "",
        password_repeat: "",
        company_name: "",
        country: "",
        city: "",
        zip: "",
        street: "",
        phone: "",
        website: "",
        certificate: ""
    })

    const onChangeHandler = (event, property) => {
        const value = event.currentTarget.value;
        setSeekerInfo({...seekerInfo, [property]: value});
    };

    const imageSelectHandler = e => {
        if (e.target.files[0]) {
            setSeekerInfo({...seekerInfo, certificate: e.target.files[0]})
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData()
        form.append('name', seekerInfo.email)
        form.append('category_id', seekerInfo.validation_code)
        form.append('country', seekerInfo.password)
        form.append('street', seekerInfo.password_repeat)
        form.append('city', seekerInfo.company_name)
        form.append('zip', seekerInfo.country)
        form.append('website', seekerInfo.city)
        form.append('phone', seekerInfo.zip)
        form.append('email', seekerInfo.street)
        form.append('opening_hours', seekerInfo.phone)
        form.append('price_level', seekerInfo.website)
        form.append('image', seekerInfo.certificate)
        }
        const response = await dispatch(validate(seekerInfo));
        if (response.status < 300) {
            console.log("woohooo", response)
            const seekerId = response.data.id
            history.push(`/seekerprofiles/${seekerId}`)
        } else {
            console.log('error', response)
        }
    };*/


    return (
            <FormWrapper>
                <div>Validation</div>
                <FormContainer >
                    <InputContainer>
                        <input placeholder="email" type="email" required/>
                    </InputContainer>
                    <InputContainer>
                        <input placeholder="validation code" type="number" required/>
                    </InputContainer>
                    <InputContainer>
                        <input placeholder="password"type="password" required/>
                    </InputContainer>
                    <InputContainer>
                        <input placeholder="repeat password" required/>
                    </InputContainer>
                    <InputContainer>
                        <input placeholder="company name" required/>
                    </InputContainer>
                    <InputContainer>
                        <select>
                            <option>country</option>
                        </select >
                    </InputContainer>
                    <InputContainer>
                        <input placeholder="city"/>
                    </InputContainer>
                    <InputContainer>
                        <input placeholder="zip"/>
                    </InputContainer>
                    <InputContainer>
                        <input placeholder="street" required/>
                    </InputContainer>
                    <InputContainer>
                        <input placeholder="phone" required/>
                    </InputContainer>
                    <InputContainer>
                        <input placeholder="website" required/>
                    </InputContainer>
                    <InputContainer>
                        <InputLabel htmlFor="restaurant_image">Certificate</InputLabel>
                        <InputFile id="restaurant_image" accept="application/pdf"
                                   type="file"/>
                    </InputContainer>
                </FormContainer>
                <button>Submit</button>
            </FormWrapper>
    )
}

const mapStateToProps = (state) => {
    console.log("state", state)
  return {
    authReducer: state.authReducer,
  };
};

export default connect(mapStateToProps)(ValidationSeeker);
