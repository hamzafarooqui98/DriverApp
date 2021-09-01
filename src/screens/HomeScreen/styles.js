import {StyleSheet, Dimensions} from 'react-native';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
  bottomContainer: {
    height: 110,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 20,
  },
  bottomText: {
    fontSize: 22,
    color: '#4a4a4a',
  },
  roundButton: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 25,
  },
  goButton: {
    position: 'absolute',
    backgroundColor: Colors.primary,
    width: 75,
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    bottom: 130,
    left: Dimensions.get('window').width / 2 - 37,
  },
  goText: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
  },

  balanceButton: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    top: 10,
    left: Dimensions.get('window').width / 2 - 50,
  },
  balanceText: {
    fontSize: 24,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default styles;
