import React from 'react';
import {
  View,
  Animated,
  Image,
  Text,
  Dimensions,
  Platform,
  StyleSheet,
} from 'react-native';
import Appcolors from '../../constants/Appcolors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import OctIcons from 'react-native-vector-icons/Octicons';
import MaterialComtyIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleIconClickevents = (type) => {
    const {onIconClick} = this.props;
    onIconClick && onIconClick(type);
  };
  render() {
    let params = this.props.params?.changingHeight;
    const {changeIcon, data, onScroll} = this.props;
    if (changeIcon) {
      return (
        <Animated.View style={styles.IconsMainContainer}>
          <MaterialIcon
            name="arrow-back"
            color={Appcolors.WHITE}
            size={25}
            onPress={() => this.handleIconClickevents('back_arrow')}
          />
          <Text
            style={{color: Appcolors.WHITE, fontSize: 19}}
            onPress={() => this.handleIconClickevents('selected_Count')}>
            {data?.selected_count}
          </Text>
          <OctIcons
            name="pin"
            color={Appcolors.WHITE}
            size={25}
            onPress={() => this.handleIconClickevents('pin_chat')}
          />
          <MaterialComtyIcons
            name="volume-variant-off"
            color={Appcolors.WHITE}
            size={25}
            onPress={() => this.handleIconClickevents('mute')}
          />
          <MaterialIcon
            name="delete"
            color={Appcolors.WHITE}
            size={25}
            onPress={() => this.handleIconClickevents('delete')}
          />
          <MaterialIcon
            name="drive-file-move"
            color={Appcolors.WHITE}
            size={25}
            onPress={() => this.handleIconClickevents('file')}
          />
          <MaterialIcon
            name="more-vert"
            color={Appcolors.WHITE}
            size={25}
            onPress={() => this.handleIconClickevents('menu')}
          />
        </Animated.View>
      );
    } else
      return (
        <Animated.View style={styles.defaultMaincontainer}>
          <View style={styles.defaultSubcontainer}>
            <View>
              <Image
                source={require('../../../assets/Profile/profile.jpg')}
                style={styles.defaultImagecontainer}
              />
              <View style={styles.defaultactiveStatus} />
            </View>
            <Text
              style={{fontWeight: '400', fontSize: 35}}
              onPress={() => {
                console.warn(this.props);
              }}>
              FLASHAT
            </Text>
            <View style={styles.headerRightContainer}>
              <MaterialIcon
                name="search"
                color={'white'}
                size={25}
                style={{marginRight: 10}}
              />
              <MaterialIcon name="more-vert" color={'white'} size={25} />
            </View>
          </View>
        </Animated.View>
      );
  }
}
const styles = StyleSheet.create({
  IconsMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: Platform.OS == 'ios' ? 13 : 1,
  },
  defaultMaincontainer: {
    backgroundColor: Appcolors.PRIMARY_COLOR,
    flex: 1,
    // transform: [{translateY: onScroll ? onScroll : 20}],
    width: Dimensions.get('screen').width,
  },
  defaultSubcontainer: {
    alignItems: 'center',
    backgroundColor: Appcolors.PRIMARY_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('screen').width,
    paddingTop: 15,
  },
  defaultImagecontainer: {
    height: 45,
    width: 45,
    borderRadius: 30,
    borderColor: 'white',
    borderWidth: 2,
    marginLeft: Platform.OS == 'ios' ? 30 : 0,
  },
  defaultactiveStatus: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: Appcolors.STATUS_COLOR,
    position: 'absolute',
    right: 4,
  },
  headerRightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: Platform.OS == 'android' ? '8%' : '5%',
  },
});
