import { app, BrowserWindow } from "electron";
import path from "path";
import {
  createProduct,
  getAllProducts,
} from "./main/controllers/ProductController";
import express from "express";
import cors from "cors";
import { json } from "body-parser";
import { createSale, getAllSales } from "./main/controllers/SaleController";
import { syncDatabase } from "./main/models/syncDatabase";
// import sequelize from "./main/database";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true, // For use of node.js in renderer
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// Inicializar el servidor Express
const appExpress = express();
appExpress.use(cors());
appExpress.use(json());

appExpress.get("/products", getAllProducts);
appExpress.post("/products", createProduct);
appExpress.get("/sales", getAllSales);
appExpress.post("/sales", createSale);

// Iniciar el servidor de Express
appExpress.listen(3000, async () => {
  console.log("Servidor Express escuchando en el puerto 3000.");
  await syncDatabase();
});

app.on("ready", createWindow);

// app.whenReady().then(() => {
//   createWindow();
// });

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
