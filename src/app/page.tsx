import { db } from "@/db";
import { products } from "@/db/schema";
import { ProductList } from "@/components/ProductList";

export default async function Home() {
  const allProducts = await db.select().from(products);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">
              Nike Store
            </h1>
            <span className="text-sm text-gray-500">
              {allProducts.length} products
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductList products={allProducts} />
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            Built with Next.js, Drizzle ORM, and Neon PostgreSQL
          </p>
        </div>
      </footer>
    </div>
  );
}
