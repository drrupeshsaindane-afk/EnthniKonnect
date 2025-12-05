import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { findChapterById, findModuleByChapterId } from '../data/modules';

const ChapterScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Chapter'>>();
  const chapter = findChapterById(route.params.chapterId);
  const module = findModuleByChapterId(route.params.chapterId);

  if (!module || !chapter) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Content not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitle}>{module.title}</Text>
        <Text style={styles.title}>{chapter.title}</Text>

        {chapter.type === 'video' ? (
          <View style={styles.videoPlaceholder}>
            <Text style={styles.videoText}>Video placeholder</Text>
          </View>
        ) : (
          <View style={styles.storyBox}>
            <Text style={styles.storyText}>{chapter.body}</Text>
          </View>
        )}

        {chapter.type === 'video' && <Text style={styles.bodyText}>{chapter.body}</Text>}

        <TouchableOpacity
          style={styles.quizButton}
          onPress={() => navigation.navigate('Quiz', { chapterId: chapter.id })}
        >
          <Text style={styles.quizButtonText}>Test your quotient</Text>
        </TouchableOpacity>
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
  subtitle: {
    color: '#cbd5e1'
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#e2e8f0'
  },
  videoPlaceholder: {
    backgroundColor: '#1e293b',
    height: 200,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#334155'
  },
  videoText: {
    color: '#cbd5e1'
  },
  storyBox: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155'
  },
  storyText: {
    color: '#e2e8f0',
    lineHeight: 22
  },
  bodyText: {
    color: '#cbd5e1'
  },
  quizButton: {
    backgroundColor: '#a855f7',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center'
  },
  quizButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16
  }
});

export default ChapterScreen;
