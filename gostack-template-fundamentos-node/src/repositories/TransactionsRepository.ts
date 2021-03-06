import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateDTO {
    title: string;
    value: number;
    type: 'income' | 'outcome';
}

class TransactionsRepository {
    private transactions: Transaction[];

    constructor() {
        this.transactions = [];
    }

    public all(): Transaction[] {
        return this.transactions;
    }

    public getBalance(): Balance {

        const balance = this.transactions.reduce((accumulator: Balance, transaction: Transaction) => {

            if (transaction.type == 'income') {
                accumulator.income += transaction.value;
            }

            if (transaction.type == 'outcome') {
                accumulator.outcome += transaction.value;
            }

            return accumulator;

        }, {
            income: 0,
            outcome:0,
            total: 0
        });

        balance.total = balance.income - balance.outcome;

        return balance;

    }

    public create({title, value, type}:CreateDTO): Transaction {

        const transaction = new Transaction({title, value, type});

        this.transactions.push(transaction);

        return transaction;

    }

    private getSumIncome(total:number, transaction:Transaction) {

        if (transaction.type == 'income') {
            return total + Math.round(transaction.value);
        }

        return 0;

    }

    private getSumOutcome(total:number, transaction:Transaction) {

        if (transaction.type == 'outcome') {
            return total + Math.round(transaction.value);
        }

        return total + 0;

    }
}

export default TransactionsRepository;
