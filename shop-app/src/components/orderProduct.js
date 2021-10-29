import React from "react";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productApi from "../api/productApi";
import ListItems from "./Products/product"
import { connect } from "react-redux"
import OrderForm from "./Order/orderForm"
import { BrowserRouter, Route } from 'react-router-dom';

const MainContent = (props) => {
    var { productsId } = useParams()
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const response = await productApi.get(productsId)
                // console.log('response', response)
                setProductList([response]);
                // console.log("datata product ", productList)

            } catch (error) {
                // console.log("failed to fetch data product list ", error)
            }
        }
        fetchProductList()
    }, [])

    return (
        <OrderForm userOrder={props.usernameRedux[0]} products={productList[0]} />
    )
}

function mapStateToProps(state) {
    return { usernameRedux: state.users }
}

export default connect(mapStateToProps)(MainContent);
