import React, { useState, useEffect } from "react";
import "./App.css";

// import Bluetooth from "./Bluetooth";

function App() {
  const [msg, setMsg] = useState(null);
  let options = { acceptAllDevices: true };

  const get = async () => {
    setMsg(null);
    let str = "";
    await navigator.bluetooth.requestDevice(options).then((device) => {
      str = str + "> Name:             " + device.name + "<br />";
      str = str + "> Id:             " + device.id + "<br />";
      str =
        str +
        "> gatt.connected:             " +
        device.gatt.connected +
        "<br />";
    });

    navigator.bluetooth.getAvailability().then((isBluetoothAvailable) => {
      str =
        str +
        `> Bluetooth is ${isBluetoothAvailable ? "available" : "unavailable"}` +
        "<br />";
    });

    if ("onavailabilitychanged" in navigator.bluetooth) {
      navigator.bluetooth.addEventListener(
        "availabilitychanged",
        function (event) {
          str =
            str +
            `> Bluetooth is ${event.value ? "available" : "unavailable"}` +
            "<br />";
        }
      );
    }
    setMsg(str);
    onWatchAdvertisementsButtonClick();
  };

  function onWatchAdvertisementsButtonClick() {
    console.log("Requesting any Bluetooth device...");
    navigator.bluetooth
      .requestDevice({
        // filters: [...] <- Prefer filters to save energy & show relevant devices.
        acceptAllDevices: true,
      })
      .then((device) => {
        console.log("> Requested " + device.name);

        device.addEventListener("advertisementreceived", (event) => {
          console.log("Advertisement received.");
          console.log("  Device Name: " + event.device.name);
          console.log("  Device ID: " + event.device.id);
          console.log("  RSSI: " + event.rssi);
          console.log("  TX Power: " + event.txPower);
          console.log("  UUIDs: " + event.uuids);
          event.manufacturerData.forEach((valueDataView, key) => {
            logDataView("Manufacturer", key, valueDataView);
          });
          event.serviceData.forEach((valueDataView, key) => {
            logDataView("Service", key, valueDataView);
          });
        });

        console.log('Watching advertisements from "' + device.name + '"...');
        return device.watchAdvertisements();
      })
      .catch((error) => {
        console.log("Argh! " + error);
      });
  }

  const logDataView = (labelOfDataSource, key, valueDataView) => {
    const hexString = [...new Uint8Array(valueDataView.buffer)]
      .map((b) => {
        return b.toString(16).padStart(2, "0");
      })
      .join(" ");
    const textDecoder = new TextDecoder("ascii");
    const asciiString = textDecoder.decode(valueDataView.buffer);
    console.log(
      `  ${labelOfDataSource} Data: ` +
        key +
        "\n    (Hex) " +
        hexString +
        "\n    (ASCII) " +
        asciiString
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={get} style={{ padding: "10px", fontWeight: "bold" }}>
          click
        </button>
        {/* <div>{msg}</div> */}
        <div
          dangerouslySetInnerHTML={{ __html: msg }}
          style={{ lineHeight: "170%" }}
        ></div>
      </header>
    </div>
  );
}

export default App;
