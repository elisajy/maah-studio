import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Facebook, Twitter, Share, MessageCircle, X } from 'lucide-react';

interface ProductImage {
    id: number;
    url: string;
    alt: string;
}

interface ColorOption {
    id: string;
    name: string;
    value: string;
}

interface SizeOption {
    id: string;
    name: string;
    value: string;
}

interface ProductVariant {
    id: string;
    name: string;
    price: string;
    description: string;
    images: ProductImage[];
    colorOptions: ColorOption[];
    sizeOptions: SizeOption[];
}

const ProductDetails: React.FC = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [selectedVariant, setSelectedVariant] = useState<string>('scream-tee');
    const [selectedColor, setSelectedColor] = useState<string>('khaki');
    const [selectedSize, setSelectedSize] = useState<string>('freesize');
    const [quantity, setQuantity] = useState<number>(1);
    const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
    const [previewImageIndex, setPreviewImageIndex] = useState<number>(0);

    // Product variants data
    const productVariants: ProductVariant[] = [
        {
            id: 'scream-tee',
            name: 'Scream Tee',
            price: 'RM 189.00',
            description: 'A premium quality cotton t-shirt featuring a minimalist design with subtle branding. Made from 100% organic cotton for ultimate comfort and durability. Perfect for casual wear or layering. The classic fit ensures a comfortable wearing experience throughout the day.',
            images: [
                { id: 1, url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop', alt: 'Scream Tee Front View' },
                { id: 2, url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&h=600&fit=crop', alt: 'Scream Tee Back View' },
                { id: 4, url: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=500&h=600&fit=crop', alt: 'Scream Tee Lifestyle' }
            ],
            colorOptions: [
                { id: 'khaki', name: 'Khaki', value: '#d5cfbf' },
                { id: 'black', name: 'Black', value: '#333333' }
            ],
            sizeOptions: [
                { id: 'freesize', name: 'Free Size', value: 'freesize' }
            ]
        },
        {
            id: 'vintage-hoodie',
            name: 'Vintage Hoodie',
            price: 'RM 299.00',
            description: 'Cozy vintage-inspired hoodie with a relaxed fit. Made from premium cotton blend fleece for maximum warmth and comfort. Features a spacious kangaroo pocket and adjustable drawstring hood. Perfect for cooler weather and casual outings.',
            images: [
                { id: 5, url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop', alt: 'Vintage Hoodie Front' },
                { id: 6, url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500&h=600&fit=crop', alt: 'Vintage Hoodie Back' },
                { id: 7, url: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&h=600&fit=crop', alt: 'Vintage Hoodie Detail' }
            ],
            colorOptions: [
                { id: 'grey', name: 'Grey', value: '#808080' },
                { id: 'navy', name: 'Navy', value: '#1e3a8a' },
                { id: 'burgundy', name: 'Burgundy', value: '#991b1b' }
            ],
            sizeOptions: [
                { id: 's', name: 'S', value: 's' },
                { id: 'm', name: 'M', value: 'm' },
                { id: 'l', name: 'L', value: 'l' },
                { id: 'xl', name: 'XL', value: 'xl' }
            ]
        },
        {
            id: 'denim-jacket',
            name: 'Classic Denim Jacket',
            price: 'RM 399.00',
            description: 'Timeless denim jacket crafted from high-quality cotton denim. Features classic button closure, chest pockets, and a versatile fit that works with any outfit. The perfect layering piece for transitional seasons.',
            images: [
                { id: 8, url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=500&h=600&fit=crop', alt: 'Denim Jacket Front' },
                { id: 9, url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=600&fit=crop', alt: 'Denim Jacket Style' },
                { id: 10, url: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=500&h=600&fit=crop', alt: 'Denim Jacket Detail' }
            ],
            colorOptions: [
                { id: 'light-blue', name: 'Light Blue', value: '#60a5fa' },
                { id: 'dark-blue', name: 'Dark Blue', value: '#1e40af' }
            ],
            sizeOptions: [
                { id: 's', name: 'S', value: 's' },
                { id: 'm', name: 'M', value: 'm' },
                { id: 'l', name: 'L', value: 'l' }
            ]
        }
    ];

    const currentVariant = productVariants.find(v => v.id === selectedVariant) || productVariants[0];
    const currentImages = currentVariant.images;

    const handleImageChange = (direction: number): void => {
        setCurrentImageIndex(prev =>
            (prev + direction + currentImages.length) % currentImages.length
        );
    };

    const handleThumbnailClick = (index: number): void => {
        setCurrentImageIndex(index);
    };

    const handleImagePreview = (index: number): void => {
        setPreviewImageIndex(index);
        setIsPreviewOpen(true);
    };

    const handlePreviewNavigation = (direction: number): void => {
        setPreviewImageIndex(prev =>
            (prev + direction + currentImages.length) % currentImages.length
        );
    };

    const handleVariantSelect = (variantId: string): void => {
        const newVariant = productVariants.find(v => v.id === variantId);
        if (newVariant) {
            setSelectedVariant(variantId);
            setCurrentImageIndex(0);
            // Reset selections to first available options
            setSelectedColor(newVariant.colorOptions[0]?.id || '');
            setSelectedSize(newVariant.sizeOptions[0]?.id || '');
        }
    };

    const handleColorSelect = (colorId: string): void => {
        setSelectedColor(colorId);
    };

    const handleSizeSelect = (sizeId: string): void => {
        setSelectedSize(sizeId);
    };

    const handleQuantityChange = (value: number): void => {
        if (value > 0) {
            setQuantity(value);
        }
    };

    const handleBuyNow = (): void => {
        console.log('Buy Now clicked', { variant: selectedVariant, color: selectedColor, size: selectedSize, quantity });
    };

    const handleAddToCart = (): void => {
        console.log('Add to Cart clicked', { variant: selectedVariant, color: selectedColor, size: selectedSize, quantity });
    };

    // Styles
    const styles = {
        productPage: {
            minHeight: '100vh',
            backgroundColor: '#faf0e6',
            padding: '20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        } as React.CSSProperties,

        productContainer: {
            maxWidth: '1400px',
            margin: '0 auto'
        } as React.CSSProperties,

        productCard: {
            borderRadius: '12px',
            overflow: 'hidden',
            background: 'white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        } as React.CSSProperties,

        productContent: {
            display: 'grid',
            gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
            minHeight: '600px'
        } as React.CSSProperties,

        imageSection: {
            background: '#f8f8f8',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column' as const
        },

        mainImageContainer: {
            flex: 1,
            position: 'relative' as const,
            borderRadius: '8px',
            overflow: 'hidden',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },

        mainImage: {
            width: '100%',
            height: '500px',
            objectFit: 'cover' as const,
            transition: 'transform 0.3s ease',
            cursor: 'zoom-in'
        },

        navButton: {
            position: 'absolute' as const,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            transition: 'all 0.3s ease'
        },

        prevButton: {
            left: '20px'
        } as React.CSSProperties,

        nextButton: {
            right: '20px'
        } as React.CSSProperties,

        thumbnailContainer: {
            display: 'flex',
            gap: '10px',
            marginTop: '20px',
            justifyContent: 'center',
            overflowX: 'auto' as const
        },

        thumbnail: {
            width: '60px',
            height: '60px',
            borderRadius: '6px',
            cursor: 'pointer',
            objectFit: 'cover' as const,
            transition: 'all 0.3s ease',
            flexShrink: 0
        },

        thumbnailActive: {
            border: '2px solid #bc987e'
        } as React.CSSProperties,

        thumbnailInactive: {
            border: '2px solid transparent'
        } as React.CSSProperties,

        // Preview Modal Styles
        previewOverlay: {
            position: 'fixed' as const,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        },

        previewContainer: {
            position: 'relative' as const,
            maxWidth: '90vw',
            maxHeight: '90vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },

        previewImage: {
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain' as const,
            borderRadius: '8px'
        },

        previewCloseButton: {
            position: 'absolute' as const,
            top: '20px',
            right: '20px',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001
        },

        previewNavButton: {
            position: 'absolute' as const,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001,
            transition: 'all 0.3s ease'
        },

        detailsSection: {
            padding: '40px',
            display: 'flex',
            flexDirection: 'column' as const,
            justifyContent: 'space-between'
        },

        productTitle: {
            fontSize: '2rem',
            fontWeight: 600,
            color: '#333',
            margin: '0 0 10px 0',
            fontFamily: 'serif'
        } as React.CSSProperties,

        productPrice: {
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#bc987e',
            marginBottom: '30px'
        } as React.CSSProperties,

        section: {
            marginBottom: '30px'
        } as React.CSSProperties,

        sectionTitle: {
            fontSize: '1rem',
            fontWeight: 600,
            color: '#333',
            marginBottom: '15px',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.5px',
            fontFamily: 'serif'
        },

        description: {
            color: '#666',
            lineHeight: 1.6,
            fontSize: '1rem',
            margin: 0,
            textAlign: 'justify' as const
        },

        variantOptions: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '10px'
        } as React.CSSProperties,

        variantOption: {
            padding: '12px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textAlign: 'center' as const,
            fontSize: '0.9rem',
            fontWeight: 500
        },

        variantOptionActive: {
            backgroundColor: '#bc987e',
            color: 'white',
            border: '2px solid #bc987e'
        } as React.CSSProperties,

        variantOptionInactive: {
            backgroundColor: '#f5f5f5',
            color: '#333',
            border: '2px solid transparent'
        } as React.CSSProperties,

        sizeOptions: {
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap' as const
        } as React.CSSProperties,

        sizeOption: {
            height: '40px',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            alignContent: 'center',
            padding: '0px 16px',
            minWidth: '60px',
            textAlign: 'center' as const,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5'
        },

        sizeOptionActive: {
            border: '2px solid #bc987e',
            backgroundColor: '#bc987e',
            color: 'white'
        } as React.CSSProperties,

        sizeOptionInactive: {
            border: '2px solid transparent'
        } as React.CSSProperties,

        colorOptions: {
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap' as const
        } as React.CSSProperties,

        colorOption: {
            width: '40px',
            height: '40px',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
        },

        colorOptionActive: {
            border: '3px solid #bc987e',
            transform: 'scale(1.1)'
        } as React.CSSProperties,

        colorOptionInactive: {
            border: '2px solid transparent'
        } as React.CSSProperties,

        quantityControls: {
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
        } as React.CSSProperties,

        quantityBtn: {
            width: '40px',
            height: '40px',
            border: '1px solid #d5cfbf',
            background: 'white',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: '#333',
            transition: 'all 0.3s ease'
        },

        quantityInput: {
            width: '80px',
            height: '40px',
            textAlign: 'center' as const,
            border: '1px solid #d5cfbf',
            borderRadius: '6px',
            fontSize: '16px',
            outline: 'none'
        },

        actionButtons: {
            display: 'flex',
            gap: '15px',
            marginBottom: '30px',
            flexDirection: window.innerWidth <= 768 ? 'column' as const : 'row' as const
        },

        btn: {
            flex: 1,
            padding: '15px 25px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase' as const,
            letterSpacing: '0.5px'
        },

        btnPrimary: {
            background: '#007bff',
            color: 'white'
        } as React.CSSProperties,

        btnSecondary: {
            background: '#333',
            color: 'white'
        } as React.CSSProperties,

        socialButtons: {
            display: 'flex',
            gap: '15px'
        } as React.CSSProperties,

        socialBtn: {
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            transition: 'all 0.3s ease'
        },

        facebook: { background: '#1877f2' } as React.CSSProperties,
        twitter: { background: '#1da1f2' } as React.CSSProperties,
        pinterest: { background: '#bd081c' } as React.CSSProperties,
        whatsapp: { background: '#25d366' } as React.CSSProperties
    };

    return (
        <div style={styles.productPage}>
            <div style={styles.productContainer}>
                <div style={styles.productCard}>
                    <div style={styles.productContent}>
                        {/* Image Gallery Section */}
                        <div style={styles.imageSection}>
                            <div style={styles.mainImageContainer}>
                                <img
                                    src={currentImages[currentImageIndex].url}
                                    alt={currentImages[currentImageIndex].alt}
                                    style={styles.mainImage}
                                    onClick={() => handleImagePreview(currentImageIndex)}
                                    onMouseEnter={(e) => {
                                        (e.target as HTMLImageElement).style.transform = 'scale(1.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.target as HTMLImageElement).style.transform = 'scale(1)';
                                    }}
                                />

                                <button
                                    style={{ ...styles.navButton, ...styles.prevButton }}
                                    onClick={() => handleImageChange(-1)}
                                    onMouseEnter={(e) => {
                                        (e.target as HTMLButtonElement).style.background = 'white';
                                        (e.target as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.9)';
                                        (e.target as HTMLButtonElement).style.boxShadow = 'none';
                                    }}
                                >
                                    <ChevronLeft size={20} />
                                </button>

                                <button
                                    style={{ ...styles.navButton, ...styles.nextButton }}
                                    onClick={() => handleImageChange(1)}
                                    onMouseEnter={(e) => {
                                        (e.target as HTMLButtonElement).style.background = 'white';
                                        (e.target as HTMLButtonElement).style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
                                    }}
                                    onMouseLeave={(e) => {
                                        (e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.9)';
                                        (e.target as HTMLButtonElement).style.boxShadow = 'none';
                                    }}
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>

                            <div style={styles.thumbnailContainer}>
                                {currentImages.map((image, index) => (
                                    <img
                                        key={image.id}
                                        src={image.url.replace('w=500&h=600', 'w=100&h=100')}
                                        alt={image.alt}
                                        onClick={() => handleThumbnailClick(index)}
                                        style={{
                                            ...styles.thumbnail,
                                            ...(index === currentImageIndex ? styles.thumbnailActive : styles.thumbnailInactive)
                                        }}
                                        onMouseEnter={(e) => {
                                            if (index !== currentImageIndex) {
                                                (e.target as HTMLImageElement).style.borderColor = '#d5cfbf';
                                            }
                                            (e.target as HTMLImageElement).style.transform = 'scale(1.05)';
                                        }}
                                        onMouseLeave={(e) => {
                                            if (index !== currentImageIndex) {
                                                (e.target as HTMLImageElement).style.borderColor = 'transparent';
                                            }
                                            (e.target as HTMLImageElement).style.transform = 'scale(1)';
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Product Details Section */}
                        <div style={styles.detailsSection}>
                            <div>
                                <h1 style={styles.productTitle}>{currentVariant.name}</h1>
                                <div style={styles.productPrice}>{currentVariant.price}</div>

                                <div style={styles.section}>
                                    <h3 style={styles.sectionTitle}>Description</h3>
                                    <p style={styles.description}>
                                        {currentVariant.description}
                                    </p>
                                </div>

                                <div style={styles.section}>
                                    <h3 style={styles.sectionTitle}>Product Variants</h3>
                                    <div style={styles.variantOptions}>
                                        {productVariants.map((variant) => (
                                            <div
                                                key={variant.id}
                                                onClick={() => handleVariantSelect(variant.id)}
                                                style={{
                                                    ...styles.variantOption,
                                                    ...(selectedVariant === variant.id ? styles.variantOptionActive : styles.variantOptionInactive)
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (selectedVariant !== variant.id) {
                                                        (e.target as HTMLDivElement).style.backgroundColor = '#e5e5e5';
                                                        (e.target as HTMLDivElement).style.borderColor = '#bc987e';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (selectedVariant !== variant.id) {
                                                        (e.target as HTMLDivElement).style.backgroundColor = '#f5f5f5';
                                                        (e.target as HTMLDivElement).style.borderColor = 'transparent';
                                                    }
                                                }}
                                            >
                                                {variant.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div style={styles.section}>
                                    <h3 style={styles.sectionTitle}>Size</h3>
                                    <div style={styles.sizeOptions}>
                                        {currentVariant.sizeOptions.map((size) => (
                                            <div
                                                key={size.id}
                                                onClick={() => handleSizeSelect(size.id)}
                                                style={{
                                                    ...styles.sizeOption,
                                                    ...(selectedSize === size.id ? styles.sizeOptionActive : styles.sizeOptionInactive)
                                                }}
                                                title={size.name}
                                                onMouseEnter={(e) => {
                                                    if (selectedSize !== size.id) {
                                                        (e.target as HTMLDivElement).style.borderColor = '#d5cfbf';
                                                        (e.target as HTMLDivElement).style.backgroundColor = '#e5e5e5';
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (selectedSize !== size.id) {
                                                        (e.target as HTMLDivElement).style.borderColor = 'transparent';
                                                        (e.target as HTMLDivElement).style.backgroundColor = '#f5f5f5';
                                                    }
                                                }}
                                            >
                                                {size.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div style={styles.section}>
                                    <h3 style={styles.sectionTitle}>Color</h3>
                                    <div style={styles.colorOptions}>
                                        {currentVariant.colorOptions.map((color) => (
                                            <div
                                                key={color.id}
                                                onClick={() => handleColorSelect(color.id)}
                                                style={{
                                                    ...styles.colorOption,
                                                    backgroundColor: color.value,
                                                    ...(selectedColor === color.id ? styles.colorOptionActive : styles.colorOptionInactive)
                                                }}
                                                title={color.name}
                                                onMouseEnter={(e) => {
                                                    if (selectedColor !== color.id) {
                                                        (e.target as HTMLDivElement).style.borderColor = '#d5cfbf';
                                                    }
                                                    (e.target as HTMLDivElement).style.transform = 'scale(1.05)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    if (selectedColor !== color.id) {
                                                        (e.target as HTMLDivElement).style.borderColor = 'transparent';
                                                        (e.target as HTMLDivElement).style.transform = 'scale(1)';
                                                    }
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div style={styles.section}>
                                    <h3 style={styles.sectionTitle}>Quantity</h3>
                                    <div style={styles.quantityControls}>
                                        <button
                                            style={styles.quantityBtn}
                                            onClick={() => handleQuantityChange(quantity - 1)}
                                            onMouseEnter={(e) => {
                                                (e.target as HTMLButtonElement).style.background = '#d5cfbf';
                                                (e.target as HTMLButtonElement).style.color = 'white';
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.target as HTMLButtonElement).style.background = 'white';
                                                (e.target as HTMLButtonElement).style.color = '#333';
                                            }}
                                        >
                                            −
                                        </button>
                                        <input
                                            value={quantity}
                                            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                                            style={styles.quantityInput}
                                            min="1"
                                            onFocus={(e) => {
                                                (e.target as HTMLInputElement).style.borderColor = '#bc987e';
                                            }}
                                            onBlur={(e) => {
                                                (e.target as HTMLInputElement).style.borderColor = '#d5cfbf';
                                            }}
                                        />
                                        <button
                                            style={styles.quantityBtn}
                                            onClick={() => handleQuantityChange(quantity + 1)}
                                            onMouseEnter={(e) => {
                                                (e.target as HTMLButtonElement).style.background = '#d5cfbf';
                                                (e.target as HTMLButtonElement).style.color = 'white';
                                            }}
                                            onMouseLeave={(e) => {
                                                (e.target as HTMLButtonElement).style.background = 'white';
                                                (e.target as HTMLButtonElement).style.color = '#333';
                                            }}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails;