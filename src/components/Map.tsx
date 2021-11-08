import React, {useRef, useEffect, useState} from 'react';
import MapView, {Marker, Polyline} from 'react-native-maps';
import useLocation from '../hooks/useLocation';
import LoadingScreen from '../screens/LoadingScreen';
import Fab from './Fab';

interface Props {
  markers?: Marker[];
}

const Map = ({markers}: Props) => {
  const [showPolyline, setShowPolyline] = useState(true);
  const {
    hashLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    userLocation,
    stopFollowUserLocation,
    routeLines,
  } = useLocation();

  const mapViewRef = useRef<MapView>();
  const following = useRef<boolean>();

  useEffect(() => {
    followUserLocation();
    return () => {
      stopFollowUserLocation();
    };
  }, []);

  useEffect(() => {
    if (!following.current) return;

    mapViewRef.current?.animateCamera({
      center: {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      },
    });
  }, [userLocation]);

  const centerPosition = async () => {
    const {latitude, longitude} = await getCurrentLocation();

    following.current = true;

    mapViewRef.current?.animateCamera({
      center: {
        latitude,
        longitude,
      },
    });
  };

  if (!hashLocation) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MapView
        ref={el => (mapViewRef.current = el!)}
        style={{flex: 1}}
        showsUserLocation
        initialRegion={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onTouchStart={() => (following.current = false)}>
        {showPolyline && (
          <Polyline
            coordinates={routeLines}
            strokeColor="black"
            strokeWidth={3}
          />
        )}

        {/* <Marker
          coordinate={{latitude: 37.78825, longitude: -122.4324}}
          title={'This is a title'}
          description={'This is a description'}
        /> */}
      </MapView>
      <Fab
        iconName="compass-outline"
        onPress={() => {
          centerPosition();
        }}
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
        }}
      />
      <Fab
        iconName="brush-outline"
        onPress={() => {
          setShowPolyline(value => !value);
        }}
        style={{
          position: 'absolute',
          bottom: 80,
          right: 20,
        }}
      />
    </>
  );
};

export default Map;
