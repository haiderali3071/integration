import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { HeaderStyleInterpolators } from '@react-navigation/stack';
//import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  NavigationContainer,
  createNavigatorFactory,
  useNavigation,
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import VideoPost from '../components/videoPost';
import DefaultPost from '../components/DefaultPost';
import BottomApp from '../components/BottomNavigation';
import HomeTitle from '../components/HomeTitle';
import PostsHeader from '../components/PostsHeader';
import { RouteStackParamList } from '../navigation/RouteParameterList';
import { BackgroundImage } from 'react-native-elements/dist/config';
import SmallImage from '../assets/background.png';
import MicButton from '../components/MicButton';

import { Audio } from 'expo-av';

export default function OtherUserPosts(props: RouteStackParamList<'HomePage'>) {
  // const visual = async()=>{
  //       let hello ={HomePageVisuals, undefined}
  // };
  const navigation = useNavigation();
  const arrayOfComponents: any = [];
  const Posts = [
    {
      id: 4,
      currentTime: '3:42',
      totalTime: '7:32',
      userName: 'Jessica Simmons',
      userCaption:
        'I just learned how to play a new song on the piano! Does anybody recognize it? ',
      timeSincePosted: '2h',
      amountLikes: 132,
      amountComments: 3,
      playing: false,
    },
    {
      id: 5,
      currentTime: '3:42',
      totalTime: '7:32',
      userName: 'Jessica Simmons2',
      userCaption:
        'I just learned how to play a new song on the piano! Does anybody recognize it?',
      timeSincePosted: '2h',
      amountLikes: 132,
      amountComments: 3,
      playing: false,
    },
    {
      id: 6,
      currentTime: '3:42',
      totalTime: '7:32',
      userName: 'Jessica Simmons3',
      userCaption:
        'I just learned how to play a new song on the piano! Does anybody recognize it? #Ocean Waves',
      timeSincePosted: '2h',
      amountLikes: 132,
      amountComments: 3,
      backgroundPhoto: SmallImage,
      playing: false,
    },
    {
      id: 7,
      currentTime: '3:42',
      totalTime: '7:32',
      userName: 'Jessica Simmons4',
      userCaption:
        'I just learned how to play a new song on the piano! Does anybody recognize it? #Ocean Waves!',
      timeSincePosted: '2h',
      amountLikes: 132,
      amountComments: 3,
      backgroundPhoto: SmallImage,
      playing: false,
    },
  ];
  const [indexState, setIndexState] = useState(Posts.length);
  const [indexClicked, setIndexClicked] = useState(0);
  const [playingAudio, setPlayingAudio] = useState(false);

  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const [Pause, setPause] = useState<Audio.Sound | Boolean>(false);

  const [isPressed, setIsPressed] = useState({
    val: true,
  });
  // [indexState,setIndexState]===
  const indexOfClicked = (i) => {
    setIndexClicked(i);
  };
  async function playSound() {
    console.log('Loading Sound');
    try {
      if (!playingAudio) {
        const { sound } = await Audio.Sound.createAsync(
          {
            // Get audioBio from user
            uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          },
          {
            shouldPlay: true, //To play the audio when the component is loadded
            isLooping: false,
          }
        );
        setSound(sound);
        console.log('Playing Sound');
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
        sound?.pauseAsync().then(() => {
          setPlayingAudio(false);
          setPause(true);
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  const hashtagit = (caption: string) => {
    const message = [];
    const words = caption.split(' ');
    for (let i = 0; i < words.length; i++) {
      if (words[i].startsWith('#')) {
        message.push(
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('HashtagPage', {
                hashtagTitle: words[i],
                posts: Posts,
              })
            }
          >
            <Text style={styles.hashtag}>{words[i]}</Text>
          </TouchableOpacity>
        );
      } else {
        message.push(' ' + words[i]);
      }
    }
    return message;
  };
  {
    Posts.map((e, index) => {
      arrayOfComponents.push(
        <VideoPost
          key={index}
          id={e.id}
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
          userCaption={hashtagit(e.userCaption)}
          timeSincePosted={e.timeSincePosted}
          amountLikes={e.amountLikes}
          amountComments={e.amountComments}
          playing={e.playing}
          playSound={playSound}
          navigation={props.navigation}
        ></VideoPost>
      );
    });
  }
  return (
    <View style={styles.background}>
      <PostsHeader
        {...(props as unknown as RouteStackParamList<'HomePage'>)}
        title="Posts"
      />

      <SafeAreaView style={styles.container}>
        <ScrollView>{arrayOfComponents}</ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginTop: 20,
    width: '100%',
    height: 400,
    overflow: 'hidden',
    backgroundColor: '#EDEDED',
    borderColor: '#000000',
    borderWidth: 0.4,
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    borderRadius: 37,
    alignSelf: 'center',
  },
  background: {
    flex: 1,
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 0,
  },
  messageButton: {
    position: 'absolute',

    width: 24,
    height: 22,
    left: 330,
    top: 46,
  },
  guideButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    left: 310,
    top: 663,
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  bottomspace: {
    position: 'absolute',
    width: '100%',
    height: 79,
    left: 0,
    bottom: 0,
    borderRadius: 100,
  },
  hashtag: {
    color: '#D2AE9A',
    fontWeight: '800',
  },
});
