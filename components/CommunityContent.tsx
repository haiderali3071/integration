import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from "react-native";
import CommunityView from "./CommunityView";

import { Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import MicButton from "./MicButton";

const CommunityContent = (props: any) => {
  // declare/fetch how many posts there are (CommunityView's) along with their image sources
  // CommunityViews have to be looped

  const [dummyPost, setDummyPost] = useState([
    {
      id: 0,
      postAuthor: "Emmy Jenks",
      userCaption:
        "I love all the sounds of nature I wake up to \n #Oceanwaves!",
      timePassed: "2h",
      likes: 30,
      numOfComments: 41,
      likedFromUser: false,
      currentTime: "3:42",
      totalTime: "7:32",
    },
    {
      id: 1,
      postAuthor: "Michael Jordan",
      userCaption: "This is one of the dummy",
      timePassed: "5h",
      likes: 130,
      numOfComments: 10,
      likedFromUser: false,
      currentTime: "3:42",
      totalTime: "7:32",
    },
    {
      id: 2,
      postAuthor: "Lionel Messi",
      userCaption: "Hello everyone. This is my first post!",
      timePassed: "5h",
      likes: 22,
      numOfComments: 57,
      likedFromUser: false,
      currentTime: "3:42",
      totalTime: "7:32",
    },
    {
      id: 3,
      postAuthor: "Floyd Mayweather",
      userCaption: "This is also another dummy data",
      timePassed: "2h",
      likes: 78,
      numOfComments: 3,
      likedFromUser: false,
      currentTime: "3:42",
      totalTime: "7:32",
    },
  ]);

  const [playingAudio, setPlayingAudio] = useState(false);

  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const navigation = useNavigation();
  const hashtagit = (caption: string) => {
    const message = [];
    const words = caption.split(" ");
    for (let i = 0; i < words.length; i++) {
      if (words[i].startsWith("#")) {
        message.push(
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("HashtagPage", {
                hashtagTitle: words[i],
                posts: dummyPost,
              })
            }
          >
            <Text style={styles.hashtag}>{words[i]}</Text>
          </TouchableOpacity>
        );
      } else {
        message.push(" " + words[i]);
      }
    }
    return message;
  };
  const handleLike = (id: number) => {
    let index = dummyPost.findIndex((element) => element.id === id);
    let temp = dummyPost;

    if (temp[index].likedFromUser) {
      temp[index].likes -= 1;
    } else {
      temp[index].likes += 1;
    }
    temp[index].likedFromUser = !temp[index].likedFromUser;
    setDummyPost(temp);
  };

  async function playSound() {
    console.log("Loading Sound");
    try {
      if (!playingAudio) {
        const { sound } = await Audio.Sound.createAsync(
          {
            // Get audioBio from user
            uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          },
          {
            shouldPlay: true, //To play the audio when the component is loadded
            isLooping: false,
          }
        );
        setSound(sound);
        console.log("Playing Sound");
        await sound.playAsync().then(() => {
          setPlayingAudio(true);
        });

        sound.setOnPlaybackStatusUpdate(async (status) => {
          if (status.isLoaded) {
            if (status.didJustFinish === true) {
              setPlayingAudio(false);
            }
          }
        });
      } else {
        sound?.stopAsync().then(() => {
          setPlayingAudio(false);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        decelerationRate={0}
        // snapToInterval={Dimensions.get("window").width - 10}
        // snapToAlignment={"end"}
        style={styles.scrollview}
      >
        {dummyPost.map((element, index) => {
          return (
            <CommunityView
              imageSource={"../assets/images/beach.jpg"}
              key={index}
              id={element.id}
              currentTime={element.currentTime}
              totalTime={element.totalTime}
              likes={element.likes}
              numOfComments={element.numOfComments}
              timePassed={element.timePassed}
              postAuthor={element.postAuthor}
              userCaption={hashtagit(element.userCaption)}
              handleLike={handleLike}
              likedFromUser={element.likedFromUser}
              playSound={playSound}
              navigation={props.navigation}
            ></CommunityView>
          );
        })}
      </ScrollView>

      {/* <TouchableOpacity
        style={{
          position: "relative",
          bottom: 25,
          right: 15,
          borderRadius: 30,
          shadowColor: "#000",
          shadowOffset: { width: 1, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
        }}
      >
        <Image
          source={require("../assets/images/micGuidance.png")}
          style={styles.micimage}
        />
      </TouchableOpacity> */}
      <MicButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop:10
  },
  scrollview: {
    width: "100%",
  },
  micimage: {
    height: 70,
    width: 70,
    borderRadius: 30,
  },
  hashtag: {
    color: "#D2AE9A",
    fontWeight: "800",
  },
});

export default CommunityContent;
