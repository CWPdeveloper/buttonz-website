
"use client";

import { useEffect, useState } from "react";
import {
  Eye,
  ShoppingBag,
  X,
  Minus,
  Plus,
  Trash2,
  MessageCircle,
} from "lucide-react";

const WHATSAPP_NUMBER = "923188316095";

const products = [
  {
    id: 1,
    name: "Classic Oversized Hoodie",
    badge: "SALE",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&q=85",
    alternate:
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=900&q=85",
  },
  {
    id: 2,
    name: "Premium Street Hoodie",
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=900&q=85",
    alternate:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&q=85",
  },
  {
    id: 3,
    name: "Everyday Pullover Hoodie",
    badge: "SALE",
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=900&q=85",
    alternate:
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=900&q=85",
  },
];

type Product = (typeof products)[number];

type CartItem = {
  product: Product;
  size: string;
  quantity: number;
};

export default function WinterCollection() {
    const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [wishlistLoaded, setWishlistLoaded] = useState(false);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);

  if (params.get("search") === "open") {
    document.getElementById("product-search")?.focus();
  }
}, []);

const filteredProducts = products.filter((product) =>
  product.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) &&
  (!showWishlistOnly || wishlist.includes(product.id))
);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);

const [cartLoaded, setCartLoaded] = useState(false);

// Restore saved cart when page opens
useEffect(() => {
  try {
    const saved = localStorage.getItem("buttonz-cart-v1");

    if (saved) {
      const parsed: unknown = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        const restored: CartItem[] = [];

        for (const entry of parsed) {
          if (!entry || typeof entry !== "object") continue;

          const item = entry as {
            id?: unknown;
            size?: unknown;
            quantity?: unknown;
          };

          const product = products.find(
            (p) => p.id === item.id
          );

          const validSize =
            typeof item.size === "string" &&
            ["S", "M", "L", "XL", "XXL"].includes(item.size);

          const validQuantity =
            typeof item.quantity === "number" &&
            Number.isInteger(item.quantity) &&
            item.quantity >= 1 &&
            item.quantity <= 99;

          if (product && validSize && validQuantity) {
            restored.push({
              product,
              size: item.size as string,
              quantity: item.quantity as number,
            });
          }
        }

        setCart(restored);
      }
    }
  } catch {
    // Invalid saved data: start with an empty cart.
  } finally {
    setCartLoaded(true);
  }
}, []);

