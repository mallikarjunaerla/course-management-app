import React from 'react';
import { Package } from 'lucide-react';

const CategoryCard = ({ category, onEdit }) => {
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const [images, setImages] = React.useState([]);

    React.useEffect(() => {
        let displayImages = [];
        try {
            const parsed = JSON.parse(category.imageUrl);
            if (Array.isArray(parsed) && parsed.length > 0) {
                displayImages = parsed;
            } else if (category.imageUrl) {
                displayImages = [category.imageUrl];
            }
        } catch (e) {
            if (category.imageUrl) {
                displayImages = [category.imageUrl];
            }
        }
        setImages(displayImages);
    }, [category.imageUrl]);

    const nextImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div className="bg-white rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_10px_40px_-3px_rgba(0,0,0,0.1)] transition-all duration-300 overflow-hidden border border-gray-100 group">
            <div className="h-56 relative overflow-hidden bg-gray-50 group/image">
                {images.length > 0 ? (
                    <>
                        <img
                            src={images[currentImageIndex].startsWith('http') ? images[currentImageIndex] : `http://localhost:5000${images[currentImageIndex]}`}
                            alt={category.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = 'none';
                                e.target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'text-gray-300');
                                e.target.parentElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>';
                            }}
                        />

                        {/* Navigation Arrows */}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prevImage}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-10"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                                </button>
                                <button
                                    onClick={nextImage}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-10"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                </button>
                                {/* Dots Indicator */}
                                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                                    {images.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`w-1.5 h-1.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <Package size={64} strokeWidth={1} />
                    </div>
                )}

                {/* Floating Edit Button Overlay - Matches reference interaction style */}
                {/* Floating Edit Button Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={() => onEdit(category)}
                        className="bg-white text-blue-600 px-4 py-2 rounded shadow-lg flex items-center gap-2 font-medium transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-gray-50"
                    >
                        {/* Pencil Icon inline */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg>
                        Edit
                    </button>
                </div>
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.itemCount} items</p>
            </div>
        </div>
    );
};

export default CategoryCard;
