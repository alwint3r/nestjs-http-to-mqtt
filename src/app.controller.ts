import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(@Inject('MQTT_SINK') private mqttSink: ClientProxy) {}

  @Get()
  getHello() {
    return { message: `This API works!` };
  }

  @Post('/message')
  async postMessage(@Body() body: any) {
    await this.mqttSink.emit('devices/message', body);
    // await this.mqttSink.send('devices/message', body);
  }
}
