import { MqttOptions } from '@nestjs/microservices';
import { IInboundHttp } from './inbound-http.interface';

export interface IApplicationConfig {
  outboundMqtt: MqttOptions['options'];
  inboundHttp: IInboundHttp;
}
