"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const ITEMS_PER_PAGE = 10;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data.data);
        console.log("Fetched data:", data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col items-center py-12 xl:py-0"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-screen-lg mx-auto p-6 rounded-lg shadow-md">
        {currentProducts.map((product) => (
          <div key={product.id} className="border border-sky-600 p-7 rounded-lg shadow-xl hover:shadow-lg transition-shadow duration-300 ease-in-out bg-white">
            <Image src="/path/to/default-image.jpg" alt={product.nama_produk} width={300} height={300} className="w-full h-auto object-cover rounded-t-lg text-sky-600" />
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-sky-600">{product.nama_produk}</h2>
                <p className="text-lg text-gray-800">{formatCurrency(product.price)}</p>
              </div>
              <div className="flex justify-between mt-3">
                <div className="">
                  <Button className="border border-primary p-5 bg-sky-600 text-primary hover:bg-primary hover:text-white hover:border-white transition-all duration-500">Detail</Button>
                </div>
                <div className="">
                  <Button className="border border-primary p-5 w-[70px] bg-accent text-primary  hover:bg-primary hover:text-white hover:border-white transition-all duration-500">Beli</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center mx-2">
        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 border bg-primary text-white border-white rounded-lg mr-2 disabled:opacity-50">
          Sebelumnya
        </Button>
        <span className="px-4 py-2 text-primary text-sm md:text-lg">
          Halaman {currentPage} dari {totalPages}
        </span>
        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 border bg-primary text-white border-white rounded-lg mr-2 disabled:opacity-50">Selanjutnya</Button>
      </div>
    </motion.div>
  );
};

export default Home;
