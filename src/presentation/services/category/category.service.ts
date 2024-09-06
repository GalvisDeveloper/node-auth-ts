import _ from 'lodash';
import { CategoryModel } from '../../../data';
import { CreateCategoryDto } from '../../../domain/dtos/category/create-category.dto';
import { UserEntity } from '../../../domain/entities/user';
import { PaginationDto } from '../../../domain';


export class CategoryService {

    constructor(
        // DI
    ) { }


    async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
        const categoryExists = await CategoryModel.findOne({ name: createCategoryDto.name });
        if (categoryExists) throw { message: 'Category already exists', code: 400 };

        try {
            const category = new CategoryModel({
                ...createCategoryDto,
                user: user.id,
            });
            await category.save();

            const { id, name, available } = category
            const data = { id, name, available };

            return { message: 'Category created', data };
        } catch (e) {
            console.log(e);
            throw { message: `Internal server error`, code: 500 };
        }

    }

    async getCategories(paginationDto: PaginationDto) {

        const { page, limit } = paginationDto;

        try {
            const [total, categories] = await Promise.all([
                CategoryModel.countDocuments(),
                CategoryModel.find().skip((page - 1) * limit).limit(limit)
            ]);
            const data = _.map(categories, obj => _.pick(obj, ['id', 'name', 'available']));
            const dataToSend = {
                page,
                limit,
                total,
                ...(page < total / limit && { next: `/api/categories?page=${+page + 1}&limit=${+limit}` }),
                ...(page - 1 > 0 && { previous: `/api/categories?page=${+page - 1}&limit=${+limit}` })
            }
            return { data, ...dataToSend };
        } catch (e) {
            console.log(e);
            throw { message: `Internal server error`, code: 500 };
        }

    }

}