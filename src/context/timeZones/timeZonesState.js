import React, { useReducer } from 'react';
import TimeZonesContext from './timeZonesContext';
import TimeZonesReducer from './timeZonesReducer';
import { ACTIONS } from './timeZonesActions';
import axios from 'axios';

const TimeZonesState = props => {
    const initialState = {
        timeZones: [],
        userTimeZones: [],
        reloadUserData: false
    };
    
    const [state, dispatch] = useReducer(TimeZonesReducer, initialState);

    const axiosService = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    })

    const user_id = localStorage.getItem('user_id') || null;

    const getUserTimeZones = async() => {
        try {
            const response = await axiosService(`/timezones/user${ user_id ? "?user_id="+user_id : '' }`);
            
            if ( !user_id ) {
                const new_user_id = response?.data?.user_id || null;
                if (new_user_id) {
                    localStorage.setItem('user_id', response.data.user_id);
                }
            }

            const userTimeZones = response?.data?.timezones || [];

            dispatch({
                type: ACTIONS.GET_USER_TIME_ZONES,
                payload: userTimeZones,
            });
            return
        } catch (error) {
            console.log(error);
        }
    }

    const fetchTimeZone = async(timeZone) => {
        try {
            const response = await axiosService(`/timezones?name=${timeZone}`);
            return response?.data?.timezone || null;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    return (
        <TimeZonesContext.Provider
            value={{
                timeZones: state.timeZones,
                userTimeZones: state.userTimeZones,
                reloadUserData: state.reloadUserData,
                getUserTimeZones,
                fetchTimeZone
            }}
        >{props.children}

        </TimeZonesContext.Provider>
    )
}

export default TimeZonesState;