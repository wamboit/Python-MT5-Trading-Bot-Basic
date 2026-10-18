/* Wambo Home & Living — catalogue data, filtering and WhatsApp ordering.
   Sample data only; no external services required. */

// Replace with the business's real WhatsApp number (international format, no "+").
const WHATSAPP_NUMBER = "254700000000";

const CATEGORIES = ["All", "Beds", "Sofas", "Tables", "Home Accessories"];

const PRODUCTS = [
  {
    name: "Savannah 5x6 Wooden Bed",
    category: "Beds",
    price: 24500,
    desc: "Solid mahogany frame with a warm matte finish. Fits a 5x6 mattress.",
    icon: "bed",
    tone: "#e8d5c0",
  },
  {
    name: "Bongo Queen Bed with Headboard",
    category: "Beds",
    price: 38900,
    desc: "Upholstered headboard and sturdy pine slats. Mattress sold separately.",
    icon: "bed",
    tone: "#d9c3a5",
  },
  {
    name: "Nyayo 3-Seater Sofa",
    category: "Sofas",
    price: 32000,
    desc: "Hard-wearing Kenyan fabric in earthy tones with solid wood legs.",
    icon: "sofa",
    tone: "#c9d6c3",
  },
  {
    name: "Kilifi L-Shaped Sofa Set",
    category: "Sofas",
    price: 56000,
    desc: "Modular corner sofa with deep cushions — perfect for family rooms.",
    icon: "sofa",
    tone: "#c3cdd6",
  },
  {
    name: "Jamhuri 6-Seater Dining Table",
    category: "Tables",
    price: 27500,
    desc: "Wide teak-finish table with six matching chairs, family gathering ready.",
    icon: "table",
    tone: "#e0d0b8",
  },
  {
    name: "Zawadi Coffee Table",
    category: "Tables",
    price: 9800,
    desc: "Compact coffee table with a lower shelf for magazines and remotes.",
    icon: "table",
    tone: "#d6c3c3",
  },
  {
    name: "Study & Work Desk",
    category: "Tables",
    price: 12500,
    desc: "A tidy desk with two drawers — great for students and home offices.",
    icon: "table",
    tone: "#cdd6c3",
  },
  {
    name: "Kitenge Accent Cushions (Set of 4)",
    category: "Home Accessories",
    price: 3200,
    desc: "Vibrant Kitenge-print cushion covers to brighten any sofa or bed.",
    icon: "cushion",
    tone: "#e6c9a8",
  },
  {
    name: "Handwoven Sisal Basket Set",
    category: "Home Accessories",
    price: 2500,
    desc: "Three nesting kiondoo baskets for storage, plants or laundry.",
    icon: "basket",
    tone: "#d8c9a0",
  },
  {
    name: "Acacia Floor Lamp",
    category: "Home Accessories",
    price: 4500,
    desc: "Warm ambient lighting with a woven shade and solid wood stand.",
    icon: "lamp",
    tone: "#c9c3a0",
  },
  {
    name: "Mango Wood Wall Mirror",
    category: "Home Accessories",
    price: 6800,
    desc: "Round carved mirror that adds light and space to any room.",
    icon: "mirror",
    tone: "#c3d6d0",
  },
  {
    name: "4-Door Wardrobe",
    category: "Beds",
    price: 41500,
    desc: "Spacious wardrobe with a hanging rail, shelves and a full-length mirror.",
    icon: "wardrobe",
    tone: "#d9c9b8",
  },
];

/* ---------- Placeholder image generation (offline SVG data URIs) ---------- */

const ICON_PATHS = {
  bed: "M20 60 L20 44 Q20 38 26 38 L74 38 Q80 38 80 44 L80 60 Z M20 60 L14 72 M80 60 L86 72 M26 38 L26 30 M40 30 L60 30 Q66 30 66 36 L66 38",
  sofa: "M18 46 Q18 38 26 38 L70 38 Q78 38 78 46 L78 62 L18 62 Z M14 46 L14 62 L18 62 M82 46 L82 62 L78 62 M30 38 L30 28 Q30 24 34 24 L62 24 Q66 24 66 28 L66 38",
  table: "M14 40 L86 40 M22 40 L22 68 M78 40 L78 68 M40 40 L40 68 M60 40 L60 68",
  wardrobe: "M28 24 L72 24 L72 76 L28 76 Z M50 24 L50 76 M44 44 L44 52 M56 44 L56 52",
  cushion: "M26 26 L74 26 L74 74 L26 74 Z Q20 50 26 26 M74 26 Q80 50 74 74 M26 74 Q50 80 74 74 M26 26 Q50 20 74 26",
  basket: "M24 38 L76 38 L70 74 L30 74 Z M24 38 Q50 28 76 38 M36 38 L40 74 M50 30 L50 74 M64 38 L60 74",
  lamp: "M50 30 L34 30 L40 16 L60 16 L66 30 L50 30 Z M50 30 L50 74 M38 80 L62 80 M42 74 L58 74",
  mirror: "M50 22 Q66 22 66 46 Q66 70 50 70 Q34 70 34 46 Q34 22 50 22 Z M44 30 Q38 38 38 48",
};

