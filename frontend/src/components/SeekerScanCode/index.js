import React, {useRef, useState} from "react";
import {PageContainer} from "../../style/GlobalWrappers";
import QrReader from 'react-qr-scanner'
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {validateQRCode} from "../../store/actions/QRActions";

const SuccessText = styled.h1`
  color: #3eb33e;
  font-size: 40px;
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

const SeekerScanCode = (props) => {
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
        if (QRCode) {
            const data = {code: QRCode}
            const response = await dispatch(validateQRCode(data))
            if (response.status < 300) setQRResponse({...QRresponse, message: response.data.detail, isGood: true})
            else setQRResponse({...QRresponse, message: "INVALID CODE", isGood: false})
        }
    }

    return (
        <PageContainer>
            {QRresponse.message ? QRresponse.isGood ? <SuccessText>{QRresponse.message}</SuccessText> :
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
            }
        </PageContainer>
    )
}

export default SeekerScanCode