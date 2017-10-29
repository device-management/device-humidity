import { Device, MqttConfig, DeviceDescription } from '@device-management/device-base';
import { Observable } from 'rx';
let sensor = require('node-dht-sensor');

export namespace DeviceManager {

    export class Sensor extends Device {

        doStart(): Observable<any> {
            console.log("Starting sensor...")
            let start = super.doStart();
            start.subscribe(() => { }, () => { }, () => {
                console.log("Starting to measure with frequency: " + this.device.configuration.interval + " ms");
                setInterval(this.getMeasurmentHandler(), this.device.configuration.interval);
            });
            return start;
        };

        private getMeasurmentHandler(): () => void {
            let self = this;
            return () => {
                sensor.read(self.device.configuration.model, self.device.configuration.pin, (err: any, temperature: number, humidity: number) => {
                    if (!err) {
                        console.log("The sensor completed a measurement.")
                        console.log("Temperature: " + temperature);
                        console.log("Humidity: " + humidity);
                        let measurement = self.device.type == DeviceTypes.Temperature ? temperature : humidity;
                        self.mqttClient.publish(
                            "devices/" + self.device.id + "/measurment",
                            JSON.stringify({
                                deviceId: self.device.id,
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

    class DeviceTypes {
        public static Temperature = "temperature";
        public static Humidity = "humidity";
    }
}