import type { Product } from "../types";

export const productCatalog: Product[] = [
  {
    id: 1,
    name: "Millet Spoons",
    category: "Spoons & Forks",
    description:
      "Edible spoons made from millet and wheat-based dough for cafes, events and hospitality settings that need plastic-free service.",
    price: 149,
    originalPrice: 199,
    bulkPrice: 4.5,
    image: "/images/cutlery-01.jpeg",
    badge: "Best Seller",
    rating: 4.8,
    reviews: 132,
    stock: 48,
    featured: true,
    tags: "spoon, millet, edible cutlery, eco-tableware",
  },
  {
    id: 2,
    name: "Millet Forks",
    category: "Spoons & Forks",
    description:
      "Durable edible forks designed for everyday meals, catering service and eco-friendly takeaway without the burden of plastic waste.",
    price: 159,
    originalPrice: 209,
    bulkPrice: 4.9,
    image: "/images/spoons-bowls-cups-set.jpeg",
    badge: "Popular",
    rating: 4.7,
    reviews: 118,
    stock: 56,
    featured: true,
    tags: "fork, millet, edible cutlery, sustainable dining",
  },
  {
    id: 3,
    name: "Plain Millet Cups",
    category: "Cups",
    description:
      "Plain, natural-finish cups designed for coffee, tea and takeaway beverages where a compostable, food-based alternative is preferred.",
    price: 179,
    originalPrice: 229,
    bulkPrice: 5.5,
    image: "/images/coffeecups.jpeg",
    badge: "Customer Favorite",
    rating: 4.9,
    reviews: 175,
    stock: 41,
    featured: true,
    tags: "cup, coffee, millet, edible beverage ware",
  },
  {
    id: 4,
    name: "Edible Straws",
    category: "Straws",
    description:
      "Smooth-edged edible straws made for cold drinks, desserts and food-service setups that need to replace plastic and plastic-lined paper straws.",
    price: 89,
    originalPrice: 119,
    bulkPrice: 2,
    image: "/images/edible-straws.jpeg",
    badge: "Fresh Pick",
    rating: 4.5,
    reviews: 76,
    stock: 96,
    featured: true,
    tags: "straws, beverage, edible, eco packaging",
  },
  {
    id: 5,
    name: "Animal-safe Plain Millet Line",
    category: "Animal-safe Line",
    description:
      "A separate plain millet range made without chocolate, heavy masala, onion or garlic, intended for honest, vet-checked animal-safe use cases.",
    price: 199,
    originalPrice: 259,
    bulkPrice: 6.5,
    image: "/images/cutlery-01.jpeg",
    badge: "Vet Approved",
    rating: 4.7,
    reviews: 94,
    stock: 52,
    featured: false,
    tags: "animal safe, plain millet, honest claims, vet reviewed",
  },
  {
    id: 6,
    name: "Wheat Bran Plates",
    category: "Plates",
    description:
      "Biodegradable wheat-bran plates created for everyday dining, catering events and eco-conscious serving that needs an honest, compostable alternative.",
    price: 219,
    originalPrice: 279,
    bulkPrice: 6.5,
    image: "/images/plates-set.jpeg",
    badge: "Event Essential",
    rating: 4.6,
    reviews: 88,
    stock: 74,
    featured: false,
    tags: "plate, wheat bran, biodegradable, eco serving",
  },
  {
    id: 7,
    name: "Rice Husk Bowls",
    category: "Bowls",
    description:
      "Thoughtful bowls made from food and farm-waste ingredients for takeaway meals, desserts and sustainable event service.",
    price: 249,
    originalPrice: 329,
    bulkPrice: 7.5,
    image: "/images/bowl-02.jpeg",
    badge: "Utility Pick",
    rating: 4.8,
    reviews: 146,
    stock: 37,
    featured: true,
    tags: "bowl, rice husk, serving, compostable",
  },
  {
    id: 8,
    name: "Café Starter Pack",
    category: "Retail Packs",
    description:
      "A retail-ready sampler pack for homes and small food businesses looking to switch to natural, edible-tableware essentials.",
    price: 159,
    originalPrice: 209,
    bulkPrice: 8,
    image: "/images/dessert-set.jpeg",
    badge: "Starter Pack",
    rating: 4.9,
    reviews: 143,
    stock: 65,
    featured: true,
    tags: "retail pack, starter set, eco tableware, home use",
  },
];

export const navItems = [
  { label: "Shop", to: "/#shop" },
  { label: "Benefits", to: "/#benefits" },
  { label: "Bundles", to: "/#bundles" },
  { label: "Story", to: "/#story" },
  { label: "Contact", to: "/#contact" },
  { label: "Bulk Orders", to: "/checkout" },
];
export const categories = [
  { name: "Spoons & Forks", icon: "🍴" },
  { name: "Cups", icon: "☕" },
  { name: "Straws", icon: "🥤" },
  { name: "Animal-safe Line", icon: "🐾" },
  { name: "Bulk Packs", icon: "📦" },
  { name: "Retail Packs", icon: "🏠" },
];

