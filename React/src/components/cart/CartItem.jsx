/* eslint-disable react/prop-types */
const CartItem = ({ item }) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-300 py-2">
      <span className="text-primary">{item.name}</span>
      <span>Quantity: {item.quantity}</span>
      <span>${item.price}</span>
    </div>
  );
};

export default CartItem;
  