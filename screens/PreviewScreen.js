import React from 'react';
import { ScrollView, View, Text, StyleSheet, Button, Alert } from 'react-native';
import useStore from '../store';
import { generateAndSharePDF } from '../utils/pdfGenerator';

export default function PreviewScreen() {
  const { cvData } = useStore();

  const handleExport = async () => {
    try {
      await generateAndSharePDF(cvData);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate PDF');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.name}>{cvData.fullName || 'Your Name'}</Text>
      <Text style={styles.contact}>{cvData.email} | {cvData.phone}</Text>

      {cvData.summary !== '' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <Text style={styles.text}>{cvData.summary}</Text>
        </View>
      )}

      {cvData.experience.some(exp => exp.jobTitle !== '' || exp.company !== '') && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {cvData.experience.map((exp, index) => (
            (exp.jobTitle !== '' || exp.company !== '') && (
              <View key={index} style={styles.subSection}>
                <Text style={styles.subTitle}>{exp.jobTitle} at {exp.company}</Text>
                <Text style={styles.date}>{exp.startDate} - {exp.endDate}</Text>
                <Text style={styles.text}>{exp.description}</Text>
              </View>
            )
          ))}
        </View>
      )}

      {cvData.education.some(edu => edu.degree !== '' || edu.institution !== '') && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {cvData.education.map((edu, index) => (
            (edu.degree !== '' || edu.institution !== '') && (
              <View key={index} style={styles.subSection}>
                <Text style={styles.subTitle}>{edu.degree}, {edu.institution}</Text>
                <Text style={styles.date}>{edu.year}</Text>
              </View>
            )
          ))}
        </View>
      )}

      {cvData.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <Text style={styles.text}>{cvData.skills.join(', ')}</Text>
        </View>
      )}

      <Button title="Export as PDF" onPress={handleExport} />
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  name: { fontSize: 26, fontWeight: 'bold', marginBottom: 5 },
  contact: { fontSize: 14, color: '#555', marginBottom: 15 },
  section: { marginTop: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '600', borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 5 },
  subSection: { marginTop: 10 },
  subTitle: { fontSize: 16, fontWeight: '500' },
  date: { fontSize: 12, color: '#777', marginBottom: 5 },
  text: { fontSize: 14, lineHeight: 20 },
});