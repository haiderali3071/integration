import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Following from "../components/Following";
import BackArrow from "../components/BackArrow";
import FollowHeader from "../components/FollowHeader";
import { baseProps } from "react-native-gesture-handler/lib/typescript/handlers/gestureHandlers";
import FollowingList from "../components/FollowingList";
import { Searchbar } from "react-native-paper";

export default function FollowingPage(props: any) {
  let [dummy, setDummy] = useState([
    {
      name: "person 1",
      following: true,
    },
    {
      name: "person 2",
      following: true,
    },
    {
      name: "person 3",
      following: true,
    },
    {
      name: "Hello",
      following: true,
    },
    {
      name: "Dummy",
      following: true,
    },
  ]);
  let [following, setFollowing] = useState(
    dummy.filter((element) => element.following === true)
  );
  let [text, setText] = useState("");

  const handleClickBack = () => {
    props.navigation.goBack();

    console.log("Clicked Back!"); // Clicking back
  };

  const unfollow = (name: string) => {
    // this should be id
    let index = following.findIndex((element) => element.name === name);
    following[index].following = false;
    setFollowing(following.filter((element) => element.following === true));
  };

  return (
    <>
      <View style={{ backgroundColor: "white" }}>
        <FollowHeader
          title={"Following"}
          text={text}
          setText={setText}
          handleClickBack={handleClickBack}
        ></FollowHeader>
        <Searchbar
          placeholder="Search"
          onChangeText={() => {}}
          value={""}
          style={styles.input}
          inputStyle={{ fontSize: 16 }}
        />

        {text.length > 0 ? (
          <FollowingList
            list={following.filter((element) =>
              element.name.toUpperCase().includes(text.toUpperCase())
            )}
            unfollow={unfollow}
            navigation={props.navigation}
          ></FollowingList>
        ) : (
          <FollowingList
            list={following}
            unfollow={unfollow}
            navigation={props.navigation}
          ></FollowingList>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    height: 30,
    width: "90%", //
    alignSelf: "center",
    backgroundColor: "#F2F2F2",
    marginBottom: 20,
    marginTop: -20,
    borderRadius: 50,
    paddingLeft: 20,
  },
  input: {
    alignSelf: "center",
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 5,
    height: 35,
    backgroundColor: "#eee",
    width: 350,
    borderRadius: 40,
    marginBottom: 20,
    fontSize: 17,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0,
    elevation: 1,
  },
});
