import React from "react";
import { Dimensions, StyleProp, ViewStyle } from "react-native";
import { AppHeader } from "../components/nav/Header";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { DrawerScreens } from "../types/nav/DrawerScreens";
import { Routes } from "../types/nav/Routes";
import { AppLogoIcon } from "../components/AppLogoIcon";
import MapView, { Marker } from "react-native-maps";
import { AppContainer } from "../state/AppState";
import useEffectOnce from "react-use/lib/useEffectOnce";
import * as Location from "expo-location";
import { Button } from "react-native-elements";
import { Loader } from "../components/Loader";

type MapViewScreenNavigationProp = DrawerNavigationProp<
  DrawerScreens,
  Routes.MapView
>;

type MapViewScreenProps = {
  navigation: MapViewScreenNavigationProp;
};

export const MapViewScreen = (props: MapViewScreenProps) => {
  const { mapState, setMapState } = AppContainer.useContainer();

  const OnCenterMapPress = async () => {
    setMapState({ mapLoading: true });
    let location = await Location.getCurrentPositionAsync({});
    setMapState({
      location: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: mapState.location.latitudeDelta,
        longitudeDelta: mapState.location.longitudeDelta,
      },
      mapLoading: false,
    });
  };

  useEffectOnce(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
    })();
  });

  return (
    <>
      <AppHeader
        leftComponentOnPress={props.navigation.toggleDrawer}
        centerComponent={AppLogoIcon}
      />
      {!mapState.mapLoading && (
        <MapView
          provider={"google"}
          style={BeachMapStyles}
          region={{
            latitude: mapState.location.latitude,
            longitude: mapState.location.longitude,
            latitudeDelta: mapState.location.latitudeDelta,
            longitudeDelta: mapState.location.longitudeDelta,
          }}
          onRegionChangeComplete={({
            latitude,
            latitudeDelta,
            longitude,
            longitudeDelta,
          }) =>{
            setMapState({
              location: {
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta,
              },
            })}
          }
          mapType={mapState.mapType}
          rotateEnabled={true}
          showsTraffic={true}
          onPress={(e) =>
            setMapState({
              markers: [
                ...mapState.markers,
                {
                  latitude: e.nativeEvent.coordinate.latitude,
                  longitude: e.nativeEvent.coordinate.longitude,
                },
              ],
              location: {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
                latitudeDelta: mapState.location.latitudeDelta,
                longitudeDelta: mapState.location.longitudeDelta,
              },
            })
          }
        >
          {mapState.markers?.map((marker, i) => (
            <Marker key={`pin-${i}`} coordinate={marker} />
          ))}
          <Button
            style={buttonCallout}
            title="Center"
            onPress={() => OnCenterMapPress()}
          ></Button>
        </MapView>
      )}
      {mapState.mapLoading && <Loader />}
    </>
  );
};

export const BeachMapStyles: StyleProp<ViewStyle> = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
  marginBottom: 50,
  flex: 1,
};
export const buttonCallout: StyleProp<ViewStyle> = {
  flex: 1,
  flexDirection: "row",
  position: "absolute",
  bottom: 10,
  alignSelf: "flex-end",
  justifyContent: "flex-end",
  backgroundColor: "transparent",
  borderWidth: 0.5,
  borderRadius: 20,
};
