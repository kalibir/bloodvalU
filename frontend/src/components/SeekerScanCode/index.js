import React, {useRef, useState} from "react";
import {PageContainer} from "../../style/GlobalWrappers";
import QrReader from 'react-qr-scanner'
import styled from "styled-components";

const SuccessText = styled.h1`
  color: #3eb33e;
  font-size: 40px;
`

const SeekerScanCode = (props) => {
    const [data, setData] = useState({
        delay: 100,
        scan: null,
    });
    const [QRCode, setQRCode] = useState(null)

    const handleScan = (scannedInfo) => {
        if (data.scan) setQRCode(data.scan)
        setData({...data, scan: scannedInfo})
    }
    const handleError = err => {
        console.error(err)
    }
    const previewStyle = {
        height: 240,
        width: 320,
    }
    const refs = useRef()
    const handleSubmitQR = (e) => {
        if (QRCode) console.log("QRCode", QRCode)

    }

    return (
        <PageContainer>
            {QRCode ? <SuccessText>Your code is {QRCode}!</SuccessText> : <p>Scanning, please hold still...</p>}
            <QrReader
                ref={refs}
                delay={data.delay}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
            />
            <input type="button" value="Submit QR Code" onClick={handleSubmitQR}/>
        </PageContainer>
    )
}

export default SeekerScanCode