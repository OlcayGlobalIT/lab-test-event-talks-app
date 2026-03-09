const fs = require('fs');
const path = require('path');

const talksDataPath = path.join(__dirname, 'talksData.js');
const templatePath = path.join(__dirname, 'template.html');
const stylePath = path.join(__dirname, 'style.css');
const scriptPath = path.join(__dirname, 'script.js');
const outputPath = path.join(__dirname, 'index.html');

// Read files
const talksDataContent = fs.readFileSync(talksDataPath, 'utf8');
let templateContent = fs.readFileSync(templatePath, 'utf8');
const styleContent = fs.readFileSync(stylePath, 'utf8');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

// Embed data, CSS, and JS into the HTML template
templateContent = templateContent.replace('/* INJECTED_CSS_HERE */', styleContent);
templateContent = templateContent.replace('/* INJECTED_DATA_HERE */', talksDataContent);
templateContent = templateContent.replace('/* INJECTED_JAVASCRIPT_HERE */', scriptContent);

// Write the combined content to index.html
fs.writeFileSync(outputPath, templateContent, 'utf8');

console.log('Successfully generated index.html');
console.log(`Output file: ${outputPath}`);
