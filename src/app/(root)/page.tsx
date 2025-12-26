import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/db/schema";

const placeholderProducts: Product[] = [
  {
    id: 1,
    name: "Classic Runner",
    description: "Experience ultimate comfort and style with our Classic Runner. Perfect for daily wear and light exercise.",
    price: "89.99",
    imageUrl: "/shoes/shoe-1.jpg",
    category: "Running",
    stock: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Urban Explorer",
    description: "Sleek design meets durability. The Urban Explorer is built for the modern city dweller.",
    price: "110.00",
    imageUrl: "/shoes/shoe-2.webp",
    category: "Lifestyle",
    stock: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "Air Breeze",
    description: "Lightweight and breathable, the Air Breeze keeps your feet cool even on the hottest days.",
    price: "75.50",
    imageUrl: "/shoes/shoe-3.webp",
    category: "Sport",
    stock: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "Mountain Peak",
    description: "Rugged and ready for any trail. The Mountain Peak provides superior grip and ankle support.",
    price: "145.00",
    imageUrl: "/shoes/shoe-4.webp",
    category: "Hiking",
    stock: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
];

export default async function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Shoes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {placeholderProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
