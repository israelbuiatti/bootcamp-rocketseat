import AppError from '../errors/AppError';
import { getCustomRepository } from 'typeorm';
import { getRepository } from 'typeorm';
import Transaction from '../models/Transaction';
import Category from './../models/Category';
import TransactionsRepository from './../repositories/TransactionsRepository';


interface Request {
    title: string;
    type: 'income' | 'outcome';
    value: number;
    category: string;
}

class CreateTransactionService {

    public async execute({title, type, value, category}:Request): Promise<Transaction> {

        const transactionsRepository = getCustomRepository(TransactionsRepository);


        const balance = await transactionsRepository.getBalance();

        if (type == 'outcome' && value > balance.total) {
            throw new AppError('The account has no balance.');
        }

        const categoriesRepository = getRepository(Category);

        let categoryDb = await categoriesRepository.findOne({
            where: { title: category }
        });

        if (!categoryDb) {
            categoryDb = categoriesRepository.create({title:category});
            await categoriesRepository.save(categoryDb);
        }

        const category_id = categoryDb.id;

        const transaction = transactionsRepository.create({title, type, value, category_id});

        await transactionsRepository.save(transaction);

        return transaction;

    }

}

export default CreateTransactionService;
