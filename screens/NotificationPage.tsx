import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Notification from '../components/Notification';

export default function NotificationPage() {
  return (
    <View>
      <SafeAreaView style={styles.background}>
        <Text style={styles.postText}>Notifications</Text>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 160 }}
          showsVerticalScrollIndicator={false}
        >
          <Notification
            title={'Jordan Gonzalez is now following you'}
            time={'13 minutes ago'}
          ></Notification>

          <Notification
            title={'Jordan Gonzalez is now following you'}
            time={'15 minutes ago'}
          ></Notification>

          <Notification
            title={'Jordan Gonzalez is now following you'}
            time={'17 minutes ago'}
          ></Notification>

          <Notification
            title={'Jordan Gonzalez is now following you'}
            time={'20 minutes ago'}
          ></Notification>

          <Notification
            title={'Jordan Gonzalez is now following you'}
            time={'27 minutes ago'}
          ></Notification>
          <Notification
            title={'Jordan Gonzalez is now following you'}
            time={'27 minutes ago'}
          ></Notification>
          <Notification
            title={'Jordan Gonzalez is now following you'}
            time={'27 minutes ago'}
          ></Notification>
          <Notification
            title={'Jordan Gonzalez is now following you'}
            time={'27 minutes ago'}
          ></Notification>
          <Notification
            title={'Jordan Gonzalez is now following you'}
            time={'27 minutes ago'}
          ></Notification>
          <Notification
            title={'Jordan Gonzalez is now following you'}
            time={'27 minutes ago'}
          ></Notification>
          <Notification
            title={'Jordan Gonzalez is now following you'}
            time={'27 minutes ago'}
          ></Notification>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;

const styles = StyleSheet.create({
  background: {
  },
  postText: {
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    fontFamily: 'Montserrat-Bold',
    fontSize: 25,
    color: '#4F4F4F',
    marginTop:40
  },
});
