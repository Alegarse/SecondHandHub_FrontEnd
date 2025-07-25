import React from 'react'
import { useSelector } from 'react-redux';

const EditProductComponent = () => {

    const { dataProduct } = useSelector(
    (state) => state.productComponentReducer
  );

  const { dataProfile } = useSelector((state) => state.profileComponentReducer);
  const userId = dataProfile._id;
  return (
    <div>EditProductComponent</div>
  )
}

export default EditProductComponent