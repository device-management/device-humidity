# device-sensor
The software for sensor measurement.

```sh
docker run \
-e "MQTT_ADDRESS=mqtt://192.168.0.49" \
-e "PIN=4" \
-e "DEVICE_ID=TEMP01" \
-e "DEVICE_NAME=Temperature sensor" \
-e "DEVICE_TYPE=temperature" \
-e "MEASUREMENT_INTERVAL=6000" \
-e "DEVICE_MODEL=11" \
--privileged -d devicemanagment/device-sensor
```

```sh
docker run \
-e "MQTT_ADDRESS=mqtt://192.168.0.49" \
-e "PIN=4" \
-e "DEVICE_ID=HUM01" \
-e "DEVICE_NAME=Humidity sensor" \
-e "DEVICE_TYPE=humidity" \
-e "MEASUREMENT_INTERVAL=6000" \
-e "DEVICE_MODEL=11" \
--privileged -d devicemanagment/device-sensor
```
