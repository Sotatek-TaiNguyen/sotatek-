
import React, { useState } from "react";
import 'antd/dist/antd.css';
import { Button } from 'antd';
import orderApi from '../../api/orderApi';


const ListOrder = (props) => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const cancelOrder = async (id) => {
        setError(null)
        setLoading(true)
        orderApi.cancelOrder(id).then(response => {
            setLoading(false)
        }).catch(
            error => {
                setLoading(false)
                if (error.response.status === 403) {
                    setError(error.response.data.message)
                }
                else {
                    setError("Error.Please try later")
                }
                // console.log(error)
                // // setError(error)
            }
        )
    }
    return (
        <div className="order-form">
            <div className="container">
                {error && <div className="error">{error}</div>}
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Order Code</th>
                            <th scope="col">Delivery Address</th>
                            <th scope="col">Phone Number</th>
                            <th scope="col">Description</th>
                            <th scope="col">Status</th>
                            <th scope="col">
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            props.OrderList.map(order => <tr key={order._id}>
                                <th scope="row">{`ORDER-${order._id}`}</th>
                                <td>{order.address}</td>
                                <td>{order.phone}</td>
                                <td>{order.description}</td>
                                <td>
                                    {order.status}
                                </td>
                                <td>
                                    <input type="button" value={loading ? "Loading.." : "Cancel"} disabled={loading}
                                        onClick={() => cancelOrder(order._id)} />
                                </td>
                                <td>
                                </td>
                            </tr>)

                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
};
export default ListOrder
