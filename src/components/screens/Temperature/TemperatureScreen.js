import React from 'react';
import { Text, Dimensions, View, Slider } from 'react-native';
import { Header, ViewWrapper } from '../../layout';
import styled from 'styled-components';
import config from '../../../config/config';
import { inject } from 'mobx-react/native';
import { Subject } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

const { theme } = config;

const sliderWidth = Dimensions.get('window').width;


// const SensorSlider = styled.Slider`
//   transform: rotate(-90deg);
//   width: 100%;
//   height: ${sliderWidth};
// `;

const SensorValueText = styled.Text`
  color: ${theme.font.normal};
  font-size: 20px;
`;

const SensorSliderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
@inject('blindsStore')
export default class TemperatureScreen extends React.Component {
  sliderChange$ = new Subject();

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    const sensorPreference = props.blindsStore.sensorPreference;
    this.state = {
      sensorPreference,
      presentSensorPreferenceValue: sensorPreference
    }
  }
  componentDidMount() {
    this.props.navigation.addListener('willFocus', async (route) => {
      console.log('Sensor screen focused, fetching sensor preference');
      await this.props.blindsStore.fetchBlindsInfo();
      await this.props.blindsStore.fetchLightSensorPreference();
      this.syncSensorPreference();
    });

    this.sliderChange$
    .pipe(
      tap(value => this.setState({ presentSensorPreference: value })),
      debounceTime(500)
    )
    .subscribe(this.handleSliderChange);
  }

  handleSliderChange = async value => {
    await this.props.blindsStore.setLightSensorPreference(value);
    this.syncSensorPreference();
  };

  syncSensorPreference = () => {
    const sensorPreference = this.props.blindsStore.sensorPreference;
    this.setState({
      sensorPreference,
      presentSensorPreference: sensorPreference
    });
  }

  renderSlider = () => {
    const { sensorPreference } = this.state;

    if (sensorPreference === null) {
      return null;
    }

    return (
      <SensorSliderContainer>
        <Slider
          step={1}
          style={{width: '100%',  transform: [{ rotate: '-90deg'}]}}
          value={sensorPreference}
          minimumValue={50}
          maximumValue={90}
          minimumTrackTintColor={theme.color.primaryLighter}
          thumbTintColor={theme.color.primary}
          onValueChange={value => this.sliderChange$.next(value)}
        />
        <View style={{ marginLeft: 90, alignItems: 'center' }}>
          <SensorValueText>
            {this.state.presentSensorPreference}°F
          </SensorValueText>
        </View>
      </SensorSliderContainer>
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