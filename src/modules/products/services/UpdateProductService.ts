import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Products';
import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    public async execute({
        id,
        name,
        price,
        quantity,
    }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);
        // procurar produto pelo id
        const product = await productsRepository.findOne(id);
        
        if (!product) {
            throw new AppError('Product not found.');
        }
        //procurar se já existe um produto com o mesmo nome que quer atualizar 
        const productExists = await productsRepository.findByName(name);

        if(productExists && name !== product.name) {
            throw new AppError('There is already one product with this name.');
        }

        //atualizar os dados
        product.name = name;
        product.price = price;
        product.quantity = quantity;

        //salvar alteração
        await productsRepository.save(product);

        return product;
    }
}

export default UpdateProductService;
