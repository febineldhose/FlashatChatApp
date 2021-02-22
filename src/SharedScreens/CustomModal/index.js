import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Appcolors from '../../constants/Appcolors';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
const {width, height} = Dimensions.get('screen');
export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {isVisible: false};
  }
  handlemodal = () => {
    const {isVisible} = this.state;
    this.setState({isVisible: !isVisible});
  };
  render() {
    const {isVisible} = this.state;
    const {onPress} = this.props;
    return (
      <View style={{flex: 1}}>
        <Modal isVisible={isVisible}>
          <View style={styles.modalContainer}>
            <CustomButton
              label={'Delete'}
              iconname="delete"
              onIconPress={() => {
                onPress && onPress('delete');
              }}
            />
            <View style={styles.seperatorview} />
            <CustomButton
              label={'Cancel'}
              iconname="close"
              onIconPress={() => {
                onPress && onPress('close');
              }}
            />
          </View>
        </Modal>
      </View>
    );
  }
}
const CustomButton = (props) => {
  const {label, iconname, onIconPress} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onIconPress && onIconPress()}>
      <View style={{flexDirection: 'row', padding: 15, paddingHorizontal: 20}}>
        <MaterialIcon
          name={iconname}
          color={Appcolors.PRIMARY_COLOR}
          size={30}
        />
        <Text style={{fontSize: 20, opacity: 0.4, marginLeft: 10}}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    height: '20%',
    width: width,
    backgroundColor: Appcolors.WHITE,
    alignSelf: 'center',
    bottom: -20,
    position: 'absolute',
    borderTopEndRadius: 20,
    borderTopLeftRadius: 20,
  },
  seperatorview: {
    height: 1,
    backgroundColor: Appcolors.BLACK,
    opacity: 0.1,
  },
});
