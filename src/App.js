import React, { useState, useEffect ,Suspense} from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FilterBar from './components/FilterBar';
import Table from './components/Table';
import ItemDetailsPage from './components/ItemDetailsPage';

const Loading = () => {
  return (
    <div></div>
  )
};

const App = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [filterParams, setFilterParams] = useState({
    SalesOrder: '',
    SalesOrderType: '',
    Top: '100',
    Skip: '0',
    Url: 'api/http/SaleO1?Top=100&Skip=0'
  });


  const handleFilterChange = (filterParams) => {
    setFilterParams(filterParams);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage onFilterChange={handleFilterChange} filterParams={filterParams} />} />
          <Route path="/item/:salesOrder" element={<ItemDetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

const HomePage = ({ onFilterChange, filterParams }) => {
  return (
    <div style={styles.container}>

      <FilterBar onFilterChange={onFilterChange} />
      <div style={styles.tableContainer}>
        {/* <Suspense fallback={<Loading />}> */}
          <Table filterParams={filterParams} />
        {/* </Suspense> */}

      </div>

    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    marginTop: '20px'
  },
  tableContainer: {
    marginTop: '20px',
    width: '100%',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
  },
};



export default App;
