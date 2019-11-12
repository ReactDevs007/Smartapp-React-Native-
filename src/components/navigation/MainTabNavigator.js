import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../TabBarIcon';
import ManualScreen from '../screens/Manual/ManualScreen';
import ScheduleScreen from '../screens/Schedule/ScheduleScreen';
import SensorScreen from '../screens/Sensor/SensorScreen';
import TemperatureScreen from '../screens/Temperature/TemperatureScreen';

const ManualStack = createStackNavigator({
  Manual: ManualScreen,
});

ManualStack.navigationOptions = {
  tabBarLabel: 'Mode',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="ios-swap"
    />
  ),
};

const ScheduleStack = createStackNavigator({
  Schedule: ScheduleScreen,
});

ScheduleStack.navigationOptions = {
  tabBarLabel: 'Schedule',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="ios-calendar"
    />
  ),
};

const SensorStack = createStackNavigator({
  Schedule: SensorScreen,
});

SensorStack.navigationOptions = {
  tabBarLabel: 'Light',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="ios-sunny"
    />
  ),
};

const Temperature = createStackNavigator({
  Temperature: TemperatureScreen,
});

Temperature.navigationOptions = {
  tabBarLabel: 'Temperature',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name="ios-podium"
    />
  ),
};

export default createBottomTabNavigator({
  ScheduleStack,
  SensorStack,
  Temperature,
  ManualStack,
});
