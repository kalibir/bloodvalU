import React, {useState} from "react";
import {PageContainer} from "../../style/GlobalWrappers";
import QrReader from 'react-qr-scanner'


const SeekerScanCode = (props) => {
    const [data, setData] = useState({
        delay: 100,
        result: 'No result',
    });

    const handleScan = data => {
        setData({
            result: data
        })
    }
    const handleError = err => {
        console.error(err)
    }
    const previewStyle = {
        height: 240,
        width: 320,
    }

    console.log("local state", data)

    return (
        <PageContainer>
            <QrReader
                delay={data.delay}
                style={previewStyle}
                onError={handleError}
                onScan={handleScan}
            />
            <p>{data.result}</p>
        </PageContainer>
    )
}

export default SeekerScanCode