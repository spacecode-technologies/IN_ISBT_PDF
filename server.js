const express = require("express");
const app = express();
const PDFDocument = require("pdfkit");
const fs = require("fs");
const bwipjs = require("bwip-js");

let sheet1 = [
  {
    A: "unitId",
    B: "bloodGroup",
    C: "productCode",
    D: "expiredDate",
    E: "collectionTime",
    F: "specialTesting",
  },
  {
    A: "R96862187164454",
    B: "H600",
    C: "E8770V00",
    D: "0221251330",
    E: "0210251330",
    F: "939919499976828800",
  },
  {
    A: "R96862187164549",
    B: "5100",
    C: "E8812V00",
    D: "0221251330",
    E: "0210251330",
    F: "939919499744574700",
  },
  {
    A: "R96862187164639",
    B: "7300",
    C: "E8829V00",
    D: "0221251330",
    E: "0210251330",
    F: "939919499717583000",
  },
  {
    A: "R96862187164768",
    B: "G600",
    C: "E8827V00",
    D: "0221251330",
    E: "0210251330",
    F: "939919499707970400",
  },
  {
    A: "R96862187164854",
    B: "6200",
    C: "E8828V00",
    D: "0221251330",
    E: "0210251330",
    F: "939919499895148300",
  },
  {
    A: "R96862187164981",
    B: "G600",
    C: "E8976V00",
    D: "0221251330",
    E: "0210251330",
    F: "939919499951905200",
  },
  {
    A: "R96862187165040",
    B: "6200",
    C: "E8770VA0",
    D: "0221251330",
    E: "0210251330",
    F: "939919499927551700",
  },
  {
    A: "R96862187165191",
    B: "1700",
    C: "E8770VB0",
    D: "0221251330",
    E: "0210251330",
    F: "939919499827135400",
  },
  {
    A: "R96862187165230",
    B: "2800",
    C: "E8770VC0",
    D: "0221251330",
    E: "0210251330",
    F: "939919499749065500",
  },
  {
    A: "R96862187165371",
    B: "1700",
    C: "E8770VD0",
    D: "0221251330",
    E: "0210251330",
    F: "939919499754000800",
  },
  {
    A: "R96862187165449",
    B: "H600",
    C: "E3929VA0",
    D: "0221251330",
    E: "0210251330",
    F: "939919499824320000",
  },
  {
    A: "R96862187165520",
    B: "6200",
    C: "E3929VB0",
    D: "0221251330",
    E: "0210251330",
    F: "939919499976792300",
  },
  {
    A: "R96862187165651",
    B: "1700",
    C: "E8242V00",
    D: "0221251330",
    E: "0210251330",
    F: "939919499861082600",
  },
  {
    A: "R96862187165744",
    B: "9500",
    C: "E3929VAa",
    D: "0221251330",
    E: "0210251330",
    F: "939919499833072500",
  },
  {
    A: "R96862187165812",
    B: "0600",
    C: "E3929VAb",
    D: "0221251330",
    E: "0210251330",
    F: "939919499712476800",
  },
  {
    A: "R96862187165955",
    B: "0600",
    C: "E3929VAc",
    D: "0221251330",
    E: "0210251330",
    F: "939919499943917300",
  },
  {
    A: "R96862187166089",
    B: "H600",
    C: "E3929VAd",
    D: "0221251330",
    E: "0210251330",
    F: "939919499666182800",
  },
  {
    A: "R96862187166161",
    B: "5100",
    C: "E3929VBa",
    D: "0221251330",
    E: "0210251330",
    F: "939919499878678500",
  },
  {
    A: "R96862187166217",
    B: "5100",
    C: "E3929VBb",
    D: "0221251330",
    E: "0210251330",
    F: "939919499745994900",
  },
];

let x = 40;
let y = 40;

let barcode_x = 20;
let barcode_y = 20;

// Create a document
const doc = new PDFDocument();
doc.pipe(fs.createWriteStream("output.pdf"));
// doc.image("logo.jpg", 585, 5, { fit: [30, 30] });
// doc.fontSize(7).text("SpaceCode Solutions", 200, 40, {
//   width: 410,
//   align: "right",
// });
app.get("/test", async (req, res) => {
  //loop through the sheet1 and create a new barcode for each item
  for (let i = 1; i < sheet1.length; i++) {
    const data = [];
    let unitId = sheet1[i].A;
    let bloodGroup = sheet1[i].B;
    let productCode = sheet1[i].C;
    let expiredDate = sheet1[i].D;
    let collectionTime = sheet1[i].E;
    let specialTesting = sheet1[i].F + "";

    let unitIdCheck = unitId.substring(unitId.length, unitId.length - 2);
    let x = 40;
    let y = 90;

    await generateBarcode(unitId).then((barcode) => {
      data.push(barcode);
    });
    await generateBarcode(bloodGroup).then((barcode) => {
      data.push(barcode);
    });
    await generateBarcode(productCode).then((barcode) => {
      data.push(barcode);
    });
    await generateBarcode(expiredDate).then((barcode) => {
      data.push(barcode);
    });
    await generateBarcode(collectionTime).then((barcode) => {
      data.push(barcode);
    });
    await generateBarcode(specialTesting).then((barcode) => {
      data.push(barcode);
    });
    await generateBarcode(unitIdCheck).then((barcode) => {
      data.push(barcode);
    });

    //print the barcode
    for (let j = 0; j < data.length; j++) {
      doc.image(data[j], x, y, { fit: [60, 60] });
      x += 70;
    }
    if (barcode_y > 700) {
      barcode_y = 20;
      barcode_x += 150;
    } else {
      barcode_y += 50;
    }
    //add a new page

    doc.addPage();
  }

  doc.end();
  res.send("done");
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
    doc.image(barcode, 20, 120, { fit: [100, 100] });
    doc.image("logo.jpg", 585, 5, { fit: [30, 30] });
    //set the label text
    doc.fontSize(7).text("SpaceCode Solutions", 39, 170, {
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
        // width: 5,
        includetext: true,
        // textsize: "10",
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
// let x = 50;
// let y = 90;

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
