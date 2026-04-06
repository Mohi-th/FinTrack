import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredTransactions } from '../store/slices/transactionSlice';
import { openModal, closeModal } from '../store/slices/uiSlice';
import { Plus, Download } from 'lucide-react';
import Header from '../components/layout/Header';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionList from '../components/transactions/TransactionList';
import TransactionForm from '../components/transactions/TransactionForm';

export default function TransactionsPage() {
  const dispatch = useDispatch();
  const modalOpen = useSelector(s => s.ui.modalOpen);
  const allFilteredTx = useSelector(selectFilteredTransactions);

  const handleExportCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = allFilteredTx.map(tx => [
      new Date(tx.date).toLocaleDateString('en-US'),
      `"${tx.description}"`,
      tx.category,
      tx.type,
      tx.amount.toFixed(2),
    ]);

    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fintrack_transactions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Header />
      <div className="px-6 pb-6 flex flex-col gap-5 max-w-[1200px] mx-auto w-full max-sm:px-4 max-sm:gap-4 max-[360px]:px-3 max-[360px]:gap-3">
        {/* Page title */}
        <div className="flex items-end justify-between pt-1 max-sm:flex-col max-sm:items-start max-sm:gap-2">
          <div>
            <h2 className="text-2xl font-bold text-text-primary font-display max-sm:text-xl">Transactions</h2>
            <p className="text-sm text-text-muted">{allFilteredTx.length} transactions found</p>
          </div>
          <div className="flex items-center gap-3 max-sm:w-full max-[360px]:flex-col max-[360px]:items-stretch">
            <Button variant="secondary" size="sm" icon={Download} onClick={handleExportCSV}>
              Export CSV
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Plus}
              onClick={() => dispatch(openModal({ type: 'addTransaction' }))}
            >
              Add Transaction
            </Button>
          </div>
        </div>

        <TransactionFilters />

        <Card padding="none" className="animate-fade-in-up">
          <TransactionList />
        </Card>

        <Modal
          isOpen={modalOpen === 'addTransaction' || modalOpen === 'editTransaction'}
          onClose={() => dispatch(closeModal())}
          title={modalOpen === 'editTransaction' ? 'Edit Transaction' : 'Add Transaction'}
        >
          <TransactionForm />
        </Modal>
      </div>
    </>
  );
}
