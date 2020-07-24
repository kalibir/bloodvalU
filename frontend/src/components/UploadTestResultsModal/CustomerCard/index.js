import React, {useState} from "react";
import styled from "styled-components";
import {DonorSubBar} from "../../GenericSeekerRequestBar";
import {WhiteButton, WhiteLabel} from "../../../style/GlobalButtons";
import {uploadTestResultsAction} from "../../../store/actions/offeredTestActions";
import {useDispatch} from "react-redux";

const Wrapper = styled(DonorSubBar)`
  width: 80%;
`
const UploadInput = styled.input`
  display: none;
`
const UploadLabel = styled(WhiteLabel)``

const CustomWhiteButton = styled(WhiteButton)`
  padding: 5px;
  margin-left: 5px;
  width: auto;
  height: auto;
`;
const CustomerBar = ({testID, customer: {id, pdf_result, last_name, first_name}, handleUpdateCustomers}) => {
    const [uploadedPDF, setUploadedPFD] = useState(null)
    const dispatch = useDispatch()

    const PDFSelectHandler = (e) => {
        if (e.target.files[0]) {
            setUploadedPFD(e.target.files[0]);
        }
    };

    console.log(`${first_name}'s uploaded file`, uploadedPDF)

    const handleUpload = async (e) => {
        const form = new FormData()
        form.append("donor", id)
        form.append("test_id", testID)
        form.append("results", uploadedPDF)
        const response = await dispatch(uploadTestResultsAction(form))
        if (response.status < 300) handleUpdateCustomers(response.data)
    }

    return (
        <Wrapper key={id} id={id}>
            <div>{`${first_name} ${last_name}`}</div>
            <div>
                {pdf_result ?
                    <>
                        <UploadLabel htmlFor={first_name}>CHANGE</UploadLabel>
                        <UploadInput type="file" onChange={PDFSelectHandler} id={first_name}/>
                        <CustomWhiteButton>DOWNLOAD</CustomWhiteButton>
                        {uploadedPDF ? <CustomWhiteButton>SAVE</CustomWhiteButton> : null}
                    </> :
                    <>
                        <UploadLabel htmlFor={first_name}>UPLOAD</UploadLabel>
                        <UploadInput type="file" onChange={PDFSelectHandler} id={first_name}/>
                        {uploadedPDF ? <CustomWhiteButton>SAVE</CustomWhiteButton> : null}
                    </>
                }
            </div>
        </Wrapper>
    )
}

export default CustomerBar