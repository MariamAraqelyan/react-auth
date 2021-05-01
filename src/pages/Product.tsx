import React, {useEffect, useState} from 'react';
import axios from "axios";

const API_URL = "https://wbs.e-teleport.ru";

const Product = (props: { name: string }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {

        let input = {
            "contact": props.name,
            "filters": [
                {
                    "mode": "item",
                    "group": "AND",
                    "name": "not_active",
                    "operation": "=",
                    "value": 0
                }
            ],
            "fields": [
                "id",
                "article",
                "name",
                "stock",
                "retail_price",
                "picture"
            ],
            "nom": 1,
            "limit": 30
        };

        axios.post(API_URL + "/Catalog_Get", input).then((response: any) => {
            setProducts(response.retval.catalog);
        }).catch((err) => {
            console.log(err);
        })

    });

    return (
        products.length ? <div className="container">
                <h4>Product List</h4>
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th>Article</th>
                        <th>Name</th>
                        <th>Stock</th>
                        <th>Retail Price</th>
                        <th>Pictures</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(productItem => (
                        <tr>
                            <td>
                                <img
                                    src={API_URL + 'Catalog_Pics/prev/' + productItem['article']}
                                    className="img-fluid rounded-circle"
                                    alt=""
                                />
                            </td>
                            <td>{productItem['name']}</td>
                            <td>{productItem['stock']}</td>
                            <td>{productItem['retail_price']}</td>
                            <td>{productItem['pictures']}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div> :
            <div>
                <h4>
                    Your product List is Empty
                </h4>
            </div>
    );
};

export default Product;
