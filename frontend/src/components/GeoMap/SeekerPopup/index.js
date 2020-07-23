import React, {useEffect, useState} from "react";
import styled, {keyframes} from "styled-components";
import {useDispatch} from "react-redux";
import {applyToRequestOnMap, getRequestsOfSingleSeeker} from "../../../store/actions/mapActions";
import GenericMiniDonorRequestBar from "./GenericMiniDonorRequestBar";
import {bloodGroupTest} from "../../../HelperFunctions";

const CloseWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -30px;
  right: -30px;
  background-color: white;
  border-radius: 50%;
  width: 25px;
  height: 25px;
  border: 1px solid black;
  
  :hover {
    color: white;
    background-color: black;
  }
`
const Close = styled.p`
  cursor: pointer;
`
const Wrapper = styled.div`
`
const SeekerInfo = ({selectedSeeker, handleClosePopup, userObj}) => {
    const dispatch = useDispatch()
    const [requests, setRequests] = useState(null)
    console.log("seeker local data", requests)

    useEffect(() => {
        async function getRequests() {
            const response = await dispatch(getRequestsOfSingleSeeker(selectedSeeker.id))
            setRequests(response.data)
        }
        getRequests()
        return () => {
            setRequests(null)
        }
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
            <CloseWrapper><Close onClick={handleClosePopup}>&#9932;</Close></CloseWrapper>

            <h3>{selectedSeeker.name}</h3>
            <p>Phone: {selectedSeeker.phone}</p>
            {requests ? requests.map((request, index) => {
               if (userObj && bloodGroupTest(userObj.blood_group, request)) return ( <GenericMiniDonorRequestBar handleApply={handleApply} key={request.id} request={request}/> )
            }) : null}
        </Wrapper>
    )
}

export default SeekerInfo