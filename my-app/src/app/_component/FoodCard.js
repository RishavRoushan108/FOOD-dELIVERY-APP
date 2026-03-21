import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/navigation";
export const FoodCard = ({
  id,
  image,
  fooditem,
  price,
  description,
  onDelete,
}) => {
  const route = useRouter();
  return (
    <div className="w-60 rounded-lg border-3 border-[#1c1818d2] shadow-sm ">
      <div className="relative w-full h-40">
        <Image
          src={image}
          alt={fooditem}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>
      <div>
        <h1 className="text-lg font-semibold truncate">{fooditem} </h1>
        <p className="text-sm text-gray-500 line-clamp-2">{description}</p>
        <span className="text-green-600 font-bold">₹{price}</span>
      </div>
      <div className="flex flex-row justify-center gap-2 my-1">
        <Button title={"delete"} size="sm" onClick={() => onDelete(id)} />
        <Button
          title={"Edit"}
          size="sm"
          onClick={() => route.push("dashboard/" + id)}
        />
      </div>
    </div>
  );
};
export default FoodCard;
