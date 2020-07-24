import React, {useState} from "react";
import {useHistory} from "react-router";
import {connect, useDispatch} from "react-redux";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import {MiddleTitle, SmallTitle} from "../../style/GlobalTitles";
import {BigInput, Select, SmallInput} from "../../style/GlobalInputs";
import {DarkBlueButton, WhiteButton} from "../../style/GlobalButtons";
import {PageContainer} from "../../style/GlobalWrappers";
import {deleteUserAction, updateProfileAction} from "../../store/actions/userActions";
import {resetError} from "../../store/actions/errorActions";
import {Link} from "react-router-dom";
import AreYouSureModal from "../AreYouSure";
import {deleteTestAction} from "../../store/actions/offeredTestActions";
import CountrySelect from "../CountrySelect";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  //background-color: darkorange;
`;

const FormContainer = styled.form`
  display: flex;
  flex-flow: column;
`;

const InputPairContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${rem("24px")};
  width: ${rem("352px")};
`;

const TitleContainer = styled(InputPairContainer)`
  justify-content: space-between;
  margin-top: ${rem("24px")};
`;

const DeleteProfile = styled.button`
    font-weight: 400;
    font-size: 16px;
    line-height: 32px;
    text-decoration-line: underline;
    color: #FF0000;
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    
    :hover {
    color: #8B0000;
  }
  :active {
    color: #8B0000;
  }
`;

const MiddleTitle500 = styled(MiddleTitle)`
  font-weight: 500;
`;

const ButtonContainer = styled(InputPairContainer)`
  justify-content: flex-end;
  margin: 0;
  //background-color: rosybrown;
`;

const InputTitle = styled(SmallTitle)`
  margin-bottom: ${rem("8px")};
  font-weight: 500;
`;
const FullWidthInputContainer = styled.div`
  width: 100%;
`;
const AddressInput = styled(BigInput)`
  width: 100%;
`;

const NameInput = styled(BigInput)`
  width: 100%;
  margin-bottom: ${rem("24px")};
`;

const HouseNumberInput = styled(BigInput)`
  width: ${rem("64px")};
`;

const WhiteButtonWithMargin = styled(WhiteButton)`
  margin-right: ${rem("16px")};
`;

const ImgInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;
const ErrorMsg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
    p {
      color: red;
      text-align: center;
    }
