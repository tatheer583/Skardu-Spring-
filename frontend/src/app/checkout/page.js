'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IoCartOutline,
  IoLocationOutline,
  IoCardOutline,
  IoCheckmarkCircle,
  IoArrowForward,
  IoArrowBack,
  IoTrashOutline,
  IoShieldCheckmarkOutline,
  IoLockClosedOutline,
  IoCallOutline,
} from 'react-icons/io5';
import { useCart } from '@/context/CartContext';
import styles from './Checkout.module.css';

const STEPS = [
  { id: 'cart', label: 'Cart Review', icon: <IoCartOutline /> },
  { id: 'shipping', label: 'Shipping', icon: <IoLocationOutline /> },
  { id: 'payment', label: 'Payment', icon: <IoCardOutline /> },
  { id: 'confirmation', label: 'Confirmed', icon: <IoCheckmarkCircle /> },
];

const PAYMENT_METHODS = [
  { id: 'cod', name: 'Cash on Delivery', desc: 'Pay when your order arrives at your doorstep', icon: '💵' },
  { id: 'jazzcash', name: 'JazzCash', desc: 'Pay via JazzCash mobile wallet', icon: '📱' },
  { id: 'easypaisa', name: 'EasyPaisa', desc: 'Pay via EasyPaisa mobile wallet', icon: '📲' },
  { id: 'bank', name: 'Bank Transfer', desc: 'Direct bank transfer with receipt confirmation', icon: '🏦' },
];

