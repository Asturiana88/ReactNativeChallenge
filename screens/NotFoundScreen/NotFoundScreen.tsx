import * as React from 'react';
import { Button, Image } from 'react-native';
import { Text, View } from '../../components/Themed';
import styles from './styles';

interface Props { resetSearch: () => void }

const NotFoundScreen = ({ resetSearch }: Props) => (
  <View style={styles.container}>
    <Text style={styles.errorText}>We couldn't find any results for your query...</Text>
    <View style={styles.buttonContainer}>
      <Button color='grey' title='Try another search' onPress={resetSearch} />
    </View>
    <View style={styles.imgContainer} >
      <Image style={styles.imgNF} source={{ uri: 'https://i.imgflip.com/23h9vq.jpg' }} />
    </View>
  </View>
);

export default NotFoundScreen;

