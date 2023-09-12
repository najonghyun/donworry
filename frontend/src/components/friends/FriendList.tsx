import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';

import FriendSearch from './children/FriendSearch';
import FriendListItem from './children/FriendListItem';

const dummyData = [
  {
    id: 1,
    name: 'test',
    email: 'test@naver.com',
  },
  {
    id: 2,
    name: 'test',
    email: 'test@naver.com',
  },
  {
    id: 3,
    name: 'test',
    email: 'test@naver.com',
  },
  {
    id: 4,
    name: 'test',
    email: 'test@naver.com',
  },
  {
    id: 5,
    name: 'test',
    email: 'test@naver.com',
  },
];

type Friend = {
  friendId: number;
  friendName: string;
  friendEmail: string;
};

const screenWidth = Dimensions.get('screen').width;

const FriendList: React.FC = () => {
  const [friends, setFriends] = useState<Friend[]>([]);

  // 친구 숫자에 따라 다르게 나타나게 구현해야 한다.
  // 친구 숫자가 일정 수를 넘으면 height를 넘은 숫자 만큼 + 40해준다.
  function search(name: string) {
    console.log(name)
  }
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      alwaysBounceHorizontal={true}
    >
      <Text style={styles.header}>친구 목록</Text>
      <FriendSearch search={search} />

      {dummyData.map((dummy) => {
        return (
          <View key={dummy.id}>
            <FriendListItem friend={dummy} />
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 470,
    padding: 20,
    width: screenWidth - 40,
    borderRadius: 15,
    backgroundColor: 'white',
    marginBottom: 100,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default FriendList;