import { useEffect, useState } from "react";

export const useOrigin = () => {
    
  const [origin, setOrigin] = useState("");;

  useEffect(() => {
    let originValue = "";
    if (typeof window !== undefined && window.location.origin) {
      originValue = window.location.origin;
    }
    setOrigin(originValue);
  }, []);

  return origin;
};
