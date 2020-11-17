import React from 'react'
import { Button } from 'react-native'
import { View, Text } from '../../components/Themed';
import styles from './styles';


const LandingPage = (props: any) => (
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
export default LandingPage;