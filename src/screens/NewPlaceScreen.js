import React, {useLayoutEffect, useState} from 'react';
import {ScrollView, StyleSheet, TextInput, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {CustomMediumText} from "../components/ui/CustomMediumText";
import {CustomButton} from "../components/ui/CustomButton";
import {THEME} from "../theme";
import {useDispatch} from "react-redux";
import {addPlaceThunk} from "../redux/placesReducer";
import {ImageSelector} from "../components/ImageSelector";
import {LocationPicker} from "../components/LocationPicker";

export const NewPlaceScreen = () => {
    const [titleValue, setTitleValue] = useState('')
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null)
    const navigation = useNavigation()
    const dispatch = useDispatch()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add Place'
        })
    }, [navigation])

    const titleChangeHandler = (text) => {
        setTitleValue(text)
    }

    const savePlaceHandler = () => {
        dispatch(addPlaceThunk(titleValue, image, location))
        navigation.goBack()
    }

    return (
        <ScrollView>
            <View style={styles.form}>
                <CustomMediumText style={styles.label}>Title</CustomMediumText>
                <TextInput value={titleValue} onChangeText={titleChangeHandler} title={'Title'} style={styles.textInput}/>
                <ImageSelector image={image} setImage={setImage} />
                <LocationPicker location={location} setLocation={setLocation} />
                <CustomButton style={styles.button} onPress={savePlaceHandler} disabled={!titleValue.length || !titleValue || !image || !location} color={!titleValue.length || !titleValue || !image || !location ? '#ccc' : THEME.PRIMARY_COLOR}>Save Place</CustomButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15
    },
    button: {
        marginTop: 15
    }
})