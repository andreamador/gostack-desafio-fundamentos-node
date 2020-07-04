import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface parmCreateTransaction{
  title: string;
  value: number;
  type : 'income' | 'outcome';
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

    const balance =  this.transactions.reduce(
      (accumulator : Balance, transaction: Transaction) : Balance=>{

        switch (transaction.type) {
          case "income":
            accumulator.income += transaction.value;
            break;
          case "outcome":
            accumulator.outcome += transaction.value;
            break;
          default:
            break;
        }

        return accumulator;

      },<Balance>{
        income : 0,
        outcome : 0,
        total : 0
      })

      const total = balance.income - balance.outcome;

      return { ...balance, total };

  }

  public create( { title, value, type } : parmCreateTransaction): Transaction {

    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction
  }
}

export default TransactionsRepository;
