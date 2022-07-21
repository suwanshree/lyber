import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Map.css";
import * as tripActions from "../../store/trip";
import { useHistory } from "react-router-dom";
import up from "../../images/upward-arrow.png";
import down from "../../images/down-arrow.png";
import loadingGif from "../../images/loading.gif";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  MarkerClusterer,
  InfoWindow,
} from "@react-google-maps/api";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const libraries = ["places"];
const Maps = ({ apiKey }) => {
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries,
  });
  return <>{isLoaded && <Map />}</>;
};

const containerStyle = {
  width: "95vh",
  height: "88vh",
};

const MapOptions = {
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: false,
};

let start;
let start_lat;
let start_lng;
let end;
let end_lat;
let end_lng;
let price = 0;

const Map = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMarkers, setShowMarkers] = useState(false);
  const [fromMarker, setFromMarker] = useState([]);
  const [toMarker, setToMarker] = useState([]);
  const sessionUser = useSelector((state) => state.session.user);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [directions, setDirections] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const mapRef = useRef();
  const center = useMemo(
    () => ({
      lat: 37.773972,
      lng: -122.431297,
    }),
    []
  );
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const trackNewCenter = async () => {
    const lat = mapRef.current?.getCenter().lat();
    const lng = mapRef.current?.getCenter().lng();
    const zoom = mapRef.current?.getZoom();
  };

  const callRide = (e) => {
    if (e.cancelable) e.preventDefault();
    setHasSubmitted(true);
    let error = [];
    if (!start) {
      error.push("Select a Pick Up Location!");
      setErrors(error);
      return;
    }
    if (!end) {
      error.push("Select a Drop Off Location!");
      setErrors(error);
      return;
    }
    const user_id = sessionUser.id;
    const newTripData = {
      user_id,
      start,
      start_lat,
      start_lng,
      end,
      end_lat,
      end_lng,
      price,
    };

    const directionsService = new DirectionsService();
    console.log(directionsService);
    const origin = { lat: start_lat, lng: start_lng };
    const destination = { lat: end_lat, lng: end_lng };

    // directionsService.route(
    //   {
    //     origin: origin,
    //     destination: destination,
    //   },
    //   (result, status) => {
    //     if (status === DirectionsService.DirectionsStatus.OK) {
    //       setDirections({
    //         directions: result,
    //       });
    //     } else {
    //       console.error(`error fetching directions ${result}`);
    //     }
    //   }
    // );

    dispatch(tripActions.newTrip(newTripData))
      .then(() => {
        setErrors([]);
        setHasSubmitted(false);
        setLoading(true);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className="maps-container">
      <div className="map-top">
        <div className="map-inputs">
          <div className="pick-up">
            <h3>Pick Up:</h3>
            <PlacesAutocompleteFrom
              setFromMarker={setFromMarker}
              setSelected={(position) => {
                setShowMarkers(true);
                mapRef.current?.panTo(position);
              }}
            />
          </div>
          <div className="drop-off">
            <h3>Drop Off:</h3>
            <PlacesAutocompleteTo
              setToMarker={setToMarker}
              setSelected={(position) => {
                setShowMarkers(true);
                mapRef.current?.panTo(position);
              }}
            />
          </div>
        </div>
        <button id="ride-button" onClick={(e) => callRide(e)}>
          Find Ride
        </button>
      </div>
      <ul className="find-ride-errors">
        {hasSubmitted && errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <div className="map">
        <GoogleMap
          options={MapOptions}
          clickableIcons={false}
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onCenterChanged={trackNewCenter}
        >
          {showMarkers &&
            fromMarker?.map((mark, i) => (
              <Marker
                // label={{
                //   fontWeight: "bold",
                //   fontSize: "16px",
                //   text: `A`,
                // }}
                key={mark.id}
                position={{
                  lat: parseFloat(mark.lat),
                  lng: parseFloat(mark.lng),
                }}
                icon={up}
              ></Marker>
            ))}
          {showMarkers &&
            toMarker?.map((mark, i) => (
              <Marker
                // label={{
                //   fontWeight: "bold",
                //   fontSize: "16px",
                //   text: `B`,
                // }}
                key={mark.id}
                position={{
                  lat: parseFloat(mark.lat),
                  lng: parseFloat(mark.lng),
                }}
                icon={down}
              ></Marker>
            ))}
          {loading && (
            <div className="loading">
              <img
                src={loadingGif}
                className="loading-gif"
                alt="Loading Gif"
              ></img>
            </div>
          )}
        </GoogleMap>
      </div>
    </div>
  );
};

const PlacesAutocompleteFrom = ({ setSelected, setFromMarker }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    const results = await getGeocode({ address });
    start = address;
    const { lat, lng } = await getLatLng(results[0]);
    start_lat = lat;
    start_lng = lng;
    setSelected({ lat, lng });
    setFromMarker([{ lat, lng }]);
    setValue(address, false);
    clearSuggestions();
  };

  return (
    <div className="search-input">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="Search an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data?.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

const PlacesAutocompleteTo = ({ setSelected, setToMarker }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    const results = await getGeocode({ address });
    end = address;
    const { lat, lng } = await getLatLng(results[0]);
    end_lat = lat;
    end_lng = lng;
    setSelected({ lat, lng });
    setToMarker([{ lat, lng }]);
    setValue(address, false);
    clearSuggestions();
  };

  return (
    <div className="search-input">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder="Search an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data?.map(({ place_id, description }) => (
                <ComboboxOption key={place_id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default React.memo(Maps);
