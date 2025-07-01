interface Car {
  wheels: number;
  brand: string;
  type: string;
  isNew?: boolean;
  name?: string;

  [key: string]: unknown; // все остальные поля неограничены
}

const car: Car = {
  wheels: 4,
  brand: "BMW",
  type: "Sedan",
};

const car2: Car = {
  brand: "BMW",
  type: "",
  wheels: 4,
};

car2["go"] = true;
