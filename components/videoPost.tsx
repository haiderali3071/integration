import React, { useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { BlurView } from "expo-blur";
import HomePagePopUp from "../components/HomePagePopUp";
import CircleSlider from "react-native-circle-slider";
import AudioCommentPopUp from "../components/AudioCommentPopUp";

export default function VideoPost(props: any) {
  interface ref2 {
    current: any;
  }
  interface ref_audio {
    current: any;
  }
  const refARBSheet: ref_audio = useRef(null);

  // const state = {
  //       like: 'Unlike',
  //       liked : false,
  // }

  // const selectLike = () => {
  //       setState((prevstate: { liked: any; }) => {
  //             return {
  //             ...prevstate,
  //             like: (prevstate.liked ? 'Unlike' : 'like'), liked: !prevstate.liked
  //             }
  //       })
  // };
  const [liked, setLiked] = useState<boolean>(false);
  const selectLike = () => setLiked(!liked);
  const [paused, setPause] = useState<boolean>(true);
  const selectPause = () => {
    if (paused) {
      props.playSound(true);
    } else {
      props.playSound(false);
    }
    setPause(!paused);
  };
  const refRBSheet: ref2 = useRef(null);
  return (
    <View style={props.style}>
      <ImageBackground source={props.backgroundPhoto} style={{ flex: 1 }}>
        <BlurView intensity={100} style={props.blurContainer}>
          <TouchableOpacity style={styles.flag}>
            <Image source={require("../assets/images/Vector2.png")}></Image>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: "55%",
              paddingHorizontal: 20,
            }}
          >
            <View style={styles.timeOnSpot}>
              <Text style={styles.timeText}>{props.currentTime}</Text>
            </View>
            <View
              style={{ flex: 1, position: "relative", marginHorizontal: 20 }}
            >
              <View style={styles.circle}>
                <CircleSlider
                  dialWidth={5}
                  value={180}
                  dialRadius={107}
                  btnRadius={6.5}
                  strokeColor={"grey"}
                  strokeWidth={0.5}
                  meterColor={"black"}
                  textSize={-150000}
                  textColor={"white"}
                />
              </View>
              <TouchableOpacity
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "25%",
                }}
                onPress={selectPause}
              >
                {paused ? (
                  <Image
                    source={require("../assets/images/Play.png")}
                    style={styles.playButton}
                  />
                ) : (
                  <Image
                    source={require("../assets/images/Pause.png")}
                    style={styles.pauseButton}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.timeTotalSpot}>
              <Text style={styles.timeText}>{props.totalTime}</Text>
            </View>
          </View>
          <View
            style={styles.name}
            // navigation={props.navigation}
            onTouchEnd={() => {
              props.navigation.navigate("OthersProfile");
            }}
          >
            <Text style={styles.nameText}>
              {props.usersName}

              <View style={{ width: 10 }}></View>
              <Text style={styles.timeAgoText}>{props.timeSincePosted}</Text>
            </Text>
          </View>
          <View style={styles.caption}>
            <Text style={styles.captionText}>{props.userCaption}</Text>
            <TouchableOpacity
              style={styles.tripleLook}
              onPress={() => {
                refRBSheet.current.open();
              }}
            >
              <Text style={styles.tripleLookText}>...</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity style={styles.numLikes} onPress={selectLike}>
              {liked ? (
                <View>
                  <Image
                    source={require("../assets/images/redheartIcon.png")}
                    style={[styles.heart, { width: 12, height: 12 }]}
                  />
                </View>
              ) : (
                <View>
                  <Image
                    source={require("../assets/images/heartIcon.png")}
                    style={styles.heart}
                  />
                </View>
              )}
              <Text style={styles.reactionText}>
                {liked ? props.amountLikes + 1 : props.amountLikes} likes
              </Text>
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                style={styles.numComments}
                onPress={() => {
                  refARBSheet.current.open();
                }}
              >
                <Image
                  source={require("../assets/images/commentIcon.png")}
                ></Image>
                <Text style={styles.reactionText}>
                  {props.amountComments} comments
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <HomePagePopUp
            refRBSheet={refRBSheet}
            close={() => refRBSheet.current.close()}
          />
          {/* </Draggable> */}
        </BlurView>
      </ImageBackground>
      <AudioCommentPopUp
        refARBSheet={refARBSheet}
        close={() => refARBSheet.current.close()}
      />
    </View>
  );
}
const boxHeight = 415;
const figmaHeight = 375;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    borderRadius: 37,
  },
  flag: {
    alignSelf: "flex-end",
    marginRight: 60,
  },
  timeOnSpot: {
    // position: 'absolute',
    width: 28,
    // height: 17,
    justifyContent: "center",

    // left: (25/375)*boxHeight,
    // top: 130,

    /* small text */
  },
  timeText: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 15,
    textAlign: "center",
    justifyContent: "center",
    /* darkgrey */
    color: "#4F4F4F",
  },
  timeTotalSpot: {
    // position: 'absolute',
    width: 26,
    justifyContent: "center",
    // left: 310,
    // top: 130,
  },
  circle: {
    position: "absolute",
    // width:"50%",
    // height: "30%",
    // left: 70,
    // marginLeft: "17%",
    // marginTop: "5%",
    alignSelf: "center",
    alignItems: "center",
    transform: [{ rotate: "270deg" }],
  },
  highlightedCircle: {
    position: "absolute",
    width: 214,
    height: 107,
    left: 101,
    top: 50,
  },
  dotButton: {
    position: "absolute",
    width: 13,
    height: 14,
    left: 309,
    // top: 155,
    borderRadius: 50,
    backgroundColor: "#4F4F4F",
    transform: [{ rotate: "-90deg" }],
  },
  pauseButton: {
    // position: 'absolute',
    // width: 42,
    // height: 46.36,
    // left: 160,
    // top: 80,
  },
  playButton: {
    // position: 'absolute',
    // width: 42,
    // height: 46.36,
    // left: 160,
    // top: 80,
  },
  name: {
    // width: 420,
    // height: 22,
    // top: 347-83,
    // left: 90,
    alignSelf: "center",
    marginTop: 15
    // alignSelf:"center"
  },
  nameText: {
    fontFamily: "Montserrat",
    fontWeight: "600",
    fontSize: 22,
    color: "#4F4F4F",
    // textAlign: "center"
  },
  caption: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 16.5,
    alignSelf: "center",
    marginVertical: "5%",
    justifyContent: "space-between",
  },
  captionText: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 12,
    lineHeight: 15,
    color: "#4F4F4F",
    marginRight: 30,
    width: 300,
  },
  timeAgo: {
    position: "absolute",
    width: 26,
    height: 22,
    top: 347 - 83,
    left: 110,
  },
  timeAgoText: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 12,
    // lineHeight: 27,
    color: "#4F4F4F",
  },
  heart: {
    // position: 'absolute',
    // width: 14,
    // height: 14,
    // left: 27,
    // left: (25/375)*boxHeight,
    // top: 441-83,
  },
  chatPic: {
    position: "absolute",
    width: 12,
    height: 12,
    // left: 103,
    left: (103 / figmaHeight) * boxHeight,
    top: 441 - 83,
  },
  numLikes: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    width: 60,
    height: 12,
    left: 20,
    // top: 441-83,
    // top : 80
  },
  reactionText: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 10,
    lineHeight: 12,
  },
  numComments: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    width: 80,
    height: 12,
    // left: (121/figmaHeight)*boxHeight,
    left: 90,
    // top: 441-83,
  },
  tripleDot: {
    position: "absolute",
    width: 18,
    height: 45,
    // left: 300
    // left: 415-(25/375)*boxHeight,
    // top: 303,
  },
  tripleLook: {
    // marginLeft: 10,
    // width: "10%",
    // paddingHorizontal: 10,
    // flex:1
    // fontFamily: 'Montserrat',
    // fontStyle: 'normal',
    // fontWeight: '500',
    // fontSize: 25,
    // lineHeight: 30,
    // color: '#4F4F4F',
    // transform: ([{ rotate: '90deg' }]),
  },
  tripleLookText: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 25,
    // lineHeight: 30,
    color: "#4F4F4F",
    transform: [{ rotate: "90deg" }],
  },
  hashtag: {
    color: "#D2AE9A",
    fontWeight: "800",
  },
});
