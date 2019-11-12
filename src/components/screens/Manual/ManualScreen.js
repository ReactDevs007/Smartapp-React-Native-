
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
export default class ManualScreen extends React.Component {
  sliderChange$ = new Subject();

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    const sensorPreference = props.blindsStore.sensorPreference;

    let data1 = '', data2 = '';
    //data1 = props.blindsStore.espMode;
    //data2 = props.blindsStore.upDown;
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
      await this.props.blindsStore.fetchEspMode();
      this.syncSensorPreference();

    });


  }

  syncSensorPreference = () => {
    value1 = this.props.blindsStore.espMode;
    value2 = this.props.blindsStore.upDown;
    this.setState({
      value1: value1,
      value2: value2,
    });
  }
  onData1Change(value){
    //this.props.blindsStore.setBlindsState(value);
    this.props.blindsStore.setEspMode(value);
    this.setState({value1: value});
  }
  onData2Change(value){
    //this.props.blindsStore.setBlindsLightReading(value);
    //this.setState({value2: value})
  }

  renderSlider = () => {
    const { sensorPreference } = this.state;

    if (sensorPreference === null) {
      //return null;
    }
    let data1 = [{
      value: 'schedule',
    }, {
      value: 'light',
    }, {
      value: 'temperature',
    }];
    // let data2 = [{
    //   value: 'UP',
    //   },{
    //   value: 'DOWN',
    // }];
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
            {/* <View style={{ width: sliderWidth / 2 - 8, marginLeft: 8 }}>
              <Dropdown
                data={data2}
                value={this.state.value2}
                onChangeText={(value, index, data)=>{this.onData2Change(value);}}
              />
            </View> */}
          </View>
      </View>
    );
  };

  render() {
    return (
      <ViewWrapper>
        <Header />
        {this.renderSlider()}
      </ViewWrapper>
    );
  }
}


// import React from 'react';
// import { observer } from 'mobx-react';
// import { StyleSheet, Text, Switch, View } from 'react-native';
// import styled from 'styled-components';

// import config from '../../../config/config';
// import { ViewWrapper, Header } from '../../layout';
// import { inject } from 'mobx-react/native';
// import { Ionicons } from '@expo/vector-icons';

// const { theme } = config;

// const SwitchContainer = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
// `;

// const BlindsSwitchContainer = styled.View`
//   padding-top: 70px;
//   padding-bottom: 70px;
// `;

// const BlindsSwitch = styled.Switch`
//   transform: scaleX(3) scaleY(3) rotate(-90deg);
// `;

// const StateLabel = styled.Text`
//   color: ${props => props.active ? theme.font.normal : theme.font.transparent };
// `;

// @inject('blindsStore')
// @observer
// class ManualScreen extends React.Component {
//   static navigationOptions = {
//     header: null,
//   };

//   constructor(props) {
//     super(props);
//     this.state = { switchState: props.blindsStore.blindsState === 'UP' ? true : false };
//   }

//   componentDidMount() {
//     this.props.navigation.addListener('willFocus', async (route) => {
//       console.log('Manual screen focused, fetching blinds state');
//       await this.props.blindsStore.fetchBlindsInfo();
//       this.syncSwitchState();
//     });
//   }

//   syncSwitchState = () => {
//     this.setState({
//       switchState: this.props.blindsStore.blindsState === 'UP' ? true : false
//     });
//   }

//   handleSwitchChange = value => {
//     const blindsState = value === true ? 'UP' : 'DOWN';
//     this.setState({ switchState: value });
//     this.props.blindsStore.setBlindsState(blindsState);
//   };

//   renderSwitch = () => {
//     const { blindsState } = this.props.blindsStore;

//     if (blindsState === null) {
//       //return null;
//     }

//     return (
//       <SwitchContainer>
//         <Ionicons
//         name="ios-arrow-up"
//         color={theme.color.primary}
//         size={100}
//         />
//         <View style={{height: 50}}></View>
//         <Ionicons
//         name="ios-arrow-down"
//         color={theme.color.primary}
//         size={100}
//       />
//     </SwitchContainer>
//       // <SwitchContainer>
//       //   <StateLabel active={blindsState === 'UP'}>Up</StateLabel>
//       //   <BlindsSwitchContainer>
//       //     <BlindsSwitch
//       //       thumbColor={theme.color.primary}
//       //       trackColor={{
//       //         true: theme.color.primaryLighter
//       //       }}
//       //       value={this.state.switchState}
//       //       onValueChange={this.handleSwitchChange}
//       //     />
//       //   </BlindsSwitchContainer>

//       //   <StateLabel active={blindsState === 'DOWN'}>Down</StateLabel>
//       // </SwitchContainer>
//     )
//   };

//   render() {
//     return (
//       <ViewWrapper>
//         <Header />
//         {this.renderSwitch()}
//       </ViewWrapper>
//     );
//   }
// }

// export default ManualScreen;
