import React, { useMemo, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { findChapterById, findModuleByChapterId } from '../data/modules';

const QuizScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Quiz'>>();
  const chapter = findChapterById(route.params.chapterId);
  const module = findModuleByChapterId(route.params.chapterId);

  const questions = useMemo(() => chapter?.questions ?? [], [chapter]);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  if (!module || !chapter) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.title}>Quiz not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.subtitle}>{module.title}</Text>
        <Text style={styles.title}>Quiz time</Text>
        {questions.map((question) => {
          const selected = answers[question.id];
          const isCorrect = question.options.find((option) => option.id === selected)?.isCorrect;
          return (
            <View key={question.id} style={styles.questionCard}>
              <Text style={styles.questionPrompt}>{question.prompt}</Text>
              <View style={styles.options}>
                {question.options.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.option,
                      selected === option.id && (option.isCorrect ? styles.correct : styles.incorrect)
                    ]}
                    onPress={() => handleSelect(question.id, option.id)}
                  >
                    <Text style={styles.optionText}>{option.text}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              {selected && (
                <Text style={styles.feedback}>{isCorrect ? 'Correct' : 'Nice try'} · {question.feedback}</Text>
              )}
            </View>
          );
        })}

        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>Back to chapter</Text>
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
  questionCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 10
  },
  questionPrompt: {
    fontSize: 18,
    fontWeight: '700',
    color: '#e2e8f0'
  },
  options: {
    gap: 10
  },
  option: {
    backgroundColor: '#111827',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155'
  },
  optionText: {
    color: '#e2e8f0'
  },
  correct: {
    borderColor: '#22c55e'
  },
  incorrect: {
    borderColor: '#ef4444'
  },
  feedback: {
    color: '#cbd5e1'
  },
  backButton: {
    backgroundColor: '#334155',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center'
  },
  backText: {
    color: '#e2e8f0',
    fontWeight: '700'
  }
});

export default QuizScreen;
