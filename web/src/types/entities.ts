export type Guid = string;

export interface BaseEntity {
  Id: Guid;
  CreatedAt: string;
  UpdatedAt: string;
  IsDeleted: boolean;
}

export interface Category extends BaseEntity {
  Name: string;
  Description?: string | null;
  IsActive: boolean;
  Products: Product[];
}

export interface Customer extends BaseEntity {
  Name: string;
  Email: string;
  Phone?: string | null;
  CPF: string;
  BirthDate: string;
  LoyaltyPoints: number;
  PrescriptionNotes?: string | null;
}

export interface Product extends BaseEntity {
  Name: string;
  Description?: string | null;
  SKU: string;
  SalePrice: number;
  CostPrice: number;
  StockQuantity: number;
  MinStockAlert: number;
  CategoryId: Guid;
  Category?: Category | null;
  ImageUrl?: string | null;
  IsActive: boolean;
  IsLowStock?: boolean;
}

export interface Sale extends BaseEntity {
  CustomerId?: Guid | null;
  Customer?: Customer | null;
  UserId: Guid;
  User?: UserEntity | null;
  TotalAmount: number;
  DiscountAmount: number;
  PaymentMethod: PaymentMethod;
  Status: SaleStatus;
  SaleItems: SaleItem[];
}

export interface SaleItem extends BaseEntity {
  SaleId: Guid;
  Sale?: Sale | null;
  ProductId: Guid;
  Product?: Product | null;
  Quantity: number;
  UnitPrice: number;
  Discount: number;
}

export interface UserEntity extends BaseEntity {
  Name: string;
  Email: string;
  PasswordHash: string;
  Role: UserRole;
  IsActive: boolean;
}

export enum UserRole {
  Admin = 1,
  Manager = 2,
  Cashier = 3
}

export enum PaymentMethod {
  Cash = 1,
  Card = 2,
  Pix = 3,
  Mixed = 4
}

export enum SaleStatus {
  Open = 1,
  Completed = 2,
  Cancelled = 3
}