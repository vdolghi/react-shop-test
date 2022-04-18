import React, {useState, useEffect} from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import ReactPaginate from 'react-paginate';
import {Provider, useDispatch, useSelector} from 'react-redux';
import store from '../store';
import {addProductToCart} from '../store/cart';
import {fetchProducts} from '../store/product';
import './pagination.css';

export function SingleProduct(props) {
    const products = useSelector((state) => state.products.items);
    const {img, name, price, description} = props;
    const product = products.find((p) => p.id === props.id);
    const dispatch = useDispatch();
    const handleAddProduct = (product) => { 
        dispatch(addProductToCart(product));
     };
    
    return(
    <Provider store={store}>
        <ListGroup.Item as="li" className="p-3">
            <Row>
                <Col md={2}>
                    <Image
                        src={img}
                        alt="Generic placeholder"
                        fluid
                        rounded
                    />
                </Col>
                <Col md={10} className="d-flex flex-column justify-content-center">
                    <h5 className="mt-0 font-weight-bold mb-2">{name}</h5>
                    <p className="font-italic text-muted mb-0 small mb-3">
                        {description}
                    </p>
                    <div className="d-flex align-items-center justify-content-between mt-1">
                        <h6 className="font-weight-bold my-2">{price} &euro;</h6>
                        <Button
                            variant="outline-primary"
                            size="sm"
                            style={{
                                fontSize: '0.7rem',
                            }}
                            onClick={() => {
                                console.log('add product');
                                handleAddProduct(product);
                            } }
                        >
                            Add to Cart
                        </Button>
                    </div>
                </Col>
            </Row>
        </ListGroup.Item>
    </Provider>
);
}

export default function Products() {

    const [currentPage, setCurrentPage] = useState(0);
    const [data, setData] = useState([]);
    const perPage = 5;
    const offset = currentPage * perPage;
    const [pageCount, setPageCount] = useState(0);
    const dispatch = useDispatch();

    const handlePageClick = (e) => {
      const selectedPage = e.selected;
      setCurrentPage(selectedPage);
    };

    const products = useSelector((state) => state.products.items);
    useEffect(() => {dispatch(fetchProducts())}, [dispatch]);
    

    useEffect(() => { 
        const slice = products.slice(offset, offset + perPage);
        const data = slice.map(pd => <SingleProduct key={pd.id} id={pd.id} img={pd.image} name={pd.name} description={pd.short_description} price={pd.price}></SingleProduct>);
        setData(data);
        setPageCount(Math.ceil(products.length / perPage)); 
    }, [offset, perPage, products]);

    return (
        <ListGroup as="ol" className="w-75 mx-auto">
            {data}
            <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                
        </ListGroup>
    );
}
