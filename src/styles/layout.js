import {
    Dimensions,
    StyleSheet
} from 'react-native';


export const colorPalette = {
    white: '#F0EBF4',
    bgGrey: '#A1C3D1',
    lightViolet: '#B39BC8',
    violet: '#993399',
    rose: '#E64398',
    lightRose: '#F172A1'
};

export default layout = StyleSheet.create({
    contentWrapper: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        flex: 1,
        backgroundColor: colorPalette.bgGrey,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {

    }
});
