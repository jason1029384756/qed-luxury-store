import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// -------------------- MOCK DATA --------------------
const MOCK_PRODUCTS = [
  {
    id: "qed-coat-001",
    name: "Wool Overcoat",
    price: 180,
    currency: "GBP",
    images: [
      "https://images.unsplash.com/photo-1618354691431-38c4d2c6c3bb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 3, S: 5, M: 7, L: 4, XL: 2 },
    category: "Outerwear",
    description:
      "A refined wool overcoat with classical tailoring, designed for modern professionals."
  },
  {
    id: "qed-shirt-001",
    name: "Oxford Dress Shirt",
    price: 85,
    currency: "GBP",
    images: [
      "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1602810318383-e0dcb9e4b6aa?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 6, S: 9, M: 12, L: 7, XL: 3 },
    category: "Shirts",
    description:
      "Crisp oxford cotton shirt with a tailored fit and timeless silhouette."
  },
  {
    id: "qed-trousers-001",
    name: "Pleated Wool Trousers",
    price: 140,
    currency: "GBP",
    images: [
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 4, S: 7, M: 9, L: 6, XL: 2 },
    category: "Trousers",
    description:
      "Elegant pleated trousers with soft structure and precise tailoring."
  },
  {
    id: "qed-coat-002",
    name: "Structured Trench Coat",
    price: 220,
    currency: "GBP",
    images: [
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1542060748-10c28b62716c?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 2, S: 5, M: 8, L: 4, XL: 1 },
    category: "Outerwear",
    description:
      "Modern trench coat with clean lines and classical proportions."
  },
  {
    id: "qed-shirt-002",
    name: "Formal Poplin Shirt",
    price: 90,
    currency: "GBP",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618354691431-38c4d2c6c3bb?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 5, S: 8, M: 10, L: 6, XL: 3 },
    category: "Shirts",
    description:
      "Premium poplin weave for a crisp and polished formal look."
  },
  {
    id: "qed-trousers-002",
    name: "High-Waist Formal Trousers",
    price: 155,
    currency: "GBP",
    images: [
      "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 3, S: 6, M: 9, L: 5, XL: 2 },
    category: "Trousers",
    description:
      "High-waisted formal trousers with architectural tailoring and refined drape."
  },
  {
    id: "qed-blazer-001",
    name: "Classic Tailored Blazer",
    price: 195,
    currency: "GBP",
    images: [
      "https://images.unsplash.com/photo-1593032465171-b5e1b50e3fa1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 4, S: 7, M: 9, L: 5, XL: 2 },
    category: "Outerwear",
    description:
      "Structured blazer crafted for a commanding yet refined presence."
  },
  {
    id: "qed-coat-003",
    name: "Double-Breasted Overcoat",
    price: 260,
    currency: "GBP",
    images: [
      "https://images.unsplash.com/photo-1542060748-10c28b62716c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618354691431-38c4d2c6c3bb?auto=format&fit=crop&w=1200&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: { XS: 2, S: 4, M: 6, L: 3, XL: 1 },
    category: "Outerwear",
    description:
      "Double-breasted overcoat inspired by classical menswear architecture."
  }
];

// -------------------- MAIN APP --------------------
export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (product, size) => {
    setCart([...cart, { ...product, size, quantity: 1 }]);
    setPage("cart");
  };

  const addToWishlist = (product) => {
    if (!wishlist.find((p) => p.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 font-sans">
      <Header setPage={setPage} cartCount={cart.length} />
      {page === "home" && (
        <LandingPage
          setPage={setPage}
          setSelectedProduct={setSelectedProduct}
        />
      )}
      {page === "shop" && (
        <ShopPage
          products={MOCK_PRODUCTS}
          setSelectedProduct={setSelectedProduct}
          setPage={setPage}
          addToWishlist={addToWishlist}
        />
      )}
      {page === "product" && selectedProduct && (
        <ProductPage
          product={selectedProduct}
          addToCart={addToCart}
          addToWishlist={addToWishlist}
        />
      )}
      {page === "wishlist" && (
        <WishlistPage
          wishlist={wishlist}
          setSelectedProduct={setSelectedProduct}
          setPage={setPage}
        />
      )}
      {page === "cart" && (
        <CartPage cart={cart} setCart={setCart} setPage={setPage} />
      )}
      {page === "checkout" && <CheckoutPage cart={cart} />}
      <Footer />
    </div>
  );
}

// -------------------- HEADER --------------------
function Header({ setPage, cartCount }) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-neutral-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-5">
        <h1
          className="text-3xl font-serif tracking-wide cursor-pointer"
          onClick={() => setPage("home")}
        >
          QED
        </h1>
        <nav className="flex items-center gap-8 text-sm uppercase tracking-widest">
          <button onClick={() => setPage("shop")}>Shop</button>
          <button onClick={() => setPage("wishlist")}>Wishlist</button>
          <button onClick={() => setPage("cart")">
            Cart ({cartCount})
          </button>
        </nav>
      </div>
    </header>
  );
}

// -------------------- LANDING PAGE --------------------
function LandingPage({ setPage, setSelectedProduct }) {
  return (
    <>
      <HeroSection setPage={setPage} />
      <Section title="New Launches">
        <ProductGrid
          products={MOCK_PRODUCTS.slice(0, 3)}
          setSelectedProduct={setSelectedProduct}
          setPage={setPage}
        />
      </Section>
      <Section title="Top Featured">
        <ProductGrid
          products={MOCK_PRODUCTS.slice(3, 6)}
          setSelectedProduct={setSelectedProduct}
          setPage={setPage}
        />
      </Section>
      <Section title="Shop Men / Women">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CategoryCard title="Shop Men" image="https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=1200&q=80" />
          <CategoryCard title="Shop Women" image="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80" />
        </div>
      </Section>
      <Section title="Categories">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
        