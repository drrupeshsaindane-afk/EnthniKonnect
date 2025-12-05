import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useRoot } from '../context/RootContext';
import { RootType } from '../data/modules';

const RootCard: React.FC<{ label: RootType; onPress: () => void }> = ({ label, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
    <Text style={styles.cardTitle}>{label}</Text>
    <Text style={styles.cardSubtitle}>Discover stories from {label}</Text>
  </TouchableOpacity>
);

const ParentRootScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { setCurrentRoot } = useRoot();

  const handleSelect = (root: RootType) => {
    setCurrentRoot(root);
    navigation.navigate('ParentMain');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Choose your roots</Text>
        <View style={styles.row}>
          <RootCard label="India" onPress={() => handleSelect('India')} />
          <RootCard label="China" onPress={() => handleSelect('China')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0f172a'
  },
  container: {
    flex: 1,
    padding: 24
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#e2e8f0',
    marginBottom: 24
  },
  row: {
    flexDirection: 'row',
    gap: 16
  },
  card: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155'
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#e2e8f0',
    marginBottom: 8
  },
  cardSubtitle: {
    color: '#cbd5e1'
  }
});

export default ParentRootScreen;
