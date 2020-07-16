import React, { useState } from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import { MiddleTitle, SmallTitle } from "../../style/GlobalTitles";
import { BigInput, Select, SmallInput } from "../../style/GlobalInputs";
import { DarkBlueButton, WhiteButton } from "../../style/GlobalButtons";
import { PageContainer } from "../../style/GlobalWrappers";
import {connect} from "react-redux";

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
`;

const TitleContainer = styled(InputPairContainer)`
  justify-content: flex-start;
  margin-top: ${rem("24px")};
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

const AddressInput = styled(BigInput)`
  width: ${rem("256px")};
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

export const SeekerEditProfile = (props) => {
  const [image, setImage] = useState(null);

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  //   const {
  //     dispatch,
  //     profileObj: { name, email, country, zip_code, street, logo, certificate, website, phone },
  //   } = props;

  //   const [seekerInfo, setSeekerInfo] = useState({
  //     name: `${name}`,
  //     country: `${country}`,
  //     zip_code: `${zip_code}`,
  //     street: `${street}`,
  //     logo: null,
  //     certificate: `${certificate}`,
  //     phone: `${phone}`,
  //     website: `${website}`,
  //     email: `${email}`,
  //   });

  const [seekerInfo, setSeekerInfo] = useState({
    name: ``,
    country: ``,
    zip_code: ``,
    street: ``,
    logo: null,
    certificate: ``,
    phone: ``,
    website: ``,
    email: ``,
  });
  console.log(seekerInfo);

  const onChangeHandler = (event, property) => {
    const value = event.currentTarget.value;
    setSeekerInfo({ ...seekerInfo, [property]: value });
  };

  const avatarSelectHandler = (e) => {
    // dispatch(resetError());
    if (e.target.files[0]) {
      setSeekerInfo({
        ...seekerInfo,
        avatar: e.target.files[0],
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // dispatch(resetError());
    const form = new FormData();
    form.append("name", seekerInfo.name);
    form.append("country", seekerInfo.country);
    form.append("zip_code", seekerInfo.zip_code);
    form.append("street", seekerInfo.street);
    form.append("phone", seekerInfo.phone);
    form.append("website", seekerInfo.website);
    form.append("email", seekerInfo.email);
    if (seekerInfo.logo) {
      form.append("avatar", seekerInfo.logo);
    }

    // const response = await dispatch(updateUserAction(form));
    // if (response.status === 200) {
    //   dispatch(setUserProfileObj(response.data));
    // }
  };

  return (
    <PageContainer>
      <FormWrapper onSubmit={handleSubmit}>
        <FormContainer>
          <TitleContainer>
            <MiddleTitle500>Edit Profile</MiddleTitle500>
          </TitleContainer>

          <div>
            <InputTitle>Name</InputTitle>
            <NameInput
              type="text"
              placeholder="Sherlock"
              onChange={(e) => onChangeHandler(e, "name")}
              required
            />
          </div>

          <InputPairContainer>
            <div>
              <InputTitle>Zip code</InputTitle>
              <SmallInput
                type="text"
                placeholder="NW1 London"
                onChange={(e) => onChangeHandler(e, "zip")}
                required
              />
            </div>

            <div>
              <InputTitle>Country</InputTitle>
              <SmallInput
                type="text"
                placeholder="England"
                onChange={(e) => onChangeHandler(e, "country")}
                required
              />
            </div>
          </InputPairContainer>

          <InputPairContainer>
            <div>
              <InputTitle>Address</InputTitle>
              <AddressInput
                type="text"
                placeholder="Baker Street"
                onChange={(e) => onChangeHandler(e, "street")}
                required
              />
            </div>

            <div>
              <InputTitle>Nr.</InputTitle>
              <HouseNumberInput
                type="text"
                placeholder="221B"
                onChange={(e) => onChangeHandler(e, "house_number")}
                required
              />
            </div>
          </InputPairContainer>

          <InputPairContainer>
            <div>
              <InputTitle>Website</InputTitle>
              <SmallInput
                type="text"
                value="1854-01-06"
                onChange={(e) => onChangeHandler(e, "website")}
                required
              />
            </div>

            <div>
              <InputTitle>Phone Number</InputTitle>
              <SmallInput
                type="text"
                placeholder="+44 20 7224 3688"
                onChange={(e) => onChangeHandler(e, "phone")}
                required
              />
            </div>
          </InputPairContainer>

          <InputPairContainer>
            <ImgInput
              onChange={avatarSelectHandler}
              type="file"
              name="img_file"
              id="file"
              className="inputfile"
            />
            <ChooseFileButton className="file_btn" htmlFor="img_file">
              CHOOSE YOUR LOGO
            </ChooseFileButton>
            <ImgInput
              onChange={avatarSelectHandler}
              type="file"
              name="file"
              id="file"
              className="inputfile"
            />
            <ChooseFileButton className="file_btn" htmlFor="file">
              UPLOAD YOUR CERTICATE
            </ChooseFileButton>
          </InputPairContainer>
          <ButtonContainer>
            <WhiteButtonWithMargin>Cancel</WhiteButtonWithMargin>
            <DarkBlueButton>Save</DarkBlueButton>
          </ButtonContainer>
        </FormContainer>
      </FormWrapper>
    </PageContainer>
  );
};

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
    userProfileReducer: state.userProfileReducer,
  };
};

export default connect(mapStateToProps)(SeekerEditProfile);