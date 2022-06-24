import { ACTIONS } from './timeZonesActions';

export default (state, action) => {
    switch (action.type) {
        case ACTIONS.GET_USER_TIME_ZONES:
            return {
                ...state,                
                userTimeZones: action.payload
            }
        case ACTIONS.DELETE_USER_TIME_ZONE:
            return {
                ...state,
                reloadUserData: !state.reloadUserData
            }

        case ACTIONS.GET_TIME_ZONES:
            return {
                ...state,
                timeZones: action.payload,
                suggestions: action.payload
            }
        case ACTIONS.SET_SUGGESTIONS:
            return {
                ...state,
                suggestions: action.payload
            }
        case ACTIONS.ADD_USER_TIME_ZONE:
            return {
                ...state,
                reloadUserData: !state.reloadUserData,
            }
        default:
            return state;
    }
}