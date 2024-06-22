import { useState, useEffect, useContext } from "react";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { UserContext } from "../context/UserContext";

export function Home(){

    const [map, setMap] = useState(null);
    const [center, setCenter] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [newRegister , setNewRegister] = useState(false);

    const {user} = useContext(UserContext);

    const containerStyle = {
        width: '100%',
        height: '100%'
      };

      const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDX794jBw66AogVrMcAUFX91cMT8tuj35s"
      });

      const onLoad = (map) => {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
      };

      const handleMapClick = (event) => {
        const newMarker= {
            latitude: event.latLng.lat(),
            longitude: event.latLng.lng(),
        };

        fetch("https://denguealerta202401-production.up.railway.app/ws/foco", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${user}`,
            },
            body : JSON.stringify(newMarker)
        })
        .then((response) => response.json())
        .then(() => {
            setMarkers([
                ...markers,
                { lat: event.latLng.lat(), lng: event.latLng.lng() }
            ]);
        })
        .catch((error) => {
            console.log(error);
            alert("Erro ao cadastrar foco")
        });

        //setNewRegister(newRegister ? false : true);

        //setMarkers([...markers, newMarker]);
      }

      useEffect(() => {
        const location = window.navigator && window.navigator.geolocation;

        const locationSuccess = (position) => {
            setCenter({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            });
        }

        const locationError = () => {
            setCenter({
                lat: -28.262058504135673,
                lng: -52.41105591033797
            });
        }

        if (location){
            location.getCurrentPosition(locationSuccess , locationError);
        }
      } , [])

      useEffect(() => {
        fetch("https://denguealerta202401-production.up.railway.app/ws/foco", {
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${user}`,
            },
        })
        .then((response) => response.json())
      .then((data) => {

        console.log(data);
        const newMarkerArray = data.map(({ latitude, longitude }) => {
            return {
            lat : latitude,
            lng : longitude,
            };
        });

        setMarkers(newMarkerArray);
      })

      .catch((error) => {
        //alert("Erro ao consultar registros")
        console.log(error);
      });
      }, [])
      
    return(
        <>
        <Header />
        <main style={{flex: 1}}>
            {newRegister && (
               <div className="addMarkerDialog">
               <p className="mb-5">Cadastrar:</p>
               <form>
                   <input type="text"
                   className="input mb-5" 
                   name="descricao" 
                   required 
                   />
                <div style={{
                    display : "flex", 
                    justifyContent : "space-between", 
                    alignItems: "center"
                    }}
                    >
                   <button type="submit" className="btn mb-5">
                       Cadastrar
                   </button>

                   <a
                    href="#" 
                    onClick={() => setNewRegister(newRegister ? false : true)}
                    >
                    Fechar
                    </a>
                </div> 
               </form>
           </div> 
            )}
            
            {isLoaded && (
             <GoogleMap
             mapContainerStyle={containerStyle}
             center={center}
             zoom={16}
             onLoad={onLoad}
             onUnmount={() => setMap(null)}
             onClick={handleMapClick}
           >

            {markers.map((marker , key) => <Marker key={key} position={marker} />)}
            
           </GoogleMap>
        )}</main>
        <Footer />
        </>
    );
}