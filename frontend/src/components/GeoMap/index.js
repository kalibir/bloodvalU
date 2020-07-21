import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import ReactMapGL, {FlyToInterpolator, Marker, Popup,} from 'react-map-gl'
import styled, {keyframes} from "styled-components";
import {getAllSeekersAction} from "../../store/actions/userActions";
import droplet from '../../assets/images/blood-icon.png'
import SeekerInfo from "./SeekerPopup";
import {PageContainer} from "../../style/GlobalWrappers";
import d3 from 'd3-ease';


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

const FlyTo = styled.button`
  padding: 2rem;
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
`


const GeoMap = ({profilesReducer: {profiles}, dispatch}) => {
    const [showFly, setShowFly] = useState(true)
    const [viewPort, setViewport] = useState({
        latitude: 47.36667,
        longitude: 8.55,
        zoom: 5,
        width: "100%",
        height: "100%"
    })

    const [selectedSeeker, setSelectedSeeker] = useState(null)
    console.log("selectedSeeker", selectedSeeker);

    const handleFly = e => {
        e.preventDefault()
        const newViewport = {
            ...viewPort,
            latitude: 47.36667,
            longitude: 8.55,
            zoom: 12,
            transitionDuration: 2000,
            transitionInterpolator: new FlyToInterpolator(),
        };
        setViewport(newViewport);
        dispatch(getAllSeekersAction())
        setShowFly(!showFly)
    }

    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setSelectedSeeker(null)
            }
        }
        window.addEventListener("keydown", listener)
        return () => {
            window.removeEventListener("keydown", listener)
        }
    }, [])


    return (
        <PageContainer>
            <ReactMapGL
                {...viewPort}
                mapboxApiAccessToken={"pk.eyJ1IjoiZ3lzZW4iLCJhIjoiY2tjczdzcXJuMGZ5azJ3cDR6N2Jqcm00cyJ9.mkv2PJA7gpy9-ddtprFKXA"}
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
            >{showFly ? <FlyTo onClick={handleFly}>Discover</FlyTo> : null}
                {profiles ? profiles.map((profile, index) => {
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
                    >
                        <SeekerInfo selectedSeeker={selectedSeeker}/>
                    </Popup>
                ) : null}
            </ReactMapGL>
        </PageContainer>
    )
}

const mapStateToProps = (state) => {
    console.log("state", state);
    return {
        profilesReducer: state.profilesReducer,
    };
};

export default connect(mapStateToProps)(GeoMap);