/* eslint-disable complexity */
import axios from 'axios';

/**
 * ACTION TYPES
 */
const INITIAL_LOAD = 'INITIAL_LOAD';
const TOOGLE_3D = 'TOOGLE_3D';
const CHANGE_BORO = 'CHANGE_BORO';
const CHANGE_PERIOD = 'CHANGE_PERIOD';
const CHANGE_DAY = 'CHANGE_DAY';
const CHANGE_TIME = 'CHANGE_TIME';
const CLASS_FILTER_CHANGE = 'CLASS_FILTER_CHANGE';
const CATEGORY_FILTER_CHANGE = 'CATEGORY_FILTER_CHANGE';

const LOCATION_PREDICT_CHANGE = 'LOCATION_PREDICT_CHANGE';
const BORO_PREDICT_CHANGE = 'BORO_PREDICT_CHANGE';
const SEX_PREDICT_CHANGE = 'SEX_PREDICT_CHANGE';
const RACE_PREDICT_CHANGE = 'RACE_PREDICT_CHANGE';
const YEAR_PREDICT_CHANGE = 'YEAR_PREDICT_CHANGE';
const MONTH_PREDICT_CHANGE = 'MONTH_PREDICT_CHANGE';
const DAY_PREDICT_CHANGE = 'DAY_PREDICT_CHANGE';
const HOUR_PREDICT_CHANGE = 'HOUR_PREDICT_CHANGE';
// const GET_CRIMES = 'GET_CRIMES'

/**
 * INITIAL STATE
 */

let initialLoad = true;
let startBoro = 'MANHATTAN';
let startDate = new Date(2019, 0, 1);
let endDate = new Date(2019, 11, 31);
let currentTime = new Date();
let classFilter = {
    felony: true,
    misd: true,
    viol: true,
};
let categoryFilter = {
    HOMICIDE: true,
    SEXCRIME: true,
    THEFTFRAUD: true,
    OTHERVIOLENT: true,
    DRUGS: true,
    OTHER: true,
};
// let crimeData = {}
let latitude = '';
let longitude = '';
let boroPredict = '';
let sexPredict = '';
let racePredict = '';
let yearPredict = currentTime.getFullYear();
let monthPredict = currentTime.getMonth();
let dayPredict = currentTime.getDay();
let hourPredict = currentTime.getHours();

const defaultView = {
    initialLoad,
    threeD: false,
    boro: startBoro,
    startDate,
    endDate,
    day: -1,
    hour: -2,
    classFilter,
    categoryFilter,
    // crimeData
    latitude,
    longitude,
    boroPredict,
    sexPredict,
    racePredict,
    yearPredict,
    monthPredict,
    dayPredict,
    hourPredict,
};

/**
 * ACTION CREATORS
 */
export const initialLoadCheck = () => ({ type: INITIAL_LOAD });
export const toggle3dAction = (threeD) => ({ type: TOOGLE_3D, threeD });
export const boroChange = (boro) => ({ type: CHANGE_BORO, boro });
export const periodChange = (startDate, endDate) => ({ type: CHANGE_PERIOD, startDate, endDate });

export const dayChange = (day) => ({ type: CHANGE_DAY, day });
export const timeChange = (time) => ({ type: CHANGE_TIME, time });
export const classFilterChange = (filterValue, checked) => ({
    type: CLASS_FILTER_CHANGE,
    filterValue,
    checked,
});
export const categoryFilterChange = (filterValue, checked) => ({
    type: CATEGORY_FILTER_CHANGE,
    filterValue,
    checked,
});
export const locationPredictChange = (longitude, latitude) => ({ type: LOCATION_PREDICT_CHANGE, longitude, latitude });
export const boroPredictChange = (boro) => ({ type: BORO_PREDICT_CHANGE, boro });
export const sexPredictChange = (sex) => ({ type: SEX_PREDICT_CHANGE, sex });
export const racePredictChange = (race) => ({ type: RACE_PREDICT_CHANGE, race });
export const yearPredictChange = (year) => ({ type: YEAR_PREDICT_CHANGE, year });
export const monthPredictChange = (month) => ({ type: MONTH_PREDICT_CHANGE, month });
export const dayPredictChange = (day) => ({ type: DAY_PREDICT_CHANGE, day });
export const hourPredictChange = (hour) => ({ type: HOUR_PREDICT_CHANGE, hour });
// export const getCrimes = crimes => ({type: GET_CRIMES, crimes})

