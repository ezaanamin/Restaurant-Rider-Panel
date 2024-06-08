import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { styles } from '../styles/styles';
import { UserContext } from '../contextState/contextState';
const TabButton = ({title}) => {
  const userContext = useContext(UserContext);


    const {activeTab, setActiveTab} = userContext;

  
    const handleTabPress = (tab) => {
      setActiveTab(tab);
      // console.log(`${tab} button pressed`);
    };
  
    return (
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Assigned' && styles.activeTabButton]}
          onPress={() => handleTabPress('Assigned')}
        >
          <Text style={styles.tabButtonText}>Assigned</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'On Route' && styles.activeTabButton]}
          onPress={() => handleTabPress('On Route')}
        >
          <Text style={styles.tabButtonText}>On Route </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'Delivered' && styles.activeTabButton]}
          onPress={() => handleTabPress('Delivered')}
        >
          <Text style={styles.tabButtonText}>Delivered</Text>
        </TouchableOpacity>
      </View>
    );
  };



export default TabButton;
