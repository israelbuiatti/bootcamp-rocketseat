import csvParse from 'csv-parse'
import fs from 'fs'
import { getCustomRepository, getRepository, In } from 'typeorm';
import Transaction from './../models/Transaction';
import Category from './../models/Category';
import TransactionsRepository from './../repositories/TransactionsRepository';

TransactionsRepository

interface CSVTransaction {
    title: string;
    type: 'income' | 'outcome';
    value: number;
    category: string;

}

class ImportTransactionsService {

    async execute(filaPath: string): Promise<Transaction[]> {

        const transactionsRepository = getCustomRepository(TransactionsRepository);
        const categoriesRepository = getRepository(Category);

        const contactsReadStream = fs.createReadStream(filaPath);

        const parsers = csvParse({
            from_line: 2
        });

        const parseCSV = contactsReadStream.pipe(parsers);

        const transactions: CSVTransaction[] = [];
        const categories: string[] = [];

        parseCSV.on('data', async line => {
            const [title, type, value, category] = line.map((cell: string) => cell.trim());

            if (!title || !type || !value) return;

            categories.push(category);

            transactions.push({title, type, value, category});

        });

        await new Promise(resolve => parseCSV.on('end', resolve));

        const existenCategories = await categoriesRepository.find({
            where: {
                title: In(categories)
            }
        })

        const existenCategoriesTitles = existenCategories.map((category: Category) => category.title);

        const addCategoryTitles = categories.filter(category => !existenCategoriesTitles.includes(category)).filter((value, index, self) => self.indexOf(value) === index);

        const newCategories = categoriesRepository.create(addCategoryTitles.map(title => ({title})))

        await categoriesRepository.save(newCategories);

        const finalCategories = [ ...newCategories, ...existenCategories];

        const createdTransactions = transactionsRepository.create(
            transactions.map(transaction => ({
                title: transaction.title,
                type: transaction.type,
                value: transaction.value,
                category: finalCategories.find(
                    category => category.title === transaction.category
                )
            }))
        );

        await transactionsRepository.save(createdTransactions);

        await fs.promises.unlink(filaPath);

        return createdTransactions;

    }

}

export default ImportTransactionsService;