import * as axios from 'axios';
import config from '../config/config';

const BASE_URL = `http://${config.server.host}`;

export default class BlindsService {
  async fetchBlindsInfo() {
    try {
      const result = await axios.get(`${BASE_URL}/blinds`);
      return result.data;
    } catch (error) {
      //alert(`Cannot fetch blinds info - ${error}`);
    }
  }
  async fetchEspMode() {
    try {
      const result = await axios.get(`${BASE_URL}/schedule/getespmode`);
      return result.data;
    } catch (error) {
      //alert(`Cannot fetch blinds info - ${error}`);
    }
  }

  async setEspMode(state) {
    try {
      //alert.alert(state+"cc");
      const result = await axios.patch(`${BASE_URL}/schedule/setespmode`, { state });
      return result.data;
    } catch (error) {
     alert(`Cannot set blinds state - ${error}`);
    }
  }


  async setBlindsState(state) {
    try {
      const result = await axios.patch(`${BASE_URL}/blinds`, { state });
      return result.data;
    } catch (error) {
     alert(`Cannot set blinds state - ${error}`);
    }
  }

  async setBlindsLightReading(state) {
    try {
      const result = await axios.patch(`${BASE_URL}/blinds/sun`, { state });
      return result.data;
    } catch (error) {
     alert(`Cannot set blinds state - ${error}`);
    }
  }
  async setLightSensorPreference(value) {
    try {
      const result = await axios.put(`${BASE_URL}/light/${value}`);
      return result.data;
    } catch (error) {
      //alert(`Cannot set light sensor preference - ${error}`);
    }
  }

  async fetchLightSensorPreference() {
    try {
      const result = await axios.get(`${BASE_URL}/light`);
      return result.data;
    } catch (error) {
      //alert(`Cannot fetch light sensor preference - ${error}`);
    }
  }
}
