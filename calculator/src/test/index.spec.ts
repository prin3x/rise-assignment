import { init, FoodSet, FoodCalculator } from "../index";
import { FoodType } from "../models/calculator.model";

let calculator: FoodCalculator;

beforeEach(() => {
  calculator = init();
});

test("food set is initialized", () => {
  expect(calculator.getFoodSet()).toBeInstanceOf(FoodSet);
});

test("discounts are set", () => {
  expect(calculator.getSpecialDiscountFood()[FoodType.Orange]).toEqual(2);
  expect(calculator.getSpecialDiscountFood()[FoodType.Pink]).toEqual(2);
  expect(calculator.getSpecialDiscountFood()[FoodType.Green]).toEqual(2);
});

test("calculate total", () => {
  calculator.collectOrder(FoodType.Red, 1);
  calculator.collectOrder(FoodType.Green, 1);
  calculator.collectOrder(FoodType.Blue, 1);
  calculator.collectOrder(FoodType.Yellow, 1);
  calculator.collectOrder(FoodType.Pink, 1);
  calculator.collectOrder(FoodType.Purple, 1);
  calculator.collectOrder(FoodType.Orange, 1);

  calculator.checkMemberCard(false);

  expect(calculator.calculateTotal()).toEqual(460);
});

test("calculate total with member card", () => {
  calculator.collectOrder(FoodType.Red, 3);
  calculator.collectOrder(FoodType.Green, 2);
  calculator.collectOrder(FoodType.Blue, 1);
  calculator.collectOrder(FoodType.Yellow, 1);
  calculator.collectOrder(FoodType.Pink, 1);
  calculator.collectOrder(FoodType.Purple, 1);
  calculator.collectOrder(FoodType.Orange, 1);

  calculator.checkMemberCard(true);

  expect(calculator.calculateTotal()).toEqual(513);
});

test("calculate total with member card and special discount", () => {
  calculator.collectOrder(FoodType.Red, 3);
  calculator.collectOrder(FoodType.Green, 2);
  calculator.collectOrder(FoodType.Blue, 1);
  calculator.collectOrder(FoodType.Yellow, 1);
  calculator.collectOrder(FoodType.Pink, 2);
  calculator.collectOrder(FoodType.Purple, 1);
  calculator.collectOrder(FoodType.Orange, 2);

  calculator.checkMemberCard(true);

  expect(calculator.calculateTotal()).toEqual(684);
});
