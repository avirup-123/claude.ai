export interface UserProfile {
  id: number;
  age: number;
  sex: string;
  heightCm: number;
  weightKg: number;
  activityLevel: string;
  tdee: number;
  goalCalories: number;
  createdAt: string;
  updatedAt: string;
}

export interface MealEntry {
  id: number;
  name: string;
  calories: number;
  loggedAt: string;
}

export interface WeightEntry {
  id: number;
  weightKg: number;
  loggedAt: string;
}
