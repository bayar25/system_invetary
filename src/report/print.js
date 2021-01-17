import fs from "fs";
import ptp from "pdf-to-printer";
import { remote } from "electron";

export default class print {
  getPrinter() {
    return new Promise((resolve, reject) => {
      ptp
        .getPrinters()
        .then(val => {
          resolve(val);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  run(path, resp) {
    return new Promise((resolve, reject) => {
      fs.readFile(remote.app.getPath("documents")+"/config.json", (err, data) => {
        let configPrint = JSON.parse(data).print;
        const options = {
          printer: configPrint.printer
        };
        ptp
          .print(path, options)
          .then(resolve(resp))
          .catch(err => {
            reject(err);
          });
      });
    });
  }
}
