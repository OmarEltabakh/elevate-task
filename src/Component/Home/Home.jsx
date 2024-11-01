import React, { useEffect, useState } from 'react';
import style from "./Home.module.css";

export default function Home() {


    const [products, setProducts] = useState();
    const [error, setError] = useState(null);

    // get list of products with error handling=====================================>
    async function getProducts() {
        try {
            const res = await fetch(`https://fakestoreapi.com/products`);
            if (!res.ok) {
                throw new Error('Failed to fetch products');
            }
            const data = await res.json();
            setProducts(data);
        } catch (err) {
            setError('Error fetching products. Please try again later.');
        }
    }

    // call api======================================================================>
    useEffect(() => {
        getProducts();
    }, []);

    return (
        <>
            <section className={`${style.home}`}>
                <div className={`${style.container}`}>
                    <div className="row w-100 mx-auto">
                        {error ? (
                            <div className={style.errorMessage}>
                                <p style={{ color: 'red' }}>{error}</p>
                            </div>
                        ) : products ? (
                            products.map((product, index) => (
                                <div key={index} className={`${style.cardContainer} col-xxl-2 col-xl-3 col-lg-4 col-md-4 col-sm-6 p-0`}>
                                    <div className='m-2 shadow-l'>
                                        <div className={`${style.cardImage}`}>
                                            <img className='w-100' src={product.image} alt="Product" />
                                        </div>
                                        <h4 className='p-2 pb-0'>{product.title.split(" ").slice(0, 3).join(" ")}</h4>
                                        <div className='d-flex justify-content-between p-2 pt-0 text-white'>
                                            <span>{product.price} EGP</span>
                                            <span>{product.rating.rate} <i className="fa-solid fa-star"></i></span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={style.loadingScreen}>
                                <i className="fa-solid fa-spinner fa-spin fs-2 text-white"></i>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
