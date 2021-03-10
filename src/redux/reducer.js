const SET_NAME = "SET_NAME";
const GET_TRACKERS = "GET_TRACKERS";

let initialState = {
    name: '',
    trackers: []
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
// export const getTrackers = () => {
//     let arr = []
//     for (let i = 0; i < localStorage.length; i++) {
//         arr.push({ id: i })
//     }
//     setTrackers(arr.reverse())
// }


export default reducer