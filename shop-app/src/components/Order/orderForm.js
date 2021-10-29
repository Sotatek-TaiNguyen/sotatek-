import 'antd/dist/antd.css';
import '../../index';
import { Form, Input, Button } from 'antd';
import orderApi from '../../api/orderApi';
import { useState } from "react";
import { useHistory } from "react-router-dom";

const layout = {
    labelCol: {
        span: 7,
    },
    wrapperCol: {
        span: 10,
    },
};
/* eslint-disable no-template-curly-in-string */
// eslint-disable-next-line react-hooks/rules-of-hooks
const validateMessages = {
    required: '${label} is required!',
};
/* eslint-enable no-template-curly-in-string */

const OrderForm = (props) => {
    const history = useHistory()


    const userId = props.userOrder.user.userId;
    const [notification, setNotification] = useState(null)
    const onFinish = async (data) => {

        const res = await orderApi.createOrder({
            orderUser: userId,
            description: data.order.description,
            address: data.order.address,
            phonenumber: data.order.phone,

        })
        if (!res.error) {
            setNotification("Create Order successful")
            setTimeout(() => {
                history.push("/")
            }, 2000);
        } else {
            console.log(res.error);
        }

    }

    return (
        <div className="order-form" >
            {notification && <div >{notification}</div>}
            <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                {/* <Form.Item
                    name={['order', 'name']}
                    label="Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item> */}
                {/* <Form.Item
                    name={['order', 'email']}
                    label="Email"
                    rules={[
                        {
                            type: 'email',
                        },
                    ]}
                >
                    <Input />
                </Form.Item> */}
                <Form.Item
                    name={['order', 'phonenumber']}
                    label="phoneNumber"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item name={['order', 'address']} label="Address"
                    rules={[
                        {
                            required: true,
                        },
                    ]}>
                    <Input />
                </Form.Item>
                <Form.Item name={['order', 'description']} label="Description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default OrderForm