import React, {useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import {useDispatch} from "react-redux";
import {getRequestsOfSingleSeeker} from "../../../store/actions/mapActions";
import GenericMiniDonorRequestBar from "./GenericMiniDonorRequestBar";


const Wrapper = styled.div``
const SeekerInfo = ({selectedSeeker}) => {
    const dispatch = useDispatch()
    const [requests, setRequests] = useState(null)
    console.log("seeker local data", requests)

    useEffect(() => {
        async function getRequests() {
            const response = await dispatch(getRequestsOfSingleSeeker(selectedSeeker.id))
            setRequests(response.data)
        }

        getRequests()
    }, [])

    return (
        <Wrapper>
            <h3>{selectedSeeker.name}</h3>
            {requests? requests.map((request, index) => {
                return (
                    <GenericMiniDonorRequestBar key={request.id} request={request}/>
                )
                }): null}
        </Wrapper>
    )
}

export default SeekerInfo