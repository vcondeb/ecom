import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { products } from "./schema";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const nikeProducts = [
  {
    name: "Nike Air Max 90",
    description: "Iconic style meets modern comfort in this legendary sneaker.",
    price: "129.99",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/wzitsrb4oucx9jukxsmc/AIR+MAX+90.png",
    category: "Shoes",
    stock: 50,
  },
  {
    name: "Nike Air Force 1 '07",
    description: "The radiance lives on in the Nike Air Force 1 '07.",
    price: "115.00",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png",
    category: "Shoes",
    stock: 75,
  },
  {
    name: "Nike Dunk Low",
    description: "Created for the hardwood but taken to the streets.",
    price: "115.00",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b1bcbca4-e853-4df7-b329-5be3c61ee057/DUNK+LOW+RETRO.png",
    category: "Shoes",
    stock: 60,
  },
  {
    name: "Nike Sportswear Club Fleece",
    description: "Soft and comfortable fleece hoodie for everyday wear.",
    price: "60.00",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/hzbojyxp7xzpzxh2ov7a/CLUB+HOODIE.png",
    category: "Apparel",
    stock: 100,
  },
  {
    name: "Nike Pro Dri-FIT",
    description: "Tight-fitting training top with sweat-wicking technology.",
    price: "35.00",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/fb7d5ed9-e5e4-4d3a-8d8a-5e6d0f5f5f5f/pro-dri-fit-tight-fit-sleeveless-top.png",
    category: "Apparel",
    stock: 80,
  },
  {
    name: "Nike Heritage86 Cap",
    description: "Classic cap with adjustable strap for the perfect fit.",
    price: "24.00",
    imageUrl: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c3c3c3c3-c3c3-4c3c-3c3c-3c3c3c3c3c3c/heritage86-adjustable-hat.png",
    category: "Accessories",
    stock: 120,
  },
];

async function seed() {
  console.log("🌱 Seeding database...");
  
  try {
    await db.insert(products).values(nikeProducts);
    console.log("✅ Seeded Nike products successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seed();
