exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('pastorders')
    .del()
    .then(() => knex('resselections').del())
    .then(function () {
      // Inserts seed entries
      return knex('resselections').insert([
        { name: 'Muddy Chicken', rating: 4.4, type: 'Chicken' },
        { name: 'Chick-fil-A', rating: 4.5, type: 'Chicken' },
        { name: 'Green Mill', rating: 4.5, type: 'Burgers' },
        { name: 'Taco Bell', rating: 4.4, type: 'Tacos' },
        { name: 'JL Beers', rating: 4.7, type: 'Burgers' },
        { name: 'Noodles & Company', rating: 4.6, type: 'Noodles' },
        { name: 'Chipotle', rating: 4.3, type: 'Mexican' },
        { name: 'India Palace', rating: 4.8, type: 'Indian' },
        { name: "Carbone's Pizza", rating: 4.5, type: 'Pizza' },
        { name: "Applebee's", rating: 4.5, type: 'Fast Food' },
        { name: "McDonalds's", rating: 4.4, type: 'Fast Food' },
        { name: "Chili's", rating: 4.4, type: 'Dinner' },
        { name: 'Golden Wok', rating: 4.4, type: 'Chinese' },
        { name: "Jersey Mike's Subs", rating: 4.7, type: 'Sandwiches' },
        { name: 'Thai Curry House', rating: 4.6, type: 'Thai' },
        { name: 'Firehouse Subs', rating: 4.3, type: 'Sandwiches' },
      ]);
    });
};
