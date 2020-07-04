import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface parmCreateTransaction{
  title: string;
  value: number;
  type : 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }



  public execute( { title, value, type } : parmCreateTransaction): Transaction {


    const typeNotAllowed = !['income','outcome'].includes(type)

    if ( typeNotAllowed )
      throw new Error("Type not Allowed");

    const { total } = this.transactionsRepository.getBalance();




    const insufficientFunds = type === "outcome" && total < value

    if( insufficientFunds )
      throw new Error("Insufficient Funds");



    const transaction = this.transactionsRepository.create({ title, value, type });

    return transaction
  }
}




export default CreateTransactionService;
