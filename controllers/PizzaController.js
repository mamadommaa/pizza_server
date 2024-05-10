import PizzaModel from '../models/Pizza.js';

export const pizza = async (req, res) => {
    
    try {
        console.log(req.query.sortBy)
        let query = {};
        if (req.query.category) {
            query.category = req.query.category;
        }

        // Формируем объект для сортировки
        let sortOptions = {};
        if (req.query.sortBy) {
            sortOptions[req.query.sortBy] = 1; // 1 для сортировки по возрастанию
        }

        // Ваш код для фильтрации и сортировки записей пицц по параметрам
        const pizzas = await PizzaModel.find(query).sort(sortOptions).exec();
        res.json({
            pizzas
        });
    } catch (error) {
        console.error("Ошибка при запросе документов из базы данных:", error);
        res.status(500).json({
            message: "Не удалось получить пиццы"
        });
    }
};





export const create =  async (req, res) => {
    try {
        const myFreshData = req.body;
        console.log(myFreshData)
        let types;
        if (myFreshData.types.includes("тонкое")) {
            types = [0]
        }
        if (myFreshData.types.includes("традиционное")) {
            types = [1]
        }
        if (myFreshData.types.includes("тонкое") && myFreshData.types.includes("традиционное")) {
            types = [0, 1]
        }
        // console.log(types)
        let sizes = myFreshData.sizes.trim().split(/\s*,\s*/).map(Number);
        console.log(sizes);
        let price = parseInt(myFreshData.price, 10);
        let rating = parseInt(myFreshData.rating, 10)
        let discount = parseInt(myFreshData.discount, 10)

        console.log(price)
        console.log(rating)


        const doc = new PizzaModel({
            imageUrl: req.body.imageUrl,
            name: req.body.name,
            types: types,
            sizes: sizes,
            price: price,
            category: req.body.category,
            rating: rating,
            discount: discount
        })

        const post = await doc.save();

        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось добавить пиццу',
        })
    }
}

export const remove = async (req, res) => {
    try {
        const pizzaId = req.params.id;
        const doc = await PizzaModel.findOneAndDelete({ _id: pizzaId });

        if (!doc) {
            return res.status(404).json({
                message: 'Пицца не найдена'
            });
        }

        res.json({
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить пиццу'
        });
    }
}
