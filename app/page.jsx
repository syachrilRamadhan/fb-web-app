"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";
import { Input } from "@/components/ui/input";

const ITEMS_PER_PAGE = 9;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?search=${encodeURIComponent(searchQuery)}`);
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
  }, [searchQuery]);

  const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const openModal = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProductId(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
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
      <div className="w-full max-w-screen-lg mx-auto px-6 text-primary relative">
        <div className="relative">
          <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <Input type="text" placeholder="Cari produk..." value={searchQuery} onChange={handleSearchChange} className="pl-10 mb-4 p-2 rounded-md" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-screen-lg mx-auto p-6 rounded-lg shadow-md">
        {currentProducts.map((product) => (
          <ProductCard key={product.id} product={product} onOpenModal={openModal} />
        ))}
      </div>

      <div className="mt-6 mb-2 flex justify-center mx-2">
        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 border bg-primary text-white border-white rounded-lg mr-2 disabled:opacity-50">
          Sebelumnya
        </Button>
        <span className="px-2 py-2 text-white text-[13px] md:text-lg">
          Halaman {currentPage} dari {totalPages}
        </span>
        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 border bg-primary text-white border-white rounded-lg mr-2 disabled:opacity-50">
          Selanjutnya
        </Button>
      </div>
      <Footer />
      <Modal isOpen={isModalOpen} onClose={closeModal} id={selectedProductId} />
    </motion.div>
  );
};

export default Home;
