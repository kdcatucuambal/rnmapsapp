import React, {useContext, useReducer} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import BlackButton from '../components/BlackButton';
import {PermissionsContext} from '../context/PermissionsContext';

const PermissionsScreen = () => {
  const {permissions, askLocationPermission, checkLocationPermission} =
    useContext(PermissionsContext);

  return (
    <View style={styles.container}>
      <Text style={{paddingVertical: 10, color: 'black'}}>
        You need to use GPS to use this application
      </Text>
      <BlackButton title="Permiso" onPress={askLocationPermission} />
      <Text style={{marginTop: 20, color: 'black', fontSize: 18}}>
        {JSON.stringify(permissions, null, 5)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PermissionsScreen;
