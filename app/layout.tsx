import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { UserRound, Search, Bookmark, ShoppingBag } from "lucide-react";


export const metadata: Metadata = {
  title: "BUTTONZ | Hoodies Made Different",
  description: "Discover BUTTONZ hoodies and streetwear. Explore the collection and contact us for orders.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
       <div className="announcement">
  DELIVERY AVAILABLE ALL OVER PAKISTAN
</div>

<header className="buttonz-header">

  {/* Left Navigation */}
  <nav className="buttonz-left-nav">
    <Link href="/">HOME</Link>

    <div className="buttonz-dropdown">
      <Link href="/winter-collection">
        WINTER COLLECTION ⌄
      </Link>

      <div className="buttonz-dropdown-menu">
        <Link href="/winter-collection#hoodies">
          Hoodies
        </Link>
      </div>
    </div>

    <Link href="/about">ABOUT</Link>
    <Link href="/contact">CONTACT</Link>
  </nav>

  {/* Center BUTTONZ Logo */}
  <Link href="/" className="buttonz-logo-center">
    <img
      src="/buttonz-logo.png"
      alt="BUTTONZ Logo"
    />
    <span>BUTTONZ</span>
  </Link>

  {/* Right Icons */}
  <div className="buttonz-header-icons">
    <Link href="/contact" aria-label="Account">
      <UserRound size={22} strokeWidth={1.5} />
    </Link>

    <Link href="/#collection" aria-label="Search products">
      <Search size={22} strokeWidth={1.5} />
    </Link>

    <Link href="/#collection" aria-label="Wishlist">
      <Bookmark size={22} strokeWidth={1.5} />
    </Link>

    <Link href="/contact" aria-label="Order enquiries">
      <ShoppingBag size={22} strokeWidth={1.5} />
    </Link>
  </div>

</header>

        {children}
        <footer className="footer"><div className="footer-top"><div><div className="footer-brand">BUTTONZ<span>.</span></div><p>Built for comfort. Styled for everywhere.</p></div><div className="footer-links"><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link></div></div><div className="footer-bottom"><span>© 2026 BUTTONZ. All rights reserved.</span><span>Originals only. Everyday essentials.</span></div></footer>
      </body>
    </html>
  );
}
