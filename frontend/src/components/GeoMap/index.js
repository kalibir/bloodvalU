import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import ReactMapGL, {Marker, Popup} from 'react-map-gl'
import styled, {keyframes} from "styled-components";
import {getAllSeekersAction} from "../../store/actions/userActions";
import droplet from '../../assets/images/blood-icon.png'
import SeekerInfo from "./SeekerPopup";

const Div = styled.div``


const rotate = keyframes`
	0% {
		transform: translatey(0px);
	}
	50% {
		transform: translatey(-10px);
	}
	100% {
		transform: translatey(0px);
	}

`;
const Img = styled.img`
  animation: ${rotate} 2s linear infinite;
  width: 40px;
  height: 40px;
  border: none;
  cursor: pointer;
`


const GeoMap = ({profilesReducer: {profiles}, dispatch}) => {

    const [viewPort, setViewport] = useState({
        latitude: 47.36667,
        longitude: 8.55,
        zoom: 12,
        width: "100vw",
        height: "100vh"
    })

    const [selectedSeeker, setSelectedSeeker] = useState(null)

    console.log("selected profile", selectedSeeker)

    useEffect(() => {
        console.log("in the dispatch")
        dispatch(getAllSeekersAction())
        const listener = e => {
            if (e.key === "Escape") {
                setSelectedSeeker(null)
            }
        }
        window.addEventListener("keydown", listener)
        return () => {
            window.removeEventListener("keydown")
        }
    }, [])


    return (
        <Div>
            <ReactMapGL
                {...viewPort}
                mapboxApiAccessToken={"pk.eyJ1IjoiZ3lzZW4iLCJhIjoiY2tjczdzcXJuMGZ5azJ3cDR6N2Jqcm00cyJ9.mkv2PJA7gpy9-ddtprFKXA"}
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
            >{profiles ? profiles.map((profile, index) => {
                if (profile.latitude) {
                    return (
                        <Marker key={profile.id} latitude={profile.latitude} longitude={profile.longitude}>
                            <Img onClick={(e) => {
                                e.preventDefault()
                                setSelectedSeeker(profile)
                            }} src={droplet}/>
                        </Marker>
                    )
                }
            }) : null}
                {selectedSeeker ? (
                    <Popup
                        latitude={selectedSeeker.latitude}
                        longitude={selectedSeeker.longitude}
                        onClose={() => setSelectedSeeker(null)}
                    >
                        <SeekerInfo/>
                    </Popup>
                ) : null}
            </ReactMapGL>
        </Div>
    )
}

const mapStateToProps = (state) => {
    console.log("state", state);
    return {
        profilesReducer: state.profilesReducer,
    };
};

export default connect(mapStateToProps)(GeoMap);