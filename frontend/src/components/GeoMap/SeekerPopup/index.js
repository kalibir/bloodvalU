import React, {useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import {useDispatch} from "react-redux";
import {applyToRequestOnMap, getRequestsOfSingleSeeker} from "../../../store/actions/mapActions";
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
    }, [selectedSeeker.id, dispatch])

    const handleApply = async (e, reqID) => {
        console.log("in the apply handler")
        const response = await dispatch(applyToRequestOnMap(reqID))
        if (response.status < 300) {
            const {data} = response
            const newRequests = [...requests]
            const index = requests.findIndex(
                (request) => request.id === data.id
            )
            newRequests[index] = data
            setRequests(newRequests)
        }
    }

    return (
        <Wrapper>
            <h3>{selectedSeeker.name}</h3>
            {requests ? requests.map((request, index) => {
                return (
                    <GenericMiniDonorRequestBar handleApply={handleApply} key={request.id} request={request}/>
                )
            }) : null}
        </Wrapper>
    )
}

export default SeekerInfo