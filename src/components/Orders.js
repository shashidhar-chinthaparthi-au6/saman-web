import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/v1/orders');
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <Container>
      <h1>Orders</h1>
      {orders.map(order => (
        <OrderCard key={order._id}>
          <h2>Order ID: {order._id}</h2>
          <p>Status: {order.status}</p>
          <p>Total Amount: {order.totalAmount}</p>
        </OrderCard>
      ))}
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
`;

const OrderCard = styled.div`
  background: #f4f4f4;
  padding: 1rem;
  margin: 1rem 0;
`;

export default Orders;
