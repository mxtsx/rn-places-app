import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {PlacesListScreen} from "../screens/PlacesListScreen";
import {PlaceDetailScreen} from "../screens/PlaceDetailScreen";
import {NewPlaceScreen} from "../screens/NewPlaceScreen";
import {MapScreen} from "../screens/MapScreen";
import {NavigationContainer} from "@react-navigation/native";
import {Platform} from "react-native";
import {THEME} from "../theme";

const headerStylesheet = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? THEME.PRIMARY_COLOR : '#fff'
    },
    headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.PRIMARY_COLOR,
    headerTitleStyle: {
        fontFamily: 'robotoBold'
    }
}

const Stack = createStackNavigator()

const PlacesNavigatorStack = () => {
    return(
        <Stack.Navigator screenOptions={headerStylesheet}>
            <Stack.Screen name="PlacesList" component={PlacesListScreen} />
            <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
            <Stack.Screen name="NewPlace" component={NewPlaceScreen} />
            <Stack.Screen name="MapScreen" component={MapScreen} />
        </Stack.Navigator>
    )
}

export const PlacesNavigator = () => {
    return(
        <NavigationContainer>
            <PlacesNavigatorStack />
        </NavigationContainer>
    )
}