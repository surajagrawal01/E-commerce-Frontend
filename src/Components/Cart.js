import { useMemo, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Card, Button, Form } from "react-bootstrap";
import { LiaRupeeSignSolid } from "react-icons/lia";

//component
import ProductCard from "./ProductCard";

//action creators
import { clearCart } from "../actions/cartAction";

//image
import img1 from "../images/empty-cart.jpg"

export default function Cart() {

    const dispatch = useDispatch()
    const [userInfo, setUserInfo] = useState({ firstName: '', lastName: '', address: '' })
    const [formErrors, setFormErrors] = useState({})

    //accessing cartItems from redux store
    const cartItems = useSelector((state) => {
        return state.cartItems
    })

    //to calculate total amount of items in the cart
    const calculateAmount = useMemo(() => {
        return cartItems.reduce((acc, cv) => {
            acc = acc + (cv.price * cv.quantity)
            return acc
        }, 0)
    }, [cartItems])

    //to handle user input for user details
    const handleChange = (e) => {
        e.stopPropagation()
        const { name, value } = e.target
        setUserInfo({ ...userInfo, [name]: value })
    }

    const errors = {}

    //to validate client side error
    const validateErrors = () => {
        if (userInfo.firstName.trim() === '') {
            errors.firstname = 'firstname is required'
        }
        if (userInfo.lastName.trim() === '') {
            errors.lastname = 'lastname is required'
        }
        if (userInfo.address.trim() === '') {
            errors.address = 'address is required'
        }
    }

    //to handle order placing
    const handleBooking = async () => {
        validateErrors()
        if (Object.keys(errors).length === 0) {
            setFormErrors({})
            const formData = {
                ...userInfo,
                cartItems
            }
            try {
                const response = await axios.post('http://localhost:3089/api/place-orders', formData)
                console.log(response.data)
                alert('Order Placed Successful')
                dispatch(clearCart())
            } catch (err) {
                alert(err.message)
            }
        } else {
            setFormErrors(errors)
        }
    }


    return (
        <>
            {cartItems.length > 0 ?
                <Row>
                    <Col xs={12} md={5} className="mx-3">
                        <Row xs={12} md={12} className='m-auto'>
                            <Card className='m-auto p-3 border-0' border="primary">
                                <Row xs={12} md={10}>
                                    <Card.Title>
                                        Cart Items
                                    </Card.Title>
                                    <hr />
                                </Row>
                                <Card.Body>
                                    {
                                        cartItems.map((ele) => {
                                            return (<ProductCard product={ele} key={ele.id} />)
                                        })
                                    }
                                </Card.Body>
                            </Card>
                        </Row >
                    </Col>
                    <Col xs={12} md={4} className="my-6">
                        <Row xs={12} md={12} className='m-auto'>
                            <Card className='m-auto p-3 border-0' border="info">
                                <Row xs={12} md={10}>
                                    <Card.Title>
                                        Bill Details
                                    </Card.Title>
                                    <hr />
                                </Row>
                                <Card.Body>
                                    <Card className="my-3 p-2" style={{ height: '30rem' }}>
                                        <Row className="offset-md-2 m-auto">
                                            <h5> Cart Amount : <span className="offset-md-4"><LiaRupeeSignSolid /> {calculateAmount}</span> </h5>
                                            <h5> Delivery charges : <span className="offset-md-3"><LiaRupeeSignSolid /> {calculateAmount * 0.10}</span> </h5> <hr />
                                            <h5> Total Amount : <span className="offset-md-4"> <LiaRupeeSignSolid />
                                                {calculateAmount + (calculateAmount * 0.10)}
                                            </span> </h5><hr />
                                        </Row>
                                        <h4>Customer Details</h4>
                                        <Form>
                                            <Form.Group className="mb-3" controlId="formBasicFirstName">
                                                <Form.Control type="firstName" placeholder="Enter firstname"
                                                    value={userInfo.firstName}
                                                    name="firstName"
                                                    onChange={handleChange} />
                                                {formErrors.firstname && <div className="text-danger">**{formErrors.firstname}</div>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicLastName">
                                                <Form.Control type="lastName" placeholder="Enter lastname"
                                                    value={userInfo.lastName}
                                                    name="lastName"
                                                    onChange={handleChange} />
                                                {formErrors.lastname && <div className="text-danger">**{formErrors.lastname}</div>}
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="formBasicAddress">
                                                <Form.Control type="address" placeholder="Enter address"
                                                    value={userInfo.address}
                                                    name="address"
                                                    onChange={handleChange} />
                                                {formErrors.address && <div className="text-danger">**{formErrors.address}</div>}
                                            </Form.Group>
                                        </Form>
                                        <Button onClick={handleBooking}>Place Order</Button>
                                    </Card>
                                </Card.Body>
                            </Card>
                        </Row >
                    </Col>
                </Row> : <div className="offset-md-3 col-6">
                    <img alt="empty-cart" src={img1} style={{ maxWidth: '100%' }} />
                </div>}
        </>
    )
}