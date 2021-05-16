import React, {useEffect, useLayoutEffect} from 'react';
import {ActivityIndicator, FlatList, Platform, StyleSheet, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import {CustomHeaderButton} from "../components/ui/HeaderButton";
import {useDispatch, useSelector} from "react-redux";
import {PlaceItem} from "../components/ui/PlaceItem";
import {fetchPlacesThunk, removePlaceThunk} from "../redux/placesReducer";
import {CustomMediumText} from "../components/ui/CustomMediumText";
import {THEME} from "../theme";

export const PlacesListScreen = React.memo(() => {
    const places = useSelector(state => state.places.places)
    const isFetching = useSelector(state => state.places.isFetching)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPlacesThunk())
    }, [dispatch])

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Places List',
            headerRight: () => (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title={'Add Place'}
                          iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                          onPress={() => navigation.navigate('NewPlace')} />
                </HeaderButtons>
            )
        })
    }, [navigation])

    const onSelectHandler = (itemId) => navigation.navigate('PlaceDetail', {id: itemId})
    const removePlaceHandler = (id) => {
        dispatch(removePlaceThunk(id))
    }

    if(isFetching) {
        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator color={THEME.PRIMARY_COLOR} size={'large'}/>
            </View>
        )
    }

    if(!places.length) {
        return <CustomMediumText style={styles.noPlaces}>Create your first place!</CustomMediumText>
    }

    return <FlatList data={places} renderItem={itemData => <PlaceItem longPressHandler={() => removePlaceHandler(itemData.item.id)} itemId={itemData.item.id} title={itemData.item.title} image={itemData.item.image} address={itemData.item.address} onSelect={() => onSelectHandler(itemData.item.id)} />} />
})

const styles = StyleSheet.create({
    noPlaces: {
        marginVertical: 25,
        textAlign: 'center',
        fontSize: 20
    }
})