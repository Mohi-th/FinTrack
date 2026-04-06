import API from './api';

export const getAllTransactions = async () => {
  const { data } = await API.get('/transactions');
  return data;
};

export const createTransaction = async (txData) => {
  const { data } = await API.post('/transactions', txData);
  return data;
};

export const updateTransaction = async (id, txData) => {
  const { data } = await API.put(`/transactions/${id}`, txData);
  return data;
};

export const deleteTransaction = async (id) => {
  const { data } = await API.delete(`/transactions/${id}`);
  return data;
};
