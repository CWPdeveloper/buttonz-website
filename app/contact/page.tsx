
import {
  MessageCircle,
  Phone,
  ShoppingBag,
  Truck,
  ArrowUpRight,
} from "lucide-react";

export const metadata = {
  title: "Contact Us | BUTTONZ",
  description:
    "Contact BUTTONZ for hoodie orders, sizes and delivery information.",
};

const whatsappNumber = "923188316095";

const whatsappMessage = encodeURIComponent(
  "Hello BUTTONZ! I would like to enquire about your hoodie collection."
);

const whatsappLink =
  `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

export default function Contact() {
  return (
    <main>
      <section className="inner-hero">
        <div className="eyebrow">
          LET'S TALK / BUTTONZ
        </div>

        <h1>
          GOT A
          <br />
          <em>QUESTION?</em>
        </h1>

        <p>
          Need help with hoodie sizes, colors,
          availability or your next order?
          We're here to help.
        </p>
      </section>

      <section className="buttonz-contact-section">
        <div className="buttonz-contact-intro">
          <span>GET IN TOUCH</span>

          <h2>
            LET'S
            <br />
            CONNECT.
          </h2>

          <p>
            Have a question about our winter collection?
            Contact BUTTONZ directly on WhatsApp.
          </p>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="buttonz-whatsapp-button"
          >
            <MessageCircle size={21} />
            CHAT ON WHATSAPP
            <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="buttonz-contact-info">
          <h3>CONTACT INFORMATION</h3>

          <div className="buttonz-contact-row">
            <Phone size={23} />

            <div>
              <strong>WhatsApp / Phone</strong>
              <a href="tel:+923188316095">
                +92 318 8316095
              </a>
            </div>
          </div>

          <div className="buttonz-contact-row">
            <Truck size={23} />

            <div>
              <strong>Delivery</strong>
              <p>Available All Over Pakistan</p>
            </div>
          </div>

          <div className="buttonz-contact-row">
            <ShoppingBag size={23} />

            <div>
              <strong>Order Enquiries</strong>
              <p>
                Hoodies, sizes, colors and availability
              </p>
            </div>
          </div>

          <div className="buttonz-contact-note">
            Final product prices, availability and
            delivery charges are confirmed before
            your order is finalized.
          </div>
        </div>
      </section>
    </main>
  );
}
