import fs from "fs";
import { remote } from "electron";
import ptp from "pdf-to-printer";

export default class bill {
  constructor(sale) {
    this.sale = sale;
    this.code = sale.code;
    this.filename = `bill_${this.code}`;
    this.urlTemplate = __dirname + "/templates/bill.html";
    this.urlHTML = remote.app.getPath("temp") + `/${this.filename}.html`;
    this.urlPDF = remote.app.getPath("temp") + `/${this.filename}.pdf`;
  }
  fill() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.urlTemplate, "utf8", (err, data) => {
        let dom = new DOMParser().parseFromString(data, "text/html");

        dom.querySelector(".code").innerText = this.sale.code;
        dom.querySelector(".date").innerText = this.sale.date;
        dom.querySelector(".client").innerText = this.sale.client;
        dom.querySelector(".total").innerText = this.sale.total;
        dom.querySelector(".code2").innerText = this.sale.code;
        dom.querySelector(".date2").innerText = this.sale.date;
        dom.querySelector(".client2").innerText = this.sale.client;
        dom.querySelector(".total2").innerText = this.sale.total;

        let table = dom.querySelector(".dtSale");
        let table2 = dom.querySelector(".dtSale2");
        this.sale.listDt.forEach((element, index) => {
          let row = table.insertRow(index + 1);
          let cell1 = row.insertCell(0);
          cell1.innerHTML = element.quantity;
          cell1.className = "cellQuantity";
          let cell2 = row.insertCell(1);
          cell2.innerHTML = element.product;
          cell2.className = "cellProduct";
          let cell3 = row.insertCell(2);
          cell3.innerHTML = element.price;
          cell3.className = "cellPrice";
          let cell4 = row.insertCell(3);
          cell4.innerHTML = element.total;
          cell4.className = "cellTotal";

          let row2 = table2.insertRow(index + 1);

          let t2Cell1 = row2.insertCell(0);
          t2Cell1.innerHTML = element.quantity;
          t2Cell1.className = "cellQuantity";
          let t2Cell2 = row2.insertCell(1);
          t2Cell2.innerHTML = element.product;
          t2Cell2.className = "cellProduct";
          let t2Cell3 = row2.insertCell(2);
          t2Cell3.innerHTML = element.price;
          t2Cell3.className = "cellPrice";
          let t2Cell4 = row2.insertCell(3);
          t2Cell4.innerHTML = element.total;
          t2Cell4.className = "cellTotal";

          if (index == this.sale.listDt.length - 1) {
            let html = dom.querySelector("html").outerHTML;
            fs.writeFile(this.urlHTML, html, err => {
              if (err) {
                reject(err);
              } else {
                resolve(`Archivo temporal HTML : ${this.filename}  Creado.`);
              }
            });
          }
        });
      });
    });
  }

  generatePDF() {
    return new Promise((resolve, reject) => {
      let win = new remote.BrowserWindow({
        height: 600,
        width: 1000,
        show: false
      });
      let options = {
        marginsType: 0,
        pageSize: "Letter",
        printBackground: true,
        printSelectionOnly: false,
        landscape: false
      };
      win.loadURL(`file://${this.urlHTML}`);
      win.once("ready-to-show", value => {
        win.webContents.printToPDF(options).then(data => {
          fs.writeFile(this.urlPDF, data, err => {
            if (err) {
              reject(err);
            } else {
              resolve(`Archivo temporal PDF : ${this.filename}  Creado.`);
            }
          });
        });
      });
    });
  }

  print() {
    return new Promise((resolve, reject) => {
      const options = {
        printer: "EPSON L3110 Series"
      };
      ptp
        .print(this.urlPDF, options)
        .then(resolve(`Factura ${this.code} Impresa`))
        .catch(err => {
          reject(err);
        });
    });
  }

  delFile() {
    return new Promise((resolve, reject) => {
      fs.rmdir(remote.app.getPath("temp") + `/bill.html`, () => {
        fs.rmdir(remote.app.getPath("temp") + `/bill.pdf`, () => {
          resolve(`Archivos temporales PDF HTML ${this.filename}  eliminados`);
        });
      });
    });
  }
}
