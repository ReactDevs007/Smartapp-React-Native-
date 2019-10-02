import React from 'react';
import { observer } from 'mobx-react';
import { Text, Dimensions, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components';
import { Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

import { Header, ViewWrapper } from '../../layout';
import config from '../../../config/config';
import { inject } from 'mobx-react/native';
import { Dropdown } from 'react-native-material-dropdown';

const { theme } = config;

const sliderWidth = Dimensions.get('window').width;


const SensorSlider = styled.Slider`
  transform: rotate(-90deg);
  width: 100%;
  height: ${sliderWidth};
`;

const SensorSliderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const SensorValueText = styled.Text`
  color: ${theme.font.normal};
  font-size: 20px;
`;

const LightIcon = ({ type }) => (
  <View style={{ marginTop: 10, marginBottom: 10 }}>
    <Ionicons
      name="ios-sunny"
      color={theme.font.transparent}
      size={type === 'big' ? 34 : 18}
    />
  </View>
);

@inject('blindsStore')
export default class SensorScreen extends React.Component {
  sliderChange$ = new Subject();

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    const sensorPreference = props.blindsStore.sensorPreference;

    let data1 = '', data2 = '';
    data1 = props.blindsStore.blindsState;
    data2 = props.blindsStore.lightReading;
    this.state = {
      sensorPreference,
      presentSensorPreferenceValue: sensorPreference,
      value1: data1,
      value2: data2
    }

  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', async (route) => {
      console.log('Sensor screen focused, fetching sensor preference');
      await this.props.blindsStore.fetchBlindsInfo();
      this.syncSensorPreference();

    });


  }

  syncSensorPreference = () => {
    value1 = this.props.blindsStore.blindsState;
    value2 = this.props.blindsStore.lightReading;
    this.setState({
      value1: value1,
      value2: value2,
    });
  }
  onData1Change(value){
    this.props.blindsStore.setBlindsState(value);
    this.setState({value1: value})
  }
  onData2Change(value){
    this.props.blindsStore.setBlindsLightReading(value);
    this.setState({value2: value})
  }

  renderSlider = () => {
    const { sensorPreference } = this.state;

    if (sensorPreference === null) {
      //return null;
    }
    let data1 = [{
      value: 'None',
    }, {
      value: 'Raise',
    }, {
      value: 'Lower',
    }];
    let data2 = [{
      value: 'None',
      },{
      value: 'Sunrise',
    }, {
      value: 'Sunset',
    }];
    return (
      <View style={{marginHorizontal: 4,
        marginVertical: 8,
        paddingHorizontal: 8}}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Dropdown
                data={data1}
                value={this.state.value1}
                onChangeText={(value, index, data)=>{this.onData1Change(value);}}
              />
            </View>

            <View style={{ width: sliderWidth / 2 - 8, marginLeft: 8 }}>
              <Dropdown
                data={data2}
                value={this.state.value2}
                onChangeText={(value, index, data)=>{this.onData2Change(value);}}
              />
            </View>
          </View>
      </View>
    );
  };

  render() {
    let data = [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }];

    return (
        <ViewWrapper>
          <Header />
          {this.renderSlider()}
       </ViewWrapper>
    );
  }
}
