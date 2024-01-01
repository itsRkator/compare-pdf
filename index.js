const express = require("express");
const multer = require("multer");
// const fs = require("fs");
const PDFParser = require("pdf-parse");

const app = express();
const port = 3000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post(
  "/compare-pdfs",
  upload.fields([
    { name: "file1", maxCount: 1 },
    { name: "file2", maxCount: 1 },
  ]),
  async (req, res) => {
    const { file1, file2 } = req.files;

    if (!file1 || !file2) {
      return res.status(400).send("Please upload file1 and file2.");
    }

    try {
      const file1Text = await extractTextFromPDF(file1[0].buffer);
      const file2Text = await extractTextFromPDF(file2[0].buffer);

      const differences = findTextDifferences(file1Text, file2Text);

      if (!differences) {
        return res.send("Files are identical");
      } else {
        return res.send(
          `Files are different.\nDifference in lines:\n${differences}`
        );
      }
    } catch (error) {
      return res.status(500).send(`Error occurred: ${error.message}`);
    }
  }
);

async function extractTextFromPDF(buffer) {
  const pdfData = await PDFParser(buffer);
  return pdfData.text;
}

function findTextDifferences(text1, text2) {
  const lines1 = text1.split("\n");
  const lines2 = text2.split("\n");
  let differences = "";

  for (let i = 0; i < lines1.length || i < lines2.length; i++) {
    if (lines1[i] !== lines2[i]) {
      console.log(
        `Line ${i + 1}: \nFile1: \n${lines1[i] || "Empty line"}\nFile2: \n${
          lines2[i] || "Empty line"
        }\n\n`
      );

      differences += `Line ${i + 1}: \n File1: ${
        lines1[i] || "Empty line"
      }\nFile2: ${lines2[i] || "Empty line"}\n\n`;
    }
  }

  return differences.trim();
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
