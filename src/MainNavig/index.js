import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Appcolors from '../constants/Appcolors';
import PersonalScreen from '../Screens/PersonalScreen';
import CallScreen from '../Screens/CallScreen';
import HuddlesScreen from '../Screens/HuddlesScreen';
import BuisnessScreen from '../Screens/BuisnessScreen';
import Header from '../SharedScreens/Header';
function StackNavig() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MaterialTopTab"
        component={MaterialTopTab}
        options={({route, navigation, screenProps}) => ({
          headerTitle: () => (
            <Header {...navigation} {...screenProps} {...route} />
          ),
          headerStyle: Styles.stackheaderStyle,
        })}
      />
    </Stack.Navigator>
  );
}

function MaterialTopTab(route) {
  const TopTab = createMaterialTopTabNavigator();
  return (
    <>
      <TopTab.Navigator
        swipeEnabled={true}
        animationEnabled={true}
        screenOptions={({route, navigation}) => ({
          tabBarLabel: ({focused}) => {
            return (
              <>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      bottom: focused ? 7 : 0,
                    }}>
                    <Text style={{color: 'white', fontWeight: '600'}}>
                      {route.name}
                    </Text>
                    <View style={Styles.TabviewContainer}>
                      <Text
                        style={{color: Appcolors.PRIMARY_COLOR, fontSize: 10}}>
                        {route.name && route.params
                          ? route.name == 'Personal'
                            ? route.params?.personal_chat_count
                            : route.name == 'Buisness'
                            ? route.params?.buisness_chat_count
                            : route.name == 'Huddles'
                            ? route.params?.huddles_chat_count
                            : route.name == 'Calls'
                            ? route.params?.calls_chat_count
                            : undefined
                          : undefined}
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            );
          },
        })}
        tabBarOptions={{
          // activeTintColor: 'white',
          // inactiveTintColor: 'white',

          labelStyle: {fontSize: 12, color: 'white'},

          style: Styles.TabheaderStyle,
          indicatorStyle: {backgroundColor: 'white'},
        }}>
        <TopTab.Screen
          name="Personal"
          component={PersonalScreen}
          options={{
            tabBarStyle: {marginLeft: 10},
          }}
          initialParams={{personal_chat_count: 18}}
        />
        <TopTab.Screen
          name="Buisness"
          component={BuisnessScreen}
          initialParams={{buisness_chat_count: 10}}
        />
        <TopTab.Screen
          name="Huddles"
          component={HuddlesScreen}
          initialParams={{huddles_chat_count: 5}}
        />
        <TopTab.Screen
          name="Calls"
          component={CallScreen}
          initialParams={{calls_chat_count: 10}}
        />
      </TopTab.Navigator>
    </>
  );
}
function MainNavig() {
  return (
    <NavigationContainer>
      <StackNavig />
    </NavigationContainer>
  );
}
export {MainNavig};

const Styles = StyleSheet.create({
  TabheaderStyle: {
    backgroundColor: Appcolors.PRIMARY_COLOR,
    height: 60,
    justifyContent: 'flex-end',
  },
  stackheaderStyle: {
    elevation: 0, // remove shadow on Android
    shadowOpacity: 0,
    backgroundColor: Appcolors.PRIMARY_COLOR,
  },
  TabviewContainer: {
    height: 18,
    width: 18,
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
