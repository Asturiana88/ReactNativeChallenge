import * as React from 'react';
import { StyleSheet, Button, Image } from 'react-native';
import { Text, View } from '../components/Themed';

const NotFoundScreen = (props: { resetSearch: () => void }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>We couldn't find any results for your query...</Text>
      <View style={styles.buttonContainer}>
        <Button color='grey' title='Try another search' onPress={props.resetSearch} />
      </View>
      <View style={styles.imgContainer} >
        <Image style={styles.imgNF} source={{ uri: 'https://i.imgflip.com/23h9vq.jpg' }} />
      </View>
    </View>
  );
}

export default NotFoundScreen;
const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    padding: 35
  },
  buttonContainer: {
    marginTop: 15,
  },
  errorText: {
    fontSize: 25,
    fontWeight: "bold"
  },
  imgNF: {
    borderRadius: 30,
    width: '100%',
    maxHeight: 400,
    height: '100%'
  },
  imgContainer: {
    marginTop: 10,
    padding: 15
  }
});