const CITIES = [
  'Islamabad', 'Rawalpindi', 'Lahore', 'Karachi', 'Peshawar',
  'Faisalabad', 'Multan', 'Quetta', 'Sialkot', 'Skardu', 'Other'
];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart, isInitialized } = useCart();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState(null);

  const [shipping, setShipping] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});

  const deliveryFee = cartTotal >= 2000 ? 0 : 150;
  const total = cartTotal + deliveryFee;

  // Redirect if cart is empty and not on confirmation step
  useEffect(() => {
    if (isInitialized && cart.length === 0 && currentStep < 3 && !orderResult) {
      router.push('/shop');
    }
  }, [cart, currentStep, orderResult, router, isInitialized]);

  const validateShipping = () => {
    const newErrors = {};
    if (!shipping.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!shipping.phone.trim()) newErrors.phone = 'Phone number is required';
    if (shipping.phone && !/^(\+92|0)[0-9]{10}$/.test(shipping.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid Pakistani phone number';
    }
    if (shipping.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!shipping.address.trim()) newErrors.address = 'Address is required';
    if (!shipping.city) newErrors.city = 'City is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateShipping()) return;
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
          })),
          shipping,
          paymentMethod,
          subtotal: cartTotal,
          deliveryFee,
          total,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setOrderResult(data);
        setCurrentStep(3);
        clearCart();
      } else {
        alert(data.error || 'Failed to place order. Please try again.');
      }
    } catch (error) {
      alert('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShipping((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // ─── Loading State ───────────────────────────────────────────
  if (!isInitialized) {
    return (
      <div className={styles.checkoutPage}>
        <div className={styles.container}>
          <div className={styles.loadingState}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.checkoutPage}>
      <div className={styles.container}>
        {/* Step Indicator */}
        <div className={styles.stepIndicator}>
          {STEPS.map((step, i) => (
            <div
              key={step.id}
              className={`${styles.step} ${i <= currentStep ? styles.stepActive : ''} ${i < currentStep ? styles.stepDone : ''}`}
            >
              <div className={styles.stepCircle}>
                {i < currentStep ? <IoCheckmarkCircle /> : step.icon}
              </div>
              <span className={styles.stepLabel}>{step.label}</span>
              {i < STEPS.length - 1 && <div className={styles.stepLine} />}
            </div>
          ))}
        </div>

        <div className={styles.layout}>
          {/* Main Content */}
          <div className={styles.mainCol}>
            <AnimatePresence mode="wait">
              {/* STEP 0: Cart Review */}
              {currentStep === 0 && (
                <motion.div
                  key="cart"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={styles.stepContent}
                >
                  <h2 className={styles.stepTitle}>Review Your Cart</h2>
                  <div className={styles.cartItems}>
                    {cart.map((item) => (
                      <div key={item.id} className={styles.cartItem}>
                        <div className={styles.cartItemImage}>
                          <Image src={item.image} alt={item.name} fill style={{ objectFit: 'contain' }} />
                        </div>
                        <div className={styles.cartItemInfo}>
                          <h4>{item.name}</h4>
                          <p className={styles.cartItemPrice}>Rs. {item.price}</p>
                        </div>
                        <div className={styles.cartItemQty}>
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <div className={styles.cartItemTotal}>
                          Rs. {item.price * item.quantity}
                        </div>
                        <button
                          className={styles.cartItemRemove}
                          onClick={() => removeFromCart(item.id)}
                          aria-label="Remove item"
                        >
                          <IoTrashOutline />
                        </button>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 1: Shipping */}
              {currentStep === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={styles.stepContent}
                >
                  <h2 className={styles.stepTitle}>Shipping Details</h2>
                  <form className={styles.shippingForm} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          value={shipping.fullName}
                          onChange={handleShippingChange}
                          placeholder="e.g. Muhammad Ali"
                          className={errors.fullName ? styles.inputError : ''}
                        />
                        {errors.fullName && <span className={styles.errorMsg}>{errors.fullName}</span>}
                      </div>
                      <div className={styles.formGroup}>
                        <label>Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={shipping.phone}
                          onChange={handleShippingChange}
                          placeholder="+92 3XX XXXXXXX"
                          className={errors.phone ? styles.inputError : ''}
                        />
                        {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Email (Optional — for order confirmation)</label>
                      <input
                        type="email"
                        name="email"
                        value={shipping.email}
                        onChange={handleShippingChange}
                        placeholder="your@email.com"
                        className={errors.email ? styles.inputError : ''}
                      />
                      {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label>Delivery Address *</label>
                      <textarea
                        name="address"
                        value={shipping.address}
                        onChange={handleShippingChange}
                        placeholder="House #, Street, Area, Sector"
                        rows="3"
                        className={errors.address ? styles.inputError : ''}
                      />
                      {errors.address && <span className={styles.errorMsg}>{errors.address}</span>}
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.formGroup}>
                        <label>City *</label>
                        <select
                          name="city"
                          value={shipping.city}
                          onChange={handleShippingChange}
                          className={errors.city ? styles.inputError : ''}
                        >
                          <option value="">Select City</option>
                          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </select>
                        {errors.city && <span className={styles.errorMsg}>{errors.city}</span>}
                      </div>
                      <div className={styles.formGroup}>
                        <label>Postal Code</label>
                        <input
                          type="text"
                          name="postalCode"
                          value={shipping.postalCode}
                          onChange={handleShippingChange}
                          placeholder="44000"
                        />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label>Delivery Notes (Optional)</label>
                      <textarea
                        name="notes"
                        value={shipping.notes}
                        onChange={handleShippingChange}
                        placeholder="Ring the bell, leave at reception, etc."
                        rows="2"
                      />
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 2: Payment */}
              {currentStep === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={styles.stepContent}
                >
                  <h2 className={styles.stepTitle}>Payment Method</h2>
                  <div className={styles.paymentMethods}>
                    {PAYMENT_METHODS.map((method) => (
                      <div
                        key={method.id}
                        className={`${styles.paymentCard} ${paymentMethod === method.id ? styles.paymentActive : ''}`}
                        onClick={() => setPaymentMethod(method.id)}
                      >
                        <div className={styles.paymentRadio}>
                          <div className={styles.radioOuter}>
                            {paymentMethod === method.id && <div className={styles.radioInner} />}
                          </div>
                        </div>
                        <div className={styles.paymentIcon}>{method.icon}</div>
                        <div className={styles.paymentInfo}>
                          <h4>{method.name}</h4>
                          <p>{method.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Payment Instructions */}
                  {paymentMethod === 'jazzcash' && (
                    <div className={styles.paymentInstructions}>
                      <h4>JazzCash Payment Instructions</h4>
                      <p>After placing your order, send payment to:</p>
                      <div className={styles.accountDetails}>
                        <span>Account: <strong>0349-2899537</strong></span>
                        <span>Name: <strong>Skardu Spring</strong></span>
                      </div>
                      <p>Send screenshot to our WhatsApp for confirmation.</p>
                    </div>
                  )}

                  {paymentMethod === 'easypaisa' && (
                    <div className={styles.paymentInstructions}>
                      <h4>EasyPaisa Payment Instructions</h4>
                      <p>After placing your order, send payment to:</p>
                      <div className={styles.accountDetails}>
                        <span>Account: <strong>0349-2899537</strong></span>
                        <span>Name: <strong>Skardu Spring</strong></span>
                      </div>
                      <p>Send screenshot to our WhatsApp for confirmation.</p>
                    </div>
                  )}

                  {paymentMethod === 'bank' && (
                    <div className={styles.paymentInstructions}>
                      <h4>Bank Transfer Details</h4>
                      <div className={styles.accountDetails}>
                        <span>Bank: <strong>HBL (Habib Bank Limited)</strong></span>
                        <span>Account: <strong>1234-5678-9012</strong></span>
                        <span>IBAN: <strong>PK36HABB0012345678901234</strong></span>
                        <span>Title: <strong>Skardu Spring Pvt Ltd</strong></span>
                      </div>
                      <p>Send receipt to info@skarduspring.com for order confirmation.</p>
                    </div>
                  )}

                  <div className={styles.securityNote}>
                    <IoLockClosedOutline />
                    <span>Your information is encrypted and secure.</span>
                  </div>

                  <div className={styles.termsAcceptance}>
                    <label className={styles.checkboxContainer}>
                      <input 
                        type="checkbox" 
                        checked={termsAccepted} 
                        onChange={(e) => setTermsAccepted(e.target.checked)} 
                      />
                      <span className={styles.checkmark}></span>
                      I have read and agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                    </label>
                    {errors.terms && <span className={styles.errorMsg}>{errors.terms}</span>}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Confirmation */}
              {currentStep === 3 && orderResult && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={styles.stepContent}
                >
                  <div className={styles.confirmationBox}>
                    <div className={styles.successIcon}>
                      <IoCheckmarkCircle />
                    </div>
                    <h2 className={styles.confirmTitle}>Order Placed Successfully!</h2>
                    <p className={styles.orderId}>Order ID: <strong>{orderResult.orderId}</strong></p>
                    <p className={styles.confirmMsg}>{orderResult.message}</p>

                    <div className={styles.deliveryInfo}>
                      <IoLocationOutline />
                      <div>
                        <span>Estimated Delivery</span>
                        <strong>{orderResult.estimatedDelivery}</strong>
                      </div>
                    </div>

                    <div className={styles.shippingRecap}>
                      <h4>Shipping To:</h4>
                      <p>{shipping.fullName}</p>
                      <p>{shipping.address}</p>
                      <p>{shipping.city} {shipping.postalCode}</p>
                      <p><IoCallOutline /> {shipping.phone}</p>
                    </div>

                    <div className={styles.confirmActions}>
                      <button
                        className={styles.btnPrimary}
                        onClick={() => router.push('/shop')}
                      >
                        Continue Shopping
                      </button>
                      <a
                        href={`https://wa.me/923492899537?text=Hi! I just placed order ${orderResult.orderId}. Please confirm.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.btnSecondary}
                      >
                        Confirm on WhatsApp
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {currentStep < 3 && (
              <div className={styles.navButtons}>
                {currentStep > 0 && (
                  <button className={styles.backBtn} onClick={handleBack}>
                    <IoArrowBack /> Back
                  </button>
                )}
                {currentStep < 2 ? (
                  <button className={styles.nextBtn} onClick={handleNext}>
                    Continue <IoArrowForward />
                  </button>
                ) : (
                  <button
                    className={`${styles.placeOrderBtn} ${!termsAccepted ? styles.disabledBtn : ''}`}
                    onClick={() => {
                      if (!termsAccepted) {
                        setErrors(prev => ({ ...prev, terms: 'You must accept the terms to continue' }));
                        return;
                      }
                      handlePlaceOrder();
                    }}
                    disabled={isSubmitting || !termsAccepted}
                  >
                    {isSubmitting ? 'Placing Order...' : 'Place Order'}
                    {!isSubmitting && <IoShieldCheckmarkOutline />}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          {currentStep < 3 && (
            <aside className={styles.summaryCol}>
              <div className={styles.summaryCard}>
                <h3 className={styles.summaryTitle}>Order Summary</h3>

                <div className={styles.summaryItems}>
                  {cart.map((item) => (
                    <div key={item.id} className={styles.summaryItem}>
                      <div className={styles.summaryItemImage}>
                        <Image src={item.image} alt={item.name} fill style={{ objectFit: 'contain' }} />
                        <span className={styles.summaryItemQty}>{item.quantity}</span>
                      </div>
                      <div className={styles.summaryItemInfo}>
                        <span>{item.name}</span>
                        <span className={styles.summaryItemPrice}>Rs. {item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.summaryDivider} />

                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>Rs. {cartTotal}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Delivery</span>
                  <span className={deliveryFee === 0 ? styles.freeShipping : ''}>
                    {deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <div className={styles.freeShippingHint}>
                    Add Rs. {2000 - cartTotal} more for free delivery
                  </div>
                )}
                <div className={styles.summaryDivider} />
                <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                  <span>Total</span>
                  <span>Rs. {total}</span>
                </div>

                <div className={styles.trustBadges}>
                  <div className={styles.trustBadge}>
                    <IoShieldCheckmarkOutline /> Secure Checkout
                  </div>
                  <div className={styles.trustBadge}>
                    <IoLockClosedOutline /> Data Encrypted
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
