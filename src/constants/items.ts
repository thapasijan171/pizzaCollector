/**
 * Represents an item that can be purchased in the clicker game.
 * @interface
 * @property {string} name - The name of the item.
 * @property {number} cost - The cost of the item in pizaaaa.
 * @property {number} multiplier - The multiplier that the item applies to pizaaaa production.
 * @property {number} perSecond - The amount of pizaaaa produced per second by the item.
 * @property {string} description - A description of the item.
 * @property {string} [emoji] - An optional emoji representing the item.
 */
export interface Item {
  name: string;
  cost: number;
  multiplier: number;
  perSecond: number;
  description: string;
  emoji?: string;
}

/**
 * An object containing all the items that can be purchased in the game.
 * @constant
 * @type {Object<string, Item>}
 */
export const items: { [key: string]: Item } = {
  smallPizza: {
    name: "Very Small Pizza",
    cost: 20,
    multiplier: 0.5,
    perSecond: 2,
    description:
      "A tiny pizza that doesn't produce much flavor, but is a great start for your pizza empire.",
    emoji: "🍕",
  },

  workerPizza: {
    name: "Worker Pizza",
    cost: 100,
    multiplier: 2,
    perSecond: 5,
    description:
      "The backbone of any pizza restaurant, this pizza works tirelessly to satisfy hungry customers.",
    emoji: "🍕",
  },

  pizzaSlice: {
    name: "Pizza Slice",
    cost: 500,
    multiplier: 5,
    perSecond: 20,
    description:
      "A delicious slice of pizza that keeps customers coming back for more.",
    emoji: "🍕",
  },

  chefsHat: {
    name: "Chef's Hat",
    cost: 1000,
    multiplier: 10,
    perSecond: 30,
    description:
      "A stylish hat that represents culinary excellence and protects the chef from hot kitchen mishaps.",
    emoji: "👨‍🍳",
  },

  pizzaMaster: {
    name: "Pizza Master",
    cost: 2500,
    multiplier: 25,
    perSecond: 50,
    description:
      "The master of pizza-making, responsible for creating the most delicious pies in the kitchen.",
    emoji: "🍕",
  },

  gourmetPizza: {
    name: "Gourmet Pizza",
    cost: 5000,
    multiplier: 50,
    perSecond: 100,
    description:
      "A high-end pizza crafted with the finest ingredients, sure to impress any foodie.",
    emoji: "🍕",
  },

  specialTopping: {
    name: "Special Topping",
    cost: 12500,
    multiplier: 75,
    perSecond: 180,
    description:
      "A rare topping that elevates your pizza to a whole new level of deliciousness.",
    emoji: "🍕",
  },

  pizzaOven: {
    name: "Pizza Oven",
    cost: 20000,
    multiplier: 100,
    perSecond: 250,
    description:
      "A top-of-the-line oven that ensures every pizza is cooked to perfection.",
    emoji: "🔥",
  },

  pizzeria: {
    name: "Pizzeria",
    cost: 100000,
    multiplier: 500,
    perSecond: 1000,
    description:
      "A bustling pizzeria where customers enjoy fresh pizza and a lively atmosphere.",
    emoji: "🏠",
  },

  pizzaParlor: {
    name: "Pizza Parlor",
    cost: 500000,
    multiplier: 1000,
    perSecond: 2000,
    description:
      "A charming pizza parlor that attracts pizza lovers from all around.",
    emoji: "🍕",
  },

  pizzaFactory: {
    name: "Pizza Factory",
    cost: 1000000,
    multiplier: 2000,
    perSecond: 5000,
    description:
      "A large factory dedicated to producing pizzas on a massive scale.",
    emoji: "🏭",
  },

  supremePizza: {
    name: "Supreme Pizza",
    cost: 2500000,
    multiplier: 3000,
    perSecond: 7500,
    description:
      "The ultimate pizza loaded with toppings, a favorite among all pizza enthusiasts.",
    emoji: "🍕",
  },

  pizzaEmpire: {
    name: "Pizza Empire",
    cost: 5000000,
    multiplier: 5000,
    perSecond: 10000,
    description:
      "An empire built on pizza, serving millions of slices daily.",
    emoji: "👑",
  },

  pizzaCart: {
    name: "Pizza Cart",
    cost: 10000000,
    multiplier: 7500,
    perSecond: 15000,
    description:
      "A mobile pizza cart that brings delicious slices to street corners everywhere.",
    emoji: "🍕",
  },

  pizzaRobot: {
    name: "Pizza Robot",
    cost: 25000000,
    multiplier: 10000,
    perSecond: 20000,
    description:
      "A robot designed to automate pizza-making, ensuring consistency and speed.",
    emoji: "🤖",
  },

  legendaryPizza: {
    name: "Legendary Pizza",
    cost: 50000000,
    multiplier: 15000,
    perSecond: 30000,
    description:
      "A mythical pizza known for its extraordinary taste, said to grant happiness to all who eat it.",
    emoji: "🍕",
  },

  diamondPizza: {
    name: "Diamond Pizza",
    cost: 100000000,
    multiplier: 25000,
    perSecond: 50000,
    description:
      "A pizza adorned with edible diamonds, the epitome of luxury dining.",
    emoji: "💎",
  },

  pizzaExtractor: {
    name: "Pizza Extractor",
    cost: 500000000,
    multiplier: 50000,
    perSecond: 100000,
    description:
      "A device that maximizes pizza production, extracting flavor and quality with each use.",
    emoji: "🍕",
  },

  pizzaObservatory: {
    name: "Pizza Observatory",
    cost: 1000000000,
    multiplier: 150000,
    perSecond: 350000,
    description:
      "An observatory dedicated to studying pizza trends and customer preferences.",
    emoji: "🔭",
  },

  pizzaMuseum: {
    name: "Pizza Museum",
    cost: 5000000000,
    multiplier: 750000,
    perSecond: 1500000,
    description:
      "A museum showcasing the history, culture, and science of pizza and its creation.",
    emoji: "🏛️",
  },

  pizzaStatue: {
    name: "Pizza Statue",
    cost: 10000000000,
    multiplier: 2000000,
    perSecond: 4000000,
    description:
      "A statue of a pizza made of pure gold that represents the ultimate achievement in pizza-making.",
    emoji: "🗽",
  },

  coderPizza: {
    name: "Coder Pizza",
    cost: 50000000000,
    multiplier: 10000000,
    perSecond: 250000000,
    description:
      "A highly skilled pizza that knows how to code recipes in various styles, ensuring perfect flavor every time.",
    emoji: "🍕💻",
  },
};
