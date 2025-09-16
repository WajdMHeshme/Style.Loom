// src/Data/productsData.ts

import img1 from "../assets/imgs/Products/Image-7.webp";
import img2 from "../assets/imgs/Products/Image-8.webp";
import img3 from "../assets/imgs/Products/Image-9.webp";
import img4 from "../assets/imgs/Products/Image-10.webp";
import img5 from "../assets/imgs/Products/Image-11.webp";
import img6 from "../assets/imgs/Products/Image-12.webp";
import img7 from "../assets/imgs/Products/men1.jpg";
import img8 from "../assets/imgs/Products/men2.jpg";
import img9 from "../assets/imgs/Products/men3.jpg";
import img10 from "../assets/imgs/Products/kids1.jpg";
import img11 from "../assets/imgs/Products/kids2.jpg";
import img12 from "../assets/imgs/Products/kids3.jpg";

// 🔹 نوع المنتج
export type Product = {
  img: string;
  category: string;
  title: string;
  fit: string;
  price: number;
};

// 🔹 نوع الداتا الكاملة
type ProductsData = {
  womenProductsData: Product[];
  menProductsData: Product[];
  kidsProductsData: Product[];
};

export const productsData: ProductsData = {
  womenProductsData: [
    {
      img: img1,
      category: "Womenswear",
      title: "Timeless A-line Evening Dress",
      fit: "Ankle-length",
      price: 109.99,
    },
    {
      img: img2,
      category: "Womenswear",
      title: "Floral Bloom Maxi Dress",
      fit: "Slim Fit",
      price: 54.99,
    },
    {
      img: img3,
      category: "Womenswear",
      title: "Elegant Evening Gown",
      fit: "Flowing skirt",
      price: 89.99,
    },
    {
      img: img4,
      category: "Accessories",
      title: "Urban Chic Handbag",
      fit: "Spacious",
      price: 49.99,
    },
    {
      img: img5,
      category: "Accessories",
      title: "Sophisticate Sun Hat",
      fit: "One size fits all",
      price: 24.99,
    },
    {
      img: img6,
      category: "Accessories",
      title: "Boho Chic Printed Scarf",
      fit: "Lightweight",
      price: 19.99,
    },
  ],

  menProductsData: [
    {
      img: img7,
      category: "Menswear",
      title: "Evening T-shirt",
      fit: "Regular Fit",
      price: 110.99,
    },
    {
      img: img8,
      category: "Menswear",
      title: "Casual Button-up Shirt",
      fit: "Slim Fit",
      price: 77.99,
    },
    {
      img: img9,
      category: "Menswear",
      title: "Boho Chic Printed Sweater",
      fit: "Lightweight",
      price: 29.99,
    },
  ],

  kidsProductsData: [
    {
      img: img10,
      category: "Kidswear",
      title: "Boho Chic Printed Scarf",
      fit: "Lightweight",
      price: 19.99,
    },
    {
      img: img11,
      category: "Kidswear",
      title: "Timeless A-line Evening Dress",
      fit: "Ankle-length",
      price: 54.99,
    },
    {
      img: img12,
      category: "Kidswear",
      title: "Floral Bloom Maxi Dress",
      fit: "Slim Fit",
      price: 59.99,
    },
  ],
};
