import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';

export default function TipsScreen() {
  const [jobDesc, setJobDesc] = useState('');
  const [keywords, setKeywords] = useState([]);

  const extractKeywords = () => {
    if (!jobDesc.trim()) {
      Alert.alert('Please paste a job description');
      return;
    }
    const words = jobDesc.toLowerCase().match(/\b\w+\b/g) || [];
    const stopWords = ['and', 'the', 'for', 'with', 'you', 'will', 'have', 'are', 'that', 'this', 'your', 'our', 'all', 'can', 'from', 'they', 'their', 'what', 'been', 'were', 'when', 'where', 'who', 'which', 'some', 'any', 'but', 'not', 'such', 'than', 'then', 'them', 'these', 'those', 'its', 'than', 'very', 'just', 'being', 'over', 'during', 'without', 'after', 'before', 'between', 'under', 'within', 'through', 'out', 'into', 'onto', 'upon', 'about', 'above', 'below', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once'];
    const freq = {};
    words.forEach(w => {
      if (!stopWords.includes(w) && w.length > 2) {
        freq[w] = (freq[w] || 0) + 1;
      }
    });
    const sorted = Object.keys(freq).sort((a, b) => freq[b] - freq[a]).slice(0, 15);
    setKeywords(sorted);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>ATS-Friendly CV Tips</Text>
      <Text style={styles.tip}>• Use standard fonts like Arial, Calibri, or Times New Roman.</Text>
      <Text style={styles.tip}>• Avoid tables, columns, graphics, and headers/footers.</Text>
      <Text style={styles.tip}>• Include keywords from the job description.</Text>
      <Text style={styles.tip}>• Use clear section headings: "Work Experience", "Education", etc.</Text>
      <Text style={styles.tip}>• Save as PDF (make sure text is selectable).</Text>
      <Text style={styles.tip}>• Use bullet points (plain characters like * or -).</Text>

      <Text style={styles.subHeading}>Keyword Extractor</Text>
      <Text style={styles.description}>Paste a job description below to get suggested keywords to include in your CV.</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Paste job description here"
        value={jobDesc}
        onChangeText={setJobDesc}
        multiline
        numberOfLines={6}
      />
      <Button title="Extract Keywords" onPress={extractKeywords} />

      {keywords.length > 0 && (
        <View style={styles.keywordContainer}>
          <Text style={styles.keywordTitle}>Top Keywords:</Text>
          <Text style={styles.keywords}>{keywords.join(', ')}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  subHeading: { fontSize: 18, fontWeight: '600', marginTop: 20, marginBottom: 5 },
  tip: { fontSize: 14, marginBottom: 8, lineHeight: 20 },
  description: { fontSize: 14, color: '#555', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
  multiline: { minHeight: 100, textAlignVertical: 'top' },
  keywordContainer: { marginTop: 20, padding: 15, backgroundColor: '#e6f7ff', borderRadius: 5 },
  keywordTitle: { fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  keywords: { fontSize: 14 },
});