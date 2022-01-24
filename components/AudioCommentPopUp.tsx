import React, { useState, useEffect } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import avatar from "../assets/images/avatarDuet.jpg";
import { Audio } from "expo-av";
import WaveChatAudio from "../components/WaveChatAudio";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import RBSheet from "react-native-raw-bottom-sheet";

export default function AudioCommentPopUp({ refARBSheet, close }: any) {
  const [fakePeople, setFakePeople] = useState([
    {
      picture: avatar,
      name: "Jerry Sarkashian",
      lastMsg: "2 min",
      uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    },
    {
      picture: avatar,
      name: "Evan Matthews",
      lastMsg: "5 min",
      uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    },
    {
      picture: avatar,
      name: "Hanna Jo",
      lastMsg: "31 min",
      uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
    },
  ]);
  const [onRecord, setOnRecord] = useState(false);
  const [audioRecorded, setAudioRecorded] = useState(false);
  const [count, setCount] = useState(0);
  const [recording, setRecording] = useState<Audio.Recording | undefined>(
    undefined
  );
  const [playing, setPlaying] = useState<Audio.Sound | undefined>(undefined);
  async function startRecording() {
    setOnRecord(true);
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log("Starting recording..");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      await recording.startAsync();
      setRecording(recording);
    } catch (err) {
      console.log("Recording failed to start");
      console.log(err);
    }
  }
  async function stopRecording() {
    setOnRecord(false);
    setAudioRecorded(true);
    console.log("Stopping recording..");
    if (recording) {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log("Recording stopped and stored at", uri);
      setCount(0);
    }
  }
  const cancelRecord = () => {
    setAudioRecorded(false);
  };
  useEffect(() => {
    const timer = setInterval(() => {
      let paused = false;
      setOnRecord((p) => {
        paused = p;
        return p;
      });
      setCount((seconds) => {
        if (paused) {
          return seconds + 1;
        }
        return seconds;
      });
    }, 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);
  console.log(playing, "playing");
  async function playSound(uri: string) {
    console.log("Loading Sound");
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: uri });
      if (playing === undefined) {
        console.log("audio playing!");
        setPlaying(sound);
        await sound!.playAsync();
      } else {
        console.log("Current Audio stopped, playing new one!");
        playing.stopAsync();
        setPlaying(undefined);
        // await sound!.playAsync();
      }
    } catch (error) {
      console.error(error);
    }
  }
  const sent = () => {
    if (recording) {
      let total = Math.round(recording._finalDurationMillis / 1000);
      let min = Math.round(total / 60);
      let obj = {
        lastMsg: min + " min",
        name: "Demo User",
        picture: avatar,
        uri: recording.getURI() as string,
      };
      setFakePeople((prev) => [...prev, obj]);
      setAudioRecorded(false);
    }
  };
  return (
    <RBSheet
      ref={refARBSheet}
      height={500}
      closeOnDragDown={false}
      closeOnPressMask={true}
      customStyles={{
        container: { backgroundColor: "transparent" },
        wrapper: { backgroundColor: "transparent", height: 700 },
      }}
    >
      <View style={[StyleSheet.absoluteFill, styles.theme]}>
        <ScrollView style={styles.container}>
          {fakePeople.map((people, index) => {
            return (
              <View
                style={{
                  height: 150,
                  width: width,
                  marginTop: index === 0 ? 25 : 10,
                }}
                key={people.name + index}
              >
                <View style={styles.text}>
                  <View style={{ marginLeft: 20 }}>
                    <Image
                      style={{ borderRadius: 100, width: 30, height: 30 }}
                      source={people.picture}
                      width={30}
                      height={30}
                    />
                  </View>
                  <View style={styles.text}>
                    <Text
                      style={{
                        fontFamily: "Montserrat-Bold",
                        fontSize: 17,
                        color: "#4F4F4F",
                      }}
                    >
                      {people.name}
                    </Text>
                    <Text
                      style={{ color: "#aaa", fontSize: 14, marginRight: 20 }}
                    >
                      {people.lastMsg}
                    </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity onPress={() => playSound(people.uri)}>
                    <WaveChatAudio
                      style={{ marginTop: 10, marginLeft: "20%" }}
                      height={25}
                      stroke="#849CB0"
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    borderBottomColor: "#D8D8D8",
                    borderBottomWidth: 1,
                    marginLeft: 30,
                    marginRight: 25,
                    marginTop: "10%",
                  }}
                />
              </View>
            );
          })}
        </ScrollView>
        {!audioRecorded && (
          <View style={styles.input}>
            <TouchableOpacity
              onPressIn={startRecording}
              onPressOut={stopRecording}
            >
              {onRecord ? (
                <>
                  <MaterialIcons
                    name="mic-none"
                    size={24}
                    style={styles.micIcon}
                  />
                  <Text style={{ marginLeft: 30, marginTop: -20 }}>
                    Recording... {count}
                  </Text>
                </>
              ) : (
                <>
                  <MaterialIcons
                    name="mic-none"
                    size={24}
                    style={styles.micIcon}
                  />
                  <Text style={{ marginLeft: 30, marginTop: -20 }}>
                    Press and Hold to Record
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}

        {audioRecorded && (
          <View style={styles.input}>
            <MaterialIcons
              name="close"
              color="#aaa"
              size={24}
              style={styles.stopSendIcon}
              onPress={cancelRecord}
            />
            <WaveChatAudio
              style={{ marginTop: 10, marginLeft: "12%" }}
              height={25}
              width={150}
              stroke={"#aaa"}
            />
            <MaterialCommunityIcons
              name="send"
              size={24}
              style={styles.sendIcon}
              onPress={sent}
            />
          </View>
        )}
      </View>
    </RBSheet>
  );
}
const width = Dimensions.get("screen").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: "15%",
  },
  text: {
    width: width - 100,
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input: {
    marginLeft: 20,
    marginRight: 20,
    paddingHorizontal: 15,
    height: 45,
    backgroundColor: "#eee",
    width: width - 40,
    borderRadius: 40,
    fontSize: 17,
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 10,
    alignItems: "stretch",
  },
  theme: {
    height: "100%",
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },
  sendIcon: {
    marginLeft: 60,
    marginTop: 5,
    marginRight: 50,
    transform: [{ rotate: "-50deg" }],
    alignItems: "center",
    justifyContent: "flex-end",
    color: "#4F4F4F",
  },
  stopSendIcon: {
    marginRight: 8,
    marginTop: 10,
    marginLeft: 2,
  },
  micIcon: {
    marginRight: 8,
    marginTop: 10,
    marginLeft: 2,
    color: "#4F4F4F",
  },
});
