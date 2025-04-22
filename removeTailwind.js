const fs = require('fs');
const { exec } = require('child_process');

// Function to remove dependencies
function removeDependencies(dependencies) {
  const command = `npm uninstall ${dependencies.join(' ')}`;
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error uninstalling dependencies: ${err.message}`);
      return;
    }
    console.log(stdout || stderr);
    console.log('Dependencies removed successfully.');
  });
}

// Function to delete files
function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Deleted: ${filePath}`);
  } else {
    console.log(`File not found: ${filePath}`);
  }
}

// Function to remove Tailwind CSS
function removeTailwind() {
  console.log('Removing Tailwind CSS and PostCSS...');
  // Remove dependencies
  removeDependencies(['tailwindcss', 'postcss', 'autoprefixer']);

  // Remove configuration files
  deleteFile('tailwind.config.js');
  deleteFile('postcss.config.js');

  // Remove CSS imports and assets
  const mainFilePath = './src/main.js';
  if (fs.existsSync(mainFilePath)) {
    let mainFileContent = fs.readFileSync(mainFilePath, 'utf-8');
    mainFileContent = mainFileContent.replace(/import '.*tailwind\.css';?\n?/g, '');
    fs.writeFileSync(mainFilePath, mainFileContent);
    console.log('Removed Tailwind CSS import from main.js.');
  }

  // Remove Tailwind CSS file
  deleteFile('./src/assets/tailwind.css');
}

// Execute removal process
removeTailwind();
