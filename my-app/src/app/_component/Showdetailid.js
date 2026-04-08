import React from "react";

const Showdetailid = ({ item, setshowdetailid }) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] md:w-125 rounded-2xl p-5 shadow-lg max-h-[90vh] overflow-y-auto">
        {/* Header: Restaurant Info */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-semibold">{item?.restro_id?.name}</h2>
            <p className="text-xs text-gray-500">{item?.restro_id?.emailId}</p>
            <a
              href={`https://www.google.com/maps?q=${item?.restro_id?.location?.lat},${item?.restro_id?.location?.lon}`}
              target="_blank"
              rel="noreferrer"
              className="text-[10px] text-blue-500 hover:underline"
            >
              📍 View Restaurant Location
            </a>
          </div>
          <button
            onClick={() => setshowdetailid(null)}
            className="text-gray-500 text-lg p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Food Items */}
        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Order Items
          </p>
          {item?.food_id?.map((food) => (
            <div
              key={food._id}
              className="flex items-center gap-3 bg-gray-50 p-2 rounded-xl"
            >
              <img
                src={food.path}
                alt={food.foodItem}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{food.foodItem}</p>
                <p className="text-xs text-gray-500">₹{food.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Partner Details (Conditional via Optional Chaining) */}
        {item?.deliverypatner_id && (
          <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-[10px] font-bold text-blue-400 uppercase mb-1">
              Delivery Partner
            </p>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold text-blue-900">
                  {item?.deliverypatner_id?.name}
                </p>
                <p className="text-xs text-blue-700">
                  {item?.deliverypatner_id?.phoneNumber}
                </p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-blue-500">
                  {item?.deliverypatner_id?.emailId}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Price Details */}
        <div className="mt-4 border-t border-dashed pt-3 text-sm space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Food Cost</span>
            <span>₹{item?.price?.totalfoodcost}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Delivery Fee</span>
            <span>₹{item?.price?.distancecost}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span>₹{item?.price?.tax}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2 text-gray-900">
            <span>Total Amount</span>
            <span>₹{item?.price?.total}</span>
          </div>
        </div>

        {/* Footer: User/Delivery Info */}
        <div className="mt-4 pt-3 border-t flex justify-between items-end">
          <div className="text-xs text-gray-500">
            <p className="font-semibold text-gray-700">
              Deliver to: {item?.userId?.name}
            </p>
            <p>{item?.userId?.city}</p>
            <a
              href={`https://www.google.com/maps?q=${item?.userId?.location?.lat},${item?.userId?.location?.lon}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500"
            >
              View Drop-off Point
            </a>
          </div>
          <div className="text-[10px] text-gray-400 italic">
            ID: {item?._id?.slice(-6)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showdetailid;
