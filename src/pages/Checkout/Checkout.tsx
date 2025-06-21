import React, { useEffect, useState } from 'react';
import { Upload, ShoppingCart, User, Mail, Phone, Tag, Receipt, CreditCard, Check, X } from 'lucide-react';
import { useCart } from '../../components/Cart/CartContext';

export default function CheckoutPage() {
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        email: '',
        voucherCode: '',
        receipt: null as File | null
    });

    // Voucher database - you can move this to a separate file or fetch from API
    const availableVouchers = [
        { code: 'SAVE10', type: 'percentage', value: 10, description: '10% off total order' },
        { code: 'FLAT20', type: 'fixed', value: 20, description: '$20 off total order' },
        { code: 'WELCOME15', type: 'percentage', value: 15, description: '15% off for new customers' },
        { code: 'SUMMER25', type: 'fixed', value: 25, description: '$25 summer discount' },
        { code: 'LOYALTY5', type: 'percentage', value: 5, description: '5% loyalty discount' }
    ];

    const [appliedVoucher, setAppliedVoucher] = useState<any>(null);
    const [voucherStatus, setVoucherStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
    const [errors, setErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        cartItems
    } = useCart();

    // Calculate totals with voucher
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1; // 10% tax

    // Calculate discount
    let discount = 0;
    if (appliedVoucher) {
        if (appliedVoucher.type === 'percentage') {
            discount = subtotal * (appliedVoucher.value / 100);
        } else if (appliedVoucher.type === 'fixed') {
            discount = Math.min(appliedVoucher.value, subtotal); // Don't exceed subtotal
        }
    }

    const total = Math.max(0, subtotal - discount); // Ensure total doesn't go negative

    useEffect(() => {
        console.log('cartItems', cartItems);
    }, [cartItems]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev: any) => ({
                ...prev,
                [name]: ''
            }));
        }

        // Reset voucher status when voucher code changes
        if (name === 'voucherCode') {
            setVoucherStatus('idle');
            setAppliedVoucher(null);
        }
    };

    const handleVoucherApply = () => {
        const voucherCode = formData.voucherCode.trim().toUpperCase();

        if (!voucherCode) {
            setVoucherStatus('invalid');
            return;
        }

        // Check if voucher exists in our database
        const voucher = availableVouchers.find(v => v.code.toUpperCase() === voucherCode);

        if (voucher) {
            setAppliedVoucher(voucher);
            setVoucherStatus('valid');
            // Update form data to show the applied voucher code
            setFormData(prev => ({
                ...prev,
                voucherCode: voucher.code
            }));
        } else {
            setAppliedVoucher(null);
            setVoucherStatus('invalid');
        }
    };

    const handleVoucherRemove = () => {
        setAppliedVoucher(null);
        setVoucherStatus('idle');
        setFormData(prev => ({
            ...prev,
            voucherCode: ''
        }));
    };

    const handleFileUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                receipt: file
            }));
        }
    };

    const validateForm = () => {
        const newErrors: any = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.contactNumber.trim()) {
            newErrors.contactNumber = 'Contact number is required';
        } else if (!/^\+?[\d\s-()]+$/.test(formData.contactNumber)) {
            newErrors.contactNumber = 'Invalid contact number format';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.receipt) {
            newErrors.receipt = 'Receipt upload is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Prepare data for backend
        const orderData = {
            customerInfo: {
                name: formData.name,
                contactNumber: formData.contactNumber,
                email: formData.email,
                voucherCode: appliedVoucher?.code || null
            },
            cartItems: cartItems,
            totals: {
                subtotal: subtotal,
                discount: discount,
                total: total
            },
            appliedVoucher: appliedVoucher,
            receipt: formData.receipt
        };

        try {
            console.log('Order data to be sent to backend:', orderData);
            await new Promise(resolve => setTimeout(resolve, 2000));
            alert('Order submitted successfully!');
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('Error submitting order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const styles = {
        container: {
            minHeight: '100vh',
            backgroundColor: '#faf0e6',
            padding: '2rem 1rem'
        },
        wrapper: {
            maxWidth: '1200px',
            margin: '0 auto'
        },
        header: {
            textAlign: 'center' as const,
            marginBottom: '3rem'
        },
        title: {
            fontSize: '2rem',
            fontWeight: '300',
            color: '#bc987e',
            marginBottom: '0.5rem'
        },
        subtitle: {
            color: '#666',
            fontSize: '1rem'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            '@media (max-width: 768px)': {
                gridTemplateColumns: '1fr'
            }
        },
        card: {
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            padding: '2rem',
            border: '1px solid #d5cfbf'
        },
        sectionTitle: {
            fontSize: '1.25rem',
            fontWeight: '500',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        cartItem: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '1rem 0',
            borderBottom: '1px solid #d5cfbf',
            gap: '1rem'
        },
        cartItemName: {
            fontWeight: '500',
            marginBottom: '0.25rem'
        },
        cartItemQty: {
            fontSize: '0.875rem',
            color: '#666'
        },
        cartItemPrice: {
            fontWeight: '500'
        },
        totalsSection: {
            paddingTop: '1rem',
            borderTop: '1px solid #d5cfbf',
            marginTop: '1rem'
        },
        totalRow: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem'
        },
        discountRow: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            color: '#16a34a',
            fontWeight: '500'
        },
        totalFinal: {
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: '600',
            fontSize: '1.125rem',
            paddingTop: '0.75rem',
            borderTop: '1px solid #d5cfbf'
        },
        formSection: {
            marginBottom: '2rem'
        },
        formGroup: {
            marginBottom: '1rem'
        },
        label: {
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            marginBottom: '0.5rem',
            color: '#333'
        },
        input: {
            width: '100%',
            padding: '0.75rem',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            backgroundColor: 'rgb(250, 240, 230)'
        },
        inputError: {
            borderColor: '#ef4444'
        },
        inputWithIcon: {
            position: 'relative' as const,
        },
        inputIcon: {
            position: 'absolute' as const,
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#999'
        },
        inputWithIconInput: {
            paddingLeft: '2.5rem'
        },
        errorText: {
            color: '#ef4444',
            fontSize: '0.875rem',
            marginTop: '0.25rem'
        },
        voucherContainer: {
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'flex-start'
        },
        voucherInputWrapper: {
            flex: 1,
            position: 'relative' as const
        },
        voucherInput: {
            width: '100%',
            padding: '0.75rem 2.5rem 0.75rem 2.5rem',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '1rem',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            backgroundColor: 'rgb(250, 240, 230)'
        },
        voucherInputValid: {
            borderColor: '#16a34a',
            backgroundColor: '#f0fdf4'
        },
        voucherInputInvalid: {
            borderColor: '#ef4444',
            backgroundColor: '#fef2f2'
        },
        voucherButton: {
            padding: '0.75rem 1rem',
            backgroundColor: '#bc987e',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '0.875rem',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'opacity 0.2s',
            whiteSpace: 'nowrap' as const
        },
        voucherButtonDisabled: {
            opacity: 0.5,
            cursor: 'not-allowed'
        },
        voucherStatus: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            marginTop: '0.5rem'
        },
        voucherStatusValid: {
            color: '#16a34a'
        },
        voucherStatusInvalid: {
            color: '#ef4444'
        },
        voucherApplied: {
            backgroundColor: '#f0fdf4',
            border: '1px solid #16a34a',
            borderRadius: '6px',
            padding: '0.75rem',
            marginTop: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        voucherAppliedText: {
            color: '#16a34a',
            fontSize: '0.875rem',
            fontWeight: '500'
        },
        removeButton: {
            background: 'none',
            border: 'none',
            color: '#ef4444',
            cursor: 'pointer',
            padding: '0.25rem',
            borderRadius: '4px',
            transition: 'background-color 0.2s'
        },
        statusIcon: {
            position: 'absolute' as const,
            right: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)'
        },
        uploadArea: {
            border: '2px dashed #ccc',
            borderRadius: '8px',
            padding: '2rem',
            textAlign: 'center' as const,
            cursor: 'pointer',
            transition: 'border-color 0.2s'
        },
        uploadAreaError: {
            borderColor: '#ef4444'
        },
        uploadIcon: {
            color: '#bc987e',
            marginBottom: '0.75rem'
        },
        uploadText: {
            fontSize: '0.875rem',
            color: '#666',
            marginBottom: '0.75rem'
        },
        uploadButton: {
            display: 'inline-block',
            padding: '0.5rem 1rem',
            backgroundColor: '#bc987e',
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: '500',
            borderRadius: '6px',
            cursor: 'pointer',
            border: 'none',
            transition: 'opacity 0.2s'
        },
        hiddenInput: {
            display: 'none'
        },
        submitButton: {
            width: '100%',
            padding: '0.875rem 1rem',
            backgroundColor: '#bc987e',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '500',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'opacity 0.2s'
        },
        submitButtonDisabled: {
            opacity: '0.5',
            cursor: 'not-allowed'
        },
        spinner: {
            width: '1rem',
            height: '1rem',
            border: '2px solid white',
            borderTop: '2px solid transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        }
    };

    return (
        <div style={styles.container}>
            <style>
                {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @media (max-width: 768px) {
            .grid { grid-template-columns: 1fr !important; }
          }
        `}
            </style>

            <div style={styles.wrapper}>
                {/* Header */}
                <div style={styles.header}>
                    <h1 style={styles.title}>Checkout</h1>
                    <p style={styles.subtitle}>Complete your order details below</p>
                </div>

                <div className="grid" style={styles.grid}>
                    {/* Order Summary */}
                    <div style={styles.card}>
                        <div style={styles.sectionTitle}>
                            <ShoppingCart size={20} style={{ color: '#bc987e' }} />
                            Order Summary
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            {cartItems.map(item => (
                                <div key={item.id} style={styles.cartItem}>
                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: 1 }}>
                                        {item.image && (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{
                                                    width: '60px',
                                                    height: '60px',
                                                    objectFit: 'cover',
                                                    borderRadius: '6px',
                                                    border: '1px solid #d5cfbf'
                                                }}
                                            />
                                        )}
                                        <div style={{ flex: 1 }}>
                                            <div style={styles.cartItemName}>{item.name}</div>
                                            {item.variant && (
                                                <div style={{ ...styles.cartItemQty, marginBottom: '0.125rem' }}>
                                                    Variant: {item.variant}
                                                </div>
                                            )}
                                            {item.size && (
                                                <div style={{ ...styles.cartItemQty, marginBottom: '0.125rem' }}>
                                                    Size: {item.size}
                                                </div>
                                            )}
                                            <div style={styles.cartItemQty}>Qty: {item.quantity}</div>
                                        </div>
                                    </div>
                                    <div style={styles.cartItemPrice}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={styles.totalsSection}>
                            <div style={styles.totalRow}>
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>

                            {appliedVoucher && discount > 0 && (
                                <div style={styles.discountRow}>
                                    <span>
                                        Discount ({appliedVoucher.code})
                                        {appliedVoucher.type === 'percentage' ? ` -${appliedVoucher.value}%` : ` -$${appliedVoucher.value}`}
                                    </span>
                                    <span>-${discount.toFixed(2)}</span>
                                </div>
                            )}

                            <div style={styles.totalFinal}>
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <div style={styles.card}>
                        <div style={{ ...styles.formSection, marginBottom: '2rem' }}>
                            {/* Personal Information */}
                            <div style={styles.sectionTitle}>
                                <User size={20} style={{ color: '#bc987e' }} />
                                Personal Information
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    style={{
                                        ...styles.input,
                                        ...(errors.name ? styles.inputError : {})
                                    }}
                                    placeholder="Enter your full name"
                                />
                                {errors.name && <div style={styles.errorText}>{errors.name}</div>}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Contact Number *</label>
                                <input
                                    type="tel"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleInputChange}
                                    style={{
                                        ...styles.input,
                                        ...(errors.contactNumber ? styles.inputError : {})
                                    }}
                                    placeholder="Enter your contact number"
                                />
                                {errors.contactNumber && <div style={styles.errorText}>{errors.contactNumber}</div>}
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    style={{
                                        ...styles.input,
                                        ...(errors.email ? styles.inputError : {})
                                    }}
                                    placeholder="Enter your email address"
                                />
                                {errors.email && <div style={styles.errorText}>{errors.email}</div>}
                            </div>
                        </div>

                        {/* Voucher Section */}
                        <div style={styles.formSection}>
                            <div style={styles.sectionTitle}>
                                <Tag size={20} style={{ color: '#bc987e' }} />
                                Voucher Code
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Enter Voucher Code (Optional)</label>

                                {!appliedVoucher ? (
                                    <>
                                        <div style={styles.voucherContainer}>
                                            <div style={styles.voucherInputWrapper}>
                                                <Tag size={16} style={styles.inputIcon} />
                                                <input
                                                    type="text"
                                                    name="voucherCode"
                                                    value={formData.voucherCode}
                                                    onChange={handleInputChange}
                                                    style={{
                                                        ...styles.voucherInput,
                                                        ...(voucherStatus === 'valid' ? styles.voucherInputValid : {}),
                                                        ...(voucherStatus === 'invalid' ? styles.voucherInputInvalid : {})
                                                    }}
                                                    placeholder="Enter voucher code (e.g., SAVE10)"
                                                />
                                                {voucherStatus === 'valid' && (
                                                    <Check size={16} style={{ ...styles.statusIcon, color: '#16a34a' }} />
                                                )}
                                                {voucherStatus === 'invalid' && (
                                                    <X size={16} style={{ ...styles.statusIcon, color: '#ef4444' }} />
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleVoucherApply}
                                                style={{
                                                    ...styles.voucherButton,
                                                    ...(formData.voucherCode.trim() === '' ? styles.voucherButtonDisabled : {})
                                                }}
                                                disabled={formData.voucherCode.trim() === ''}
                                            >
                                                Apply
                                            </button>
                                        </div>

                                        {voucherStatus === 'valid' && (
                                            <div style={{ ...styles.voucherStatus, ...styles.voucherStatusValid }}>
                                                <Check size={16} />
                                                Voucher applied successfully!
                                            </div>
                                        )}

                                        {voucherStatus === 'invalid' && (
                                            <div style={{ ...styles.voucherStatus, ...styles.voucherStatusInvalid }}>
                                                <X size={16} />
                                                Invalid voucher code. Please try again.
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <div style={styles.voucherApplied}>
                                        <div>
                                            <div style={styles.voucherAppliedText}>
                                                ✓ {appliedVoucher.code} Applied
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '0.25rem' }}>
                                                {appliedVoucher.description}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleVoucherRemove}
                                            style={styles.removeButton}
                                            title="Remove voucher"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                )}

                                {/* Sample voucher codes for demo */}
                                <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: '#666' }}>
                                    {/* <div style={{ marginBottom: '0.25rem' }}>Try these sample codes:</div> */}
                                    {/* <div>SAVE10 (10% off) • FLAT20 ($20 off) • WELCOME15 (15% off)</div> */}
                                </div>
                            </div>
                        </div>

                        {/* Receipt Upload */}
                        <div style={styles.formSection}>
                            <div style={styles.sectionTitle}>
                                <Receipt size={20} style={{ color: '#bc987e' }} />
                                Payment Receipt
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Upload Receipt *</label>
                                <div style={{
                                    ...styles.uploadArea,
                                    ...(errors.receipt ? styles.uploadAreaError : {})
                                }}>
                                    <Upload size={32} style={styles.uploadIcon} />
                                    <div style={styles.uploadText}>
                                        {formData.receipt ? `Selected: ${formData.receipt.name}` : 'Click to upload or drag and drop'}
                                    </div>
                                    <input
                                        type="file"
                                        onChange={handleFileUpload}
                                        accept="image/*,.pdf"
                                        style={styles.hiddenInput}
                                        id="receipt-upload"
                                    />
                                    <label
                                        htmlFor="receipt-upload"
                                        style={styles.uploadButton}
                                    >
                                        Choose File
                                    </label>
                                </div>
                                {errors.receipt && <div style={styles.errorText}>{errors.receipt}</div>}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            style={{
                                ...styles.submitButton,
                                ...(isSubmitting ? styles.submitButtonDisabled : {})
                            }}
                        >
                            {isSubmitting ? (
                                <>
                                    <div style={styles.spinner}></div>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <CreditCard size={16} />
                                    Complete Order ({total > 0 ? `$${total.toFixed(2)}` : 'Free'})
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}