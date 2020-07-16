import React, {useState} from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import {connect, useDispatch} from "react-redux";
import {BigInput, SmallInput} from "../../../style/GlobalInputs";
import {MiddleTitle, SmallTitle} from "../../../style/GlobalTitles";
import {DarkBlueButton} from "../../../style/GlobalButtons";
import {useHistory} from "react-router";
import {updateProfileAction} from "../../../store/actions/userActions";

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


const CreateSeekerProfile = ({authReducer}) => {

    const history = useHistory()
    const dispatch = useDispatch()
    const [seekerInfo, setSeekerInfo] = useState({
        name: "",
        country: "",
        zip_code: "",
        street: "",
        phone: "",
        website: "",
        certificate: null
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData()
        form.append('name', seekerInfo.name)
        form.append('country', seekerInfo.country)
        form.append('zip_code', seekerInfo.zip_code)
        form.append('street', seekerInfo.street)
        form.append('zip', seekerInfo.country)
        form.append('phone', seekerInfo.phone)
        form.append('website', seekerInfo.website)
        if (seekerInfo.certificate) {
            form.append('certificate', seekerInfo.certificate)
        }
        // if (seekerInfo.logo) {
        //     form.append('logo', seekerInfo.logo)
        // }
        const response = await dispatch(updateProfileAction(form));
        if (response.status < 300) {
            console.log("woohooo, success!")
            history.push(`/dashboard/seeker`)
        }
    }
    console.log("seekerInfo", seekerInfo)

    const onChangeHandler = (event, property) => {
        const value = event.currentTarget.value;
        setSeekerInfo({...seekerInfo, [property]: value});
    };

    const logoSelectHandler = e => {
        if (e.target.files[0]) {
            setSeekerInfo({...seekerInfo, logo: e.target.files[0]})
        }
    }

    const certificateSelectHandler = e => {
        if (e.target.files[0]) {
            setSeekerInfo({...seekerInfo, certificate: e.target.files[0]})
        }
    }


    return (<FormWrapper onSubmit={handleSubmit}>
            <TitleWrapper>
                <ValidationTitle>Create an account</ValidationTitle>
            </TitleWrapper>
            <InputWrapper>
                <div>
                    <SmallTitle>Company name</SmallTitle>
                    <CostumizedBigInput onChange={(e) => onChangeHandler(e, "name")} placeholder="Company name"
                                        required/>
                </div>
            </InputWrapper>
            <InputWrapper>
                <div>
                    <SmallTitle>Street</SmallTitle>
                    <StreetInput onChange={(e) => onChangeHandler(e, "street")} placeholder="Longstreet" required/>
                </div>
                <div>
                    <SmallTitle>Nr.</SmallTitle>
                    <NrInput placeholder="30" required/>
                </div>
            </InputWrapper>
            <InputWrapper>
                <div>
                    <SmallTitle>Zip</SmallTitle>
                    <CostumizedSmallInput onChange={(e) => onChangeHandler(e, "zip_code")} placeholder="8000 Zurich"
                                          required/>
                </div>
                <div>
                    <SmallTitle>Country</SmallTitle>
                    <CostumizedSmallInput onChange={(e) => onChangeHandler(e, "country")} placeholder="Switzerland"
                                          required/>
                </div>
            </InputWrapper>
            <InputWrapper>
                <div>
                    <SmallTitle>Phone</SmallTitle>
                    <CostumizedSmallInput onChange={(e) => onChangeHandler(e, "phone")} placeholder="044 123 45 67"
                                          required/>
                </div>
                <div>
                    <SmallTitle>Website</SmallTitle>
                    <CostumizedSmallInput onChange={(e) => onChangeHandler(e, "website")} placeholder="www.example.ch"
                                          required/>
                </div>
            </InputWrapper>
            <ButtonWrapper>
                <div>
                    <SmallTitle>Licence</SmallTitle>
                    <InputLabel htmlFor="restaurant_image">Choose a file...</InputLabel>
                    <div><p></p></div>
                    <InputFile onChange={certificateSelectHandler} id="restaurant_image" accept="application/pdf"
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
