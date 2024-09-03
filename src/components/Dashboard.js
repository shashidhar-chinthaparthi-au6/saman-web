import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Dashboard = () => {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/summary');
        setSummary(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSummary();
  }, []);

  return (
    <Container>
      <h1>Dashboard</h1>
      {Object.keys(summary).length > 0 ? (
        <>
          <SummaryCard>Total Orders: {summary.totalOrders}</SummaryCard>
          <SummaryCard>Orders Completed: {summary.ordersCompleted}</SummaryCard>
          <SummaryCard>Orders In Progress: {summary.ordersInProgress}</SummaryCard>
          <SummaryCard>Total Revenue: {summary.totalRevenue}</SummaryCard>
          <SummaryCard>New Users: {summary.newUsers}</SummaryCard>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
  
};

const Container = styled.div`
  padding: 2rem;
`;

const SummaryCard = styled.div`
  background: #f4f4f4;
  padding: 1rem;
  margin: 1rem 0;
`;

export default Dashboard;
