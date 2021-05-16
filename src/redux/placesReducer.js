import {Place} from "../models/place";
import * as FileSystem from 'expo-file-system'
import {DB} from "../db/db";
import {vars} from "../../env";

const ADD_PLACE = 'places/ADD_PLACE'
const FETCH_PLACES = 'places/FETCH_PLACES'
const REMOVE_PLACE = 'places/REMOVE_PLACE'
const SET_IS_FETCHING = 'places/SET_IS_FETCHING'

const initialState = {
    places: [],
    isFetching: false
}

export const placesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(
                action.payload.id.toString(),
                action.payload.title,
                action.payload.image,
                action.payload.address,
                action.payload.coords.lat,
                action.payload.coords.lng
            )
            return {
                ...state,
                places: state.places.concat(newPlace)
            }
        case FETCH_PLACES:
            return {
                ...state,
                places: action.payload.map(p => new Place(p.id.toString(), p.title, p.imageUrl, p.address, p.lat, p.lng))
            }
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.payload.isFetching
            }
        case REMOVE_PLACE:
            return {
                ...state,
                places: state.places.filter(p => p.id !== action.payload.id)
            }
        default:
            return state
    }
}

export const addPlace = (id, title, image, address, lat, lng) => ({type: ADD_PLACE, payload: {id, title, image, address, coords: {lat, lng}}})
export const fetchPlaces = (places) => ({type: FETCH_PLACES, payload: places})
export const removePlace = (id) => ({type: REMOVE_PLACE, payload: {id}})
export const setIsFetching = (isFetching) => ({type: SET_IS_FETCHING, payload: {isFetching}})

export const addPlaceThunk = (title, image, location) => async dispatch => {
    const fileName = image.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileName
    try {
        const res = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${location.latitude}&lon=${location.longitude}&apiKey=${vars.mapsApiKey}`)
        const resData = await res.json()
        const address = resData.features[0].properties.formatted

        await FileSystem.moveAsync({
            from: image,
            to: newPath
        })

        const dbRes = await DB.insertPlace(title, newPath, address, location?.latitude, location?.longitude)
        dispatch(addPlace(dbRes.insertId, title, newPath, address, location?.latitude, location?.longitude))
    } catch (e) {
        console.log(e)
        throw e
    }
}

export const fetchPlacesThunk = () => async dispatch => {
    setIsFetching(true)
    try {
        const dbRes = await DB.fetchPlaces()
        dispatch(fetchPlaces(dbRes.rows._array))
    } catch (e) {
        console.log(e)
        throw e
    } finally {
        setIsFetching(false)
    }
}

export const removePlaceThunk = (id) => async dispatch => {
    setIsFetching(true)
    try {
        await DB.removePlace(id)
        dispatch(removePlace(id))
    } catch (e) {
        console.log(e)
        throw e
    } finally {
        setIsFetching(false)
    }
}