const express = require("express");
const app = express();
const PDFDocument = require("pdfkit");
const fs = require("fs");
const bwipjs = require("bwip-js");

// Create a document
const doc = new PDFDocument();

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream("output.pdf"));

// Fit the image within the dimensions
doc.image("logo.jpg", 585, 5, { fit: [30, 30] });

//text containing name of the corp
doc.fontSize(7).text("SpaceCode Solutions", 200, 40, {
  width: 410,
  align: "right",
});

app.get("/", async (req, res) => {
  generateBarcode("=" + unitId).then((barcode) => {
    doc.image(barcode, 20, 40, { fit: [100, 100] });
    doc.image("logo.jpg", 585, 5, { fit: [30, 30] });
    //set the label text
    doc.fontSize(7).text("SpaceCode Solutions", 39, 95, {
      width: 410,
      align: "left",
    });
    //doc.image(barcode, 20, 40, { fit: [100, 100] });
  });
  generateBarcode("==" + unitId).then((barcode) => {
    doc.image(barcode, 20, 150, { fit: [100, 100] });
    doc.image("logo.jpg", 585, 5, { fit: [30, 30] });
    //set the label text
    doc.fontSize(7).text("SpaceCode Solutions", 39, 200, {
      width: 410,
      align: "left",
    });
    //doc.image(barcode, 20, 40, { fit: [100, 100] });
    doc.end();
    res.send("done");
  });
  //genarate anothere barcode
});
async function generateBarcode(text) {
  return new Promise((resolve, reject) => {
    bwipjs.toBuffer(
      {
        bcid: "code128",
        text,
        scale: 5,
        height: 10,
        includetext: false,
        textxalign: "center",
      },
      (err, png) => {
        if (err) reject(err);
        else resolve(png);
      }
    );
  });
}

let unitId = 5;
let unitIdCheck = "Aman";
let x = 50;
let y = 90;

function checkTextSum(data) {
  let mChar = require("cdigit").mod37_2.generate(data);
  return mChar.charAt(mChar.length - 1);
}

async function createOne() {
  await generateBarcode("=" + unitId).then((barcode) => {
    doc.image(barcode, x, y, { width: 200 });
  });
}

// createOne();
// doc.end();

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
