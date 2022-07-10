const LOAD_ALL_USER_RELATED_TRIPS = "trip/loadAllUserRelatedTrips";
const LOAD_SINGLE_TRIP = "trip/loadSingleTrip";

// CONSTANTS display text in actions log
/////////////////////////////////////////
// action creators
// actions are just objects

const addTrip = (trip) => {
  return {
    type: LOAD_SINGLE_TRIP,
    payload: trip,
  };
};

const loadTrips = (trips) => {
  return {
    type: LOAD_ALL_USER_RELATED_TRIPS,
    payload: trips,
  };
};

// end of actions
/////////////////////////////////////////
// thunks return a function that returns an action

export const newTrip = (newTrip) => async (dispatch) => {
  const { user_id, start, start_lat, start_lng, end, end_lat, end_lng, price } =
    newTrip;
  const response = await fetch("/api/trips/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id,
      start,
      start_lat,
      start_lng,
      end,
      end_lat,
      end_lng,
      price,
    }),
  });
  console.log(
    user_id,
    start,
    start_lat,
    start_lng,
    end,
    end_lat,
    end_lng,
    price
  );
  console.log("FETCH SENT");

  if (response.ok) {
    const data = await response.json();
    console.log("RESPONSE OKAY");
    dispatch(addTrip(data));
  } else if (response.status < 500) {
    console.log("RESPONSE NOT OKAY");
    const data = await response.json();
    if (data.errors) return data.errors;
  } else return ["An error occurred. Please try again."];
};

export const loadAllUserRelatedTrips = (userId) => async (dispatch) => {
  const res = await fetch(`/api/trips/users/${userId}`);
  if (res.ok) {
    const trips = await res.json();
    dispatch(loadTrips(trips));
  }
};

export const loadATrip = (id) => async (dispatch) => {
  const res = await fetch(`/api/trips/${id}`);

  if (res.ok) {
    const data = await res.json();
    if (data.errors) return data.errors;
    dispatch(addTrip(data));
  } else return ["An error occurred. Please try again."];
};

// end of thunks
/////////////////////////////////////////
// reducer

const initialState = {};
const tripsReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case LOAD_SINGLE_TRIP:
      newState[action.payload.id] = action.payload;
      return newState;
    case LOAD_ALL_USER_RELATED_TRIPS:
      newState = action.payload;
      return newState;
    default:
      return state;
  }
};

export default tripsReducer;
