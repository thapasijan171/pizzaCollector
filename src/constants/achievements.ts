/**
Represents an achievement that can be earned by the user.
@interface
@property {string} name - The name of the achievement.
@property {string} emoji - The emoji representing the achievement.
@property {string} description - The short description of the achievement.
@property {string} [longDescription] - The longer description of the achievement.
@property {number} [reward] - The reward associated with obtaining the achievement.
@property {number} [requirement] - The amount required to obtain the achievement.
@property {number} [clicksRequired] - The number of clicks required to obtain the achievement.
@property {number} [purchasesRequired] - The number of purchases required to obtain the achievement.
*/
export interface Achievement {
  name: string;
  emoji: string;
  description: string;
  longDescription: string;
  reward?: number;
  requirement?: number;
  clicksRequired?: number;
  purchasesRequired?: number;
}
/**
An object containing all the achievements that can be earned by the user.
@constant
@type {Object.<string, Achievement>}
*/
export const achievements: { [key: string]: Achievement } = {
  // points
  pizzaBeginner: {
    name: "Pizza Beginner",
    emoji: "🍕",
    description: "Produce 100 Pizzas",
    longDescription:
      "You've taken your first steps into the world of pizza making and produced 100 delicious pizzas. Keep up the tasty work!",
    requirement: 100,
  },
  pizzaTrainee: {
    name: "Pizza Trainee",
    emoji: "🍕",
    description: "Produce 1,000 Pizzas",
    longDescription:
      "You've graduated to the rank of Pizza Trainee by producing 1,000 pizza slices. Your ovens must be working overtime!",
    requirement: 1000,
  },
  pizzaExpert: {
    name: "Pizza Expert",
    emoji: "🍕",
    description: "Produce 10,000 Pizzas",
    longDescription:
      "You're no longer a novice pizza maker; you're a Pizza Expert! You've produced 10,000 pizzas and have undoubtedly earned the respect of your fellow chefs.",
    requirement: 10000,
  },
  pizzaMaster: {
    name: "Pizza Master",
    emoji: "🍕",
    description: "Produce 100,000 Pizzas",
    longDescription:
      "You've mastered the art of pizza making and produced 100,000 pizzas. Your pizza is in high demand, and your customers couldn't be happier.",
    requirement: 100000,
  },
  pizzaLegend: {
    name: "Pizza Legend",
    emoji: "🍕",
    description: "Produce 1,000,000 Pizzas",
    longDescription:
      "You're a Pizza Legend! With 1,000,000 pizzas under your belt, your pizza is known far and wide for its flavor and quality.",
    requirement: 1000000,
  },
  pizzaTycoon: {
    name: "Pizza Tycoon",
    emoji: "🍕",
    description: "Produce 10,000,000 Pizzas",
    longDescription:
      "Your pizza empire is growing! With 10,000,000 pizzas produced, you're now a Pizza Tycoon. Keep up the delicious work!",
    requirement: 10000000,
  },
  pizzaMagnate: {
    name: "Pizza Magnate",
    emoji: "🍕",
    description: "Produce 100,000,000 Pizzas",
    longDescription:
      "You're a Pizza Magnate, producing 100,000,000 pizzas! Your pizza is a top seller, and you've become a household name in the pizza world.",
    requirement: 100000000,
  },
  pizzaBaron: {
    name: "Pizza Baron",
    emoji: "🍕",
    description: "Produce 1,000,000,000 Pizzas",
    longDescription:
      "With 1,000,000,000 pizzas produced, you're now a Pizza Baron. Your kitchens are well-stocked and your pizzas are a sought-after delicacy.",
    requirement: 1000000000,
  },
  pizzaEmpire: {
    name: "Pizza Empire",
    emoji: "🍕",
    description: "Produce 10,000,000,000 Pizzas",
    longDescription:
      "You've built a pizza empire with 10,000,000,000 pizzas produced. Your kitchens are bustling with activity, and your pizzas are the envy of all other chefs.",
    requirement: 10000000000,
  },
  pizzaUniverse: {
    name: "Pizza Universe",
    emoji: "🍕",
    description: "Produce 100,000,000,000 Pizzas",
    longDescription:
      "You're a true master of pizza making with 100,000,000,000 pizzas produced, earning you the title of Pizza Universe. Your pizzas are legendary!",
    requirement: 100000000000,
  },
  clickingNovice: {
    name: "Clicker Novice",
    emoji: "🖱️",
    description: "Click the button 10 times",
    longDescription:
      "You've clicked the button 10 times and earned the title of Clicker Novice. Your clicking skills are just starting to buzz!",
    clicksRequired: 10,
  },
  clickingPro: {
    name: "Clicker Pro",
    emoji: "🖱️",
    description: "Click the button 100 times",
    longDescription:
      "With 100 clicks under your belt, you're now a Clicker Pro. Keep up the speedy clicking!",
    clicksRequired: 100,
  },
  clickingChampion: {
    name: "Clicking Champion",
    emoji: "🖱️",
    description: "Click the button 500 times",
    longDescription:
      "You've clicked the button 500 times and have earned the title of Clicking Champion. Your clicking skills are truly impressive!",
    clicksRequired: 500,
  },
  clickingMaster: {
    name: "Clicking Master",
    emoji: "🖱️",
    description: "Click the button 1000 times",
    longDescription:
      "You've clicked the button 1000 times and are now a Clicking Master. Your fingers are lightning-fast and your clicking skills are truly impressive.",
    clicksRequired: 1000,
  },
  clickingSuperstar: {
    name: "Clicking Superstar",
    emoji: "🖱️",
    description: "Click the button 5000 times",
    longDescription:
      "You've clicked the button 5000 times and have earned the title of Clicking Superstar. Your clicking skills are unmatched, and you are truly a master of the art of clicking!",
    clicksRequired: 5000,
  },
  clickingLegend: {
    name: "Clicking Legend",
    emoji: "🖱️",
    description: "Click the button 10,000 times",
    longDescription:
      "You're a Clicking Legend with 10,000 button clicks. Your clicking abilities are unmatched, and your speed is simply astounding.",
    clicksRequired: 10000,
  },
  clickingTitan: {
    name: "Clicking Titan",
    emoji: "🖱️",
    description: "Click the button 50,000 times",
    longDescription:
      "You've clicked the button 50,000 times, achieving the title of Clicking Titan. Your clicking skills are beyond impressive and have reached a level of mastery that few can match.",
    clicksRequired: 50000,
  },
  buyBeginner: {
    name: "Buy Beginner",
    emoji: "🛍️",
    description: "Buy 10 items",
    longDescription:
      "You've made your first 10 purchases and earned the title of Buy Beginner. Keep buying and building your pizza empire!",
    purchasesRequired: 10,
  },
  buyingEnthusiast: {
    name: "Buying Enthusiast",
    emoji: "🛍️",
    description: "Buy 50 items",
    longDescription:
      "Congratulations, you're a Buying Enthusiast! You've made 50 purchases, showing your passion and dedication for pizza making. Keep up the great work!",
    purchasesRequired: 50,
  },
  shoppingPro: {
    name: "Shopping Pro",
    emoji: "🛍️",
    description: "Buy 100 items",
    longDescription:
      "With 100 purchases made, you're now a Shopping Pro. Your pizza-making equipment is top-of-the-line, and your pizzas are delicious.",
    purchasesRequired: 100,
  },
  buyTycoon: {
    name: "Buy Tycoon",
    emoji: "🛍️",
    description: "Buy 500 items",
    longDescription:
      "You've purchased 500 items and have earned the title of Buy Tycoon. Your dedication to pizza making and your exceptional shopping skills have propelled your empire to new heights!",
    purchasesRequired: 500,
  },
  buyExpert: {
    name: "Buy Expert",
    emoji: "🛍️",
    description: "Buy 1,000 items",
    longDescription:
      "You've made 1,000 purchases and have earned the title of Buy Expert. Your pizza-making knowledge and equipment are second to none!",
    purchasesRequired: 1000,
  },
  ShareGameEnthusiast: {
    name: "Share Game Enthusiast",
    emoji: "🔗",
    description: "Click on share button",
    longDescription:
      "You've shared this amazing game on a social media platform, spreading the word about the wonders of pizza making. Keep buzzing and sharing!",
    reward: 5000,
  },
  volumeController: {
    name: "Volume Controller",
    emoji: "🔊",
    description: "Adjust the volume of game sounds",
    longDescription:
      "You've taken control of the game sounds by adjusting the volume to your liking. Whether you prefer it loud or soft, you're now in charge of the audio experience!",
  },
  profilePicturePro: {
    name: "Profile Picture Pro",
    emoji: "📷",
    description: "Change your profile picture",
    longDescription:
      "You've updated your profile picture and earned the title of Profile Picture Pro. Your new picture looks great!",
  },
};
