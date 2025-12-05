import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { Module, getModulesForRoot } from '../data/modules';
import { useRoot } from '../context/RootContext';

const icons: Record<string, string> = {
  video: '🎬',
  story: '📖',
  quiz: '🧠'
};

const ModuleCard: React.FC<{ module: Module; onPress: () => void }> = ({ module, onPress }) => (
  <TouchableOpacity style={styles.moduleCard} onPress={onPress} activeOpacity={0.85}>
    <Text style={styles.moduleTitle}>{module.title}</Text>
    <Text style={styles.moduleDescription}>{module.description}</Text>
    <View style={styles.iconRow}>
      {module.contentTypes.map((type) => (
        <Text key={type} style={styles.icon}>
          {icons[type]}
        </Text>
      ))}
    </View>
  </TouchableOpacity>
);

const ParentMainScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { currentRoot } = useRoot();
  const modules = getModulesForRoot(currentRoot);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.subtitle}>Welcome back</Text>
            <Text style={styles.title}>{currentRoot} parent</Text>
          </View>
        </View>

        <View style={styles.subscriptionCard}>
          <Text style={styles.subscriptionTitle}>Subscription</Text>
          <Text style={styles.subscriptionBody}>Premium family plan · Kid-safe stories, videos, and quizzes</Text>
        </View>

        <Text style={styles.sectionLabel}>Profiles</Text>
        <View style={styles.chipRow}>
          {['Parent', 'Child 1', 'Child 2'].map((name) => (
            <View key={name} style={styles.chip}>
              <Text style={styles.chipText}>{name}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionLabel}>What your kids are watching</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              onPress={() => navigation.navigate('ModuleDetails', { moduleId: module.id })}
            />
          ))}
        </ScrollView>

        <Text style={styles.sectionLabel}>{currentRoot === 'India' ? 'Indian Festivals' : 'Chinese Festivals'}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {modules
            .filter((module) => module.title.toLowerCase().includes('festival'))
            .map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                onPress={() => navigation.navigate('ModuleDetails', { moduleId: module.id })}
              />
            ))}
        </ScrollView>

        <Text style={styles.sectionLabel}>{currentRoot === 'India' ? 'Indian Stories' : 'Chinese Stories'}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
          {modules
            .filter((module) => module.title.toLowerCase().includes('stories'))
            .map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                onPress={() => navigation.navigate('ModuleDetails', { moduleId: module.id })}
              />
            ))}
        </ScrollView>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  subtitle: {
    color: '#cbd5e1'
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#e2e8f0'
  },
  subscriptionCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155'
  },
  subscriptionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e2e8f0',
    marginBottom: 6
  },
  subscriptionBody: {
    color: '#cbd5e1'
  },
  sectionLabel: {
    marginTop: 8,
    marginBottom: 6,
    fontSize: 18,
    fontWeight: '700',
    color: '#e2e8f0'
  },
  chipRow: {
    flexDirection: 'row',
    gap: 10
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155'
  },
  chipText: {
    color: '#e2e8f0',
    fontWeight: '600'
  },
  horizontalList: {
    gap: 12
  },
  moduleCard: {
    width: 240,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155'
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e2e8f0',
    marginBottom: 6
  },
  moduleDescription: {
    color: '#cbd5e1',
    marginBottom: 10
  },
  iconRow: {
    flexDirection: 'row',
    gap: 6
  },
  icon: {
    fontSize: 16
  }
});

export default ParentMainScreen;
