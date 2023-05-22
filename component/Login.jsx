import React, {useContext, useEffect} from 'react';
import {styles} from './Styles';
import {Text, View, Pressable, TextInput, Alert} from 'react-native';
import {AppContext} from '../Context/AppContext';
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

export default function FirstScreen({navigation}) {
  const {setCurrentUser} = useContext(AppContext);
  const [name, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  useEffect(() => {
    createTable();
  }, []);

  const createTable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS' +
          ' users (id INTEGER PRIMARY KEY AUTOINCREMENT,' +
          '   username TEXT, score INTEGER,  password TEXT)',
      );
    });
  };

  return (
    <View>
      <Text style={styles.textStyle}>Login</Text>
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
      <View style={styles.loginButtonContainer}>
        <Pressable
          style={styles.loginButtonStyle}
          onPress={() => {
            db.transaction(tx => {
              tx.executeSql(
                'SELECT * FROM users',
                [],
                (tx, results) => {
                  let len = results.rows.length;
                  let userExists = false;
                  if (len > 0) {
                    for (let i = 0; i < len; i++) {
                      results.rows.item(i).username === name &&
                      results.rows.item(i).password === password
                        ? (() => {
                            setCurrentUser(name);
                            userExists = true;
                            navigation.navigate('TicTacToe');
                          })()
                        : null;
                    }
                    if (!userExists) {
                      Alert.alert('Username or Password is incorrect');
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
          }}>
          <Text style={styles.textStyle}> Login</Text>
        </Pressable>

        <Pressable
          style={styles.loginButtonStyle}
          onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.textStyle}> Sign Up</Text>
        </Pressable>
      </View>
      <Pressable
        style={styles.loginLeaderboardButtonStyle}
        onPress={() => {
          navigation.navigate('Leaderboard');
        }}>
        <Text style={styles.textStyle}> Leaderboard</Text>
      </Pressable>
    </View>
  );
}

{
  /* <Pressable
          style={styles.loginButtonStyle}
          onPress={() => {
            db.transaction(tx => {
              tx.executeSql(
                'SELECT * FROM users',
                [],
                (tx, results) => {
                  let len = results.rows.length;
                  if (len > 0) {
                    for (let i = 0; i < len; i++) {
                      console.log(results.rows.item(i));
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
          }}>
          <Text style={styles.textStyle}> show db</Text>
        </Pressable> */
}

{
  /* <Pressable
          style={styles.loginButtonStyle}
          onPress={() => {
            db.transaction(tx => {
              tx.executeSql('drop table users');
            });
            console.log('table dropped');
          }}>
          <Text style={styles.textStyle}> drop table</Text>
        </Pressable> */
}

{
  /* <Pressable
          style={styles.loginButtonStyle}
          onPress={() => {
            db.transaction(tx => {
              tx.executeSql(
                'UPDATE users SET score = 2 WHERE username = ?',
                [name],
                (tx, results) => {
                  console.log(results.rowsAffected);
                },
                error => {
                  console.log(error);
                },
              );
            });
          }}>
          <Text style={styles.textStyle}> update score</Text>
        </Pressable> */
}
