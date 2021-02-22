import React, {Component} from 'react';
import {View, Animated} from 'react-native';
import ListComponent from '../../SharedScreens/LIstComponent';
import Header from '../../SharedScreens/Header';
class CallScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      longPressed: false,
      headerData: {selected_count: 0},
      ListData: {isCanceled: false},
    };
  }
  scrollY = new Animated.Value(0);
  diffClamp = Animated.diffClamp(this.scrollY, 0, 70);
  translateY = this.diffClamp.interpolate({
    inputRange: [0, 40],
    outputRange: [0, -40],
  });

  handleheaderbuttonEvents = (type) => {
    if (type == 'back_arrow') {
      this.listref.handleunselelection();
      this.setState({longPressed: false});
    } else if (type == 'selected_Count') {
    } else if (type == 'pin_chat') {
    } else if (type == 'mute') {
    } else if (type == 'delete') {
      this.listref.handlemodal();
      this.setState({longPressed: false});
    } else if (type == 'file') {
    } else if (type == 'menu') {
    }
  };
  handleLongPressevent = (data) => {
    const {longPressed, headerData} = this.state;
    const navig = this.props.navigation.dangerouslyGetParent();
    headerData.selected_count = data;
    navig.setOptions({headerShown: true});
    this.setState(
      {longPressed: data == 0 ? false : true, headerData},
      () => {},
    );
  };
  render() {
    const {longPressed, headerData, ListData} = this.state;
    let navig = this.props?.navigation?.dangerouslyGetParent();
    navig?.setOptions({
      headerShown: true,
      headerTitle: () => {
        return (
          <Header
            {...this.props}
            onScroll={this.translateY}
            data={headerData}
            changeIcon={longPressed}
            onIconClick={this.handleheaderbuttonEvents}
          />
        );
      },
    });

    return (
      <View style={{flex: 1}}>
        <ListComponent
          ref={(e) => (this.listref = e)}
          {...this.props}
          data={ListData}
          onLongPress={this.handleLongPressevent}
          onScroll={(event) => {
            this.scrollY.setValue(event.nativeEvent.contentOffset.y);
            // if (event.nativeEvent.contentOffset.y > 80) {
            //   navig.setOptions({headerShown: true});
            // } else {
            //   navig.setOptions({headerShown: false});
            // }
          }}
        />
      </View>
    );
  }
}
export default CallScreen;
