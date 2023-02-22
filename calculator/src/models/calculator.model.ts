export interface Food {
  [key: string]: number;
}

export interface IFoodOrder {
  set: string;
  quantity: number;
}

export interface IFoodSpecialDiscount {
  [key: string]: number;
}

export enum FoodType {
  Red = "Red",
  Green = "Green",
  Blue = "Blue",
  Yellow = "Yellow",
  Pink = "Pink",
  Purple = "Purple",
  Orange = "Orange",
}
