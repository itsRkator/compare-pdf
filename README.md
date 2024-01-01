# PDF Comparison Server

This server is built with Node.js and Express to compare text content between two uploaded PDF files.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- npm (Node Package Manager)

### Installation

1. Clone the repository: `https://github.com/itsRkator/compare-pdf`
2. Navigate to the project directory: `cd compare-pdf`
3. Install dependencies: `npm install`

### Running the Server

1. Start the server: `node index.js` or `npm start`
2. The server will run on port 3000 by default (`http://localhost:3000/compare-pdfs`)

## Usage

### Endpoints

#### POST /compare-pdfs

- Upload two PDF files with keys `file1` and `file2` to compare their content.
- If the files have differences, it will return the differing lines.
- If the files are identical, it will return a message indicating that.

#### Testing with Postman:

- Open Postman and create a new POST request to `http://localhost:3000/compare-pdfs`.
- In the Body tab, select form-data.
- Add two keys: `file1` and `file2`, and select your PDF files for each key.
- Click Send to initiate the comparison process.

Example using cURL:
`curl -X POST -F "file1=@/path/to/first/file.pdf" -F "file2=@/path/to/second/file.pdf" http://localhost:3000/compare-pdfs`

## Dependencies

- express: Web framework for Node.js
- multer: Middleware for handling multipart/form-data (file uploads)
- pdf-parse: Library for extracting text from PDF files
