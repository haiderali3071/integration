import React, { useState } from "react";
import { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import CommunityContent from "../components/CommunityContent";
import CommunityView from "../components/CommunityView";
import SearchBar from "../components/SearchBar";
import SearchResultsContent from "../components/SearchResultsContent";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { RouteStackParamList } from "../navigation/RouteParameterList";
import BottomApp from "../components/BottomNavigation";
import { AntDesign } from "@expo/vector-icons";
import { Searchbar, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function Community(props: RouteStackParamList<"Community">) {
  const Posts = [
    {
      id: 4,
      currentTime: "3:42",
      totalTime: "7:32",
      userName: "Jessica Simmons",
      userCaption:
        "I just learned how to play a new song on the piano! Does anybody recognize it? #Wavesounds",
      timeSincePosted: "2h",
      amountLikes: 132,
      amountComments: 3,
      name: "person 1",
      following: true,
    },
    {
      id: 5,
      currentTime: "3:42",
      totalTime: "7:32",
      userName: "Jessica Simmons2",
      userCaption:
        "I just learned how to play a new song on the piano! Does anybody recognize it? #OceanWaves!",
      timeSincePosted: "2h",
      amountLikes: 132,
      amountComments: 3,
      name: "person 2",
      following: true,
    },
    {
      id: 6,
      currentTime: "3:42",
      totalTime: "7:32",
      userName: "Jessica Simmons3",
      userCaption:
        "I just learned how to play a new song on the piano! Does anybody recognize it? #Ocean Waves",
      timeSincePosted: "2h",
      amountLikes: 132,
      amountComments: 3,
      name: "person 3",
      following: true,
    },
    {
      id: 7,
      currentTime: "3:42",
      totalTime: "7:32",
      userName: "Jessica Simmons4",
      userCaption:
        "I just learned how to play a new song on the piano! Does anybody recognize it? #Ocean Waves!",
      timeSincePosted: "2h",
      amountLikes: 132,
      amountComments: 3,
      name: "Hello",
      following: false,
    },
    {
      id: 8,
      currentTime: "3:42",
      totalTime: "7:32",
      userName: "Jessica Simmons4",
      userCaption:
        "I just learned how to play a new song on the piano! Does anybody recognize it? #Ocean Waves!",
      timeSincePosted: "2h",
      amountLikes: 132,
      amountComments: 3,
      name: "Dummy",
      following: true,
    },
  ];

  let [dummy, setDummy] = useState([
    {
      id: 4,
      currentTime: "3:42",
      totalTime: "7:32",
      userName: "Jessica Simmons",
      userCaption:
        "I just learned how to play a new song on the piano! Does anybody recognize it? #Wavesounds",
      timeSincePosted: "2h",
      amountLikes: 132,
      amountComments: 3,
      name: "person 1",
      following: true,
    },
    {
      id: 5,
      currentTime: "3:42",
      totalTime: "7:32",
      userName: "Jessica Simmons2",
      userCaption:
        "I just learned how to play a new song on the piano! Does anybody recognize it? #OceanWaves!",
      timeSincePosted: "2h",
      amountLikes: 132,
      amountComments: 3,
      name: "person 2",
      following: true,
    },
    {
      id: 6,
      currentTime: "3:42",
      totalTime: "7:32",
      userName: "Jessica Simmons3",
      userCaption:
        "I just learned how to play a new song on the piano! Does anybody recognize it? #Ocean Waves",
      timeSincePosted: "2h",
      amountLikes: 132,
      amountComments: 3,
      name: "person 3",
      following: true,
    },
    {
      id: 7,
      currentTime: "3:42",
      totalTime: "7:32",
      userName: "Jessica Simmons4",
      userCaption:
        "I just learned how to play a new song on the piano! Does anybody recognize it? #Ocean Waves!",
      timeSincePosted: "2h",
      amountLikes: 132,
      amountComments: 3,
      name: "Hello",
      following: false,
    },
    {
      id: 8,
      currentTime: "3:42",
      totalTime: "7:32",
      userName: "Jessica Simmons4",
      userCaption:
        "I just learned how to play a new song on the piano! Does anybody recognize it? #Ocean Waves!",
      timeSincePosted: "2h",
      amountLikes: 132,
      amountComments: 3,
      name: "Dummy",
      following: true,
    },
  ]);

  let [toggleScreen, setToggleScreen] = useState(false);
  let [text, setText] = useState("");
  let [sound, setSound] = useState(null);
  let [soundOwner, setSoundOwner] = useState(null);
  let [audioPlaying, setAudioPlaying] = useState(false);
  const navigation = useNavigation();
  const handle = (text: string) => {
    if (text.length >= 1) {
      setToggleScreen(true);
    } else {
      setToggleScreen(false);
      // this is where it stops the music
    }
    setText(text);
  };

  const stopSound = async (sound: Sound | null) => {
    let filtered = dummy.filter(
      (element: { name: string; following: boolean }) =>
        element.name.toUpperCase().includes(text.toUpperCase())
    );
    let found = filtered.find((element) => element.name === soundOwner);
    if (text.length === 0 || !found) {
      await sound?.stopAsync().then(() => {
        setSound(null);
        setAudioPlaying(false);
        setSoundOwner(null);
        //
      });
    }
  };

  useEffect(() => {
    if (sound) {
      stopSound(sound);
    }
  }, [text]);
  return (
    <>
      <View style={{ backgroundColor: "white" }}>
        <View
          style={{
            flexDirection: "row",
            marginTop: 50,
            alignItems: "center",
            marginHorizontal: 20,
            marginBottom: 20,
          }}
        >
          <AntDesign name="search1" size={25} color="black" />
          <TextInput
            onChangeText={handle}
            value={text}
            placeholder="Search"
            style={{
              marginLeft: 10,
              marginRight: 15,
              height: 35,
              backgroundColor: "#eee",
              width: 300,
              borderRadius: 15,
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              fontSize: 17,
            }}
            placeholderTextColor={"#828282"}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
          />
          <TouchableOpacity
            style={styles.messageButton}
            onPress={() => {
              navigation.navigate("Chats");
            }}
          >
            <Image source={require("../assets/images/Vector.png")}></Image>
          </TouchableOpacity>
        </View>
        {toggleScreen ? (
          <SearchResultsContent
            text={text}
            dummy={dummy}
            setDummy={setDummy}
            sound={sound}
            setSound={setSound}
            setSoundOwner={setSoundOwner}
            setAudioPlaying={setAudioPlaying}
            audioPlaying={audioPlaying}
            Navigation={props.navigation}
          ></SearchResultsContent>
        ) : (
          <CommunityContent navigation={props.navigation}></CommunityContent>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  messageButton: {
    position: "absolute",
    width: 24,
    height: 22,
    top: 10,
    right: 10,
  },
});
