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
    this.mqttSink.emit('devices/message', body);
  }
}
