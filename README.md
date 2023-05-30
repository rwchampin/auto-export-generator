<h1 align="center">
  :warning: :warning: CAUTION :warning: :warning:
</h1>
<p align="center">
  ————————————————————————————————————————
</p>
<p align="center">
  <strong>This project is currently under heavy development and is not yet complete. It's recommended not to use it in a production environment until a stable release is available. We cannot guarantee backward compatibility or provide full support for issues until this project reaches a more mature and stable stage. Stay tuned for updates and thank you for your understanding.</strong>
</p>
<p align="center">
  ————————————————————————————————————————
</p>


# Automatic Component Export in Next.js

This project provides a script that automatically generates export statements for components in the `components` directory and updates the `components/index.js` file. This saves you from manually adding components to the index file whenever you create a new component.

## Installation

1. Clone the repository or add the `generateComponentsIndex.ts` script to your project.

2. Install the required dependencies by running the following command in your project's root directory:

```shell
npm install glob nodemon
```
or
```shell
yarn add glob nodemon
```

## Usage

1. Modify the `generateComponentsIndex.ts` script according to your project's folder structure and naming conventions.

2. Run the script manually or integrate it into your development workflow.

### Manual Execution

Run the following command in your project's root directory:

```shell
node generateComponentsIndex.ts
```

This command executes the `generateComponentsIndex.ts` script, which scans the `components` directory, generates export statements, and updates the `components/index.js` file.

### Automatic Execution with Nodemon

1. Update the `generateComponentsIndex.ts` script as per your project's requirements.

2. Modify the `package.json` file and add/update the `"scripts"` section as follows:

```json
"scripts": {
  "start": "react-scripts start & nodemon generateComponentsIndex.ts",
  "build": "react-scripts build && node generateComponentsIndex.ts",
  "test": "jest",
  "eject": "react-scripts eject"
}
```

Run your application using one of the following commands:

```shell
npm start
```
or
```shell
yarn start
```

Starts the application in development mode, concurrently running the React watcher and the `generateComponentsIndex.ts` script.

```shell
npm run build
```
or
```shell
yarn run build
```

Builds the application for production, running the React build process and the `generateComponentsIndex.ts` script.

## Watch for Changes

The `generateComponentsIndex.ts` script uses nodemon to watch for changes in the components directory. When a component file is modified or added, it automatically regenerates the export statements and updates the `components/index.js` file.

## Adjusting Folder Structure

Ensure that the components directory exists in the root of your project and that your component files have appropriate extensions `(.js, .ts, .jsx, .tsx)`. Modify the componentsPath variable in the script if your folder structure differs.

## Customization

Feel free to customize the script according to your specific project needs. You can modify the file extensions, folder structure, naming conventions, and output file name to align with your project's requirements.

## Note

Running multiple processes concurrently may increase the resource usage of your development environment. Ensure that your system has enough resources to handle both processes efficiently.
