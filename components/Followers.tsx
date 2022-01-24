import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";

const Followers = (props: any) => {
  const handleRemove = (name: string) => {
    // replace id to identify
    Alert.alert(
      `Remove ${props.title}`,
      `Are you sure you want to remove ${props.title} `,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Remove", onPress: () => props.remove(name) },
      ]
    );
  };

  const handleUnremove = (name: string) => {
    Alert.alert(
      `Remove ${props.title}`,
      `Are you sure you want to remove ${props.title} `,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Remove", onPress: () => props.unremove(name) },
      ]
    );
  };

  const handleAdd = (name: string) => {
    props.add(name);
    console.log("Helloasd");
  };

  return (
    <>
      <View
        style={[styles.card, shadowStyle]}
        onTouchEnd={() => {
          props.navigation.navigate("OthersProfile");
        }}
      >
        <Image
          style={styles.profilePic}
          source={require("../assets/images/profile.jpg")}
        />
        <Text style={styles.followText}>{props.title}</Text>
        {props.following ? (
          <></>
        ) : (
          <TouchableOpacity
            style={styles.addUserIconContainer}
            onPress={() => handleAdd(props.title)}
          >
            <Image
              style={styles.addUserIcon}
              source={require("../assets/images/user-follow.png")}
            ></Image>
          </TouchableOpacity>
        )}
        {props.blocked ? (
          <TouchableOpacity onPress={() => handleUnremove(props.title)}>
            <Text style={styles.removeText}>Un-Remove</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => handleRemove(props.title)}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 0 },
  shadowOpacity: 0.3,
  shadowRadius: 5,
  elevation: 3,
};
const styles = StyleSheet.create({
  card: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 7,
    flexDirection: "row",
    width: "95%",
    height: 70,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#FFF",
  },
  profilePic: {
    // flex: 1,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    width: 50,
    height: 70,
  },
  followText: {
    flex: 4,
    textAlign: "left",
    paddingTop: 25,
    paddingLeft: 20,
    marginLeft: 1,
    fontSize: 14,
  },
  removeButton: {
    flex: 2,
  },
  removeText: {
    color: "#aaaaaa",
    flex: 4,
    fontSize: 12,
    fontWeight: "bold",
    paddingTop: 25,
    paddingRight: 15,
  },
  addUserIcon: {
    marginTop: 20,
    width: 25,
    height: 25,
  },
  addUserIconContainer: {
    paddingLeft: 0,
    marginRight: 15,
  },
});

export default Followers;
