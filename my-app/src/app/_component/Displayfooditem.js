import FoodCard from "./FoodCard";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
const Displayfooditem = () => {
  const [fooditem, setfooditem] = useState([]);
  useEffect(() => {
    Loadfooditem();
  }, []);
  const Loadfooditem = async () => {
    try {
      let response = await fetch(
        "http://localhost:3000/api/restaurant/fooditem/list",
        { cache: "no-store" },
      );
      response = await response.json();
      if (response.success) {
        setfooditem(response.result);
      } else {
        throw new Error("fetching list of food item failed");
      }
    } catch (err) {
      console.error("Request failed:", err);
      toast.error("Something went wrong. Try again.");
    }
  };
  async function deletefooditem(id) {
    try {
      let response = await fetch(
        "http://localhost:3000/api/restaurant/fooditem/list/" + id,
        { method: "delete" },
      );
      response = await response.json();
      if (response.success) {
        toast.success("deleted successfully");
        Loadfooditem();
      }
    } catch (err) {
      console.log("delete the fooditem failed");
      toast.error("delte food item failed");
    }
  }
  return (
    <div className="xyz flex flex-wrap gap-4 ">
      {fooditem &&
        fooditem.map((item) => (
          <FoodCard
            key={item._id}
            id={item._id}
            image={item.path}
            fooditem={item.foodItem}
            description={item.description}
            price={item.price}
            onDelete={deletefooditem}
          />
        ))}
    </div>
  );
};

export default Displayfooditem;
