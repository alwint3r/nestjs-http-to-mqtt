import { ClientMqtt, MqttOptions, ReadPacket } from '@nestjs/microservices';

export class CustomMqttClientProxy extends ClientMqtt {
  constructor(options: MqttOptions['options']) {
    super(options);
  }

  protected dispatchEvent(packet: ReadPacket<any>): Promise<any> {
    const pattern = this.normalizePattern(packet.pattern);
    const serializedPacket = this.serializer.serialize(packet);
    return new Promise<void>((resolve, reject) => {
      this.mqttClient.publish(
        pattern,
        JSON.stringify(packet.data),
        this.mergePacketOptions(serializedPacket.options),
        (err: any) => (err ? reject(err) : resolve()),
      );
    });
  }
}
