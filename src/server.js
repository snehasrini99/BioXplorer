const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, req.file.path);
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    const text = data.text;

    // Extracting title
    const lines = data.text.split('\n').filter(line => line.trim() !== '');
    const originalPaperIndex = lines.findIndex(line => line.includes('Original Paper'));

    let title = 'No title found';
    if (originalPaperIndex !== -1) {
      // Capture the first two lines after "Original Paper"
      const titleLines = lines.slice(originalPaperIndex + 1, originalPaperIndex + 3);
      title = titleLines.join(' ').trim();
    }
    // Extract abstract
    // const abstractMatch = text.match(/ABSTRACT\s*\n(.*?)(?=\nKEYWORDS|INTRODUCTION|$)/s);
    const abstractMatch = text.match(/ABSTRACT\s*\n(.*(?:\n(?!KEYWORDS|INTRODUCTION).*)*)/i);
    const abstract = abstractMatch ? abstractMatch[1].trim() : 'Abstract not found';

    // Cleanup uploaded file
    fs.unlinkSync(filePath);


    console.log(title)
    console.log(abstract)

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
