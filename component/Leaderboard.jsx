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

export default function Leaderboard() {
  const [users, setUsers] = React.useState([]);
  const [sortedUsers, setSortedUsers] = React.useState([]);

  useEffect(() => {
    setUsers([]);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users',
        [],
        (tx, results) => {
          let len = results.rows.length;
          if (len > 0) {
            for (let i = 0; i < len; i++) {
              //   console.log(results.rows.item(i));
              setUsers(prevData => [...prevData, results.rows.item(i)]);
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
  }, []);

  useEffect(() => {
    setSortedUsers(users.sort((a, b) => b.score - a.score));
  }, [users]);

  return (
    <View>
      <Text style={styles.textStyle}>Leaderboard</Text>
      {sortedUsers.length > 0 &&
        sortedUsers.map((user, key, index) => {
          return (
            <Text key={key} style={styles.leaderboardTextStyle}>
              {user.username.charAt(0).toUpperCase() +
                user.username.slice(1) +
                ' - ' +
                user.score +
                ' pts'}
            </Text>
          );
        })}
    </View>
  );
}
