import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';



const styles = StyleSheet.create({
    wrapper: {
        alignItems: 'center'
    },
    label: {
        color: '#F0EBF4',
        fontWeight: 'bold',
    },
    input: {
        width: '90%',
        padding: 5,
        margin: 5,
        backgroundColor: '#F172A1',
        fontSize: 15,
        color: '#F0EBF4'
    },
    inputFocused: {
        width: '90%',
        padding: 5,
        margin: 5,
        backgroundColor: '#B39BC8',
        fontSize: 15,
        color: '#F0EBF4'
    }
});

export default function PlainField( props ) {

    const { input, meta, fieldLabel, ...inputProps } = props;
    // alert(input.onFocus);
    return (
        <View style={styles.wrapper}>
            {
                fieldLabel
                    ?   <Text style={styles.label}>{fieldLabel}</Text>
                    :   null
            }
            <TextInput
                {...inputProps}
                onChangeText={input.onChange}
                onBlur={input.onBlur}
                value={input.value}
                onFocus={input.onFocus}
                style={ meta.active ? styles.inputFocused : styles.input }
                underlineColorAndroid='transparent'
                placeholderTextColor='#F0EBF4'
                />
        </View>
    );
}