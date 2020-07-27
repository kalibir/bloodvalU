import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import ReactMapGL, {
    FlyToInterpolator,
    Marker,
    Popup,
    GeolocateControl,
    NavigationControl,
    FullscreenControl,
    ScaleControl
} from 'react-map-gl'
import styled, {keyframes} from "styled-components";
import {getAllSeekersAction} from "../../store/actions/userActions";
import droplet from '../../assets/images/blood-icon.png'
import SeekerInfo from "./SeekerPopup";
import {PageContainer} from "../../style/GlobalWrappers";

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
  
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 50%;
`

const WaypointMarker = styled.div`
  animation: ${rotate} 2s linear infinite;
`

const CustomLocation = styled(GeolocateControl)`
  position: fixed;
  top: 20%;
`
const CustomScaler = styled(ScaleControl)`
  bottom: 0;

`

const CustomNavigator = styled(NavigationControl)`
  position: fixed;
  right: 0;
  bottom: 15%;
  width: 30px;
`

const CustomFullScreen = styled(FullscreenControl)`
  position: fixed;
  width: 30px;
  top: 15%;
`

const CustomPopup = styled(Popup)`
  display: flex;
  width: 300px;
`

const CustomMarker = styled(Marker)``

const AlertWrapper = styled.div`
`

const GeoMap = ({
                    dispatch,
                    profilesReducer: {profiles},
                    authReducer: {userObj},
                }) => {
    const [viewPort, setViewport] = useState({
        latitude: 47.36667,
        longitude: 8.55,
        zoom: 5,
        width: "100%",
        height: "100%"
    })

    const [selectedSeeker, setSelectedSeeker] = useState(null)


    const handleFly = () => {
        const newViewport = {
            ...viewPort,
            latitude: 47.36667,
            longitude: 8.55,
            zoom: 10,
            transitionDuration: 2000,
            transitionInterpolator: new FlyToInterpolator(),
        };
        setViewport(newViewport);
        dispatch(getAllSeekersAction())
    }

    useEffect(() => {
        handleFly()
    }, [])

    const handleClosePopup = () => {
        setSelectedSeeker(null)
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
                mapStyle="mapbox://styles/gysen/ckd4ow3we0wvp1inb8cs9m8ff"
                mapboxApiAccessToken={"pk.eyJ1IjoiZ3lzZW4iLCJhIjoiY2tjczdzcXJuMGZ5azJ3cDR6N2Jqcm00cyJ9.mkv2PJA7gpy9-ddtprFKXA"}
                onViewportChange={viewport => {
                    setViewport(viewport);
                }}
            > <CustomLocation
                positionOptions={{enableHighAccuracy: true}}
                trackUserLocation={true}
            />
                {profiles ? profiles.map((profile) => {
                    if (profile.latitude && profile.no_of_requests) {
                        return (
                            <CustomMarker key={profile.id} latitude={profile.latitude} longitude={profile.longitude}>
                                <WaypointMarker>{profile.no_of_requests && !selectedSeeker ? <AlertWrapper>
                                    <span role={"img"}>&#10071;</span>{profile.no_of_requests}
                                </AlertWrapper> : null}
                                    <Img onClick={(e) => {
                                        e.preventDefault()
                                        setSelectedSeeker(profile)
                                    }} src={droplet}/></WaypointMarker>
                            </CustomMarker>
                        )
                    }
                }) : null}
                {selectedSeeker ? (
                    <CustomPopup
                        closeButton={false}
                        latitude={selectedSeeker.latitude}
                        longitude={selectedSeeker.longitude}
                    >
                        <SeekerInfo handleClosePopup={handleClosePopup} selectedSeeker={selectedSeeker}
                                    userObj={userObj}/>
                    </CustomPopup>
                ) : null}
                <CustomScaler/>
                <CustomFullScreen/>
                <CustomNavigator/>
            </ReactMapGL>
        </PageContainer>
    )
}

const mapStateToProps = (state) => {
    return {
        profilesReducer: state.profilesReducer,
        authReducer: state.authReducer,
    };
};

export default connect(mapStateToProps)(GeoMap);