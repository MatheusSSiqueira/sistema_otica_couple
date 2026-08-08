INSERT INTO oticacouple."Categories" ("Id", "Name", "Description", "IsActive", "CreatedAt", "UpdatedAt", "IsDeleted")
VALUES
  ('11111111-1111-1111-1111-111111111111', 'Frames', 'Prescription and fashion frames', TRUE, NOW(), NOW(), FALSE),
  ('22222222-2222-2222-2222-222222222222', 'Lenses', 'Single vision and progressive lenses', TRUE, NOW(), NOW(), FALSE)
ON CONFLICT ("Id") DO NOTHING;

INSERT INTO oticacouple."Products" (
  "Id",
  "Name",
  "Description",
  "SKU",
  "SalePrice",
  "CostPrice",
  "StockQuantity",
  "MinStockAlert",
  "CategoryId",
  "ImageUrl",
  "IsActive",
  "CreatedAt",
  "UpdatedAt",
  "IsDeleted"
)
VALUES
  (
    '33333333-3333-3333-3333-333333333333',
    'Classic Metal Frame',
    'Lightweight metal frame for everyday use',
    'SKU-FRAME-001',
    299.90,
    120.00,
    25,
    5,
    '11111111-1111-1111-1111-111111111111',
    NULL,
    TRUE,
    NOW(),
    NOW(),
    FALSE
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    'Blue Light Lens',
    'Blue light filtering lens package',
    'SKU-LENS-001',
    199.90,
    80.00,
    40,
    8,
    '22222222-2222-2222-2222-222222222222',
    NULL,
    TRUE,
    NOW(),
    NOW(),
    FALSE
  )
ON CONFLICT ("SKU") DO NOTHING;
