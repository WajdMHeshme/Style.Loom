// src/Data/productsData.ts
export type Product = {
  id: number;   
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
      id: 1,
      img: "/assets/imgs/Products/Image-7.webp",
      category: "Womenswear",
      title: "Timeless A-line Evening Dress",
      fit: "Ankle-length",
      price: 109.99,
    },
    {
      id: 2,
      img: "/assets/imgs/Products/Image-8.webp",
      category: "Womenswear",
      title: "Floral Bloom Maxi Dress",
      fit: "Slim Fit",
      price: 54.99,
    },
    {
      id: 3,
      img: "/assets/imgs/Products/Image-9.webp",
      category: "Womenswear",
      title: "Elegant Evening Gown",
      fit: "Flowing skirt",
      price: 89.99,
    },
    {
      id: 4,
      img: "/assets/imgs/Products/Image-10.webp",
      category: "Accessories",
      title: "Urban Chic Handbag",
      fit: "Spacious",
      price: 49.99,
    },
    {
      id: 5,
      img: "/assets/imgs/Products/Image-11.webp",
      category: "Accessories",
      title: "Sophisticate Sun Hat",
      fit: "One size fits all",
      price: 24.99,
    },
    {
      id: 6,
      img: "/assets/imgs/Products/Image-12.webp",
      category: "Accessories",
      title: "Boho Chic Printed Scarf",
      fit: "Lightweight",
      price: 19.99,
    },
  ],

  menProductsData: [
    {
      id: 7,
      img: "/assets/imgs/Products/men1.jpg",
      category: "Menswear",
      title: "Evening T-shirt",
      fit: "Regular Fit",
      price: 110.99,
    },
    {
      id: 8,
      img: "/assets/imgs/Products/men2.jpg",
      category: "Menswear",
      title: "Casual Button-up Shirt",
      fit: "Slim Fit",
      price: 77.99,
    },
    {
      id: 9,
      img: "/assets/imgs/Products/men3.jpg",
      category: "Menswear",
      title: "Boho Chic Printed Sweater",
      fit: "Lightweight",
      price: 29.99,
    },
  ],

  kidsProductsData: [
    {
      id: 10,
      img: "/assets/imgs/Products/kids1.jpg",
      category: "Kidswear",
      title: "Boho Chic Printed Scarf",
      fit: "Lightweight",
      price: 19.99,
    },
    {
      id: 11,
      img: "/assets/imgs/Products/kids2.jpg",
      category: "Kidswear",
      title: "Timeless A-line Evening Dress",
      fit: "Ankle-length",
      price: 54.99,
    },
    {
      id: 12,
      img: "/assets/imgs/Products/kids3.jpg",
      category: "Kidswear",
      title: "Floral Bloom Maxi Dress",
      fit: "Slim Fit",
      price: 59.99,
    },
  ],
};
