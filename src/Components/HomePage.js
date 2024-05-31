import ProductCard from "./ProductCard"
import { Row, Container } from "react-bootstrap";

export default function HomePage({ products }) {
    return (
        <>
            <Container fluid className="my-2">
                <Row>
                    {
                        products.map((ele) => {
                            return (
                                <ProductCard product={ele} key={ele.id} />
                            )
                        })
                    }
                </Row>
            </Container>
        </>
    )
}