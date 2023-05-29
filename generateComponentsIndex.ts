import glob from 'glob';
import { promises as fsPromises } from 'fs';

const generateComponentsIndex = async () => {
  const componentsPath = 'components';

  const components = await new Promise<string[]>((resolve, reject) => {
    glob(`${componentsPath}/**/*.{js,ts,jsx,tsx}`, (error, files) => {
      if (error) {
        reject(error);
      } else {
        resolve(files);
      }
    });
  });

  const exportStatements = components.map((file) => {
    const componentName = file.split('/').pop()?.replace(/\.[^/.]+$/, '');
    return `export { default as ${componentName} } from './${file}';`;
  });

  const indexContent = exportStatements.join('\n');

  await fsPromises.writeFile(`${componentsPath}/index.js`, indexContent);
};

generateComponentsIndex().catch((error) => {
  console.error('Error generating components index:', error);
});
