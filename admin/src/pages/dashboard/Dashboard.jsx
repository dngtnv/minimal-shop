import Header from '../../components/Header/Header.jsx';
import InfoBoard from '../../components/InfoBoard/InfoBoard.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import Table from '../../components/Table/Table.jsx';
import { useFetch } from '../../hooks/useFetch.js';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { data, loading } = useFetch('admin/orders');

  const columns = [
    { field: '_id', headerName: 'ID User', width: 200 },
    {
      field: 'fullName',
      headerName: 'Name',
      width: 120,
    },
    { field: 'phone', headerName: 'Phone', width: 120 },
    { field: 'address', headerName: 'Address', width: 130 },
    {
      field: 'total',
      headerName: 'Total',
      width: 130,
      renderCell: (params) => <p>{params.value.toLocaleString('de-DE')}</p>,
    },
    { field: 'delivery', headerName: 'Delivery', width: 150, renderCell: (params) => <p>Chưa vận chuyển</p> },
    { field: 'status', headerName: 'Status', width: 150 },
    {
      field: 'detail',
      headerName: 'Detail',
      width: 100,
      renderCell: (params) => {
        return <span className={styles['view-btn']}>View</span>;
      },
    },
  ];

  // Transform orders data to match columns
  const rows = data.orders?.map((order) => ({
    _id: order._id,
    fullName: order.user.userId.fullName,
    phone: order.user.userId.phone,
    address: order.user.address,
    total: order.total,
    status: order.status,
    // Add other fields as necessary
  }));

  return (
    <>
      <Header />
      <main>
        <section>
          <Sidebar />
          <section id={styles['dashboard-wrapper']}>
            <InfoBoard />
            {!loading && <Table title='Orders History' rows={rows} columns={columns} />}
          </section>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
