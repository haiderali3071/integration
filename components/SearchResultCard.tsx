import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import { Audio } from "expo-av";

export default function SearchResultCard(props: any) {
  let [playingBio, setPlayingBio] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  let [following, setFollowing] = useState(props.following);
  let [playing, setPlaying] = useState(true);

  async function playSound() {
    try {
      if (!playing) {
        console.log("Loading Sound");
        const { sound } = await Audio.Sound.createAsync({
          // Get audioBio from user
          uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        });

        console.log("Playing Sound");
        await sound.playAsync().then(() => {
          setPlayingBio(true);
          props.setAudioPlaying(true);
          props.setSound(sound);
          setSound(sound);
          props.setSoundOwner(props.title); // this should be some id instead
        });

        sound.setOnPlaybackStatusUpdate(async (status) => {
          if (status.isLoaded) {
            if (status.didJustFinish === true) {
              setPlayingBio(false);
              props.setAudioPlaying(false);
              props.setSound(null);
            }
          }
        });
      } else {
        sound?.pauseAsync().then(() => {
          console.log(props.sound);
          console.log(props.audioPlaying);
          console.log("Other Audio is playing, wait until it's done!");
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleFollow = () => {
    props.follow(props.title);
    setFollowing(true);
  };

  console.log("navigation", props.navigation);
  return (
    <View
      style={[styles.card, shadowStyle]}
      onTouchEnd={() => {
        props.Navigation.navigate("OthersProfile");
      }}
    >
      <Image
        style={styles.profilePic}
        source={require("../assets/images/profile.png")}
      />
      <Text style={styles.followText}>{props.title}</Text>
      {following ? (
        <></>
      ) : (
        <TouchableOpacity style={styles.followicon} onPress={handleFollow}>
          <Icon name="person-add" />
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.audioicon} onPress={playSound}>
        <Icon name="campaign" color={playingBio ? "#0000FF" : "#000"} />
      </TouchableOpacity>
    </View>
  );
}

const shadowStyle = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 3 },
  shadowOpacity: 0.5,
  shadowRadius: 3,
  elevation: 2,
};

const styles = StyleSheet.create({
  card: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 2,
    flexDirection: "row",
    width: "99%",
    height: 70,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: "#FFF",
  },
  profilePic: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    height: "100%",
    width: "100%",
  },
  followText: {
    flex: 4,
    textAlign: "left",
    paddingTop: 25,
    paddingLeft: 10,
    marginLeft: 1,
  },

  audioicon: {
    alignSelf: "center",
    opacity: 0.7,
    margin: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#c3c3c3",
    padding: 4,
  },

  followicon: {
    alignSelf: "center",
    opacity: 0.7,
    margin: 10,

    padding: 4,
  },
});
