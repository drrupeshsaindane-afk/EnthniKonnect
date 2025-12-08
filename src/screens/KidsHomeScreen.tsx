import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { getModulesForRoot } from '../data/modules';
import { useRoot } from '../context/RootContext';

const KidsHomeScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'KidsHome'>>();
  const { currentRoot } = useRoot();
  const modules = getModulesForRoot(currentRoot);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.greeting}>Hi {route.params.childName}</Text>
        <TouchableOpacity style={styles.continueCard} activeOpacity={0.85}>
          <Text style={styles.continueLabel}>Continue your story</Text>
          <Text style={styles.continueDetail}>Last chapter: Bright festival lights</Text>
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>{currentRoot} adventures</Text>
        <View style={styles.grid}>
          {modules.map((module) => (
            <TouchableOpacity
              key={module.id}
              style={styles.moduleCard}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('ModuleDetails', { moduleId: module.id, childName: route.params.childName })}
            >
              <Text style={styles.moduleTitle}>{module.title}</Text>
              <Text style={styles.moduleDescription}>{module.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a'
  },
  container: {
    padding: 24,
    gap: 16
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#e2e8f0'
  },
  continueCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155'
  },
  continueLabel: {
    color: '#cbd5e1',
    marginBottom: 6
  },
  continueDetail: {
    color: '#e2e8f0',
    fontWeight: '700',
    fontSize: 18
  },
  sectionLabel: {
    fontSize: 18,
    color: '#e2e8f0',
    fontWeight: '700'
  },
  grid: {
    gap: 12
  },
  moduleCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155'
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e2e8f0'
  },
  moduleDescription: {
    color: '#cbd5e1',
    marginTop: 6
  }
});

export default KidsHomeScreen;
