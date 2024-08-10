import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { styles } from '../styles/styles';

const ProgressBar = (props) => {
  const { bgcolor, completed, label } = props;

  return (
    <View style={styles.Progress}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.filler, { width: `${completed}%`, backgroundColor: bgcolor }]} />
      </View>
    </View>
  );
};



export default ProgressBar;


  