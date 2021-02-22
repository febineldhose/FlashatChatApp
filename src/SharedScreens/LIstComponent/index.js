import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import axios from 'axios';
import Appcolors from '../../constants/Appcolors';
import {FlatList} from 'react-native-gesture-handler';
import CustomModal from '../../SharedScreens/CustomModal';
const ItemSeperator = () => {
  return <View style={styles.itemSeperator} />;
};
export default class ListComponent extends Component {
  constructor(props) {
    super(props);
    this.changeValue = 0;
    this.state = {list_data: [], selected_Items: []};
  }
  componentDidMount = async () => {
    this.handleDataList();
    this.scrollY = new Animated.Value(0);
    this.changeValue = this.scrollY;
    this.changingHeight = this.scrollY.interpolate({
      inputRange: [0, 30],
      outputRange: [0, -45],
      extrapolate: 'clamp',
    });
    const navig = this.props?.navigation?.dangerouslyGetParent();
    navig?.setParams({changingHeight: this.changingHeight});
  };
  handleScroll = (event) => {
    console.warn(event);
  };
  handleDataList = () => {
    axios
      .get(`https://elephant-api.herokuapp.com/elephants`)
      .then((res) => {
        this.setState({list_data: res.data.slice(0, 40)});
      })
      .catch((error) => {
        console.warn(error);
      });
  };
  handleLongPress = (item, index) => {
    const {onScroll, onLongPress} = this.props;
    const {selected_Items, list_data} = this.state;
    list_data[index].isSelected = true;
    item.isSelected = true;
    if (item.isSelected) {
      selected_Items.push(item);
    }
    this.setState({selected_Items, list_data}, () => {
      onLongPress && onLongPress(selected_Items.length);
    });
  };
  handleShotPress = (item, index) => {
    const {onLongPress} = this.props;
    const {list_data, selected_Items} = this.state;
    if (selected_Items.length > 0) {
      if (list_data[index].isSelected) {
        list_data[index].isSelected = false;
        let filterdUnseleted = selected_Items.filter(
          (fltritem) => fltritem.name !== item.name,
        );
        this.setState({list_data, selected_Items: filterdUnseleted}, () => {
          onLongPress && onLongPress(selected_Items.length - 1);
        });
      } else {
        item.isSelected = true;
        selected_Items.push(item);
        this.setState({selected_Items, list_data}, () => {
          onLongPress && onLongPress(selected_Items.length);
        });
      }
    }
  };
  handleunselelection = () => {
    const {list_data} = this.state;
    list_data.map((item) => (item.isSelected = false));
    this.setState({list_data, selected_Items: []});
  };
  handlemodal = (type) => {
    this.modalref.handlemodal();
    if (type == 'delete') {
      this.handleunselelection();
    } else if (type == 'close') {
      this.handleunselelection();
    }
  };
  render() {
    const {list_data} = this.state;
    const {onScroll} = this.props;
    return (
      <View style={{flex: 1}}>
        <FlatList
          onScroll={onScroll}
          scrollEventThrottle={16}
          nestedScrollEnabled={true}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={ItemSeperator}
          data={list_data}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                activeOpacity={1}
                onLongPress={() => this.handleLongPress(item, index)}
                onPress={() => {
                  this.handleShotPress(item, index);
                }}>
                <View
                  style={[
                    styles.MainListView,
                    item.isSelected && {
                      backgroundColor: Appcolors.PRIMARY_COLOR,
                      opacity: 0.3,
                    },
                  ]}>
                  <Image
                    resizeMethod="resize"
                    source={{uri: item?.image}}
                    style={styles.imageView}
                  />
                  <View style={styles.centerContainerView}>
                    <Text style={{fontWeight: 'bold'}}>{item?.name}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.TextView}>Live {item?.dob} </Text>
                      <Text>| Total {item?.index}</Text>
                    </View>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.TextView}>10:30</Text>
                    <View style={styles.chat_count_view}>
                      <Text style={{color: Appcolors.WHITE}}>2</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <CustomModal
          ref={(e) => (this.modalref = e)}
          onPress={this.handlemodal}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  MainListView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  imageView: {height: 50, width: 50, borderRadius: 25},
  centerContainerView: {flex: 1, marginLeft: 10, justifyContent: 'center'},
  TextView: {color: Appcolors.PRIMARY_COLOR},
  chat_count_view: {
    height: 20,
    width: 20,
    borderRadius: 10,
    backgroundColor: Appcolors.PRIMARY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemSeperator: {
    height: 1,
    backgroundColor: Appcolors.PRIMARY_COLOR,
    opacity: 0.2,
  },
});
