import { observable, action } from 'mobx';

export default class BlindsStore {
  @observable blindsState = null;
  @observable sensorPreference = null;
  @observable lightReading = null;
  @observable espMode = null;
  @observable upDown = null;

  constructor(blindsService) {
    this.blindsService = blindsService;
    this.fetchBlindsInfo();
    this.fetchLightSensorPreference();
  }

  @action
  async fetchBlindsInfo() {
    const { raise, rise } = await this.blindsService.fetchBlindsInfo();
    this.blindsState = raise;
    this.lightReading = rise;
  }

  @action
  async fetchLightSensorPreference() {
    const preference = await this.blindsService.fetchLightSensorPreference();
    this.sensorPreference = preference;
  }
  @action
  async fetchEspMode() {
    const {espmode, updown} = await this.blindsService.fetchEspMode();
    this.espMode = espmode;
    this.upDown = updown;
  }
  @action
  async setBlindsState(state) {
    const newState = await this.blindsService.setBlindsState(state);
    this.blindsState = newState;
  }
  @action
  async setBlindsLightReading(state) {
    const newState = await this.blindsService.setBlindsLightReading(state);
    this.lightReading = newState;
  }

  @action
  async setLightSensorPreference(value) {
    const newValue = await this.blindsService.setLightSensorPreference(value);
    this.sensorPreference = newValue;
  }
  @action
  async setEspMode(value) {
    const newValue = await this.blindsService.setEspMode(value);
    this.espMode = newValue;
  }
  // @action
  // async setUpdown(value) {
  //   const newValue = await this.blindsService.setLightSensorPreference(value);
  //   this.upDown = newValue;
  // }
}
