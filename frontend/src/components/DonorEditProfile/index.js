import React, {useState} from "react";
import styled from "styled-components";
import rem from "polished/lib/helpers/rem";
import {MiddleTitle, SmallTitle} from "../../style/GlobalTitles";
import {BigInput, Select, SmallInput} from "../../style/GlobalInputs";
import {DarkBlueButton, WhiteButton} from "../../style/GlobalButtons";
import {PageContainer} from "../../style/GlobalWrappers";
import {connect} from "react-redux";
import {resetError} from "../../store/actions/errorActions";
import {updateProfileAction} from "../../store/actions/userActions";
import {setLoggedInUser} from "../../store/actions/loginActions";
import {Link, useHistory} from "react-router-dom";

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

const FullWidthInputContainer = styled.div`
  width: 100%;
`;

const AddressInput = styled(BigInput)`
  width: 100%;
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
  width: 100%;
  height: ${rem("32px")};
  cursor: pointer;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  letter-spacing: 0.5px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
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

const DonorEditProfile = ({
                              dispatch,
                              errorReducer: {error},
                              authReducer: {
                                  userObj:
                                      {
                                          first_name,
                                          last_name,
                                          email,
                                          country,
                                          zip_code,
                                          street,
                                          blood_group,
                                          gender,
                                          phone,
                                          birthday,
                                      }
                              },
                          }) => {

    const {push} = useHistory()


    const [donorInfo, setDonorInfo] = useState({
        first_name: `${first_name}`,
        last_name: `${last_name}`,
        country: `${country}`,
        zip_code: `${zip_code}`,
        street: `${street}`,
        avatar: null,
        blood_group: `${blood_group}`,
        gender: `${gender}`,
        phone: `${phone}`,
        birthday: `${birthday}`,
        email: `${email}`,
    });


    const onChangeHandler = (event, property) => {
        const value = event.currentTarget.value;
        setDonorInfo({...donorInfo, [property]: value});
    };

    const avatarSelectHandler = (e) => {
        dispatch(resetError());
        if (e.target.files[0]) {
            setDonorInfo({
                ...donorInfo,
                avatar: e.target.files[0],
            });
        }
    };

    const handleCancel = e => {
        dispatch(resetError());
        push("dashboard/donor")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(resetError());
        const form = new FormData();
        form.append("first_name", donorInfo.first_name);
        form.append("last_name", donorInfo.last_name);
        form.append("country", donorInfo.country);
        form.append("zip_code", donorInfo.zip_code);
        form.append("street", donorInfo.street);
        form.append("phone", donorInfo.phone);
        form.append("blood_group", donorInfo.blood_group);
        form.append("gender", donorInfo.gender);
        form.append("birthday", donorInfo.birthday);
        form.append("email", donorInfo.email);
        if (donorInfo.avatar) {
            form.append("avatar", donorInfo.avatar);
        }
        const response = await dispatch(updateProfileAction(form));
        if (response.status < 300) {
            dispatch(setLoggedInUser(response.data));
            push("dashboard/donor")
        }
    };

    return (
        <PageContainer>
            <FormWrapper onSubmit={handleSubmit}>
                <FormContainer>
                    <TitleContainer>
                        <MiddleTitle500>Edit Profile</MiddleTitle500>
                    </TitleContainer>

                    <InputPairContainer>
                        <div>
                            <InputTitle>First Name</InputTitle>
                            <SmallInput
                                type="text"
                                placeholder="Sherlock"
                                onChange={(e) => onChangeHandler(e, "first_name")}
                                defaultValue={first_name}
                                required
                            />
                        </div>

                        <div>
                            <InputTitle>Last Name</InputTitle>
                            <SmallInput
                                type="text"
                                placeholder="Holmes"
                                onChange={(e) => onChangeHandler(e, "last_name")}
                                defaultValue={last_name}
                                required
                            />
                        </div>
                    </InputPairContainer>

                    <InputPairContainer>
                        <div>
                            <InputTitle>Gender</InputTitle>
                            <Select defaultValue={gender} onChange={(e) => onChangeHandler(e, "gender")} required>
                                <option value="M">male</option>
                                <option value="F">female</option>
                                <option value="O">other</option>
                            </Select>
                        </div>

                        <div>
                            <InputTitle>Birthday</InputTitle>
                            <SmallInput
                                type="date"
                                onChange={(e) => onChangeHandler(e, "birthday")}
                                defaultValue={birthday}
                                required
                            />
                        </div>
                    </InputPairContainer>

                    <InputPairContainer>
                        <div>
                            <InputTitle>Blood Group</InputTitle>
                            <Select defaultValue={blood_group} onChange={(e) => onChangeHandler(e, "blood_group")}
                                    required>
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
                            <SmallInput
                                type="text"
                                placeholder="+44 20 7224 3688"
                                onChange={(e) => onChangeHandler(e, "phone")}
                                defaultValue={phone}
                                required
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
                            <InputTitle>Zip code</InputTitle>
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
                            <SmallInput
                                type="text"
                                placeholder="England"
                                onChange={(e) => onChangeHandler(e, "country")}
                                defaultValue={country}
                                required
                            />
                        </div>
                    </InputPairContainer>
                    <ErrorMsg>
                        <p>{error === "avatar" ? "The uploaded file is not an image." : null}</p>
                    </ErrorMsg>
                    <ImgInput
                        onChange={avatarSelectHandler}
                        type="file"
                        name="file"
                        id="file"
                        className="inputfile"
                    />
                    <ChooseFileButton className="file_btn" htmlFor="file">
                        {donorInfo.avatar ? "FILE UPLOADED" : "CHOOSE YOUR PROFILE PICTURE"}
                    </ChooseFileButton>

                    <ButtonContainer>
                        <WhiteButtonWithMargin onClick={handleCancel}>Cancel</WhiteButtonWithMargin>
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

export default connect(mapStateToProps)(DonorEditProfile);