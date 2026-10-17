import { rentalProduct } from "./rentalProduct";
import { singletonTypes } from "./singletons";

export const schemaTypes = [...singletonTypes, rentalProduct];

export const singletonNames = new Set(singletonTypes.map((t) => t.name));
