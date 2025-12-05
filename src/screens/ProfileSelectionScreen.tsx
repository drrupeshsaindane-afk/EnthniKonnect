import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';

const ProfileSelectionScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [profiles, setProfiles] = useState([
    { id: 'parent', label: 'Parent', name: 'Parent', emoji: '🧑‍🦳' },
    { id: 'child-1', label: 'Child 1', name: 'Child 1', emoji: '🧒' },
    { id: 'child-2', label: 'Child 2', name: 'Child 2', emoji: '👧' }
  ]);

  const updateName = (id: string, name: string) => {
    setProfiles((prev) => prev.map((profile) => (profile.id === id ? { ...profile, name } : profile)));
  };

  const handlePress = (id: string, name: string) => {
    if (id === 'parent') {
      navigation.navigate('ParentRoot');
    } else {
      navigation.navigate('KidsHome', { childName: name });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.flex}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Who is watching?</Text>
          <View style={styles.cardGrid}>
            {profiles.map((profile) => (
              <TouchableOpacity
                key={profile.id}
                style={styles.card}
                onPress={() => handlePress(profile.id, profile.name)}
                activeOpacity={0.8}
              >
                <Text style={styles.avatar}>{profile.emoji}</Text>
                <TextInput
                  style={styles.nameInput}
                  value={profile.name}
                  onChangeText={(text) => updateName(profile.id, text)}
                  placeholder={profile.label}
                  placeholderTextColor="#94a3b8"
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a'
  },
  flex: { flex: 1 },
  container: {
    padding: 24
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#e2e8f0',
    marginBottom: 24
  },
  cardGrid: {
    gap: 16
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12
  },
  avatar: {
    fontSize: 32
  },
  nameInput: {
    flex: 1,
    color: '#e2e8f0',
    fontSize: 18,
    fontWeight: '600'
  }
});

export default ProfileSelectionScreen;
