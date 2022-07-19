import { IApplicationConfig } from './app-config.interface';

export default (): IApplicationConfig => ({
  outboundMqtt: {
    url: process.env.OUTBOUND_MQTT_URL || 'mqtt://localhost:1883',
    username: process.env.OUTBOUND_MQTT_USERNAME || '',
  },
  inboundHttp: {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  },
});
