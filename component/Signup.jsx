import React, {useContext, useEffect} from 'react';
import {styles} from './Styles';
import {Text, View, Pressable, TextInput, Alert} from 'react-native';
import sqlite from 'react-native-sqlite-storage';
const db = sqlite.openDatabase(
  {
    name: 'tictactoeUsers.db',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);
export default function Signup({navigation}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userExists, setUserExists] = React.useState(false);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT username FROM users',
        [],
        (tx, results) => {
          let len = results.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              results.rows.item(i).username === username
                ? setUserExists(true)
                : setUserExists(false);
            }
          } else {
            console.log('No users found');
          }
        },
        error => {
          console.log(error);
        },
      );
    });
  }, [username]);

  return (
    <View>
      <Text style={styles.textStyle}>Sign up</Text>

      <TextInput
        style={styles.textInputStyle}
        onChangeText={text => setUsername(text)}
        placeholder="Enter Username"
      />
      <TextInput
        style={styles.textInputStyle}
        onChangeText={text => setPassword(text)}
        placeholder="Enter Password"
        secureTextEntry
      />

      <Pressable
        style={styles.signupButtonStyle}
        onPress={() => {
          if (!userExists) {
            Alert.alert('User created');
            db.transaction(tx => {
              tx.executeSql(
                'INSERT INTO users (username, password, score) VALUES (?,?,?)',
                [username, password, 0],
                (tx, results) => {
                  if (results.rowsAffected > 0) {
                    console.log('Success');
                  } else {
                    console.log('Failed');
                  }
                },
              );
            });

            navigation.navigate('Login');
          } else {
            Alert.alert('User already exists');
          }
        }}>
        <Text style={styles.textStyle}> Submit</Text>
      </Pressable>
    </View>
  );
}
