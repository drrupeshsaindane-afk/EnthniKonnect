import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import ProfileSelectionScreen from '../screens/ProfileSelectionScreen';
import ParentRootScreen from '../screens/ParentRootScreen';
import ParentMainScreen from '../screens/ParentMainScreen';
import KidsHomeScreen from '../screens/KidsHomeScreen';
import ModuleDetailsScreen from '../screens/ModuleDetailsScreen';
import ChapterScreen from '../screens/ChapterScreen';
import QuizScreen from '../screens/QuizScreen';

export type RootStackParamList = {
  Splash: undefined;
  ProfileSelection: undefined;
  ParentRoot: undefined;
  ParentMain: undefined;
  KidsHome: { childName: string };
  ModuleDetails: { moduleId: string; childName?: string };
  Chapter: { moduleId: string; chapterId: string; childName?: string };
  Quiz: { moduleId: string; chapterId: string; childName?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          headerTintColor: '#ffffff',
          contentStyle: { backgroundColor: '#0f172a' },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileSelection" component={ProfileSelectionScreen} options={{ headerShown: false }} />
        screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0f172a' } }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="ProfileSelection" component={ProfileSelectionScreen} />
        <Stack.Screen name="ParentRoot" component={ParentRootScreen} />
        <Stack.Screen name="ParentMain" component={ParentMainScreen} />
        <Stack.Screen name="KidsHome" component={KidsHomeScreen} />
        <Stack.Screen name="ModuleDetails" component={ModuleDetailsScreen} />
        <Stack.Screen name="Chapter" component={ChapterScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
