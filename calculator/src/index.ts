import {
  Food,
  FoodType,
  IFoodOrder,
  IFoodSpecialDiscount,
} from "./models/calculator.model";

export class FoodSet {
  public _set: Food = {};

  constructor(food: Food) {
    this._set = food;
  }
}

export class FoodCalculator {
  private _foodSet: FoodSet;
  private _foodOrders: IFoodOrder[] = [];
  private _specialDiscountFood: IFoodSpecialDiscount = {};
  private _discountBeforeMemberShip: number = 0;
  private _discountWithMemberShip: number = 0;

  constructor(foodSet: FoodSet) {
    this._foodSet = foodSet;
  }

  getFoodSet() {
    return this._foodSet;
  }

  getSpecialDiscountFood() {
    return this._specialDiscountFood;
  }

  setSpecialDiscountFood(food: string, discount: number) {
    if (!this.checkFoodAvailbale(food))
      throw new Error("Sorry, we don't have that food");

    this._specialDiscountFood[food] = discount;
  }

  checkFoodAvailbale(_set: string): boolean {
    const targetFood = this._foodSet._set[_set];

    if (!targetFood) {
      return false;
    }

    return true;
  }

  getFoodValue(_set: string) {
    const targetFoodValue = this._foodSet._set[_set];

    if (!targetFoodValue) {
      return 0;
    }

    return targetFoodValue;
  }

  collectOrder(food: string, quantity: number) {
    this._foodOrders.push({ set: food, quantity });
  }

  removeFoodFromOrder(food: string) {
    this._foodOrders = this._foodOrders.filter((order) => order.set !== food);
  }

  calculateTotal() {
    let total: number = 0;
    total = this._foodOrders.reduce((acc, food) => {
      const foodValue = this.getFoodValue(food.set) || 0;
      if (food.quantity >= this._specialDiscountFood[food.set]) {
        this._discountBeforeMemberShip = 0.05;
      }
      return (acc += foodValue * food.quantity);
    }, 0);

    // Calculate discount before member card
    total = total - total * this._discountBeforeMemberShip;

    // Calculate discount with member card
    total = total - total * this._discountWithMemberShip;

    return total;
  }

  checkMemberCard(hasMemberCard: boolean) {
    if(hasMemberCard) {
      this._discountWithMemberShip = 0.1;
    }
  }
}

export function init(): FoodCalculator {
  const foodSet = new FoodSet({
    [FoodType.Red]: 50,
    [FoodType.Green]: 40,
    [FoodType.Blue]: 30,
    [FoodType.Yellow]: 50,
    [FoodType.Pink]: 80,
    [FoodType.Purple]: 90,
    [FoodType.Orange]: 120,
  });

  const calculator = new FoodCalculator(foodSet);

  calculator.setSpecialDiscountFood(FoodType.Orange, 2);
  calculator.setSpecialDiscountFood(FoodType.Pink, 2);
  calculator.setSpecialDiscountFood(FoodType.Green, 2);

  return calculator;
}

// Order Food Example
export function orderFood() {
  const calculator = init();
  calculator.collectOrder(FoodType.Red, 3);
  calculator.collectOrder(FoodType.Green, 2);
  calculator.collectOrder(FoodType.Blue, 1);
  calculator.collectOrder(FoodType.Yellow, 1);
  calculator.collectOrder(FoodType.Pink, 1);
  calculator.collectOrder(FoodType.Purple, 1);
  calculator.collectOrder(FoodType.Orange, 1);

  calculator.checkMemberCard(false);

  const total = calculator.calculateTotal();

  console.log(`Total: ${total}`);

  return total;
}

orderFood();
