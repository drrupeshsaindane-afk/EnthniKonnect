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
  KidsHome: { profileName: string };
  ModuleDetails: { moduleId: string };
  Chapter: { chapterId: string };
  Quiz: { chapterId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerStyle: { backgroundColor: '#020617' },
          headerTintColor: '#ffffff',
          headerTitleStyle: { fontSize: 18 },
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfileSelection" component={ProfileSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ParentRoot" component={ParentRootScreen} options={{ title: 'Choose your roots' }} />
        <Stack.Screen name="ParentMain" component={ParentMainScreen} options={{ title: 'Parent home' }} />
        <Stack.Screen name="KidsHome" component={KidsHomeScreen} options={{ title: 'Kids hub' }} />
        <Stack.Screen name="ModuleDetails" component={ModuleDetailsScreen} options={{ title: 'Module' }} />
        <Stack.Screen name="Chapter" component={ChapterScreen} options={{ title: 'Chapter' }} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Test your quotient' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
