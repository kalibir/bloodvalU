import React, {useRef, useState} from "react";
import {BaseMenuContainer, PageContainer} from "../../style/GlobalWrappers";
import QrReader from 'react-qr-scanner'
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {validateQRCode} from "../../store/actions/QRActions";
import {MiddleButton} from "../DonorDashboard";
import {rem} from "polished";

const SuccessText = styled.h1`
  font-size: ${rem("25px")};
  font-weight: lighter;
`
const ErrorText = styled.h1`
  color: #b33e3e;
  font-size: 40px;
`
const SubmitQRBtn = styled.input`
  background-color: #7c1515;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
`
const Button = styled(MiddleButton)`
  width: 50%;
`;

const MenuContainer = styled(BaseMenuContainer)`
`
const Wrapper = styled.div`
  background-color: white;
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: black;
  padding: ${rem("20px")};;
  border-radius: 4px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.1);
`

const ContentWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const FadeWrapper = styled.div`
  display: flex;
    width: 600px;
  flex-direction: column;
  align-items: flex-start;
`

const Content = styled.div`
    ${(props) => (props.active ? "" : "display:none")}
`

const SeekerScanCode = (props) => {
    const [active, setActive] = useState("request")
    const dispatch = useDispatch()
    const [data, setData] = useState({
        delay: 100,
        scan: null,
    });
    const [QRCode, setQRCode] = useState(null)
    const [QRresponse, setQRResponse] = useState({
        isGood: null,
        message: null
    })

    const handleTabs = e => {
        const activeTab = e.currentTarget.id
        setActive(activeTab)
        setData({delay: 100, scan: null})
        setQRCode(null)
        setQRResponse({isGood: null, message: null})
    }


    const handleScan = (scannedInfo) => {
        if (data.scan) setQRCode(data.scan)
        setData({...data, scan: scannedInfo})
    }
    const handleError = err => {
    }
    const previewStyle = {
        height: 240,
        width: 320,
    }
    const refs = useRef()
    const handleSubmitQR = async (e) => {
        e.preventDefault()
        if (QRCode) {
            const data = {code: QRCode}
            const response = await dispatch(validateQRCode(data, active))
            console.log(`dispatching this code: ${data.code} To   ${active}`)
            if (response.status < 300) setQRResponse({...QRresponse, message: response.data, isGood: true})
            else setQRResponse({...QRresponse, message: "INVALID CODE", isGood: false})
        }
    }


    return (
        <PageContainer>
            <ContentWrapper><MenuContainer>
                <Button id="request" onClick={handleTabs} active={active === "request"}>
                    Scan Blood Request QR Code
                </Button>
                <Button id="tests" onClick={handleTabs} active={active === "tests"}>
                    Scan Test QR Code
                </Button>
            </MenuContainer>
                {QRresponse.message ? QRresponse.isGood ?
                    <FadeWrapper>
                        <Wrapper><SuccessText>Donor Name:</SuccessText>
                            <SuccessText>{QRresponse.message.donor}</SuccessText></Wrapper>
                        <Wrapper><SuccessText>Institution:</SuccessText>
                            <SuccessText>{QRresponse.message.institution}</SuccessText></Wrapper>
                        <Wrapper><SuccessText>Type of Appointment:</SuccessText>
                            <SuccessText>{QRresponse.message.type}</SuccessText></Wrapper>
                    </FadeWrapper>
                    :
                    <ErrorText>{QRresponse.message}</ErrorText> : null}
                <QrReader
                    ref={refs}
                    delay={data.delay}
                    style={previewStyle}
                    onError={handleError}
                    onScan={handleScan}
                />
                {QRCode ? <SubmitQRBtn type="button" value="Submit QR Code" onClick={handleSubmitQR}/> :
                    <p>Scanning, please hold still...</p>
                }</ContentWrapper>

        </PageContainer>
    )
}

export default SeekerScanCode