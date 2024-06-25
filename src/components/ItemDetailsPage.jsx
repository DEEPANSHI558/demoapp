import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ItemDetailsPage = () => {
  const location = useLocation();
  const { row } = location.state;
  const [salesOrderItems, setSalesOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleSalesData = (items) => {
    setSalesOrderItems([]);
    if (Array.isArray(items)) {
      setSalesOrderItems((prevData) => [...prevData, ...items]);
    } else if (typeof items === 'object' && items !== null) {
      setSalesOrderItems((prevData) => [...prevData, items]);
    } else {
      console.error('Invalid data format:', items);
    }
  };

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const fetchResponse = await fetch(`https://port3002-workspaces-ws-8m7xm.us10.applicationstudio.cloud.sap/api/http/SaleItem?SalesOrder=${row.SalesOrder}`,
        {
          method: 'GET',
          headers: {
            'Authorization': 'Basic bmlzaGFudGJAeWFtYWhhLW1vdG9yLWluZGlhLmNvbTpOaXNoYW50MTIzIw=='
          },
        }
      )
      const data = await fetchResponse.json();
      console.log("itemdata", data);
      handleSalesData(data.A_SalesOrderItem.A_SalesOrderItemType);
      setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchItemData();
  }, []); 

  return (
    <div style={{ margin: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2>{row.SalesOrder}</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ flexBasis: 'calc(33.33% - 10px)', marginBottom: '10px' }}>
            <strong>Sales Order Type:</strong> {row.SalesOrderType}
          </div>
          <div style={{ flexBasis: 'calc(33.33% - 10px)', marginBottom: '10px' }}>
            <strong>Sales Organization:</strong> {row.SalesOrganization}
          </div>
          <div style={{ flexBasis: 'calc(33.33% - 10px)', marginBottom: '10px' }}>
            <strong>Distribution Channel:</strong> {row.DistributionChannel}
          </div>
          <div style={{ flexBasis: 'calc(33.33% - 10px)', marginBottom: '10px' }}>
            <strong>Organization Division:</strong> {row.OrganizationDivision}
          </div>
          <div style={{ flexBasis: 'calc(33.33% - 10px)', marginBottom: '10px' }}>
            <strong>Sold To Party:</strong> {row.SoldToParty}
          </div>
          <div style={{ flexBasis: 'calc(33.33% - 10px)', marginBottom: '10px' }}>
            <strong>Creation Date:</strong> {row.CreationDate}
          </div>
          <div style={{ flexBasis: 'calc(33.33% - 10px)', marginBottom: '10px' }}>
            <strong>Created By User:</strong> {row.CreatedByUser}
          </div>
          <div style={{ flexBasis: 'calc(33.33% - 10px)', marginBottom: '10px' }}>
            <strong>Total Net Amount:</strong> {row.TotalNetAmount}
          </div>
        </div>
      </div>

      <div>
        <h3>Sales Order Items</h3>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Sales Order Item</th>
              <th style={thStyle}>Higher Level Item</th>
              <th style={thStyle}>Higher Level Item Usage</th>
              <th style={thStyle}>Sales Order Item Category</th>
              <th style={thStyle}>Sales Order Item Text</th>
              <th style={thStyle}>Material</th>
              <th style={thStyle}>Requested Quantity</th>
              <th style={thStyle}>Requested Quantity SAP Unit</th>
              <th style={thStyle}>Production Plant</th>
              <th style={thStyle}>Storage Location</th>
              <th style={thStyle}>Transaction Currency</th>
              <th style={thStyle}>Net Amount</th>


            </tr>
          </thead>
          <tbody>
            {salesOrderItems.length > 0 ? (
              salesOrderItems.map((item, index) => (
                <tr key={index} >
                  <td style={tdStyle}>{item.SalesOrderItem}</td>
                  <td style={tdStyle}>{item.HigherLevelItem}</td>
                  <td style={tdStyle}>{item.HigherLevelItemUsage}</td>
                  <td style={tdStyle}>{item.SalesOrderItemCategory}</td>
                  <td style={tdStyle}>{item.SalesOrderItemText}</td>
                  <td style={tdStyle}>{item.Material}</td>
                  <td style={tdStyle}>{item.RequestedQuantity}</td>
                  <td style={tdStyle}>{item.RequestedQuantitySAPUnit}</td>
                  <td style={tdStyle}>{item.ProductionPlant}</td>
                  <td style={tdStyle}>{item.StorageLocation}</td>
                  <td style={tdStyle}>{item.TransactionCurrency}</td>
                  <td style={tdStyle}>{item.NetAmount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13">No Sales Order Items found.</td>
              </tr>
            )}
          </tbody>
        </table>
        {loading && <p>Loading...</p>}
      </div>
    </div>
  );
};

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
    fontWeight: 'bold',
  };

  const tdStyle = {
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '1px solid #ddd',
    verticalAlign: 'middle',
  };


export default ItemDetailsPage;
