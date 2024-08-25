import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product, onOpenModal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ always: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
      className="relative border border-accent p-7 rounded-lg bg-white shadow-xl hover:shadow-xl transition-shadow duration-1000 ease-in-out"
    >
      <Image src="/ns60mf.jpeg" alt={product.nama_produk} width={300} height={300} className="w-full h-auto object-cover border border-primary rounded-lg text-sky-600" />
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-primary">{product.nama_produk}</h2>
          <p className="text-lg text-primary font-semibold">{formatCurrency(product.price)}</p>
        </div>
        <div className="flex justify-between mt-3">
          <Button onClick={() => onOpenModal(product.id)} className="border border-white p-5 bg-sky-600 text-white hover:bg-primary hover:text-white hover:border-white transition-all duration-500">
            Detail
          </Button>
          <Button className="border border-white p-5 w-[83px] bg-green-500 text-white hover:bg-primary hover:text-white hover:border-white transition-all duration-500">Beli</Button>
        </div>
      </div>
    </motion.div>
  );
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export default ProductCard;
