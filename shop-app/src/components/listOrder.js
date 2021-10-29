import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux"
import orderApi from "../api/orderApi";
import ListOrder from "./Order/listOrder"
import { useParams } from "react-router-dom";

const Profile = (props) => {
    const [orderList, setOrderList] = useState([]);
    var { userId } = useParams()
    console.log(userId)

    useEffect(() => {
        async function fetchOrders() {
            try {
                const response = await orderApi.getByOrderUserId(userId)
                // console.log('order response', response)
                setOrderList(response);

            } catch (error) {
                // console.log("failed to fetch data order list ", error)
            }
        }
        fetchOrders();
    }, []);
    // console.log("datata order ", orderList)
    return (
        <div >
            <ListOrder user={props.usernameRedux[0]} OrderList={orderList} />
            order
        </div>
    )
}
function mapStateToProps(state) {
    return { usernameRedux: state.users }
}


export default connect(mapStateToProps)(Profile);


