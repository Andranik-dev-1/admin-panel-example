"use client";

import { useEffect, useState } from "react";

import StoreModal from "@/components/modals/store-modal";

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      <StoreModal />
    </>
  );
};

export default ModalProvider;
