import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, Button, TextInput, Switch, Alert } from 'react-native';

export default function App() {
  //bouton 
  const [value, onChangeText] = React.useState('Cela est un input');

  //TextInput
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <ScrollView style={{ marginTop: 20 }}>
      <TextInput style={[styles.textinput, { marginBottom: 5 }]} placeholder='Titre du film' />
      <Button title='Rechercher' onPress={() => Alert.alert('"Rechercher" button pressed')} />

      <Text>Bonjour, vous êtes dans l'Expo</Text>
      <StatusBar style="auto" />
      <Button
        title="Cela est le bouton"
        color="#000"
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onPress={() => Alert.alert('Button with adjusted color pressed')}
      />
      <TextInput
        style={{ height: 40, margin: 10, padding: 10, borderColor: 'gray', borderWidth: 1, borderRadius: 10 }}
        placeholder="Type here something"
        onChangeText={value => onChangeText(value)}
        defaultValue={ value }
      />
      <Text style={{padding: 10, fontSize: 42 }}>
        {value.split(' ').map((word) => word && 'pizza').join(' ')}
      </Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
        style={{ marginLeft: 30 }}
      />
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d8dddf',
    alignItems: 'center',
    justifyContent: 'center'
  },

  textinput: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
    borderRadius: 10
  },
});
