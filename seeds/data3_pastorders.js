exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('pastorders').insert([
    {
      res_id: 6,
      date_ordered: '2021-05-10',
      person_who_ordered: 'Magggie',
      cost: 11.05,
      dishes: 'Pesto Cavaappi with Grilled Chicken',
    },
    {
      res_id: 6,
      date_ordered: '2021-05-10',
      person_who_ordered: 'Becky',
      cost: 11.6,
      dishes: 'Buttered Noodles with Parmesan-Crusted Chicken Breast',
    },
    {
      res_id: 6,
      date_ordered: '2021-05-10',
      person_who_ordered: 'Tim',
      cost: 13.05,
      dishes:
        'Cauliflower Rigatoni in Roasted Garlic Cream with Parmesan-Crusted Chicken Breast',
    },
    {
      res_id: 6,
      date_ordered: '2021-05-10',
      person_who_ordered: 'Kyle',
      cost: 13.05,
      dishes: 'Cauliflower Gnocchi Rosa with Grilled Chicken Breast',
    },
    {
      res_id: 15,
      date_ordered: '2021-05-11',
      person_who_ordered: 'Maggie',
      cost: 10.5,
      dishes: 'Yellow Curry with Chicken',
    },
    {
      res_id: 15,
      date_ordered: '2021-05-11',
      person_who_ordered: 'Becky',
      cost: 12.95,
      dishes: 'Thai Style Fried Rice',
    },
    {
      res_id: 15,
      date_ordered: '2021-05-11',
      person_who_ordered: 'Jake',
      cost: 10.5,
      dishes: 'Thai Style Fried Rice',
    },
    {
      res_id: 16,
      date_ordered: '2021-05-12',
      person_who_ordered: 'Maggie',
      cost: 9.5,
      dishes: 'Italian Medium Sandwich',
    },
  ]);
};
