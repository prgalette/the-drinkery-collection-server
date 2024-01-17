var express = require('express');
var router = express.Router();

const axios = require('axios')

const Cocktail = require('../models/Cocktail')

/* GET home page. */
router.get('/one-time', async (req, res, next) => {

    try {
        let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        
        let cocktailPromises = letters.map((letter) => {
            return axios.get(`https://www.thecocktaildb.com/api/json/v2/${process.env.COCKTAIL_APP_API_KEY}/search.php?f=${letter}`)
        })
        
        let cocktailResults = await Promise.allSettled(cocktailPromises)

        // console.log("Cocktail results ===>", cocktailResults)
        
        let cocktailDrinks = cocktailResults.map((arr) => arr.value.data.drinks).flat()

        console.log("Cocktail Drinks ===>", cocktailDrinks)

        let dbPromises = cocktailDrinks.map((drink) => {

            let theseIngredients = []

            if (drink.strIngredient1) {
               theseIngredients.push(drink.strIngredient1) 
            }
            if (drink.strIngredient2) {
               theseIngredients.push(drink.strIngredient2) 
            }
            if (drink.strIngredient3) {
               theseIngredients.push(drink.strIngredient3) 
            }
            if (drink.strIngredient4) {
               theseIngredients.push(drink.strIngredient4) 
            }
            if (drink.strIngredient5) {
               theseIngredients.push(drink.strIngredient5) 
            }
            if (drink.strIngredient6) {
               theseIngredients.push(drink.strIngredient6) 
            }
            if (drink.strIngredient7) {
               theseIngredients.push(drink.strIngredient7) 
            }
            if (drink.strIngredient8) {
               theseIngredients.push(drink.strIngredient8) 
            }
            if (drink.strIngredient9) {
               theseIngredients.push(drink.strIngredient9) 
            }
            if (drink.strIngredient10) {
               theseIngredients.push(drink.strIngredient10) 
            }
            if (drink.strIngredient11) {
               theseIngredients.push(drink.strIngredient11) 
            }
            if (drink.strIngredient12) {
               theseIngredients.push(drink.strIngredient12) 
            }
            if (drink.strIngredient13) {
               theseIngredients.push(drink.strIngredient13) 
            }
            if (drink.strIngredient14) {
               theseIngredients.push(drink.strIngredient14) 
            }
            if (drink.strIngredient15) {
               theseIngredients.push(drink.strIngredient15) 
            }

            console.log("These Ingredients ===>", theseIngredients)

            let theseMeasures = []

            if (drink.strMeasure1) {
                theseMeasures.push(drink.strMeasure1) 
             }
             if (drink.strMeasure2) {
                theseMeasures.push(drink.strMeasure2) 
             }
             if (drink.strMeasure3) {
                theseMeasures.push(drink.strMeasure3) 
             }
             if (drink.strMeasure4) {
                theseMeasures.push(drink.strMeasure4) 
             }
             if (drink.strMeasure5) {
                theseMeasures.push(drink.strMeasure5) 
             }
             if (drink.strMeasure6) {
                theseMeasures.push(drink.strMeasure6) 
             }
             if (drink.strMeasure7) {
                theseMeasures.push(drink.strMeasure7) 
             }
             if (drink.strMeasure8) {
                theseMeasures.push(drink.strMeasure8) 
             }
             if (drink.strMeasure9) {
                theseMeasures.push(drink.strMeasure9) 
             }
             if (drink.strMeasure10) {
                theseMeasures.push(drink.strMeasure10) 
             }
             if (drink.strMeasure11) {
                theseMeasures.push(drink.strMeasure11) 
             }
             if (drink.strMeasure12) {
                theseMeasures.push(drink.strMeasure12) 
             }
             if (drink.strMeasure13) {
                theseMeasures.push(drink.strMeasure13) 
             }
             if (drink.strMeasure14) {
                theseMeasures.push(drink.strMeasure14) 
             }
             if (drink.strMeasure15) {
                theseMeasures.push(drink.strMeasure15) 
             }
            
            let newDrink = {
                name: drink.strDrink,
                ingredients: theseIngredients,
                instructions: drink.strInstructions,
                category: drink.strCategory,
                alcoholic: drink.strAlcoholic,
                measures: theseMeasures,
                photo: drink.strDrinkThumb
            }

            console.log("New Drink ===>", newDrink)

            return Cocktail.create(newDrink)
        })

        let dbResults = await Promise.allSettled(dbPromises)

        res.json(dbResults.length)

    } catch(err) {
        res.json(err)
    }

});

module.exports = router;


// name: { type: String},
// ingredients: [{ type: String }],
// instructions:[ { type: String}],
// category: String,
// alcoholic: String,
// measures: [String],
// photo: {
//   type: String,
//   default:
//     "https://res.cloudinary.com/dxl0hu3v9/image/upload/v1705181010/no_image_available_upjm4p.jpg",
// },