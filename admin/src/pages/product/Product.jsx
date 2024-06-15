import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import Table from '../../components/Table/Table.jsx';
import useDebounce from '../../hooks/useDebounce.js';
import { useFetch } from '../../hooks/useFetch.js';
import styles from './Product.module.css';

const Product = () => {
  const navigate = useNavigate();
  const { data, loading } = useFetch('admin/products');

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const debounceSearch = useDebounce(search, 500);

  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    // Use selectedId for the delete operation
    try {
      const response = await fetch(`https://minimal-shop.onrender.com/admin/products/${selectedId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.message);
        throw new Error(`${response.status}: ${data.message}`);
      }

      // Filter out the deleted hotel from the hotels state
      setProducts(products.filter((hotel) => hotel._id !== selectedId));

      console.log('Hotel deleted successfully');
    } catch (err) {
      console.error(err);
    }
    setOpen(false);
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 180 },
    { field: 'name', headerName: 'Name', width: 350 },
    { field: 'price', headerName: 'Price', width: 120, renderCell: (params) => params.value.toLocaleString('de-DE') },
    {
      field: 'img',
      headerName: 'image',
      width: 160,
      renderCell: (params) => <img width={50} src={params.row.img1} alt={params.row.name} />,
    },
    { field: 'category', headerName: 'Category', width: 150 },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <span
              className={styles['edit-btn']}
              onClick={(event) => {
                event.stopPropagation(); // Prevent the event from propagating up
                console.log('Edit product:', params.row._id);
                navigate(`/products/edit/${params.row._id}`);
              }}
            >
              Edit
            </span>
            <span
              className={styles['delete-btn']}
              onClick={(event) => {
                event.stopPropagation(); // Prevent the event from propagating up
                handleClickOpen(params.row._id);
              }}
            >
              Delete
            </span>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (data && data.products) {
      setProducts(data.products);
    } else {
      setProducts([]);
    }
  }, [data]);

  useEffect(() => {
    if (debounceSearch) {
      const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(debounceSearch.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      if (data && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    }
  }, [debounceSearch]);

  return (
    <>
      <Header />
      <main>
        <section>
          <Sidebar />
          <section id={styles['product-wrapper']}>
            <div className={styles['search-product']}>
              <p>Search:</p>
              <input onChange={(e) => setSearch(e.target.value)} type='text' placeholder='Enter search!' />
            </div>
            {!loading && (
              <Table
                title='Products list'
                rows={products}
                columns={columns}
                button={{ title: 'Add New', to: '/products/add-new' }}
              />
            )}
          </section>
        </section>
      </main>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{'Confirm Delete'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={handleDelete} color='primary' autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Product;
