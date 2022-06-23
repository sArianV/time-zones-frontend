import { ACTIONS } from './timeZonesActions';

export default (state, action) => {
    switch (action.type) {
        case ACTIONS.GET_USER_TIME_ZONES:
            return {
                ...state,                
                userTimeZones: action.payload
            }
        default:
            return state;
    }
}