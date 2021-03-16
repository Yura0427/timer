const SET_NAME = "SET_NAME";
const GET_TRACKERS = "GET_TRACKERS";

let initialState = {
    name: '',
    trackers: [{
        currentTime: 104897,
        startAt: 1615826623738,
        trackName: ""
    }, {
        startAt: 1615826623738,
        timeStart: 1615828083523,
        trackName: ""
    }]
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_NAME: return {
            ...state,
            ...action.payload,
        }

        default:
            return state;
    }
}

export const setName = (name) => ({
    type: SET_NAME,
    payload: { name }
})


export default reducer