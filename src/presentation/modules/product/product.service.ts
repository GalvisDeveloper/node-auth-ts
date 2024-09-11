import { ProductModel } from "../../../data";
import { CreateProductDto, PaginationDto } from "../../../domain";


export class ProductService {

    constructor(
        // DI
    ) { }


    async createProduct(createProductDto: CreateProductDto) {

        const productExists = await ProductModel.findOne({ name: createProductDto.name });
        if (productExists) throw { message: 'Product already exists', code: 400 };

        try {
            const product = new ProductModel(createProductDto);

            await product.save();

            // const { id, name, available } = category
            // const data = { id, name, available };

            return { message: 'Product created', data: product };
        } catch (e) {
            console.log(e);
            throw { message: `${e}`, code: 500 };
        }

    }

    async getCategories(paginationDto: PaginationDto) {

        const { page, limit } = paginationDto;

        try {
            const [total, products] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find().skip((page - 1) * limit).limit(limit)
                    .populate('category', 'name available _id')
                    .populate('user', 'name email _id')
            ]);
            const dataToSend = {
                page,
                limit,
                total,
                ...(page < total / limit && { next: `/api/products?page=${+page + 1}&limit=${+limit}` }),
                ...(page - 1 > 0 && { previous: `/api/products?page=${+page - 1}&limit=${+limit}` })
            }
            return { data: products, ...dataToSend };
        } catch (e) {
            console.log(e);
            throw { message: `Internal server error`, code: 500 };
        }

    }

}