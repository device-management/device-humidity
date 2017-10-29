import { DeviceManager } from "./sensor";

let mqttAddress = process.env.MQTT_ADDRESS ? process.env.MQTT_ADDRESS : "mqtt://mqtt";
let deviceId = process.env.DEVICE_ID ? process.env.DEVICE_ID : "TEMP01";
let deviceName = process.env.DEVICE_NAME ? process.env.DEVICE_NAME : "Temperature sensor";
let deviceType = process.env.DEVICE_TYPE ? process.env.DEVICE_TYPE : "temperature";
let measurementInterval = process.env.MEASUREMENT_INTERVAL ? parseInt(process.env.MEASUREMENT_INTERVAL) : 6000;
let deviceModel = process.env.DEVICE_MODEL ? parseInt(process.env.DEVICE_MODEL) : 11;
let pinNumber = process.env.PIN ? parseInt(process.env.PIN) : 4;

let sensor = new DeviceManager.Sensor(
    {
        brokerAddress: mqttAddress
    },
    {
        id: deviceId,
        name: deviceName,
        type: deviceType,
        configuration: {
            interval: measurementInterval,
            pin: pinNumber,
            model: deviceModel
        },
        state: {
            isOnline: true
        }
    }
);

console.log("MQTT address: " + mqttAddress);
console.log("Device ID: " + deviceId);
console.log("Device type: " + deviceType);
console.log("Device model: " + deviceModel);
console.log("Measurement interval: " + measurementInterval);
console.log("Pin: " + pinNumber);
console.log("Starting sensor...");

sensor.start();