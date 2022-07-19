import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, MqttOptions } from '@nestjs/microservices';
import { AppController } from './app.controller';
import config from './config';
import { CustomMqttClientProxy } from './custom-client.proxy';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [config] })],
  controllers: [AppController],
  providers: [
    {
      provide: 'MQTT_SINK',
      useFactory: (configService: ConfigService) => {
        const outboundMqtt =
          configService.get<MqttOptions['options']>('outboundMqtt');
        return ClientProxyFactory.create({
          customClass: CustomMqttClientProxy,
          options: outboundMqtt,
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
