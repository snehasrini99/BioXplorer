// const express = require('express');
// const multer = require('multer');
// const cors = require('cors');
// const path = require('path');
// const fs = require('fs');
// const pdfParse = require('pdf-parse');
// const { PDFDocument } = require('pdf-lib');

// const app = express();
// const upload = multer({ dest: 'uploads/' });

// app.use(cors());

// app.post('/upload', upload.single('file'), async (req, res) => {
//   const filePath = req.file.path;
//   try {
//     const dataBuffer = fs.readFileSync(filePath);
//     const data = await pdfParse(dataBuffer);
//     const pages = pdfDoc.getPages();
    
//     // Assuming the title is on the first page
//     const firstPage = pages[0];
//     const { width, height } = firstPage.getSize();

//     // Extract text from the page
//     const textFirstPage = await firstPage.getTextContent();

//     // Find the largest text (assumed to be the title)
//     let title = '';
//     let maxFontSize = 0;
//     textFirstPage.forEach(item => {
//       const { str, transform } = item;
//       const fontSize = transform[0]; // Typically, font size is in the transform array
      
//       if (fontSize > maxFontSize) {
//         maxFontSize = fontSize;
//         title = str;
//       }
//     });

    

//     // Extract title and abstract (simple example, you may need more sophisticated parsing)
//     const text = data.text;
    
    
//     // const titleMatch = text.match(/^(.*\S.*)$/m);
//     // const title = titleMatch ? titleMatch[1].trim() : 'Title not found';



//     const abstractMatch = text.match(/ABSTRACT\s*\n(.*(?:\n(?!KEYWORDS|INTRODUCTION).*)*)/i);
//     const abstract = abstractMatch ? abstractMatch[1].trim() : 'Abstract not found';
//     console.log(abstract)

//     res.json({ title, abstract });
//   } catch (error) {
//     res.status(500).send('Error processing file');
//   } finally {
//     // Clean up uploaded file
//     fs.unlinkSync(filePath);
//   }

//   //res.send('File uploaded successfully');
// });

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// const express = require('express');
// const multer = require('multer');
// const cors = require('cors');
// const fs = require('fs');
// const pdfParse = require('pdf-parse');

// const app = express();
// const upload = multer({ dest: 'uploads/' });

// app.use(cors());

// app.post('/upload', upload.single('file'), async (req, res) => {
//   const filePath = req.file.path;
//   try {
//     const dataBuffer = fs.readFileSync(filePath);
//     const data = await pdfParse(dataBuffer);
//     const text = data.text;
    
//     // Split text into lines
//     const lines = text.split('\n');
    
//     // Find the line with the maximum length as a heuristic for the title
//     let title = '';
//     let maxLength = 0;
//     for (const line of lines) {
//       if (line.length > maxLength) {
//         maxLength = line.length;
//         title = line;
//       }
//     }
    
//     // Extract abstract
//     // const abstractMatch = text.match(/ABSTRACT\s*\n(.*?)(?=\nKEYWORDS|INTRODUCTION|$)/s);
//     const abstractMatch = text.match(/ABSTRACT\s*\n(.*(?:\n(?!KEYWORDS|INTRODUCTION).*)*)/i);
//     const abstract = abstractMatch ? abstractMatch[1].trim() : 'Abstract not found';
    
//     res.json({ title, abstract });
//   } catch (error) {
//     console.error('Error processing file:', error);
//     res.status(500).send('Error processing file');
//   } finally {
//     // Clean up uploaded file
//     fs.unlinkSync(filePath);
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
const { PDFDocument } = require('pdf-lib');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.post('/upload', upload.single('file'), async (req, res) => {
  const filePath = req.file.path;
  try {
    const dataBuffer = fs.readFileSync(filePath);

    // Dynamically import pdfjs-dist
    const pdfjsLib = await import('pdfjs-dist/build/pdf');

    // Load PDF with pdfjs-dist
    const loadingTask = pdfjsLib.getDocument({ data: dataBuffer });
    const pdf = await loadingTask.promise;

    // Extract text content from the first page
    const firstPage = await pdf.getPage(1);
    const textContent = await firstPage.getTextContent();

    // Find the largest text (assumed to be the title)
    let title = '';
    let maxFontSize = 0;

    textContent.items.forEach(item => {
      const { str, transform } = item;
      const fontSize = transform[0]; // Font size

      if (fontSize > maxFontSize) {
        maxFontSize = fontSize;
        title = str;
      }
    });

    res.json({ title: title.trim() || 'Title not found' });
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).send('Error processing file');
  } finally {
    // Clean up uploaded file
    fs.unlinkSync(filePath);
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

