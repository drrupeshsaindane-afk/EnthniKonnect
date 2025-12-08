import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true
    }).start(() => {
      setTimeout(() => navigation.replace('ProfileSelection'), 600);
    });
  }, [navigation, opacity]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.logo, { opacity }]}>EthniKonnect</Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    fontSize: 36,
    fontWeight: '700',
    color: '#e2e8f0',
    letterSpacing: 1.5
  }
});

export default SplashScreen;
