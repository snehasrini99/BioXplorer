// const express = require('express');
// const multer = require('multer');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');
// const pdfParse = require('pdf-parse');

// const app = express();
// const upload = multer({ dest: 'uploads/' });

// // app.use(cors({
// //   origin: 'http://localhost:3000', // Allow requests from this origin
// //   methods: ['GET', 'POST'], // Allow these HTTP methods
// //   allowedHeaders: ['Content-Type'], // Allow these headers
// // }));

// app.use(cors({
//   origin: '*', // Allow all origins
// }));

// // app.use(cors({
// //   origin: 'http://localhost:3000', // Adjust according to your frontend domain
// //   methods: ['GET', 'POST'],
// //   allowedHeaders: ['Content-Type'],
// // }));


// app.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     const filePath = path.join(__dirname, req.file.path);
//     const dataBuffer = fs.readFileSync(filePath);
//     const data = await pdfParse(dataBuffer);
//     const text = data.text;

//     // Extracting title
//     const lines = data.text.split('\n').filter(line => line.trim() !== '');
//     const originalPaperIndex = lines.findIndex(line => line.includes('Original Paper'));

//     let title = 'No title found';
//     if (originalPaperIndex !== -1) {
//       // Capture the first two lines after "Original Paper"
//       const titleLines = lines.slice(originalPaperIndex + 1, originalPaperIndex + 3);
//       title = titleLines.join(' ').trim();
//     }
//     // Extract abstract
//     // const abstractMatch = text.match(/ABSTRACT\s*\n(.*?)(?=\nKEYWORDS|INTRODUCTION|$)/s);
//     const abstractMatch = text.match(/ABSTRACT\s*\n(.*(?:\n(?!KEYWORDS|INTRODUCTION).*)*)/i);
//     const abstract = abstractMatch ? abstractMatch[1].trim() : 'Abstract not found';

//     // Cleanup uploaded file
//     fs.unlinkSync(filePath);


//     console.log(title)
//     console.log(abstract)

//     res.json({ title, abstract });
    
//   } catch (error) {
//     console.error('Error processing PDF:', error);
//     res.status(500).send('Error processing PDF');
//   }
// });

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const pdfjsLib = require('pdfjs-dist/legacy/build/pdf'); // Correct import path

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors({
  origin: '*', // Allow all origins
}));

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, req.file.path);
    const dataBuffer = fs.readFileSync(filePath);

    const loadingTask = pdfjsLib.getDocument({ data: dataBuffer });
    const pdfDoc = await loadingTask.promise;
    const firstPage = await pdfDoc.getPage(1);
    const textContent = await firstPage.getTextContent();

    let title = '';
    let maxFontSize = 0;    

    textContent.items.forEach((item) => {
      const fontSize = item.transform[0];
    
      if (fontSize > maxFontSize) {
        maxFontSize = fontSize;
        title = item.str;  // Start a new title
      } else if (fontSize === maxFontSize) {
        // Append to the existing title if the font size matches
        title += ` ${item.str}`;
      }
    });
    title = title.trim();
    console.log('Title:', title);

    const text = textContent.items.map(item => item.str).join('\n');
    const abstractMatch = text.match(/ABSTRACT\s*\n(.*(?:\n(?!KEYWORDS|INTRODUCTION).*)*)/i);
    const abstract = abstractMatch ? abstractMatch[1].trim() : 'Abstract not found';

    fs.unlinkSync(filePath);

    console.log("title",title);
    // console.log("abstract",abstract);

    res.json({ title, abstract });

  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).send('Error processing PDF');
  }
});



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
