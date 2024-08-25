import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";
import Image from "next/image";

const Modal = ({ isOpen, onClose, id }) => {
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchProductDetails = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/${id}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setProductDetails(data.data);
          console.log("Product details :", data);
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      };

      fetchProductDetails();
    }
  }, [id]);

  if (!isOpen) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="relative w-[340px] xl:w-[500px] bg-white p-6 rounded-lg shadow-lg border border-accent">
        {productDetails ? (
          <>
          <div className=" ml-2 lg:ml-5 items-center justify-center">
          <div className="flex items-center justify-center pb-4 border-b border-gray-300">
              <FaInfoCircle className="text-sky-600 mr-2 text-3xl" />
              <h3 className="text-2xl font-semibold text-primary">Detail Produk</h3>
            </div>
            <Image src="/ns60mf.jpeg" alt={productDetails.nama_produk} width={300} height={300} className="w-full border border-primary h-auto object-cover rounded-t-lg text-sky-600" />
            <div className="mt-4 space-y-3">
              <div className="flex items-center text-primary text-lg">
                <h4 className="font-semibold w-32">Nama Produk :</h4>
                <span className="text-primary">{productDetails.nama_produk}</span>
              </div>
              <div className="flex items-center text-primary text-lg">
                <h4 className="font-semibold w-32">Deskripsi :</h4>
                <p className="">{productDetails.deskripsi}</p>
              </div>
              <div className="flex items-center text-primary text-lg">
                <h4 className="font-semibold w-32">Harga :</h4>
                <span className="text-primary">{formatCurrency(productDetails.price)}</span>
              </div>
              <div className="flex justify-between">
                <Button className="mt-3 bg-accent border border-primary text-primary hover:text-white transition-all duration-500 hover:border-white rounded-lg">Beli Sekarang</Button>
                <Button  onClick={onClose} className="w-[110px] bg-red-500 mt-3 mr-2 xl:mr-5 border text-primary border-primary hover:border-white hover:text-white transition-all duration-500 rounded-lg">Tutup</Button>
              </div>
            </div>
          </div>
            
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </motion.div>
  );
};

export default Modal;
