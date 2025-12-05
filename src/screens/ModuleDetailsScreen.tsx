import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { findModuleById } from '../data/modules';

const ModuleDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'ModuleDetails'>>();
  const module = findModuleById(route.params.moduleId);

  if (!module) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Module not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{module.title}</Text>
        <Text style={styles.description}>{module.description}</Text>
        <Text style={styles.sectionLabel}>Chapters</Text>
        <View style={styles.list}>
          {module.chapters.map((chapter) => (
            <TouchableOpacity
              key={chapter.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate('Chapter', {
                  moduleId: module.id,
                  chapterId: chapter.id,
                  childName: route.params.childName
                })
              }
            >
              <Text style={styles.cardTitle}>{chapter.title}</Text>
              <Text style={styles.cardType}>{chapter.type === 'video' ? 'Video' : 'Story'}</Text>
              <Text style={styles.cardBody} numberOfLines={2}>
                {chapter.body}
              </Text>
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
    gap: 12
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#e2e8f0'
  },
  description: {
    color: '#cbd5e1'
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e2e8f0',
    marginTop: 8
  },
  list: {
    gap: 12
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155'
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e2e8f0'
  },
  cardType: {
    color: '#cbd5e1',
    marginVertical: 4
  },
  cardBody: {
    color: '#cbd5e1'
  }
});

export default ModuleDetailsScreen;
