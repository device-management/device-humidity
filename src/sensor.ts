import { Device, MqttConfig, DeviceDescription } from '@device-management/device-base';
import { Observable } from 'rx';
let sensor = require('node-dht-sensor');

export namespace DeviceManager {

    export class Sensor extends Device {

        constructor(
            mqttConfig: MqttConfig,
            deviceDescription: DeviceDescription,
            private sensorConfig: SensorConfig) {
            super(mqttConfig, deviceDescription);
        }

        doStart(): Observable<any> {
            console.log("Starting sensor...")
            let start = super.doStart();
            start.subscribe(() => { }, () => { }, () => {
                console.log("Starting to measure with frequency: " + this.deviceDescription.properties.interval + " ms");
                setInterval(this.getMeasurmentHandler(), this.deviceDescription.properties.interval);
            });
            return start;
        };

        private getMeasurmentHandler(): () => void {
            let self = this;
            return () => {
                sensor.read(self.sensorConfig.sensorModel, self.sensorConfig.pin, (err: any, temperature: number, humidity: number) => {
                    if (!err) {
                        console.log("The sensor completed a measurement.")
                        console.log("Temperature: " + temperature);
                        console.log("Humidity: " + humidity);
                        let measurement = self.deviceDescription.properties.type == DeviceTypes.Temperature ? temperature : humidity;
                        self.mqttClient.publish(
                            "devices/" + self.deviceDescription.deviceId + "/measurment",
                            JSON.stringify({
                                deviceId: self.deviceDescription.deviceId,
                                points: [{
                                    value: measurement,
                                    timestamp: new Date()
                                }]
                            }),
                            {
                                qos: 1
                            });
                    } else {
                        console.error("Cannot read measuremnt from sensor.")
                    }
                });
            }
        }
    }

    export interface SensorConfig {
        pin: number;
        sensorModel: number;
    }

    class DeviceTypes {
        public static Temperature = "temperature";
        public static Humidity = "humidity";
    }
}