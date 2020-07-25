import React, {useState} from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import {connect, useDispatch} from "react-redux";
import {BigInput, SmallInput} from "../../../style/GlobalInputs";
import {MiddleTitle, SmallTitle} from "../../../style/GlobalTitles";
import {DarkBlueButton} from "../../../style/GlobalButtons";
import {useHistory} from "react-router";
import {updateProfileAction} from "../../../store/actions/userActions";
import {PageContainer} from "../../../style/GlobalWrappers";
import CountrySelect from "../../CountrySelect";

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  height: calc(100vh - 136px);
  margin-top: 48px;
`;

const CostumizedBigInput = styled(BigInput)`
  margin-top: 8px;
  margin-bottom: 32px;
`;

const CostumizedSmallInput = styled(SmallInput)`
  margin-top: 8px;
`;

const FullWidthInputContainer = styled.div`
  width: 100%;
`;
const InputTitle = styled(SmallTitle)`
  font-weight: 500;
`;
const StreetInput = styled(SmallInput)`
  margin-top: 8px;
  width: 100%;
`;

const NrInput = styled(SmallInput)`
  margin-top: 8px;
  width: ${rem("64px")};
`;

const ValidationTitle = styled(MiddleTitle)`
  margin-bottom: 23px;
  font-weight: 500;
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
  color: #ffffff;
  margin-top: ${rem("9px")};

  :hover {
    color: #121232;
    background: #fff;
    border: 1px solid #121232;
  }
  :active {
    color: #121232;
    background: #fff;
    border: 1px solid #121232;
  }
`;

const InputFile = styled.input`
  display: none;
`;

const InputPairContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${rem("24px")};
  width: ${rem("352px")};
`;

const ImgInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const ChooseFileButton = styled.label`
  background: #121232;
  border-radius: 4px;
  border: 1px solid #121232;
  margin-bottom: ${rem("24px")};
  outline: none;
  width: ${rem("141px")};
  height: ${rem("32px")};
  cursor: pointer;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  letter-spacing: 0.5px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CreateSeekerProfile = ({authReducer}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [seekerInfo, setSeekerInfo] = useState({
        name: "",
        country: "",
        zip_code: "",
        street: "",
        phone: "",
        website: "",
        logo: null,
        certificate: null,
    });

    const logoSelectHandler = (e) => {
        // dispatch(resetError());
        if (e.target.files[0]) {
            setSeekerInfo({
                ...seekerInfo,
                logo: e.target.files[0],
            });
        }
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", seekerInfo.name);
    form.append("country", seekerInfo.country);
    form.append("zip_code", seekerInfo.zip_code);
    form.append("street", seekerInfo.street);
    form.append("zip", seekerInfo.country);
    form.append("phone", seekerInfo.phone);
    form.append("website", seekerInfo.website);
    if (seekerInfo.certificate) {
      form.append("certificate", seekerInfo.certificate);
    }
    if (seekerInfo.logo) {
      form.append("logo", seekerInfo.logo);
    }
    const response = await dispatch(updateProfileAction(form));
    if (response.status < 300) {
      history.push(`/dashboard/seeker`);
    }
  };

  const onChangeHandler = (event, property) => {
    const value = event.currentTarget.value;
    setSeekerInfo({ ...seekerInfo, [property]: value.replace(/,/g, '') });
  };

    const certificateSelectHandler = (e) => {
        if (e.target.files[0]) {
            setSeekerInfo({...seekerInfo, certificate: e.target.files[0]});
        }
    };

    return (
        <PageContainer>
            <FormWrapper onSubmit={handleSubmit}>
                <TitleWrapper>
                    <ValidationTitle>Create an Account</ValidationTitle>
                </TitleWrapper>
                <InputWrapper>
                    <div>
                        <InputTitle>Company name</InputTitle>
                        <CostumizedBigInput
                            onChange={(e) => onChangeHandler(e, "name")}
                            placeholder="Company name"
                            required
                        />
                    </div>
                </InputWrapper>
                <InputWrapper>
                    <FullWidthInputContainer>
                        <InputTitle>Street</InputTitle>
                        <StreetInput
                            onChange={(e) => onChangeHandler(e, "street")}
                            placeholder="Longstreet 7"
                            required
                        />
                    </FullWidthInputContainer>
                </InputWrapper>
                <InputWrapper>
                    <div>
                        <InputTitle>Zip</InputTitle>
                        <CostumizedSmallInput
                            onChange={(e) => onChangeHandler(e, "zip_code")}
                            placeholder="8000 Zurich"
                            required
                        />
                    </div>
                    <div>
                        <InputTitle>Country</InputTitle>
                        <CountrySelect
                                handleChange={(e) => onChangeHandler(e, "country")}
                                required/>
                    </div>
                </InputWrapper>
                <InputWrapper>
                    <div>
                        <InputTitle>Phone</InputTitle>
                        <CostumizedSmallInput
                            onChange={(e) => onChangeHandler(e, "phone")}
                            placeholder="044 123 45 67"
                            required
                        />
                    </div>
                    <div>
                        <InputTitle>Website</InputTitle>
                        <CostumizedSmallInput
                            onChange={(e) => onChangeHandler(e, "website")}
                            placeholder="www.example.ch"
                            required
                        />
                    </div>
                </InputWrapper>

                <InputPairContainer>
                    <ImgInput
                        onChange={logoSelectHandler}
                        type="file"
                        name="logo"
                        id="logo"
                        className="inputfile"
                    />
                    <ChooseFileButton className="file_btn" htmlFor="logo">
                        UPLOAD YOUR LOGO
                    </ChooseFileButton>
                    <ImgInput
                        onChange={certificateSelectHandler}
                        type="file"
                        name="file"
                        id="file"
                        className="inputfile"
                    />
                    <ChooseFileButton className="file_btn" htmlFor="file">
                        UPLOAD YOUR CERTICATE
                    </ChooseFileButton>
                </InputPairContainer>
                <ButtonWrapper>
                    <DarkBlueButton>Continue</DarkBlueButton>
                </ButtonWrapper>
            </FormWrapper>
        </PageContainer>
    );
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer,
    };
};

export default connect(mapStateToProps)(CreateSeekerProfile);