`

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
  font-size: 9px;
  letter-spacing: 0.5px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SeekerEditProfile = ({
                               authReducer: {userObj: {id, name, email, country, zip_code, street, logo, certificate, website, phone}},
                               dispatch,
                               errorReducer: {error},
                           }) => {
    const {push} = useHistory();


    const [seekerInfo, setSeekerInfo] = useState({
        name: `${name}`,
        country: `${country}`,
        zip_code: `${zip_code}`,
        street: `${street}`,
        logo: null,
        certificate: null,
        phone: `${phone}`,
        website: `${website}`,
        email: `${email}`,
    });
    const [sureModal, setSureModal] = useState(false);


    const onChangeHandler = (event, property) => {
        const value = event.currentTarget.value;
        setSeekerInfo({...seekerInfo, [property]: value});
    };

    const logoSelectHandler = (e) => {
        dispatch(resetError());
        if (e.target.files[0]) {
            setSeekerInfo({
                ...seekerInfo,
                logo: e.target.files[0],
            });
        }
    };

    const certificateSelectHandler = (e) => {
        if (e.target.files[0]) {
            setSeekerInfo({...seekerInfo, certificate: e.target.files[0]});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append("name", seekerInfo.name);
        form.append("country", seekerInfo.country);
        form.append("zip_code", seekerInfo.zip_code);
        form.append("street", seekerInfo.street);
        form.append("zip_code", seekerInfo.zip_code);
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
            push(`/seekerprofilepage`);
        }
    };

    const closeModal = () => {
        setSureModal(false);
    };

    const handleDeleteSeekerProfile = async (e, seekerID) => {
        e.preventDefault();
        const response = await dispatch(deleteUserAction(seekerID));
        if (response.status < 300) closeModal();
    };


    return (
        <PageContainer>
            {sureModal ? (
                <AreYouSureModal
                    handleDeleteSeekerProfile={handleDeleteSeekerProfile}
                    closeModal={closeModal}
                    context={"seekerprofile"}
                    id={id}
                />
            ) : null}
            <FormWrapper>
                <TitleContainer>
                        <MiddleTitle500>Edit Profile</MiddleTitle500>
                        <DeleteProfile onClick={e => setSureModal(true)}>Delete Profile</DeleteProfile>
                    </TitleContainer>
                <FormContainer onSubmit={handleSubmit}>
                    <div>
                        <InputTitle>Name</InputTitle>
                        <NameInput
                            type="text"
                            placeholder="Sherlock"
                            onChange={(e) => onChangeHandler(e, "name")}
                            defaultValue={name}
                            required
                        />
                    </div>

                    <InputPairContainer>
                        <div>
                            <InputTitle>Zip Code</InputTitle>
                            <SmallInput
                                type="text"
                                placeholder="NW1 London"
                                onChange={(e) => onChangeHandler(e, "zip_code")}
                                defaultValue={zip_code}
                                required
                            />
                        </div>

                        <div>
                            <InputTitle>Country</InputTitle>
                            <CountrySelect
                                handleChange={(e) => onChangeHandler(e, "country")}
                                required
                                country={country}
                            />
                        </div>
                    </InputPairContainer>

                    <InputPairContainer>
                        <FullWidthInputContainer>
                            <InputTitle>Address</InputTitle>
                            <AddressInput
                                type="text"
                                placeholder="Baker Street"
                                onChange={(e) => onChangeHandler(e, "street")}
                                defaultValue={street}
                                required
                            />
                        </FullWidthInputContainer>
                    </InputPairContainer>

                    <InputPairContainer>
                        <div>
                            <InputTitle>Website</InputTitle>
                            <SmallInput
                                type="text"
                                onChange={(e) => onChangeHandler(e, "website")}
                                defaultValue={website}
                                required
                            />
                        </div>

                        <div>
                            <InputTitle>Phone Number</InputTitle>
                            <SmallInput
                                type="text"
                                placeholder="+44 20 7224 3688"
                                onChange={(e) => onChangeHandler(e, "phone")}
                                defaultValue={phone}
                                required
                            />
                        </div>
                    </InputPairContainer>

                    <ErrorMsg><p>{error === "certificate" ? "The uploaded file is not a PDF." : null}</p></ErrorMsg>
                    <ErrorMsg><p>{error === "logo" ? "The uploaded file is not an image." : null}</p></ErrorMsg>
                    <InputPairContainer>
                        <ImgInput
                            onChange={logoSelectHandler}
                            type="file"
                            accept={"image/*"}
                            name="logo"
                            id="logo"
                            className="inputfile"
                        />
                        <ChooseFileButton className="file_btn" htmlFor="logo">
                            {seekerInfo.logo ? "FILE UPLOADED" : "CHOOSE YOUR LOGO"}
                        </ChooseFileButton>
                        <ImgInput
                            onChange={certificateSelectHandler}
                            type="file"
                            accept="application/pdf"
                            name="file"
                            id="file"
                            className="inputfile"
                        />
                        <ChooseFileButton className="file_btn" htmlFor="file">
                            {seekerInfo.certificate ? "FILE UPLOADED" : "UPLOAD YOUR CERTIFICATE"}
                        </ChooseFileButton>
                    </InputPairContainer>
                    <ButtonContainer>
                        <WhiteButtonWithMargin>Back</WhiteButtonWithMargin>
                        <DarkBlueButton>Save</DarkBlueButton>
                    </ButtonContainer>
                </FormContainer>
            </FormWrapper>
        </PageContainer>
    );
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer,
        errorReducer: state.errorReducer,
    };
};

export default connect(mapStateToProps)(SeekerEditProfile);
