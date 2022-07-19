import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { CustomMqttClientProxy } from './custom-client.proxy';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_SINK',
        options: {
          url: 'mqtt://localhost:1883',
          clientId: 'NEST_MQTT_SINK',
        },
        customClass: CustomMqttClientProxy,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
