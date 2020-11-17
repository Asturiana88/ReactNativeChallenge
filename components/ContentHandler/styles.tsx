
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 100,
        position: "relative"
    },
    image: {
        width: '30%',
        height: 100,
    },
    textImg: {
        flex: 1,
        flexWrap: "wrap",
        paddingLeft: 10,
        fontSize: 20,
        lineHeight: 50,
        textAlign: "center"
    },
    itemContainer: {
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        margin: 10,
        borderWidth: 3
    },
    inputText: {
        borderWidth: 1,
        padding: 10,
        borderRadius: 10
    },
    inputTextContainer: {
        elevation: 10,
        padding: 10,
        paddingTop: 15,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    flatListContainer: {
        marginBottom: 150,

    },
    loading: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    modalContainer: {
        padding: 30,
        height: '100%'
    },
    modalImg: {
        marginTop: 15,
        width: '100%',
        height: 300,
    },
    itemTextTitle: {
        textAlign: "center",
        fontSize: 20,
        margin: 10,
        fontWeight: "bold"
    },
    itemText: {
        fontSize: 15
    },
    containerModal: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        borderWidth: 2,
        marginTop: 10,
        paddingLeft: 10
    },
    imgContainerModal: {
        marginRight: 10,
        marginTop: 15,
        width: '30%',
        height: 80,
    }
})
export default styles;