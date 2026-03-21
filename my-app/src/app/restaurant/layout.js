import Header from "../_component/Header";
import Footer from "../_component/Footer";
import { CartProvider } from "../context/cartcontext";

const Restaurantlayout = ({ children }) => {
  return (
    <CartProvider>
      <div className="h-screen flex flex-col">
        <div className="shrink-0">
          <Header />
        </div>
        <main className="flex-1 overflow-y-auto flex justify-center bg-[#bfeed1]">
          {children}
        </main>
        <div className="shrink-0">
          <Footer />
        </div>
      </div>
    </CartProvider>
  );
};

export default Restaurantlayout;
