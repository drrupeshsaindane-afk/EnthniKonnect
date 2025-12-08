import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [hasError, setHasError] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true
      })
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace('ProfileSelection');
    }, 2200);

    return () => clearTimeout(timer);
  }, [navigation, opacity, scale]);

  return (
    <View style={styles.container}>
      {hasError ? (
        <Text style={styles.fallbackText}>EthniKonnect</Text>
      ) : (
        <AnimatedImage
          source={require('../ethnikonnect-logo.jpg')}
          style={[styles.logo, { opacity, transform: [{ scale }] }]}
          resizeMode="contain"
          onError={() => setHasError(true)}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 240,
    height: 240
  },
  fallbackText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#e2e8f0',
    letterSpacing: 1.5
  }
});

export default SplashScreen;
