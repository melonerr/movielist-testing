import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { clearCart } from '../store/cartSlice';
import '../styles/movie-cart.css';
export default function MovieCart() {
    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.cart);
    const [showPopup, setShowPopup] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        if (showPopup && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [showPopup, timeLeft]);

    const totalItems = cart.length;
    let discount = 0;
    if (totalItems > 5) discount = 0.2;
    else if (totalItems > 3) discount = 0.1;

    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    const discountedPrice = totalPrice - totalPrice * discount;

    const startCountdown = () => {
        setShowPopup(true);
        setTimeLeft(60);
    };

    return (
        <div className="cart-container">
            <h2 className="cart-title">ตะกร้าสินค้า</h2>
            {cart.length === 0 ? (
                <p className="empty-cart">ไม่มีสินค้าในตะกร้า</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${item.image}`}
                                alt={item.title}
                                className="cart-item-image"
                            />
                            <div className="cart-item-details">
                                <h3 className="cart-item-title">{item.title}</h3>
                                <p className="cart-item-price">฿{item.price}</p>
                            </div>
                        </div>
                    ))}

                    <div className="cart-summary">
                        <p className="cart-total">รวม: ฿{totalPrice}</p>
                        {discount > 0 && (
                            <p className="cart-discount">
                                ส่วนลด: -{discount * 100}% | ราคาใหม่: ฿{discountedPrice}
                            </p>
                        )}
                    </div>

                    <div className="cart-actions">
                        <button className="clear-cart" onClick={() => dispatch(clearCart())}>
                            เคลียร์ตะกร้า
                        </button>
                        <button className="order-button" onClick={startCountdown}>
                            สั่งซื้อ
                        </button>
                    </div>
                </div>
            )}

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-container">
                        <h3 className="popup-title">โอนเงินไปที่บัญชี</h3>
                        <p className="popup-account">123-456-789 ธ.กสิกรไทย</p>
                        <p className="popup-time-left">เวลาที่เหลือ: {timeLeft} วินาที</p>
                        {timeLeft === 0 && <p className="popup-time-expired">หมดเวลาแล้ว!</p>}
                        <button className="close-popup" onClick={() => setShowPopup(false)}>
                            ปิด
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
