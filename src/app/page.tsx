import { db } from "@/db";
import { products } from "@/db/schema";
import { ProductList } from "@/components/ProductList";

export default async function Home() {
  const allProducts = await db.select().from(products);

  return (
   <h1 className="text-heading-1">testando a fonte</h1>
  );
}
