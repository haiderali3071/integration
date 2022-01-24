import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  Text,
  SafeAreaView,
  ScrollView,
} from "react-native";
import DefaultPost from "../components/DefaultPost";
import BackArrow from "../components/BackArrow";
import VideoPost from "../components/videoPost";
import BottomApp from "../components/BottomNavigation";
import HashTagTitle from "../components/HashtagTitle";
import FollowButton from "../components/FollowButton";
import MicButton from "../components/MicButton";
import { RouteStackParamList } from "../navigation/RouteParameterList";
import SmallImage from "../assets/background.png";
import { useNavigation } from "@react-navigation/native";
import VideoPostHashtag from "../components/videoPostHashtag";
import HashtagTitle from "../components/HashtagTitle";
import { Route } from "react-router-native";

export default function HashTagPage({
  props,
  route,
}: RouteStackParamList<"Hashtagpage">) {
  // const visual = async()=>{
  //       let hello ={HomePageVisuals, undefined}
  // };
  let navigation = useNavigation();
  const arrayOfComponents = [];
  const Posts = route.params.posts;
  //   const Posts = [
  //     {
  //       currentTime:"3:42",
  //       totalTime:"7:32",
  //       userName:"Jessica Simmons",
  //       userCaption: "I just learned how to play a new song on the piano! Does anybody recognize it? #Oceanwaves",
  //       timeSincePosted: "2h",
  //       amountLikes: 132,
  //       amountComments: 3,
  //     },
  //     {
  //       currentTime:"3:42",
  //       totalTime:"7:32",
  //       userName:"Jessica Simmons2",
  //       userCaption: "I just learned how to play a new song on the piano! Does anybody recognize it? #Oceanwaves",
  //       timeSincePosted: "2h",
  //       amountLikes: 132,
  //       amountComments: 3,
  //     },
  //     {
  //       currentTime:"3:42",
  //       totalTime:"7:32",
  //       userName:"Jessica Simmons3",
  //       userCaption: "I just learned how to play a new song on the piano! Does anybody recognize it? #Oceanwaves",
  //       timeSincePosted: "2h",
  //       amountLikes: 132,
  //       amountComments: 3,
  //       backgroundPhoto:SmallImage,
  //     },
  //   ]
  const [indexState, setIndexState] = useState(Posts.length);
  const [indexClicked, setIndexClicked] = useState(0);

  console.log(navigation);
  // [indexState,setIndexState]===
  const indexOfClicked = (i) => {
    setIndexClicked(i);
  };
  const newPosts = Posts.filter((e) =>
    e.userCaption.includes(route.params.hashtagTitle)
  );
  {
    newPosts.map((e, index) => {
      arrayOfComponents.push(
        <VideoPostHashtag
          key={index}
          onPress={() => {
            indexOfClicked(index);
            setIndexState(indexState + index);
          }}
          style={
            indexClicked === index
              ? [styles.box, { zIndex: indexState }]
              : [styles.box, { zIndex: Posts.length - index }]
          }
          blurContainer={indexClicked === index ? { flex: 1 } : { flex: 1 }}
          backgroundPhoto={e.backgroundPhoto}
          currentTime={e.currentTime}
          totalTime={e.totalTime}
          usersName={e.userName}
          userCaption={e.userCaption}
          timeSincePosted={e.timeSincePosted}
          amountLikes={e.amountLikes}
          amountComments={e.amountComments}
          navigation={navigation}
        ></VideoPostHashtag>
      );
    });
  }
  return (
    <View style={styles.background}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={{ flexDirection: "row" }}>
          <BackArrow
            ht={22}
            wd={28}
            mT={23}
            mL={30}
            onPress={() => navigation.goBack()}
          />
          <HashTagTitle hashtagTitle={route.params.hashtagTitle} />
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.postCount}>{newPosts.length} Posts</Text>
          <FollowButton
            {...(props as unknown as RouteStackParamList<"Hashtagpage">)}
          />
        </View>
      </View>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {arrayOfComponents}
          {/* <View style={{height: 125}}></View> */}
        </ScrollView>
        <MicButton />
      </SafeAreaView>
      <View style={styles.bottomspace}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    /* Rectangle 178 */
    //left:leftBottom.left,
    // bottom:leftBottom.bottom,
    // position: 'relative',
    // width: 400,
    marginTop: 20,
    paddingTop: 20,
    width: "100%",
    height: 450,
    // height: `50vh`,
    overflow: "hidden",
    backgroundColor: "#EDEDED",
    borderColor: "#000000",
    borderWidth: 0.4,
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 1,
    },

    borderRadius: 37,
    alignSelf: "center",
    // marginBottom: -50,
    // flex: 1,
    // borderRadius: 10,
    // // To round image corners
    // overflow: 'hidden',
    // borderColor: '#999',
    // borderWidth: 0.5,
    // // https://github.com/facebook/react-native/issues/10049#issuecomment-366426897
    // backgroundColor: '#FFF',
    // // Android shadow
    // elevation: 4
  },
  background: {
    flex: 1,
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: "white",
    marginHorizontal: 0,
  },
  messageButton: {
    position: "absolute",
    // left: '88%',
    // right: '5.6%',
    // top: '5.67%',
    // bottom: '91.63%',
    width: 24,
    height: 22,
    left: 330,
    top: 46,

    /* teal */
    // backgroundColor: '#849CB0',
    // borderColor: '#000000',
    // border: 'border-box',
  },
  guideButton: {
    position: "absolute",
    width: 50,
    height: 50,
    left: 310,
    top: 663,
    //backgroundColor: '#FFFFFF',
    shadowColor: "#000000",
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  bottomspace: {
    position: "absolute",
    width: "100%",
    height: 79,
    left: 0,
    bottom: 0,
    //top: 750,
    borderRadius: 100,
  },
  postCount: {
    fontFamily: "Montserrat",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: 14,
    lineHeight: 17,
    color: "#4F4F4F",
    marginBottom: 15,
    marginTop: 5,
    marginRight: 5,
    marginLeft: -70,
    position: "relative",
  },
});