export const benefits = [
  {
    title: "Eat it, feed it, compost it",
    description:
      "Every product is designed with a practical end-of-life path: edible for humans, safe feed for animals, or fast composting after use.",
    icon: "🌿",
  },
  {
    title: "B2B-first by design",
    description:
      "Built for cafés, caterers and hotels looking for compliant, plastic-free tableware that works at scale.",
    icon: "🏨",
  },
  {
    title: "Made from food ingredients",
    description:
      "Crafted with millet, wheat, rice and jaggery to create durable, natural tableware with a gentler footprint.",
    icon: "🌾",
  },
];

export const bundles = [
  {
    name: "Café Essentials",
    price: "₹589",
    items: "Spoons, cups and straws for daily takeaway service",
  },
  {
    name: "Event Serve",
    price: "₹1,299",
    items: "Bulk cutlery and cup pack for gatherings and catering",
  },
  {
    name: "Hotel Supply",
    price: "₹2,499",
    items: "Restaurant-ready eco tableware for hospitality setups",
  },
];

export const testimonials = [
  {
    name: "Aarav S.",
    quote:
      "The finish feels premium, sturdy and much better for everyday dining without the guilt of plastic waste.",
  },
  {
    name: "Neha R.",
    quote:
      "We switched to Edible Tableware for our catering events and the response from guests was impressive.",
  },
  {
    name: "Vikram P.",
    quote:
      "The plates and bowls are reliable, neat and easy to recommend for eco-conscious households and offices.",
  },
];

export const bulkDiscountTiers = [
  { min: 0, max: 499, rate: 0 },
  { min: 500, max: 1999, rate: 0.1 },
  { min: 2000, max: 4999, rate: 0.15 },
  { min: 5000, max: 100000, rate: 0.2 },
];

export const bulkOrderQuoteItems = [
  {
    id: 1,
    name: "Spoon",
    category: "Cutlery",
    price: 4,
    cost: 2.5,
    suggestedQty: 2500,
  },
  {
    id: 2,
    name: "Fork",
    category: "Cutlery",
    price: 4,
    cost: 2.5,
    suggestedQty: 2500,
  },
  {
    id: 3,
    name: "Straw",
    category: "Straws",
    price: 2,
    cost: 1.25,
    suggestedQty: 5000,
  },
  {
    id: 4,
    name: "Tea Cup (90–100 ml)",
    category: "Cups",
    price: 6,
    cost: 3.75,
    suggestedQty: 1000,
  },
  {
    id: 5,
    name: "Coffee Cup (110 ml)",
    category: "Cups",
    price: 8,
    cost: 5,
    suggestedQty: 400,
  },
  {
    id: 6,
    name: "Glass (150–200 ml)",
    category: "Cups",
    price: 8,
    cost: 5,
    suggestedQty: 600,
  },
  {
    id: 7,
    name: "6-inch Plate",
    category: "Plates",
    price: 7,
    cost: 4.38,
    suggestedQty: 1500,
  },
  {
    id: 8,
    name: "8-inch Dinner Plate",
    category: "Plates",
    price: 12,
    cost: 7.5,
    suggestedQty: 3000,
  },
];

export const volumeSensitivityRows = [
  {
    scenario: "Small Event / Sample",
    quantity: 100,
    tier: "Base (<500)",
    discountPercent: 0,
    sellingPrice: 4,
    costPerUnit: 2.5,
    grossProfitPerUnit: 1.5,
    totalCustomerSpend: 400,
    totalCogs: 250,
    totalOrderProfit: 150,
    grossMargin: 37.5,
  },
  {
    scenario: "Standard Café Order",
    quantity: 500,
    tier: "Tier 1 (500+)",
    discountPercent: 10,
    sellingPrice: 3.6,
    costPerUnit: 2.5,
    grossProfitPerUnit: 1.1,
    totalCustomerSpend: 1800,
    totalCogs: 1250,
    totalOrderProfit: 550,
    grossMargin: 30.6,
  },
  {
    scenario: "Medium Event Caterer",
    quantity: 2000,
    tier: "Tier 2 (2,000+)",
    discountPercent: 15,
    sellingPrice: 3.4,
    costPerUnit: 2.5,
    grossProfitPerUnit: 0.9,
    totalCustomerSpend: 6800,
    totalCogs: 5000,
    totalOrderProfit: 1800,
    grossMargin: 26.5,
  },
  {
    scenario: "Large Banquet / Festival",
    quantity: 5000,
    tier: "Tier 3 (5,000+)",
    discountPercent: 20,
    sellingPrice: 3.2,
    costPerUnit: 2.5,
    grossProfitPerUnit: 0.7,
    totalCustomerSpend: 16000,
    totalCogs: 12500,
    totalOrderProfit: 3500,
    grossMargin: 21.9,
  },
  {
    scenario: "Institutional Bulk Supply",
    quantity: 10000,
    tier: "Tier 3 (5,000+)",
    discountPercent: 20,
    sellingPrice: 3.2,
    costPerUnit: 2.5,
    grossProfitPerUnit: 0.7,
    totalCustomerSpend: 32000,
    totalCogs: 25000,
    totalOrderProfit: 7000,
    grossMargin: 21.9,
  },
];

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
