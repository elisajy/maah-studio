import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails: React.FC = () => {
    const { id } = useParams();

    useEffect(() => {
        console.log('id', id);
    }, []);

    return (
        <div>TEST</div>
    );
};

export default ProductDetails;