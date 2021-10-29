import React, { useEffect, useState } from "react";
import { connect } from "react-redux"
import productApi from "../api/productApi";
import ListItems from "./Products/product"

const MainContent = (props) => {
    const [productList, setProductList] = useState([]);
    useEffect(() => {
        const fetchProductList = async () => {
            try {
                const response = await productApi.getAll()
                // console.log(' product response', response)
                setProductList(response);
                // console.log("datata product ", productList)

            } catch (error) {
                // console.log("failed to fetch data product list ", error)
            }
        }
        fetchProductList()
    }, [])

    return (
        <div >
            <ListItems isLoggedIn={props.usernameRedux[0]} products={productList} />
        </div>
    )
}
function mapStateToProps(state) {
    return { usernameRedux: state.users }
}


export default connect(mapStateToProps)(MainContent);


