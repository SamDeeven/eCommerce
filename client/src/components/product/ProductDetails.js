import React,{Fragment,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {Carousel} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import { getProductDetails,clearErrors } from '../../actions/productActions'

const ProductDetails = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const {loading, error, product} = useSelector(state=>state.productDetails)


    useEffect(()=>{
        dispatch(getProductDetails(params.id)) ;

        if(error){
            dispatch(clearErrors());
        }

    },[dispatch,error,params.id])



    return (
        <Fragment>
        {loading ? <h1>Loading...</h1>:(
            <Fragment>
            <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <Carousel pause='hover'>
                    {product.images && product.images[0].url.map(image=>(
                        <Carousel.Item key={image.public_id}>
                            <img className='d-block w-100' src={image.url} alt={product.title}/>
                        </Carousel.Item>
                        
                    ))}


                </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">Product # {product._id}</p>

                <hr/>


                <hr/>

                <p id="product_price">Rs.{product.price}/-</p>
               
                 <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>

                <hr/>
                <hr/>

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>
                <hr/>
				
				

        </div>
        </div>
            
            
            
            </Fragment>

        )}
       
       </Fragment>
    )
}

export default ProductDetails;
