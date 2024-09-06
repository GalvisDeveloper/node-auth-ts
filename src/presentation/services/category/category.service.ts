import _ from 'lodash';
import { CategoryModel } from '../../../data';
import { CreateCategoryDto } from '../../../domain/dtos/category/create-category.dto';
import { UserEntity } from '../../../domain/entities/user';


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

    async getCategories() {

        try {
            const categories = await CategoryModel.find();
            const data = _.map(categories, obj => _.pick(obj, ['id', 'name', 'available']));
            return { data };
        } catch (e) {
            console.log(e);
            throw { message: `Internal server error`, code: 500 };
        }

    }

}