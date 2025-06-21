import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import "./BannerGallery.scss";

const BannerGallery = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Sample banner data - replace with your actual content
  const banners = [
    {
      id: 1,
      title: "Enchanted Woods Collection",
      subtitle: "Enjoy our planet as an Art.",
      ctaText: "Shop Now",
      ctaLink: "/all",
      bgGradient:
        "linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.4) 100%)",
    },
    {
      id: 2,
      title: "Mystical Forest Gallery",
      subtitle: "Discover nature's hidden treasures.",
      ctaText: "Explore",
      ctaLink: "/gallery",
      bgGradient:
        "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(29, 78, 216, 0.4) 100%)",
    },
    {
      id: 3,
      title: "Woodland Artistry",
      subtitle: "Where nature meets imagination.",
      ctaText: "View Collection",
      ctaLink: "/collection",
      bgGradient:
        "linear-gradient(135deg, rgba(147, 51, 234, 0.3) 0%, rgba(109, 40, 217, 0.4) 100%)",
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, banners.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % banners.length);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // const goToSlide = (index: React.SetStateAction<number>) => {
  //   setIsAutoPlaying(false);
  //   setCurrentSlide(index);
  //   setTimeout(() => setIsAutoPlaying(true), 3000);
  // };

  return (
    <div
      className="enchanted-banner-gallery"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Banner Slides Container */}
      <div
        className="enchanted-banner-gallery__slides"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className="enchanted-banner-gallery__slide"
            style={{
              background: banner.bgGradient,
            }}
          >
            {/* Content */}
            <div className="enchanted-banner-gallery__content">
              <h1
                className={`enchanted-banner-gallery__title ${
                  index === currentSlide
                    ? "enchanted-banner-gallery__title--active"
                    : ""
                }`}
              >
                {banner.title}
              </h1>
              <p
                className={`enchanted-banner-gallery__subtitle ${
                  index === currentSlide
                    ? "enchanted-banner-gallery__subtitle--active"
                    : ""
                }`}
              >
                {banner.subtitle}
              </p>
              <div
                className={`enchanted-banner-gallery__cta-wrapper ${
                  index === currentSlide
                    ? "enchanted-banner-gallery__cta-wrapper--active"
                    : ""
                }`}
              >
                <a
                  href={banner.ctaLink}
                  className="enchanted-banner-gallery__cta"
                >
                  {banner.ctaText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="enchanted-banner-gallery__nav enchanted-banner-gallery__nav--prev"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={nextSlide}
        className="enchanted-banner-gallery__nav enchanted-banner-gallery__nav--next"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      {/* <div className="enchanted-banner-gallery__indicators">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`enchanted-banner-gallery__indicator ${
              index === currentSlide
                ? "enchanted-banner-gallery__indicator--active"
                : ""
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}

      {/* Progress Bar */}
      <div className="enchanted-banner-gallery__progress">
        <div
          className="enchanted-banner-gallery__progress-bar"
          style={{
            width: `${((currentSlide + 1) / banners.length) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default BannerGallery;