/**
 * THUNK CREATORS
 */

export const toggle3d = (threeD) => {
    return (dispatch) => {
        dispatch(toggle3dAction(threeD));
    };
};

export const changePeriod = (startDate, endDate) => {
    return (dispatch) => {
        dispatch(periodChange(startDate, endDate));
    };
};

export const changeDay = (day) => {
    return (dispatch) => {
        dispatch(dayChange(day));
    };
};

export const changeTime = (time) => {
    return (dispatch) => {
        dispatch(timeChange(time));
    };
};

export const changeLoadStatus = () => {
    return (dispatch) => {
        dispatch(initialLoadCheck());
    };
};

export const changeClassFilter = (filterValue, checked) => {
    return (dispatch) => {
        dispatch(classFilterChange(filterValue, checked));
    };
};

export const changeCategoryFilter = (filterValue, checked) => {
    return (dispatch) => {
        dispatch(categoryFilterChange(filterValue, checked));
    };
};

export const changeBoro = (boro) => {
    return (dispatch) => {
        dispatch(boroChange(boro));
    };
};

export const changeLocationPredict = (longitude, latitude) => {
    return (dispatch) => {
        dispatch(locationPredictChange(longitude, latitude));
    };
};

export const changeBoroPredict = (boro) => {
    return (dispatch) => {
        dispatch(boroPredictChange(boro));
    };
};

export const changeSexPredict = (sex) => {
    return (dispatch) => {
        dispatch(sexPredictChange(sex));
    };
};

export const changeRacePredict = (race) => {
    return (dispatch) => {
        dispatch(racePredictChange(race));
    };
};

export const changeYearPredict = (year) => {
    return (dispatch) => {
        dispatch(yearPredictChange(year));
    };
};

export const changeMonthPredict = (month) => {
    return (dispatch) => {
        dispatch(monthPredictChange(month));
    };
};

export const changeDayPredict = (day) => {
    return (dispatch) => {
        dispatch(dayPredictChange(day));
    };
};

export const changeHourPredict = (hour) => {
    return (dispatch) => {
        dispatch(hourPredictChange(hour));
    };
};

// export const getCrimesThunk = () => async dispatch => {
//   try {
//     const crimeRes = await axios.get(`/api/crimes`)
//     dispatch(getCrimes(crimeRes.data))
//   } catch (err) {
//     console.error(err)
//   }
// }
/**
 * REDUCER
 */

export default function (state = defaultView, action) {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case INITIAL_LOAD:
            newState.initialLoad = false;
            return newState;
        case TOOGLE_3D:
            newState.threeD = action.threeD;
            newState.initialLoad = true;
            return newState;
        case CHANGE_BORO:
            newState.boro = action.boro;
            return newState;
        case CHANGE_PERIOD:
            newState.startDate = action.startDate;
            newState.endDate = action.endDate;
            return newState;
        case CHANGE_DAY:
            newState.day = action.day;
            return newState;
        case CHANGE_TIME:
            newState.hour = action.time;
            return newState;
        case CLASS_FILTER_CHANGE:
            newState.classFilter[action.filterValue] = action.checked;
            return newState;
        case CATEGORY_FILTER_CHANGE:
            newState.categoryFilter[action.filterValue] = action.checked;
            return newState;

        // case GET_CRIMES:
        // 	newState.crimes = action.crimes;
        // 	return newState;
        case LOCATION_PREDICT_CHANGE:
            newState.longitude = action.longitude;
            newState.latitude = action.latitude;
            return newState;
        case BORO_PREDICT_CHANGE:
            newState.boroPredict = action.boro;
            return newState;
        case SEX_PREDICT_CHANGE:
            newState.sexPredict = action.sex;
            return newState;
        case RACE_PREDICT_CHANGE:
            newState.racePredict = action.race;
            return newState;
        case YEAR_PREDICT_CHANGE:
            newState.yearPredict = action.year;
            return newState;
        case MONTH_PREDICT_CHANGE:
            newState.monthPredict = action.month;
            return newState;
        case DAY_PREDICT_CHANGE:
            newState.dayPredict = action.day;
            return newState;
        case HOUR_PREDICT_CHANGE:
            newState.hourPredict = action.hour;
            return newState;
        default:
            return state;
    }
}
