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
import FollowersList from "../components/FollowersList";
import { Searchbar } from "react-native-paper";

export default function FollowersPage(props: any) {
  let [dummy, setDummy] = useState([
    {
      name: "person 1",
      following: true,
      followingMe: true,
      blocked: false,
    },
    {
      name: "person 2",
      following: true,
      followingMe: true,
      blocked: false,
    },
    {
      name: "person 3",
      following: false,
      followingMe: true,
      blocked: false,
    },
    {
      name: "Hello",
      following: false,
      followingMe: true,
      blocked: false,
    },
    {
      name: "Dummy",
      following: true,
      followingMe: true,
      blocked: false,
    },
  ]);
  let [followers, setFollowers] = useState(
    dummy.filter((element) => element.followingMe === true)
  );
  let [text, setText] = useState("");

  const handleClickBack = () => {
    props.navigation.goBack();
    console.log("Clicked Back!"); // Clicking back
  };

  const remove = (name: string) => {
    // this should be id
    let index = followers.findIndex((element) => element.name === name);
    followers[index].blocked = true;
    setFollowers(followers.filter((element) => element.followingMe === true));
  };

  const unremove = (name: string) => {
    let index = followers.findIndex((element) => element.name === name);
    followers[index].blocked = false;
    setFollowers(followers.filter((element) => element.followingMe === true));
  };

  const add = (name: string) => {
    let index = followers.findIndex((element) => element.name === name);
    followers[index].following = true;
    setFollowers(followers.filter((element) => element.followingMe === true));
  };

  return (
    <>
      <View style={{ backgroundColor: "white" }}>
        <FollowHeader
          title={"Followers"}
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
          <FollowersList
            list={followers.filter((element) =>
              element.name.toUpperCase().includes(text.toUpperCase())
            )}
            remove={remove}
            unremove={unremove}
            add={add}
            navigation={props.navigation}
          ></FollowersList>
        ) : (
          <FollowersList
            list={followers}
            remove={remove}
            unremove={unremove}
            add={add}
            navigation={props.navigation}
          ></FollowersList>
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
