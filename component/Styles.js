import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
  loginButtonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    flexWrap: 'wrap',
  },
  loginButtonStyle: {
    width: 180,
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: 'orange',
    borderRadius: 10,
  },
  loginLeaderboardButtonStyle: {
    width: 250,
    marginTop: 10,
    marginLeft: 70,
    backgroundColor: 'yellow',
    borderRadius: 10,
  },
  textInputStyle: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  leaderboardTextStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'lightgray',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  tttButton: {
    width: 100,
    height: 100,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  tttButtonText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  tttRow: {
    flexDirection: 'row',
  },
  tttContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  restartButtonStyle: {
    width: 200,
    marginLeft: 100,
    backgroundColor: 'lightgray',
    borderRadius: 10,
  },
  prevArrayContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 40,
  },

  prevArrayButtonStyle: {
    width: 150,
    height: 50,
    marginLeft: 10,
    marginTop: 10,
    backgroundColor: 'lightgreen',
    borderRadius: 10,
  },
  prevArrayTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  leaderboardTextStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
});

export {styles};
