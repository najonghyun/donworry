import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

interface FriendCubesProps {
  myName: string;
}

const FriendCubes: React.FC<FriendCubesProps> = (props) => {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.smallBox}>
          <FontAwesome name="cube" size={100} style={styles.myCube} />
          <Text>나</Text>
          <Text>{props.myName}</Text>
        </View>
        <View style={styles.smallBox}>
          <FontAwesome name="cube" size={100} style={styles.goldCube} />
          <Text>소비왕</Text>
          <Text>각 소비별 절약 1등</Text>
        </View>
      </View>
      <View style={styles.line} />
    </View>
  );
};

const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  goldCube: {
    color: '#FFD700',
  },
  myCube: {
    color: '#7777F3',
  },
  smallBox: {
    alignItems: 'center',
    width: (screenWidth - 80) / 2,
    paddingLeft: 5,
    paddingRight: 5,
  },
  line: {
    width: screenWidth - 80,
    height: 0,
    borderBottomWidth: 1, // 또는 borderWidth를 사용하여 두께를 조정할 수 있습니다.
    borderBottomColor: 'gray', // 원하는 색상으로 변경할 수 있습니다.
    marginVertical: 10, // 수평선 위아래의 간격 조정 (선택 사항)
  },
});

export default FriendCubes;