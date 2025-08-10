import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../redux/action';
// Import your cart action here
// import { addToCart } from '../redux/action/cartActions';

const ProductCard = ({ product }) => {
  const [selectedVariant, setSelectedVariant] = useState('');
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addCart(product));
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price}</p>
        
        {product.variants && (
          <select
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            className="variant-select"
          >
            <option value="">Select Variant</option>
            {product.variants.map((variant) => (
              <option key={variant.id} value={variant.id}>
                {variant.name}
              </option>
            ))}
          </select>
        )}
        
        <button
          className={`add-to-cart-btn ${!product.inStock ? 'out-of-stock' : ''}`}
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>

      <style jsx>{`
        .product-card {
          border: 1px solid #e1e1e1;
          border-radius: 8px;
          overflow: hidden;
          transition: transform 0.2s;
          background: white;
          max-width: 300px;
          margin: 1rem;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        .product-card:hover {
          transform: translateY(-5px);
        }

        .product-image {
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-info {
          padding: 1rem;
        }

        .product-name {
          margin: 0 0 0.5rem;
          font-size: 1.1rem;
          color: #333;
        }

        .product-price {
          font-size: 1.2rem;
          font-weight: bold;
          color: #2c5282;
          margin: 0.5rem 0;
        }

        .variant-select {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border: 1px solid #e1e1e1;
          border-radius: 4px;
        }

        .add-to-cart-btn {
          width: 100%;
          padding: 0.75rem;
          background: #4299e1;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.2s;
        }

        .add-to-cart-btn:hover:not(:disabled) {
          background: #2b6cb0;
        }

        .add-to-cart-btn.out-of-stock {
          background: #cbd5e0;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .product-card {
            max-width: 100%;
            margin: 0.5rem;
          }

          .product-image {
            height: 150px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
