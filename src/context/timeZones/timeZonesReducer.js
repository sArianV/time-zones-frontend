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
        default:
            return state;
    }
}