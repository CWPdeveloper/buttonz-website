import Link from "next/link";

const products = [
  { name: "THE CORE HOODIE", type: "Essential heavyweight · Unisex", label: "BEST SELLER", tone: "sand", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&q=85" },
  { name: "THE EVERYDAY ZIP", type: "Zip-through · Relaxed fit", label: "NEW DROP", tone: "grey", image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=900&q=85" },
  { name: "THE STREET PULLOVER", type: "Oversized · Premium fleece", label: "LIMITED", tone: "blue", image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=900&q=85" },
];

export default function Home() {
  return <main>
    <section className="hero">
      <div className="hero-content"><div className="eyebrow"><span className="small-line" /> THE NEW SEASON IS HERE</div><h1>GOOD<br /><em>HOODIES.</em><br />NO COMPROMISE.</h1><p>Laid-back comfort. Standout style. Meet the everyday hoodie you won’t want to take off.</p><div className="hero-actions"><a className="button button-white" href="#collection">Explore the collection <span>↗</span></a><Link className="text-link" href="/about">Discover BUTTONZ <span>→</span></Link></div><div className="hero-bottom"><span>EST. 2026</span><span>SCROLL TO EXPLORE ↓</span></div></div>
      <div className="hero-visual"><div className="hero-photo" role="img" aria-label="Winter streetwear collection" /><div className="hero-vertical">BUTTONZ / NEW SEASON</div><div className="hero-photo-tag">THE WINTER EDIT <span>01 / 03</span></div></div>
    </section>
    <section className="ticker"><span>COMFORT IN EVERY DETAIL</span><span>✳</span><span>MADE FOR EVERYDAY</span><span>✳</span><span>OWN YOUR STYLE</span><span>✳</span><span>COMFORT IN EVERY DETAIL</span></section>
    <section id="collection" className="collection section-wrap"><div className="section-heading"><div><div className="eyebrow dark-eye">THE BUTTONZ LINEUP / 001</div><h2>YOUR NEXT<br /><em>FAVORITE FIT.</em></h2></div><p>Clean silhouettes, easy layers, all-day comfort. Discover our hoodie essentials.</p></div><div className="product-grid">{products.map((product, i) => <article className="product" key={product.name}><div className={`product-image ${product.tone}`} style={{backgroundImage:`url('${product.image}')`}}><span className="product-badge">{product.label}</span><span className="product-index">0{i+1}</span></div><div className="product-meta"><div><h3>{product.name}</h3><p>{product.type}</p></div><Link href="/contact" className="circle-arrow" aria-label={`Enquire about ${product.name}`}>↗</Link></div></article>)}</div><div className="collection-note">Interested in a hoodie? <Link href="/contact">Contact us to check colors, sizes & availability ↗</Link></div></section>
    <section className="brand-story"><div className="story-logo"><img src="/buttonz-logo.png" alt="BUTTONZ original brand logo" /></div><div className="story-copy"><div className="eyebrow">MORE THAN A HOODIE</div><h2>YOUR COMFORT.<br /><em>YOUR RULES.</em></h2><p>BUTTONZ is about the pieces you reach for again and again. Effortless layers, a confident fit, and a little attitude in every detail.</p><Link className="button button-outline" href="/about">The BUTTONZ story <span>↗</span></Link></div></section>
    <section className="closing-cta section-wrap"><span>READY FOR THE DROP?</span><h2>FIND YOUR<br /><em>NEW UNIFORM.</em></h2><Link className="button button-dark" href="/contact">Contact BUTTONZ <span>↗</span></Link></section>
  </main>;
}
