import React, { useState } from 'react';

const FilterBar = ({ onFilterChange }) => {
  const [salesOrder, setSalesOrder] = useState('');
  const [salesOrderType, setSalesOrderType] = useState('');
 

  const handleFilter = () => {
    var url = `api/http/SaleO1?`;
    if (salesOrder.trim() !== '') {
      url += `SalesOrder=${salesOrder}&`;
    }
    if(salesOrderType.trim()!==''){
      url+=`SalesOrderType=${salesOrderType}&`
    }
    url+=`Top=100&Skip=0`;
    
    const filters={
      SalesOrder: salesOrder,
      SalesOrderType: salesOrderType,
      Top: '100',
      Skip: '0',
      Url:url
    }
    onFilterChange(filters);
  };

  const handleReset = () => {
    const defaultUrl = 'api/http/SaleO1?Top=100&Skip=0';

    const filters={
      SalesOrder: '',
      SalesOrderType: '',
      Top: '100',
      Skip: '0',
      Url:defaultUrl
    }
    setSalesOrder('');
    setSalesOrderType('');
    onFilterChange(filters);
  };

  return (
    <div style={styles.filterBar}>
      <h2>Sales Order Details</h2>
      <div style={styles.filterRow}>
        <div style={styles.filterItem}>
          <label style={styles.label}>Sales Order:</label>
          <input
            type="text"
            value={salesOrder}
            onChange={(e) => setSalesOrder(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.filterItem}>
          <label style={styles.label}>Sales Order Type:</label>
          <input
            type="text"
            value={salesOrderType}
            onChange={(e) => setSalesOrderType(e.target.value)}
            style={styles.input}
          />
        </div>       
      </div>

      <div style={styles.buttonContainer}>
        <button onClick={handleFilter} style={styles.button}>
          Apply
        </button>
        <button onClick={handleReset} style={styles.button}>
          Reset
        </button>
      </div>
    </div>
  );
};

const styles = {
  filterBar: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    padding: '10px',
    margin: '0',
    backgroundColor: '#ffffff',
    zIndex: '999', // Ensures it's above other content
    borderRadius: '0 0 4px 4px', // Optional rounded corners
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  filterRow: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  filterItem: {
    marginBottom: '10px',
    flex: '1 1 20%', // Adjust flex basis to control width
    minWidth: '200px', // Minimum width to prevent items from collapsing
    display: 'flex',
    alignItems: 'center', // Align items vertically
  },
  label: {
    marginRight: '10px',
    fontWeight: 'bold',
    minWidth: '120px',
    display: 'inline-block',
  },
  input: {
    flex: '1',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '14px',
    outline: 'none',
    width: '70%', // Ensure inputs take full width
  },
  select: {
    appearance: 'none',
    paddingLeft: '8px',
    paddingRight: '32px',
    background: `url("data:image/svg+xml,%3csvg viewBox='0 0 10 5' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5 0L0 5h10z' fill='%23000000'/%3e%3c/svg%3e") no-repeat right 8px top 50%/10px 5px`,
    backgroundPositionY: 'center',
    width: '100%', // Ensure select takes full width
  },
  buttonContainer: {
    marginTop: '10px',
    textAlign: 'right',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007cc0',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
    outline: 'none',
  },
};

export default FilterBar;
