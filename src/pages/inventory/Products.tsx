
import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useTranslation } from '../../i18n';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../../components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '../../components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '../../components/ui/dropdown-menu';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash, 
  Download, 
  Filter,
  BarChart3,
  Copy
} from 'lucide-react';
import { Product } from '../../types';

const Products: React.FC = () => {
  const { t } = useTranslation();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Données fictives pour les produits
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Ordinateur Portable Pro',
      sku: 'LP-001',
      description: 'Ordinateur portable haut de gamme pour professionnels',
      price: 1299.99,
      cost: 899.99,
      quantity: 25,
      category: 'Électronique',
      supplier: 'TechSupply',
      status: 'active',
      images: ['laptop.jpg'],
      companyId: '1',
      createdAt: new Date('2025-01-10'),
      updatedAt: new Date('2025-06-15'),
    },
    {
      id: '2',
      name: 'Écran 27" 4K',
      sku: 'MON-4K-27',
      description: 'Écran 4K de 27 pouces avec technologie IPS',
      price: 349.99,
      cost: 249.99,
      quantity: 42,
      category: 'Électronique',
      supplier: 'DisplayTech',
      status: 'active',
      images: ['monitor.jpg'],
      companyId: '1',
      createdAt: new Date('2025-02-05'),
      updatedAt: new Date('2025-07-01'),
    },
    {
      id: '3',
      name: 'Clavier Mécanique RGB',
      sku: 'KB-MECH-01',
      description: 'Clavier mécanique avec rétroéclairage RGB personnalisable',
      price: 129.99,
      cost: 79.99,
      quantity: 0,
      category: 'Accessoires',
      supplier: 'PeriphTech',
      status: 'inactive',
      images: ['keyboard.jpg'],
      companyId: '1',
      createdAt: new Date('2025-03-15'),
      updatedAt: new Date('2025-05-20'),
    },
  ]);

  const handleAddProduct = (newProduct: Partial<Product>) => {
    const product: Product = {
      id: Math.random().toString(36).substring(7),
      name: newProduct.name || '',
      sku: newProduct.sku || `SKU-${Math.floor(Math.random() * 10000)}`,
      description: newProduct.description || '',
      price: newProduct.price || 0,
      cost: newProduct.cost || 0,
      quantity: newProduct.quantity || 0,
      category: newProduct.category || '',
      supplier: newProduct.supplier || '',
      status: newProduct.status || 'active',
      images: newProduct.images || [],
      companyId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setProducts([...products, product]);
    setIsAddDialogOpen(false);
  };

  const handleEditProduct = (updatedProduct: Partial<Product>) => {
    if (!selectedProduct) return;

    const updatedProducts = products.map((product) => {
      if (product.id === selectedProduct.id) {
        return {
          ...product,
          ...updatedProduct,
          updatedAt: new Date(),
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    setIsEditDialogOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = () => {
    if (!selectedProduct) return;

    const updatedProducts = products.filter(
      (product) => product.id !== selectedProduct.id
    );

    setProducts(updatedProducts);
    setIsDeleteDialogOpen(false);
    setSelectedProduct(null);
  };

  const getStockStatus = (quantity: number) => {
    if (quantity <= 0) {
      return { label: t('erp.outOfStock'), variant: 'destructive' as const };
    } else if (quantity < 10) {
      return { label: t('erp.lowStock'), variant: 'warning' as const };
    } else {
      return { label: t('erp.inStock'), variant: 'success' as const };
    }
  };

  const filteredProducts = products.filter((product) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.sku.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.supplier?.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">{t('erp.products')}</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            {t('erp.addProduct')}
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t('common.search')}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              {t('common.filter')}
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              {t('common.export')}
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('common.name')}</TableHead>
                <TableHead>{t('erp.sku')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('erp.price')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('erp.quantity')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('common.status')}</TableHead>
                <TableHead className="text-right">{t('common.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    {t('common.noData')}
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => {
                  const stockStatus = getStockStatus(product.quantity);
                  return (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.sku}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {product.price.toLocaleString()} €
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{product.quantity}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant={stockStatus.variant as any}>
                          {stockStatus.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">{t('common.actions')}</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t('common.actions')}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedProduct(product);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              {t('common.edit')}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedProduct(product);
                                setIsDeleteDialogOpen(true);
                              }}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              {t('common.delete')}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              {t('common.duplicate')}
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BarChart3 className="mr-2 h-4 w-4" />
                              {t('common.viewStats')}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Dialogue d'ajout de produit */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t('erp.addProduct')}</DialogTitle>
            <DialogDescription>
              {t('erp.addProductDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('common.name')}</Label>
                <Input id="name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">{t('erp.sku')}</Label>
                <Input id="sku" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">{t('erp.price')} (€)</Label>
                <Input id="price" type="number" min="0" step="0.01" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">{t('erp.cost')} (€)</Label>
                <Input id="cost" type="number" min="0" step="0.01" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">{t('erp.quantity')}</Label>
                <Input id="quantity" type="number" min="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">{t('erp.category')}</Label>
                <Input id="category" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">{t('common.description')}</Label>
              <Input id="description" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={() => handleAddProduct({ name: 'Nouveau Produit', price: 99.99, quantity: 10 })}>
              {t('common.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de modification de produit */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{t('erp.editProduct')}</DialogTitle>
            <DialogDescription>
              {t('erp.editProductDescription')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">{t('common.name')}</Label>
                <Input
                  id="edit-name"
                  defaultValue={selectedProduct?.name}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-sku">{t('erp.sku')}</Label>
                <Input
                  id="edit-sku"
                  defaultValue={selectedProduct?.sku}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-price">{t('erp.price')} (€)</Label>
                <Input
                  id="edit-price"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue={selectedProduct?.price}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-cost">{t('erp.cost')} (€)</Label>
                <Input
                  id="edit-cost"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue={selectedProduct?.cost}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-quantity">{t('erp.quantity')}</Label>
                <Input
                  id="edit-quantity"
                  type="number"
                  min="0"
                  defaultValue={selectedProduct?.quantity}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">{t('erp.category')}</Label>
                <Input
                  id="edit-category"
                  defaultValue={selectedProduct?.category}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">{t('common.description')}</Label>
              <Input
                id="edit-description"
                defaultValue={selectedProduct?.description}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button onClick={() => handleEditProduct({ name: 'Produit Modifié', price: 129.99 })}>
              {t('common.save')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialogue de suppression de produit */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t('erp.deleteProduct')}</DialogTitle>
            <DialogDescription>
              {t('erp.deleteProductConfirmation')}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>
              {t('erp.deleteProductWarning', {
                name: selectedProduct?.name,
              })}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              {t('common.cancel')}
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              {t('common.delete')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Products;