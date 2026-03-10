import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import useStore from '../store';

const STORAGE_KEY = '@saved_cvs';

export default function HomeScreen({ navigation }) {
  const [cvs, setCvs] = useState([]);
  const { setCvData } = useStore();

  const loadCVs = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      setCvs(data ? JSON.parse(data) : []);
    } catch (e) {
      console.error(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCVs();
    }, [])
  );

  const saveCurrentCV = async () => {
    // In a real app, you'd want to name the CV. For simplicity, we'll just save with timestamp.
    const newCV = {
      id: Date.now().toString(),
      ...useStore.getState().cvData,
    };
    const updated = [...cvs, newCV];
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setCvs(updated);
      Alert.alert('Success', 'CV saved');
    } catch (e) {
      Alert.alert('Error', 'Could not save CV');
    }
  };

  const deleteCV = async (id) => {
    const filtered = cvs.filter(cv => cv.id !== id);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      setCvs(filtered);
    } catch (e) {
      Alert.alert('Error', 'Could not delete');
    }
  };

  const loadCV = (cv) => {
    setCvData(cv);  // load into the store
    navigation.navigate('Form');
  };

  return (
    <View style={styles.container}>
      <Button title="Save Current CV" onPress={saveCurrentCV} />
      <FlatList
        data={cvs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.cvItem} onPress={() => loadCV(item)}>
            <Text style={styles.cvName}>{item.fullName || 'Unnamed CV'}</Text>
            <Text>{item.email}</Text>
            <View style={styles.actions}>
              <Button title="Load" onPress={() => loadCV(item)} />
              <Button title="Delete" color="red" onPress={() => deleteCV(item.id)} />
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No saved CVs. Create one in the Form tab.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  cvItem: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  cvName: { fontSize: 18, fontWeight: 'bold' },
  actions: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
  empty: { textAlign: 'center', marginTop: 50, color: '#999' },
});