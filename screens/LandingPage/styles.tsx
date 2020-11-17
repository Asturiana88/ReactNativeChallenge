import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 100,
    },
    text: {
        margin: 10,
        padding: 10,
        fontSize: 20,
        alignItems: 'center',
        // marginVertical:10 
    },
    title: {
        fontSize: 30
    },
    titlePrinc: {
        marginTop: 50,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    nameSurname: {
        marginTop: 20,
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default styles;