function placeholderImage(product) {
  const icon = ICON_PATHS[product.icon] || ICON_PATHS.table;
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">` +
    `<rect width="100" height="100" fill="${product.tone}"/>` +
    `<circle cx="50" cy="46" r="30" fill="rgba(255,255,255,0.35)"/>` +
    `<path d="${icon}" fill="none" stroke="#5b4632" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" transform="translate(0,-6) scale(1)"/>` +
    `</svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

/* ---------- WhatsApp ordering ---------- */

function whatsappUrl(message) {
  return (
    "https://wa.me/" + WHATSAPP_NUMBER +
    "?text=" + encodeURIComponent(message)
  );
}

function orderUrl(product) {
  const message =
    `Hello Wambo Home & Living! I would like to order the ` +
    `"${product.name}" (${product.category}) listed at KES ${product.price.toLocaleString("en-KE")}. ` +
    `Is it available?`;
  return whatsappUrl(message);
}

/* ---------- Rendering ---------- */

const grid = document.getElementById("product-grid");
const chipsWrap = document.getElementById("category-chips");
const searchInput = document.getElementById("search-input");
const resultsCount = document.getElementById("results-count");
const emptyState = document.getElementById("empty-state");

let activeCategory = "All";
let activeQuery = "";

function createChip(category) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "chip" + (category === activeCategory ? " active" : "");
  btn.textContent = category;
  btn.addEventListener("click", () => {
    activeCategory = category;
    renderChips();
    renderProducts();
  });
  return btn;
}

function renderChips() {
  chipsWrap.replaceChildren(...CATEGORIES.map(createChip));
}

function createCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  const img = document.createElement("img");
  img.className = "product-image";
  img.src = placeholderImage(product);
  img.alt = "Placeholder image of " + product.name;
  img.loading = "lazy";

  const body = document.createElement("div");
  body.className = "product-body";

  const cat = document.createElement("p");
  cat.className = "product-category";
  cat.textContent = product.category;

  const name = document.createElement("h3");
  name.className = "product-name";
  name.textContent = product.name;

  const desc = document.createElement("p");
  desc.className = "product-desc";
  desc.textContent = product.desc;

  const price = document.createElement("p");
  price.className = "product-price";
  price.textContent = "KES " + product.price.toLocaleString("en-KE");

  const orderBtn = document.createElement("a");
  orderBtn.className = "btn btn-whatsapp";
  orderBtn.href = orderUrl(product);
  orderBtn.target = "_blank";
  orderBtn.rel = "noopener";
  orderBtn.setAttribute(
    "aria-label",
    "Order " + product.name + " on WhatsApp"
  );
  orderBtn.textContent = "Order on WhatsApp";

  body.append(cat, name, desc, price, orderBtn);
  card.append(img, body);
  return card;
}

function matches(product) {
  const inCategory =
    activeCategory === "All" || product.category === activeCategory;
  const query = activeQuery.trim().toLowerCase();
  const inSearch =
    query === "" ||
    product.name.toLowerCase().includes(query) ||
    product.desc.toLowerCase().includes(query) ||
    product.category.toLowerCase().includes(query);
  return inCategory && inSearch;
}

function renderProducts() {
  const visible = PRODUCTS.filter(matches);
  grid.replaceChildren(...visible.map(createCard));
  emptyState.hidden = visible.length > 0;
  resultsCount.textContent =
    visible.length === PRODUCTS.length
      ? `Showing all ${visible.length} products`
      : `Showing ${visible.length} of ${PRODUCTS.length} products`;
}

/* ---------- Wiring ---------- */

searchInput.addEventListener("input", (e) => {
  activeQuery = e.target.value;
  renderProducts();
});

// Header/hero WhatsApp buttons and contact links use the general greeting.
const generalUrl = whatsappUrl(
  "Hello Wambo Home & Living! I saw your catalogue online and I have a question."
);
for (const el of document.querySelectorAll(".whatsapp-link")) {
  el.href = generalUrl;
}
const heroWa = document.getElementById("hero-whatsapp");
if (heroWa) heroWa.href = generalUrl;

document.getElementById("year").textContent = new Date().getFullYear();

renderChips();
renderProducts();
