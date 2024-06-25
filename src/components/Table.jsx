import React, { useState,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import FilterBar from './FilterBar';

const Table = ({filterParams}) => {
  console.log("params",filterParams);
  const [tabledata,setTableData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading,setLoading] = useState(true);

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  };

  const thStyle = {
    backgroundColor: '#f0f0f0',
    color: '#333',
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  };

  const tdStyle = {
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    verticalAlign: 'middle',
  };

  const selectedRowStyle = {
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  };

  const buttonStyle = {
    padding: '10px 20px',
    marginRight: '10px',
    backgroundColor: '#007cc0',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textTransform: 'uppercase',
  };

  const buttonHoverStyle = {
    backgroundColor: '#007cc0',
  };

  const handleRowSelect = (index) => {
    setSelectedRow(index);
  };
  const handleDataUpdate = (items) => {
    setTableData([]);
    if (Array.isArray(items)) {
      setTableData((prevData) => [...prevData, ...items]);
    } else if (typeof items === 'object' && items !== null) {
      setTableData((prevData) => [...prevData, items]);
    } else {
      console.error('Invalid data format:', items);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {    
        // await new Promise(resolve => setTimeout(resolve, 10000));
        console.log("filterParams url in table",filterParams.Url);
        const fetchResponse = await fetch(filterParams.Url,
        {
          method: 'GET',
          headers: {
            'Authorization': 'Basic bmlzaGFudGJAeWFtYWhhLW1vdG9yLWluZGlhLmNvbTpOaXNoYW50MTIzIw=='
          },
        }
      ) 
      const data = await fetchResponse.json();
      console.log("data of table",data);
      handleDataUpdate(data.A_SalesOrder.A_SalesOrderType)
      setLoading(false); // Once data is fetched, set loading to false
        console.log("data fetched successfully",data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filterParams]);

  return (
    <div style={{ margin: '20px',marginTop:'150px' }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}></th> {/* Empty header for radio button column */}
            <th style={thStyle}>Sales Order</th>
            <th style={thStyle}>Sales Order Type</th>
            <th style={thStyle}>Sales Organization</th>
            <th style={thStyle}>Distribution Channel</th>
            <th style={thStyle}>Organization Division</th>
            <th style={thStyle}>Sold To Party</th>
            <th style={thStyle}>Creation Date</th>
            <th style={thStyle}>Created By User</th>
            <th style={thStyle}>Total Net Amount</th>
          </tr>
        </thead>
        <tbody>
          {console.log("tabledata",tabledata)}
          {tabledata.map((item, index) => (
            <tr key={index} style={selectedRow === index ? selectedRowStyle : null}>
              <td style={{ ...tdStyle, textAlign: 'center' }}>
                <input
                  type="radio"
                  name="selectRow"
                  checked={selectedRow === index}
                  onChange={() => handleRowSelect(index)}
                />
              </td>
              <td style={tdStyle}>
                <Link
                  to={{
                    pathname: `/item/${item.SalesOrder}`
                  }}
                  state={{
                    row:item,
                    rowData: ''
                  }}
                >
                  {item.SalesOrder}
                </Link>
              </td>
              <td style={tdStyle}>{item.SalesOrderType}</td>
              <td style={tdStyle}>{item.SalesOrganization}</td>
              <td style={tdStyle}>{item.DistributionChannel}</td>
              <td style={tdStyle}>{item.OrganizationDivision}</td>
              <td style={tdStyle}>{item.SoldToParty}</td>
              <td style={tdStyle}>{item.CreationDate}</td>
              <td style={tdStyle}>{item.CreatedByUser}</td>
              <td style={tdStyle}>{item.TotalNetAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
