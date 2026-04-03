import fs from 'fs';
import path from 'path';

// 1. Rename folder
const rawPath = 'C:/Users/krish/Desktop/ByteMeals/src/rawData';
const mockPath = 'C:/Users/krish/Desktop/ByteMeals/src/mockData';
if (fs.existsSync(rawPath) && !fs.existsSync(mockPath)) {
  fs.renameSync(rawPath, mockPath);
} else if (!fs.existsSync(mockPath)) {
  fs.mkdirSync(mockPath, { recursive: true });
}

// 2. Read and Duplicate Restaurants to 40 items
const restFile = path.join(mockPath, 'restaurantData.js');
let dataStr = fs.readFileSync(restFile, 'utf-8');
// Extract the JSON object from `export const MOCK_RESTAURANTS_DATA = {...};`
dataStr = dataStr.replace("export const MOCK_RESTAURANTS_DATA = ", "").trim();
if (dataStr.endsWith(";")) dataStr = dataStr.slice(0, -1);

const parsedData = JSON.parse(dataStr);
const cards = parsedData.data.cards;

for (let c of cards) {
  if (c?.card?.card?.id === "restaurant_grid_listing_v2") {
    const restos = c.card.card.gridElements.infoWithStyle.restaurants;
    // Duplicate to make ~40 items
    const duplicates = restos.map(r => {
      const cloned = JSON.parse(JSON.stringify(r));
      cloned.info.id = cloned.info.id + "_copy";
      return cloned;
    });
    c.card.card.gridElements.infoWithStyle.restaurants = [...restos, ...duplicates];
  }
}

const finalStr = `export const MOCK_RESTAURANTS_DATA = ${JSON.stringify(parsedData, null, 2)};`;
fs.writeFileSync(restFile, finalStr);

console.log("Mock data folder renamed and 40 restaurants prepared!");
