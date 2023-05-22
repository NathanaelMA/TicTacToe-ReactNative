import React, {useContext, useEffect, useState} from 'react';
import {styles} from './Styles';
import {Text, View, Pressable, TextInput} from 'react-native';
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

export default function SecScreen({navigation}) {
  const {currentUser} = useContext(AppContext);
  const [player, setPlayer] = useState('X');
  const [board, setBoard] = useState([Array(9).fill(null)]);
  const [winner, setWinner] = useState(null);
  const [prevBoard, setPrevBoard] = useState([]);
  const [score, setScore] = useState(0);
  const [clearBoard, setClearBoard] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    let arr = [1000, 2500, 4000, 5500, 7000, 8500, 10000, 9250, 8000, 6750];
    let index = Math.floor(Math.random() * 10);
    setScore(arr[index]);
    setClearBoard(false);
    setGameOver(false);
  }, [clearBoard]);

  useEffect(() => {
    score > 0 ? setScore(score - 100) : null;
  }, [player]);

  useEffect(() => {
    (board[0][0] == 'X' && board[0][1] == 'X' && board[0][2] == 'X') ||
    (board[0][3] == 'X' && board[0][4] == 'X' && board[0][5] == 'X') ||
    (board[0][6] == 'X' && board[0][7] == 'X' && board[0][8] == 'X') ||
    (board[0][0] == 'X' && board[0][3] == 'X' && board[0][6] == 'X') ||
    (board[0][1] == 'X' && board[0][4] == 'X' && board[0][7] == 'X') ||
    (board[0][2] == 'X' && board[0][5] == 'X' && board[0][8] == 'X') ||
    (board[0][0] == 'X' && board[0][4] == 'X' && board[0][8] == 'X') ||
    (board[0][2] == 'X' && board[0][4] == 'X' && board[0][6] == 'X')
      ? (() => {
          setWinner('X');
          setGameOver(true);
          console.log('score ' + score + ' current user ' + currentUser);

          db.transaction(tx => {
            tx.executeSql(
              'SELECT * FROM users',
              [],
              (tx, results) => {
                let len = results.rows.length;
                if (len > 0) {
                  for (let i = 0; i < len; i++) {
                    let row = results.rows.item(i);
                    if (row.username == currentUser) {
                      row.score > score
                        ? null
                        : (() => {
                            tx.executeSql(
                              'UPDATE users SET score = ? WHERE username = ?',
                              [score, currentUser],
                              (tx, results) => {
                                if (results.rowsAffected > 0) {
                                  console.log('Success');
                                } else {
                                  console.log('Failed');
                                }
                              },
                            );
                          })();
                    }
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
        })()
      : (board[0][0] == 'O' && board[0][1] == 'O' && board[0][2] == 'O') ||
        (board[0][3] == 'O' && board[0][4] == 'O' && board[0][5] == 'O') ||
        (board[0][6] == 'O' && board[0][7] == 'O' && board[0][8] == 'O') ||
        (board[0][0] == 'O' && board[0][3] == 'O' && board[0][6] == 'O') ||
        (board[0][1] == 'O' && board[0][4] == 'O' && board[0][7] == 'O') ||
        (board[0][2] == 'O' && board[0][5] == 'O' && board[0][8] == 'O') ||
        (board[0][0] == 'O' && board[0][4] == 'O' && board[0][8] == 'O') ||
        (board[0][2] == 'O' && board[0][4] == 'O' && board[0][6] == 'O')
      ? (() => {
          setWinner('O');
          setGameOver(true);
        })()
      : board[0].includes(null)
      ? (() => {
          setWinner(null);
          handleAIMove();
        })()
      : setWinner('Tie');
  }, [player, board]);

  function deepCopy(arr) {
    return arr.map(item => (Array.isArray(item) ? deepCopy(item) : item));
  }

  handleAIMove = () => {
    if (winner === null) {
      if (player === 'O') {
        let randomIndex;
        let counter = 0;
        do {
          if (counter++ < 10) randomIndex = Math.floor(Math.random() * 9);
          else break;
        } while (board[0][randomIndex] !== null);
        const newBoard = deepCopy(board);
        newBoard[0][randomIndex] = player;
        setBoard(newBoard);
        setPlayer('X');
        setPrevBoard(prevData => [
          ...prevData,
          {board: newBoard[0], player: 'AI'},
        ]);
      }
    }
  };

  handlePlayerMove = index => {
    if (winner === null) {
      if (player === 'X' && board[0][index] === null) {
        const newBoard = deepCopy(board);
        newBoard[0][index] = player;
        setBoard(newBoard);
        setPrevBoard(prevData => [
          ...prevData,
          {board: newBoard[0], player: 'Player'},
        ]);
        setPlayer('O');
      }
    }
  };

  return (
    <View>
      <Text style={styles.textStyle}>Tic Tac Toe!</Text>

      <Text style={styles.textStyle}>
        Welcome {currentUser.charAt(0).toUpperCase() + currentUser.slice(1)}!
      </Text>
      {/* <Text style={styles.textStyle}>
        Player is{' '}
        {player === 'X'
          ? currentUser.charAt(0).toUpperCase() + currentUser.slice(1)
          : 'AI'}
      </Text> */}
      {winner ? (
        <Text style={styles.textStyle}>
          Winner:{' '}
          {winner === 'X'
            ? currentUser.charAt(0).toUpperCase() + currentUser.slice(1)
            : winner === 'O'
            ? 'AI'
            : 'Tie'}
        </Text>
      ) : null}

      <Pressable
        style={styles.restartButtonStyle}
        onPress={() => {
          setWinner(null);
          setBoard([Array(9).fill(null)]);
          setPlayer('X');
          setPrevBoard([]);
          setClearBoard(true);
          console.log('Restart');
        }}>
        <Text style={styles.textStyle}> Restart </Text>
      </Pressable>
      <View style={styles.tttContainer}>
        <View style={styles.tttRow}>
          <Pressable
            style={styles.tttButton}
            onPress={() => {
              handlePlayerMove(0);
            }}>
            <Text style={styles.tttButtonText}>{board[0][0]}</Text>
          </Pressable>
          <Pressable
            style={styles.tttButton}
            onPress={() => {
              handlePlayerMove(1);
            }}>
            <Text style={styles.tttButtonText}>{board[0][1]}</Text>
          </Pressable>
          <Pressable
            style={styles.tttButton}
            onPress={() => {
              handlePlayerMove(2);
            }}>
            <Text style={styles.tttButtonText}>{board[0][2]}</Text>
          </Pressable>
        </View>
        <View style={styles.tttRow}>
          <Pressable
            style={styles.tttButton}
            onPress={() => {
              handlePlayerMove(3);
            }}>
            <Text style={styles.tttButtonText}>{board[0][3]}</Text>
          </Pressable>
          <Pressable
            style={styles.tttButton}
            onPress={() => {
              handlePlayerMove(4);
            }}>
            <Text style={styles.tttButtonText}>{board[0][4]}</Text>
          </Pressable>
          <Pressable
            style={styles.tttButton}
            onPress={() => {
              handlePlayerMove(5);
            }}>
            <Text style={styles.tttButtonText}>{board[0][5]}</Text>
          </Pressable>
        </View>
        <View style={styles.tttRow}>
          <Pressable
            style={styles.tttButton}
            onPress={() => {
              handlePlayerMove(6);
            }}>
            <Text style={styles.tttButtonText}>{board[0][6]}</Text>
          </Pressable>
          <Pressable
            style={styles.tttButton}
            onPress={() => {
              handlePlayerMove(7);
            }}>
            <Text style={styles.tttButtonText}>{board[0][7]}</Text>
          </Pressable>
          <Pressable
            style={styles.tttButton}
            onPress={() => {
              handlePlayerMove(8);
            }}>
            <Text style={styles.tttButtonText}>{board[0][8]}</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.prevArrayContainer}>
        {!winner
          ? prevBoard.map((item, index, key) => (
              <Pressable
                key={index}
                style={styles.prevArrayButtonStyle}
                onPress={() => {
                  item.player === 'AI' ? setPlayer('X') : setPlayer('O');
                  setBoard([item.board]);
                  setPrevBoard(prevData => prevData.slice(0, index + 1));
                }}>
                <Text style={styles.prevArrayTextStyle}>
                  {' '}
                  {item.player} played move {index + 1}{' '}
                </Text>
              </Pressable>
            ))
          : null}
      </View>

      {gameOver ? (
        <Pressable
          style={styles.restartButtonStyle}
          onPress={() => {
            navigation.navigate('Leaderboard');
          }}>
          <Text style={styles.textStyle}> Leaderboard </Text>
        </Pressable>
      ) : null}
    </View>
  );
}