// Save cart when products or quantities change
useEffect(() => {
  if (!cartLoaded) return;

  const savedItems = cart.map((item) => ({
    id: item.product.id,
    size: item.size,
    quantity: item.quantity,
  }));

  try {
    localStorage.setItem(
      "buttonz-cart-v1",
      JSON.stringify(savedItems)
    );
  } catch {
    // Shopping still works for this session
    // if browser storage is unavailable.
  }
}, [cart, cartLoaded]);

  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(
        localStorage.getItem("buttonz-wishlist-v1") || "[]"
      );
      if (Array.isArray(saved)) {
        setWishlist(
          saved.filter(
            (id): id is number =>
              typeof id === "number" && products.some((p) => p.id === id)
          )
        );
      }
    } catch {
      // Keep an empty wishlist if saved data is unavailable.
    } finally {
      setWishlistLoaded(true);
    }

    const params = new URLSearchParams(window.location.search);
    if (params.get("wishlist") === "open") {
      setShowWishlistOnly(true);
      document.getElementById("hoodies")?.scrollIntoView();
    }
  }, []);

  useEffect(() => {
    if (!wishlistLoaded) return;
    try {
      localStorage.setItem("buttonz-wishlist-v1", JSON.stringify(wishlist));
    } catch {
      // Wishlist still works for the current session.
    }
  }, [wishlist, wishlistLoaded]);

  function toggleWishlist(productId: number) {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  }
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);

  if (params.get("cart") === "open") {
    setCartOpen(true);
  }
}, []);

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  function openProduct(product: Product) {
    setSelected(product);
    setSize("");
    setQuantity(1);
  }

  function addToCart() {
    if (!selected || !size) return;

    setCart((previous) => {
      const existing = previous.find(
        (item) =>
          item.product.id === selected.id &&
          item.size === size
      );

      if (existing) {
        return previous.map((item) =>
          item.product.id === selected.id &&
          item.size === size
            ? {
                ...item,
                quantity: Math.min(
                  99,
                  item.quantity + quantity
                ),
              }
            : item
        );
      }

      return [
        ...previous,
        {
          product: selected,
          size,
          quantity,
        },
      ];
    });

    setSelected(null);
    setCartOpen(true);
  }

  function changeCartQuantity(
    productId: number,
    itemSize: string,
    amount: number
  ) {
    setCart((previous) =>
      previous.map((item) =>
        item.product.id === productId &&
        item.size === itemSize
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(99, item.quantity + amount)
              ),
            }
          : item
      )
    );
  }

  function removeItem(productId: number, itemSize: string) {
    setCart((previous) =>
      previous.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.size === itemSize
          )
      )
    );
  }

  function checkoutWhatsApp() {
    if (cart.length === 0) return;

    const lines = cart.map(
      (item, index) =>
        `${index + 1}. ${item.product.name}\n` +
        `Size: ${item.size}\n` +
        `Quantity: ${item.quantity}`
    );

    const message = [
      "Hello BUTTONZ!",
      "",
      "I would like to enquire about ordering:",
      "",
      ...lines,
      "",
      "Please confirm prices, colors, availability,",
      "delivery charges and order details.",
    ].join("\n");

    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=` +
      encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <main className="winter-page">
      <section className="winter-banner">
        <span>BUTTONZ / WINTER COLLECTION</span>
        <h1>
          WINTER
          <br />
          COLLECTION
        </h1>
        <p>Discover your next favorite hoodie.</p>
      </section>

      <section id="hoodies" className="winter-products">
        <div className="winter-heading">
          <span>THE BUTTONZ COLLECTION</span>
          <h2>SHOP HOODIES</h2>
          <p>
            Premium everyday hoodies for your winter wardrobe.
          </p>
        </div>

        <div className="buttonz-cart-toolbar">
          <span>{filteredProducts.length} HOODIE STYLES</span>

          <button
            type="button"
            className="buttonz-wishlist-filter"
            onClick={() => setShowWishlistOnly((current) => !current)}
            aria-pressed={showWishlistOnly}
          >
            {showWishlistOnly ? "SHOW ALL HOODIES" : `♡ SAVED (${wishlist.length})`}
          </button>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="buttonz-cart-trigger"
          >
            <ShoppingBag size={19} />
            MY CART ({cartCount})
          </button>
        </div>
<div style={{ marginBottom: "25px" }}>
  <input
    id="product-search"
    type="search"
    placeholder="Search hoodies..."
    aria-label="Search hoodies"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      width: "100%",
      padding: "16px 20px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      fontSize: "16px",
      background: "#fff",
      color: "#193653",
    }}
  />
</div>

{filteredProducts.length === 0 && (
  <p style={{ marginBottom: "30px", color: "#666" }}>
    {showWishlistOnly
      ? "No saved hoodies match. Save a hoodie or show all products."
      : "No hoodies found. Try another search."}
  </p>
)}
        <div className="hoodie-grid">
        {filteredProducts.map((product) => (
            <article className="hoodie-card" key={product.id}>
              <div className="hoodie-image-wrap">
                <span className="hoodie-badge">
                  {product.badge}
                </span>

                <img
                  src={product.image}
                  alt={product.name}
                  className="hoodie-front"
                />

                <img
                  src={product.alternate}
                  alt={`${product.name} alternate view`}
                  className="hoodie-back"
                />

                <div className="hoodie-actions">
                  <button
                    type="button"
                    onClick={() => openProduct(product)}
                  >
                    <Eye size={17} />
                    Quick View
                  </button>

                  <button
                    type="button"
                    onClick={() => openProduct(product)}
                  >
                    <ShoppingBag size={17} />
                    Quick Shop
                  </button>
                </div>
              </div>

              <div className="hoodie-info">
                <h3>{product.name}</h3>
                <p>Price on request</p>

                <button
                  type="button"
                  className="buttonz-wishlist-toggle"
                  onClick={() => toggleWishlist(product.id)}
                  aria-pressed={wishlist.includes(product.id)}
                  aria-label={
                    wishlist.includes(product.id)
                      ? `Remove ${product.name} from wishlist`
                      : `Save ${product.name} to wishlist`
                  }
                >
                  <span aria-hidden="true">
                    {wishlist.includes(product.id) ? "♥" : "♡"}
                  </span>
                  {wishlist.includes(product.id) ? " Saved" : " Save to Wishlist"}
                </button>

                <button
                  type="button"
                  className="buttonz-card-add"
                  onClick={() => openProduct(product)}
                >
                  Select Size & Add to Cart
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Product Quick View */}
      {selected && (
        <div
          className="hoodie-modal-overlay"
          onClick={() => setSelected(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-label={selected.name}
            className="hoodie-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="hoodie-modal-close"
              aria-label="Close"
              onClick={() => setSelected(null)}
            >
              <X size={22} />
            </button>

            <img src={selected.image} alt={selected.name} />

            <div className="hoodie-modal-details">
              <span>BUTTONZ WINTER COLLECTION</span>

              <h2>{selected.name}</h2>
              <h3>Price on request</h3>

              <p>Select Size:</p>

              <div className="hoodie-size-options">
                {sizes.map((option) => (
                  <button
                    type="button"
                    key={option}
                    className={
                      size === option ? "selected" : ""
                    }
                    onClick={() => setSize(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <p>Quantity:</p>

              <div className="buttonz-quantity">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() =>
                    setQuantity(Math.max(1, quantity - 1))
                  }
                >
                  <Minus size={16} />
                </button>

                <strong>{quantity}</strong>

                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() =>
                    setQuantity(Math.min(99, quantity + 1))
                  }
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                type="button"
                className="hoodie-enquiry-button"
                disabled={!size}
                onClick={addToCart}
              >
                <ShoppingBag size={18} />
                ADD TO CART
              </button>

              {!size && (
                <p className="buttonz-size-hint">
                  Please select a size first.
                </p>
              )}
            </div>
          </section>
        </div>
      )}

      {/* Cart Drawer */}
      {cartOpen && (
        <div className="buttonz-cart-overlay">
          <button
            className="buttonz-cart-backdrop"
            type="button"
            aria-label="Close cart"
            onClick={() => setCartOpen(false)}
          />

          <aside
            className="buttonz-cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
            <div className="buttonz-cart-header">
              <div>
                <span>BUTTONZ</span>
                <h2>YOUR CART ({cartCount})</h2>
              </div>

              <button
                type="button"
                aria-label="Close cart"
                onClick={() => setCartOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <div className="buttonz-cart-items">
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div
                    className="buttonz-cart-item"
                    key={`${item.product.id}-${item.size}`}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                    />

                    <div>
                      <h3>{item.product.name}</h3>
                      <p>Size: {item.size}</p>
                      <p>Price on request</p>

                      <div className="buttonz-cart-controls">
                        <button
                          type="button"
                          onClick={() =>
                            changeCartQuantity(
                              item.product.id,
                              item.size,
                              -1
                            )
                          }
                        >
                          <Minus size={14} />
                        </button>

                        <strong>{item.quantity}</strong>

                        <button
                          type="button"
                          onClick={() =>
                            changeCartQuantity(
                              item.product.id,
                              item.size,
                              1
                            )
                          }
                        >
                          <Plus size={14} />
                        </button>

                        <button
                          type="button"
                          aria-label="Remove item"
                          onClick={() =>
                            removeItem(
                              item.product.id,
                              item.size
                            )
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="buttonz-cart-footer">
              <p>
                Final prices and delivery charges will be
                confirmed by BUTTONZ on WhatsApp.
              </p>

              <button
                type="button"
                disabled={cart.length === 0}
                onClick={checkoutWhatsApp}
              >
                <MessageCircle size={20} />
                CHECKOUT ON WHATSAPP
              </button>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
