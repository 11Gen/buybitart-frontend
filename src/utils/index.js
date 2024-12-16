import { toast } from "react-toastify";

export function addToCart({setState, cart, setCart, data}) {
  setState(true);
  const exsistedOne = cart.find((item) => item.hash === data.hash);
  toast.success(`"${capitalizeShortName}" Added to cart`);
  if (exsistedOne)
    return setCart(
      cart.map((item) =>
        item.hash === data.hash
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  else return setCart((prev) => [...prev, { ...data, quantity: 1 }]);
}
