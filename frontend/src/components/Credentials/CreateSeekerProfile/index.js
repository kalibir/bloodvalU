import React, {useState} from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import {connect, useDispatch} from "react-redux";
import {BigInput, SmallInput} from "../../../style/GlobalInputs";
import {MiddleTitle, SmallTitle} from "../../../style/GlobalTitles";
import {DarkBlueButton} from "../../../style/GlobalButtons";

const FormWrapper = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 95%;
    height: 95%;
    margin-top: 48px;
`;

const CostumizedBigInput = styled(BigInput)`
    margin-top: 9px;
    margin-bottom: 32px;
`;

const CostumizedSmallInput = styled(SmallInput)`
    margin-top: 9px;
`;

const StreetInput = styled(SmallInput)`
    margin-top: 9px;
    width: ${rem("256px")};
`;

const NrInput = styled(SmallInput)`
    margin-top: 9px;
    width: ${rem("64px")};
`;

const ValidationTitle = styled(MiddleTitle)`
    margin-bottom: 23px;
`;

const InputWrapper = styled.div`
    display: flex;
    width: ${rem("352px")};
    height: ${rem("97px")};
    justify-content: space-between;
`;

const TitleWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    width: ${rem("352px")};
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    width: ${rem("352px")};
`;

const InputLabel = styled.label`
      background: #121232;
      border-radius: 4px;
      border: none;
      outline: none;
      width: ${rem("141px")};
      height: ${rem("48px")};
      cursor: pointer;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      letter-spacing: 0.5px;
      color: #FFFFFF;
      margin-top: ${rem("9px")};

    :hover {
        color: #121232;
        background: #FFF;
        border: 1px solid #121232;
    }
    :active {
        color: #121232;
        background: #FFF;
        border: 1px solid #121232;
    }
`;

const InputFile = styled.input`
      display: none;
      
`;


const CreateSeekerProfile = (props) => {
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
                <TitleWrapper>
                    <ValidationTitle>Create an account</ValidationTitle>
                </TitleWrapper>
                <InputWrapper>
                    <div>
                        <SmallTitle>Company name</SmallTitle>
                        <CostumizedBigInput placeholder="Company name" required/>
                    </div>
                </InputWrapper>
                <InputWrapper>
                    <div>
                        <SmallTitle>Street</SmallTitle>
                        <StreetInput placeholder="Longstreet" required/>
                    </div>
                    <div>
                        <SmallTitle>Nr.</SmallTitle>
                        <NrInput placeholder="30" required/>
                    </div>
                </InputWrapper>
                <InputWrapper>
                    <div>
                        <SmallTitle>Zip</SmallTitle>
                        <CostumizedSmallInput placeholder="8000 Zurich" required/>
                    </div>
                    <div>
                        <SmallTitle>Country</SmallTitle>
                        <CostumizedSmallInput placeholder="Switzerland" required/>
                    </div>
                </InputWrapper>
                <InputWrapper>
                    <div>
                        <SmallTitle>Phone</SmallTitle>
                        <CostumizedSmallInput placeholder="044 123 45 67" required/>
                    </div>
                    <div>
                        <SmallTitle>Website</SmallTitle>
                        <CostumizedSmallInput placeholder="www.example.ch" required/>
                    </div>
                </InputWrapper>
                <ButtonWrapper>
                     <div>
                        <SmallTitle>Licence</SmallTitle>
                        <InputLabel htmlFor="restaurant_image">Choose a file...</InputLabel>
                        <div><p></p></div>
                        <InputFile id="restaurant_image" accept="application/pdf"
                                   type="file"/>
                    </div>
                    <DarkBlueButton>Continue</DarkBlueButton>
                </ButtonWrapper>
            </FormWrapper>
    )
}

const mapStateToProps = (state) => {
    console.log("state", state)
  return {
    authReducer: state.authReducer,
  };
};

export default connect(mapStateToProps)(CreateSeekerProfile);
