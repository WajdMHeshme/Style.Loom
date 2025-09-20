import { useState, useEffect } from "react";
import { GoX, GoArrowLeft } from "react-icons/go";

type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
};

export default function Cart() {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const storedCart = localStorage.getItem("cart");
        return storedCart
            ? JSON.parse(storedCart)
            : [
                { id: 1, name: "Timeless A-line Evening Dress", price: 54.99, quantity: 2, image: "/assets/imgs/Products/Image-7.webp" },
                { id: 2, name: "Classic Suit", price: 120.0, quantity: 1, image: "/assets/imgs/Products/Image-7.webp" },
            ];
    });

    const [openPopUp, setOpenPopUp] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const increaseQuantity = (id: number) =>
        setCart(cart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));

    const decreaseQuantity = (id: number) =>
        setCart(
            cart
                .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
                .filter((item) => item.quantity > 0)
        );

    const removeFromCart = (id: number) => setCart(cart.filter((item) => item.id !== id));

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    const paymentMethods = [
        { id: "visa", name: "Visa", image: "/assets/imgs/checkout/visa.svg" },
        { id: "mastercard", name: "MasterCard", image: "/assets/imgs/checkout/mastercard.svg" },
        { id: "paypal", name: "PayPal", image: "/assets/imgs/checkout/paypal.svg" },
        { id: "applepay", name: "Apple Pay", image: "/assets/imgs/checkout/applepay.svg" },
    ];

    return (
        <div className="w-full bg-neutral-950 2xl:px-[162px] md:px-[80px] px-[16px] pt-[200px] min-h-screen">
            <div className="border-2 border-dashed border-neutral-700 rounded-2xl p-6 max-w-5xl mx-auto">
                {cart.length > 0 ? (
                    cart.map((item) => (
                        <div
                            key={item.id}
                            className="flex justify-between items-center border-b-2 border-dashed border-neutral-700 py-6"
                        >
                            <div className="flex items-center gap-6 w-full">
                                <img src={item.image} alt={item.name} className="w-40 rounded-xl" />
                                <div className="flex flex-col gap-2">
                                    <h4 className="text-white text-2xl font-medium">{item.name}</h4>
                                    <p className="text-gray-400 text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                                    <div className="flex items-center gap-4 text-white">
                                        <button
                                            onClick={() => decreaseQuantity(item.id)}
                                            className="border border-neutral-700 w-8 h-8 rounded-full flex items-center justify-center"
                                        >
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            onClick={() => increaseQuantity(item.id)}
                                            className="border border-neutral-700 w-8 h-8 rounded-full flex items-center justify-center"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <button
                                className="text-red-500 text-4xl"
                                onClick={() => removeFromCart(item.id)}
                            >
                                <GoX />
                            </button>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-2xl text-white py-12">Your shopping cart is empty 🛒</p>
                )}

                {cart.length > 0 && (
                    <div className="flex justify-between items-center mt-6 flex-wrap gap-4">
                        <h3 className="text-white text-xl">Total: ${totalPrice}</h3>
                        <button
                            className="bg-yellow-700 text-white px-6 py-3 rounded-xl font-medium"
                            onClick={() => setOpenPopUp(true)}
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>

            {openPopUp && (
                <div className=" pt-[150px] fixed inset-0 bg-black  flex items-center justify-center z-50">
                    <div className="bg-neutral-900 rounded-2xl p-8 w-full max-w-lg relative">
                        <button
                            className="absolute top-4 left-4 text-white text-2xl"
                            onClick={() => setOpenPopUp(false)}
                        >
                            <GoArrowLeft />
                        </button>

                        <h2 className="text-white text-2xl mb-4 text-center">Checkout</h2>

                        <label className="text-white text-lg">Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full mt-2 mb-4 px-4 py-2 rounded-lg bg-neutral-800 text-white outline-none"
                        />

                        <h3 className="text-white text-lg mb-2">Choose Payment Method</h3>
                        <div className="flex gap-4 mb-4 flex-wrap">
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    onClick={() => setSelectedPayment(method.image)}
                                    className={`p-2 rounded-lg border ${selectedPayment === method.image ? "border-yellow-600" : "border-transparent"
                                        } bg-neutral-800`}
                                >
                                    <img src={method.image} alt={method.name} className="w-12 h-8" />
                                </button>
                            ))}
                        </div>

                        <div className="relative mb-4">
                            <input
                                type="text"
                                placeholder="Card Number"
                                className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white outline-none"
                            />
                            {selectedPayment && (
                                <img
                                    src={selectedPayment}
                                    alt="Payment Logo"
                                    className="absolute right-4 top-1 w-8"
                                />
                            )}
                        </div>

                        <div className="flex gap-4 mb-6">
                            <input
                                type="text"
                                placeholder="CVV"
                                maxLength={3}
                                className="w-1/2 px-4 py-2 rounded-lg bg-neutral-800 text-white outline-none"
                            />
                            <input
                                type="text"
                                placeholder="MM/YY"
                                maxLength={5}
                                className="w-1/2 px-4 py-2 rounded-lg bg-neutral-800 text-white outline-none"
                            />
                        </div>

                        <button
                            className="w-full bg-yellow-700 text-white py-3 rounded-xl font-medium"
                            onClick={() => setOpenPopUp(false)}
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
