const Recipe = require("../models/Recipe");

module.exports = {
    Query: {
        async recipe(_, { ID }) {
            return await Recipe.findById(ID);
        },
        async getRecipes(_, { amount }) {
            return await Recipe.find().sort({ createAt: -1 }).limit(amount);
        },
    },
    Mutation: {
        async createRecipe(_, { recipeInput: { name, description } }) {
            const createRecipe = new Recipe({
                name,
                description,
                createAt: new Date().toISOString(),
                thumbsUp: 0,
                thumbDown: 0,
            });

            const res = await createRecipe.save();
            // console.log(res._doc);

            return {
                id: res.id,
                ...res._doc,
            };
        },
        async deleteRecipe(_, { ID }) {
            const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
            return wasDeleted; // 1 if something was deleted, 0 if nothing was deleted
        },
        async editRecipe(_, { ID, recipeInput: { name, description } }) {
            const wasEdited = (await Recipe.updateOne({ _id: ID }, { name, description }, { new: true })).modifiedCount;
            return wasEdited; // 1 if something was updated, 0 if nothing was updated
        },
    },
};
