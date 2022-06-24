import React, { useReducer } from 'react';
import TimeZonesContext from './timeZonesContext';
import TimeZonesReducer from './timeZonesReducer';
import { ACTIONS } from './timeZonesActions';
import axios from 'axios';

const TimeZonesState = props => {
    const initialState = {
        timeZones: [],
        suggestions: [],
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

    const deleteUserTimeZone = async(timeZone) => {
        try {
            const response = await axiosService.delete(`/timezones/`,{
                data: {
                    "user_id": user_id,
                    "name": timeZone
                }
            });

            dispatch({
                type: ACTIONS.DELETE_USER_TIME_ZONE,
            });
        } catch (error) {
            console.log(error);
            return;
        }
    }

    const fetchTimeZones = async() => {
        try {
            const response = await axiosService(`/timezones`);
            const timeZones = response?.data?.timezones || [];

            dispatch({
                type: ACTIONS.GET_TIME_ZONES,
                payload: timeZones,
            });
        } catch (error) {
            console.log(error);
        }
    }

    const setSuggestions = async(suggestions) => {
        dispatch({
            type: ACTIONS.SET_SUGGESTIONS,
            payload: suggestions,
        });
    }

    const addUserTimeZone = async(timeZone) => {
        try {
            const response = await axiosService.put(`/timezones/`,{
                "user_id": user_id,
                "name": timeZone
            });

            dispatch({
                type: ACTIONS.ADD_USER_TIME_ZONE,
            });
            return
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
                fetchTimeZone,
                deleteUserTimeZone,
                fetchTimeZones,
                suggestions: state.suggestions,
                setSuggestions,
                addUserTimeZone
            }}
        >{props.children}

        </TimeZonesContext.Provider>
    )
}

export default TimeZonesState;