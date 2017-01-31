'use strict';
module.change_code = 1;

function ChickenTikkaMasalaHelper(obj) {
  this.currentStep = 0;

      this.steps = [
        {
          prompt: 'Lets prepare a delacious chicken tikka masala today.'
        },
        {
          prompt: 'This recipe serves for 4 people. Ingredients to marinate chicken.1 cup plain yogurt , 2 teaspoon ground cumin, 2 teaspoon ground red pepper, 2 teaspoon black pepper, 1 teaspoon cinnamon, 1/4 teaspoon turmeric, 1/2 teaspoon garam masala powder, 1⁄2 teaspoon ground coriander, 1 teaspoon salt, 1 piece minced ginger (approx. 5cm long),  Garlic paste 3 teaspoons, 2 lbs boneless skinless chicken breasts, 4 long skewers. When you are ready say next.'
        },
        {
          prompt: 'Ingredients for gravy are Oil 5 tablespoons, 1 medium onion, diced fine (about 1 1/4 cups), 1 teaspoon ginger paste, 1/2 teaspoon garlic paste, 1/2 teaspoon cumin seeds, 2 teaspoon coriander powder, 1/2 teaspoon turmeric powder,2 teaspoons paprika ,1 tablespoon garam masala, 1/2 cup tomato puree, 2⁄3 cup heavy cream, 1⁄8 cup chopped fresh cilantro leaves, 1 teaspoon Dried fenugreek leaves, Honey 2 tablespoons,  salt to taste, 1/4 cup Water.'
        },
        {
          prompt: 'In a large bowl, place boneless skinless chicken breasts. Add all the marinating ingredients and mix well with chicken. Cover the bowl with plastic wrap and refrigerate for 1 hour.'
        },
        {
          prompt: 'In a pan melt butter on medium heat.'
        },
        {
          prompt: 'Thread chicken onto skewers and cook for 3-4 minutes on high heat. Reduce heat and cook  them turning occasionally, for 15 – 20 minutes or until cooked through.'
        },
        {
          prompt: 'For gravy, Heat 5 tablespoons oil in a pan on a medium heat.'
        },
        {
          prompt: 'Add 1/2 teaspoon cumin seeds.'
        },
        {
          prompt: 'Add finely chopped onions. saute for 2-3 minutes or until lightly browned.'
        },
        {
          prompt: 'Add 1 teaspoon ginger paste and 1/2 teaspoon garlic paste saute for a minute.'
        },
        {
          prompt: 'Add 2 teaspoon coriander powder, 1/2 teaspoon turmeric powder, 2 teaspoons paprika, 1 tablespoon garam masala. Saute for a minute.'
        },
        {
          prompt: 'Add 1/2 cup tomato puree and fry for 2 minutes.'
        },
        {
          prompt: 'Add salt to taste.'
        },
        {
          prompt: 'Add 2/3 cup of heavy cream.'
        },
        {
          prompt: 'Add 2 tablespoons of honey.'
        },
        {
          prompt: 'Add 1 teaspoon Dried fenugreek leaves and mix.'
        },
        {
          prompt: 'Add 1/4 cup of water and let it cook until gravy is thick.'
        },
        {
          prompt: 'Continue to saute till oil begins to separate.'
        },
        {
          prompt: 'Add chicken pieces and mix.'
        },
        {
          prompt: 'Garnish with chopped cilantro leaves and a tablespoon of fresh cream.'
        },
        {
          prompt: 'Congratulations! You\'ve cooked it! Now, you may eat it! Serve hot, with basmati rice or Naan.'
        }
      ];



  for (var prop in obj) this[prop] = obj[prop];
}

ChickenTikkaMasalaHelper.prototype.completed = function() {
  return this.currentStep === (this.steps.length - 1);
};

ChickenTikkaMasalaHelper.prototype.getPrompt = function() {
  return this.getStep().prompt;
};

ChickenTikkaMasalaHelper.prototype.getStep = function() {
  return this.steps[this.currentStep];
};

module.exports = ChickenTikkaMasalaHelper;
