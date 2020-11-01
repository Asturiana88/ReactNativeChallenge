import React from 'react'
import { Button, StyleSheet } from 'react-native'
import { View, Text } from '../components/Themed';


const LandingPage = (props: any) => {
    return (
        <View style={styles.container}>
            <View>

                <View style={styles.titlePrinc}>
                    <Text style={styles.title} >React Native Challenge</Text>
                </View>
                <View style={styles.nameSurname}>
                    <Text style={styles.text}>Julieta Orce</Text>
                </View>
            </View>

            <View>
                <Button
                    title="Enter"
                    onPress={() => props.navigation.navigate('Root')}
                />
                <Text style={styles.text}>04/10/2020</Text>
            </View>
        </View>
    )
}

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

export default LandingPage;