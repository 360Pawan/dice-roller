/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';

import DiceOne from './assets/dice1.png';
import DiceTwo from './assets/dice2.png';
import DiceThree from './assets/dice3.png';
import DiceFour from './assets/dice4.png';
import DiceFive from './assets/dice5.png';
import DiceSix from './assets/dice6.png';

function App(): JSX.Element {
  const spinAnim = useRef(new Animated.Value(0)).current;

  const [uri, setUri] = useState(DiceOne);
  const [spinning, setSpinning] = useState(false);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinAnim]);

  const generateDiceNumber = async () => {
    setSpinning(true);

    const number = Math.floor(Math.random() * 6 + 1);

    switch (number) {
      case 1:
        setUri(DiceOne);
        break;

      case 2:
        setUri(DiceTwo);
        break;

      case 3:
        setUri(DiceThree);
        break;

      case 4:
        setUri(DiceFour);
        break;

      case 5:
        setUri(DiceFive);
        break;

      case 6:
        setUri(DiceSix);
        break;

      default:
        setUri(DiceOne);
        break;
    }

    await new Promise(resolve => {
      setTimeout(() => resolve(null), 1000);
    });

    setSpinning(false);
  };

  return (
    <>
      <View style={styles.container}>
        <Animated.Image
          style={[
            styles.image,
            {
              transform: [{rotate: spin}],
              opacity: spinning ? 1 : 0,
              height: spinning ? 100 : 0,
            },
          ]}
          source={DiceSix}
        />
        <TouchableOpacity onPress={generateDiceNumber}>
          <Image
            style={[
              styles.image,
              {
                opacity: spinning ? 0 : 1,
                height: spinning ? 0 : 100,
              },
            ]}
            source={uri}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={generateDiceNumber}>
          <Text style={styles.text}>Roll Dice</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    gap: 20,
  },

  image: {width: 100, height: 100},

  text: {
    color: '#fff',
    fontSize: 18,
    paddingHorizontal: 40,
    paddingVertical: 15,
    backgroundColor: '#000',
    borderRadius: 10,
  },
});

export default App;
