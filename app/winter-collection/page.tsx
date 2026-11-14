
"use client";

import { useState } from "react";
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
  const [selected, setSelected] = useState<Product | null>(null);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

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
          <span>{products.length} HOODIE STYLES</span>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="buttonz-cart-trigger"
          >
            <ShoppingBag size={19} />
            MY CART ({cartCount})
          </button>
        </div>

        <div className="hoodie-grid">
          {products.map((product) => (
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
