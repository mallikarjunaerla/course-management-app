import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, LogOut, LayoutDashboard } from 'lucide-react';
import api from '../services/api';
import CategoryCard from '../components/CategoryCard';
import CategoryModal from '../components/CategoryModal';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [categories, setCategories] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await api.get('/categories');
            setCategories(res.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleAddClick = () => {
        setCurrentCategory(null);
        setIsModalOpen(true);
    };

    const handleEditClick = (category) => {
        setCurrentCategory(category);
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('itemCount', data.itemCount);

            if (data.images && data.images.length > 0) {
                data.images.forEach((file) => {
                    formData.append('images', file);
                });
            }

            if (currentCategory) {
                await api.put(`/categories/${currentCategory.id}`, formData);
            } else {
                await api.post('/categories', formData);
            }
            fetchCategories();
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error saving category:', error);
            alert('Failed to save category');
        }
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
                <button
                    onClick={handleAddClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2"
                >
                    <Plus size={20} />
                    Add Category
                </button>
            </div>

            {categories.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <LayoutDashboard size={32} />
                    </div>
                    <p className="text-xl font-medium text-gray-800">No categories found</p>
                    <p className="mt-2 text-gray-500 mb-6">Get started by creating your first category.</p>
                    <button
                        onClick={handleAddClick}
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Create Category
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.map(category => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            onEdit={handleEditClick}
                        />
                    ))}
                </div>
            )}

            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                category={currentCategory}
            />
        </div>
    );
};

export default Dashboard;
