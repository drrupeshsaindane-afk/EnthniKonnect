import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { RootStackParamList } from '../navigation/RootNavigator';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [hasError, setHasError] = useState(false);

  const handleStatusUpdate = useCallback(
    (status: AVPlaybackStatus) => {
      if (!status.isLoaded) {
        if ('error' in status && status.error) {
          setHasError(true);
        }
        return;
      }

      if (status.didJustFinish) {
        navigation.replace('ProfileSelection');
      }
    },
    [navigation]
  );

  const handleError = useCallback(() => setHasError(true), []);

  return (
    <View style={styles.container}>
      {hasError ? (
        <Text style={styles.fallbackText}>EthniKonnect</Text>
      ) : (
        <Video
          style={[StyleSheet.absoluteFillObject, styles.video]}
          source={require('../Animated_Logo_Splash_Screen_Video.mp4')}
          shouldPlay
          isMuted={false}
          resizeMode="contain"
          isLooping={false}
          useNativeControls={false}
          onError={handleError}
          onPlaybackStatusUpdate={handleStatusUpdate}
        />
      )}
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
  video: {
    backgroundColor: 'transparent'
  },
  fallbackText: {
    fontSize: 36,
    fontWeight: '700',
    color: '#e2e8f0',
    letterSpacing: 1.5
  }
});

export default SplashScreen;
