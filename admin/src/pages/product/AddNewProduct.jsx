import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import getFormValues from '../../utils/getFormValues.js';
import styles from './AddNewProduct.module.css';

const AddNewProduct = ({ edit }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { isEmpty, data } = getFormValues(e.currentTarget);

    if (isEmpty) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const formData = new FormData();

      // Append form data
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      if (!edit) {
        // Append selected files
        selectedFiles.forEach((file, index) => {
          formData.append(`images`, file);
        });
      }

      const response = await fetch(`https://minimal-shop.onrender.com/admin/products/${edit ? productId : ''}`, {
        method: edit ? 'PUT' : 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Something went wrong');
      }

      const res = await response.json();
      alert(res.message);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
    // clear inputs
  };

  useEffect(() => {
    if (edit) {
      fetch(`https://minimal-shop.onrender.com/product/${productId}`)
        .then((response) => response.json())
        .then((data) => setProduct(data.product));
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <section>
          <Sidebar />
          <section id={styles['addnew-wrapper']}>
            <h1>{edit ? 'Edit Product' : 'Add New Product'}</h1>
            <div className={styles['form-wrapper']}>
              <form onSubmit={onSubmit}>
                <div className={styles['form-control']}>
                  <label htmlFor='name'>Product Name</label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    defaultValue={edit ? product.name : ''}
                    placeholder='Enter Product Name'
                    required
                  />
                </div>
                <div className={styles['form-control']}>
                  <label htmlFor='category'>Category</label>
                  <input
                    type='text'
                    id='category'
                    name='category'
                    defaultValue={edit ? product.category : ''}
                    placeholder='Enter Category'
                    required
                  />
                </div>
                <div className={styles['form-control']}>
                  <label htmlFor='price'>Price</label>
                  <input
                    type='number'
                    id='price'
                    name='price'
                    defaultValue={edit ? product.price : ''}
                    placeholder='Enter Price'
                    required
                  />
                </div>
                <div className={styles['form-control']}>
                  <label htmlFor='shortDesc'>Short Description</label>
                  <input
                    type='text'
                    id='shortDesc'
                    name='shortDesc'
                    defaultValue={edit ? product.short_desc : ''}
                    placeholder='Enter Short Description'
                    required
                  />
                </div>
                <div className={styles['form-control']}>
                  <label htmlFor='description'>Long Description</label>
                  <textarea
                    rows={5}
                    id='description'
                    name='description'
                    defaultValue={edit ? product.long_desc : ''}
                    placeholder='Enter Long Description'
                    required
                  />
                </div>
                {!edit && (
                  <div className={styles['form-control']}>
                    <label htmlFor='images'>Upload image (4 images)</label>
                    <input onChange={handleFileChange} type='file' name='images' id='images' multiple></input>
                  </div>
                )}
                <button type='submit' className={styles.btn}>
                  Submit
                </button>
              </form>
            </div>
          </section>
        </section>
      </main>
    </>
  );
};

export default AddNewProduct;
