//third party package
import { Row, Col, Card, Image } from "react-bootstrap";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";

//action creators
import { addItem,changeItem, removeItem } from "../actions/cartAction";

export default function ProductCard({ product }) {
    //dispatch function to dispatch the action to the redux store
    const dispatch = useDispatch()

    //accessing the cartItems from redux store
    const cartItems = useSelector((state) => {
        return state.cartItems
    })

    //to hanlde the add button based on items added in the cart or not
    const handleButton = (product) => {
        let item = undefined
        if (cartItems.length > 0) {
            item = cartItems.find((ele) => ele.id === product.id)
        }

        // to add item if not added
        const handleClick = () => {
            dispatch(addItem(product))
        }

        //checking here the no of particular product added in the cart 
        if (item) {
            return (
                <>
                    <button className='btn btn-primary px-2' onClick={() => dispatch(changeItem(product.id, 'dec'))} disabled={item.quantity === 1}>-</button>
                    <h5 className="inline-block">{item.quantity}</h5>
                    <button className='btn btn-primary px-2' onClick={() => dispatch(changeItem(product.id, 'inc'))}>+</button>
                    <button className='btn btn-primary px-2' style={{ marginLeft: '1px' }} onClick={() => dispatch(removeItem(product.id, 'delete'))}>x</button>
                </>
            )
        } else {
            return (
                <button className='btn btn-primary mx-1' onClick={handleClick}> Add</button>
            )
        }
    }


    return (
        <>
            <Col className="col-md-2 mx-3 my-2">
                <Card
                    style={{
                        width: "15rem",
                        height: "19rem",
                    }}
                    className="my-card"
                >
                    <Card.Body>
                        <Image
                            style={{
                                width: "100%",
                                height: "50%",
                            }}
                            src={`http://localhost:3089/images/${product.image}`}
                            alt="photo"
                        />
                        <br />
                        <Row>
                            <Col>
                                <h5 className="inline-block">{product.name}</h5> <br />
                                {product.description}
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col>
                                <FaIndianRupeeSign /> {product.price}
                            </Col>
                            <Col>
                                {handleButton(product)}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}