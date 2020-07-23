import React, {useRef, useState} from "react";
import {PageContainer} from "../../style/GlobalWrappers";
import QrReader from 'react-qr-scanner'


const SeekerScanCode = (props) => {
    const [data, setData] = useState({
        delay: 100,
        scan: null,
    });
    const [QRCode, setQRCode] = useState(null)
    console.log("QRCode", QRCode);

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
        console.log("data", data.scan)
    }

    console.log("local state", data)

    return (
        <PageContainer>
            <QrReader
                ref={refs}
                delay={data.delay}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
            />
            <input type="button" value="Submit QR Code" onClick={handleSubmitQR}/>
            <p>{data.result}</p>
        </PageContainer>
    )
}

export default SeekerScanCode