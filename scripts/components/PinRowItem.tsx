/* 
  PinRowItem.tsx
  Row item used in the home screen. Has breif information for each pin. 
  Also has the ability to be swiped left to delete the pin, providing you are the owner.
*/

import React from "react";
import { Animated, TouchableOpacity } from "react-native";
import { View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { HomeScreenState } from "../screens/HomeScreen";
import {
  IConfig,
  LitterPin,
  LitterTrackerAppClient,
} from "../services/api/Client";
import { AppContainer } from "../state/AppState";
import { MapContainer, MapState } from "../state/MapState";
import { PlaceholderPinImage } from "../utils/Constants";
import { GetGoogleIconUrlFromList } from "../utils/GoogleStorage";

interface PinRowItemProps {
  marker: LitterPin;
  setState: (
    patch: Partial<MapState> | ((prevState: MapState) => Partial<MapState>)
  ) => void;
  setHomeState: (
    patch:
      | Partial<HomeScreenState>
      | ((prevState: HomeScreenState) => Partial<HomeScreenState>)
  ) => void;
}
export const PinRowItem = (props: PinRowItemProps) => {
  const { marker, setState, setHomeState } = props;
  const { setMapState, mapState } = MapContainer.useContainer();
  const { appState } = AppContainer.useContainer();
  const avatarImageUrl = GetGoogleIconUrlFromList(marker.imageUrls);

  const OnDeleteMarkerPress = async () => {
    setHomeState({ loading: true });
    const token = await appState.user.getIdToken();
    const client = new LitterTrackerAppClient(new IConfig(token));
    await client.deleteLitterPin(marker);
    setMapState({
      markers: mapState.markers.filter(
        (x) => x.dataStoreId != marker.dataStoreId
      ),
    });
    setHomeState({ loading: false });
  };

  const RightActions = (
    progressAnimatedValue: Animated.AnimatedInterpolation,
    dragAnimatedValue: Animated.AnimatedInterpolation
  ) => {
    const scale = dragAnimatedValue.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.7, 0],
    });
    return (
      <>
        <TouchableOpacity onPress={() => OnDeleteMarkerPress()}>
          <View
            style={{
              flex: 1,
              backgroundColor: "red",
              justifyContent: "center",
            }}
          >
            <Animated.Text
              style={{
                color: "white",
                paddingHorizontal: 10,
                fontWeight: "800",
                fontSize: 20,
                transform: [{ scale }],
              }}
            >
              Delete
            </Animated.Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <Swipeable renderRightActions={RightActions} enabled={marker.createdByUid === appState.user?.uid ?? false}>
      <ListItem
        key={`pinRowItem-${marker.dataStoreId}`}
        bottomDivider
        onPress={() => setState({ selectedMarker: marker })}
      >
        <Avatar containerStyle={{height: 60, width: 60}} source={avatarImageUrl === undefined ? PlaceholderPinImage : {uri:  avatarImageUrl}} />
        <ListItem.Content>
          <ListItem.Title>{`Marker at: ${marker.markerLocation?.latitude?.toFixed(
            5
          )}, ${marker.markerLocation?.longitude?.toFixed(5)}`}</ListItem.Title>
          <ListItem.Subtitle>{`Created - ${marker.dateCreated?.toDateString()}, Last updated - ${marker.dateLastUpdated?.toDateString()}`}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </Swipeable>
  );
};
