import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import RNGestureHandlerButton from "react-native-gesture-handler/lib/typescript/components/GestureHandlerButton";
import {
  RouteParamList,
  RouteStackParamList,
} from "../navigation/RouteParameterList";

export default function FollowButton() {
  const [isPressed, setIsPressed] = React.useState(false);
  const updateFollow = () => {
    setIsPressed(!isPressed);
  };

  return (
    <View>
      {isPressed ? (
        <TouchableOpacity
          onPress={() => updateFollow()}
          style={[
            styles.followOutline,
            { backgroundColor: "white", width: 91 },
          ]}
        >
          <Text
            style={[
              styles.followingButtonText,
              { color: "rgba(132,156,176,1)" },
            ]}
          >
            Follow
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => updateFollow()}
          style={[
            styles.followOutline,
            { backgroundColor: "rgba(132,156,176,1)", width: 91 },
          ]}
        >
          <Text style={[styles.followingButtonText, { color: "white" }]}>
            Following
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  followingButtonText: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 17,
  },
  followOutline: {
    borderRadius: 35,
    borderWidth: 1,
    height: 30,
    left: 5,
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(132,156,176,1)",
    position: "absolute",
  },
});
