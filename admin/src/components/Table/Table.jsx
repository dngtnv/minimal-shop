import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import styles from './Table.module.css';

const Table = ({ title, rows, columns, button }) => {
  return (
    <section className={styles['table-wrapper']}>
      <div className={styles['table-content']}>
        <div className={styles['table-top']}>
          <h1 className={styles['table-title']}>{title}</h1>
          {button && (
            <Link to={button.to} className={styles['outline-btn']}>
              {button.title}
            </Link>
          )}
        </div>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </div>
    </section>
  );
};

export default Table;
