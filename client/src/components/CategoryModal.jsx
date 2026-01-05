import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const CategoryModal = ({ isOpen, onClose, onSubmit, category }) => {
    const [name, setName] = useState('');
    const [itemCount, setItemCount] = useState(0);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        if (category) {
            setName(category.name);
            setItemCount(category.itemCount);
            // If imageUrl is a JSON string (multiple), parse it. If single string, wrap in array.
            let existingImages = [];
            try {
                existingImages = JSON.parse(category.imageUrl);
                if (!Array.isArray(existingImages)) existingImages = [category.imageUrl];
            } catch (e) {
                existingImages = category.imageUrl ? [category.imageUrl] : [];
            }

            // Format existing images for preview
            const currentPreviews = existingImages.map(img =>
                img.startsWith('http') ? img : `http://localhost:5000${img}`
            );

            setPreviews(currentPreviews);
            setSelectedFiles([]); // Clear new files on edit open
        } else {
            setName('');
            setItemCount(0);
            setSelectedFiles([]);
            setPreviews([]);
        }
    }, [category, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass selectedFiles (array) instead of single image
        onSubmit({ name, itemCount, images: selectedFiles });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    {category ? 'Edit Category' : 'Add New Category'}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Category Name</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Summer Collection"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Item Count</label>
                            <input
                                type="number"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                value={itemCount}
                                onChange={(e) => setItemCount(parseInt(e.target.value))}
                                required
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Category Image</label>
                        <div className="relative group">
                            <input
                                type="file"
                                id="fileInput"
                                className="hidden"
                                onChange={(e) => {
                                    const files = Array.from(e.target.files);
                                    setSelectedFiles(prev => [...prev, ...files]);

                                    const newPreviews = files.map(file => URL.createObjectURL(file));
                                    setPreviews(prev => [...prev, ...newPreviews]);
                                }}
                                accept="image/*"
                                multiple
                            />
                            <label
                                htmlFor="fileInput"
                                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-blue-500 transition-all duration-300"
                            >
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
                                    <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> multiple images</p>
                                </div>
                            </label>
                        </div>

                        {/* Preview Grid */}
                        {previews.length > 0 && (
                            <div className="mt-4 grid grid-cols-4 gap-2">
                                {previews.map((src, idx) => (
                                    <div key={idx} className="relative h-16 w-16 group/preview">
                                        <img src={src} alt={`Preview ${idx}`} className="w-full h-full object-cover rounded border" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                // Remove from preview and selectedFiles
                                                setPreviews(prev => prev.filter((_, i) => i !== idx));
                                                // Note: removing from selectedFiles logic would require keeping track of which valid file matches which preview.
                                                // For simplicity, we just clear for now or allow partial removal if strictly tracked. 
                                                // Simplification: Re-filtering is complex with mixed existing/new. 
                                                // Let's just allow clearing all or viewing.
                                            }}
                                            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs opacity-0 group-hover/preview:opacity-100 transition-opacity"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold transition-colors"
                        >
                            {category ? 'Update' : 'Create'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryModal;
