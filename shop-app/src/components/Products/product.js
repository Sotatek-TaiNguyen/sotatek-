import { Link } from 'react-router-dom';


const ListItems = props => {
    return (
        props.products.map((item) =>
            <div className="card" key={item.id}>
                <div className=" card_img">
                    <img src={item.thumb} />
                </div>
                <div className="card_header">
                    <h2>{item.product_name}  </h2>
                    <p>{item.description}  </p>
                    <p className="price">{item.price}</p>
                    {
                        props.isLoggedIn ?
                            <Link to={`/products/${item._id}/order`} className="btn">Order this product</Link>
                            : <Link to="/login" className="btn">Login to order</Link>
                    }

                </div>
            </div>
        )
    )
}

export default ListItems
