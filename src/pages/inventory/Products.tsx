
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Plus, Search } from 'lucide-react';
import { Product } from '@/types';

const Products: React.FC = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - in a real app, this would come from Supabase
  const products: Product[] = [
    {
      id: '1',
      name: 'Premium Laptop',
      sku: 'TECH-001',
      description: 'High-performance laptop with 16GB RAM and 512GB SSD',
      price: 1499.99,
      cost: 1100.00,
      stockQuantity: 24,
      category: 'Electronics',
      tags: ['laptop', 'premium', 'tech'],
      companyId: '1',
      createdAt: new Date('2025-01-10'),
      updatedAt: new Date('2025-06-15'),
    },
    {
      id: '2',
      name: 'Wireless Headphones',
      sku: 'TECH-002',
      description: 'Noise-cancelling wireless headphones with 30-hour battery life',
      price: 149.99,
      cost: 85.00,
      stockQuantity: 56,
      category: 'Electronics',
      tags: ['audio', 'wireless'],
      companyId: '1',
      createdAt: new Date('2025-02-15'),
      updatedAt: new Date('2025-06-20'),
    },
    {
      id: '3',
      name: 'Office Chair',
      sku: 'FURN-001',
      description: 'Ergonomic office chair with lumbar support',
      price: 199.99,
      cost: 120.00,
      stockQuantity: 18,
      category: 'Furniture',
      tags: ['office', 'ergonomic'],
      companyId: '1',
      createdAt: new Date('2025-03-05'),
      updatedAt: new Date('2025-06-25'),
    },
    {
      id: '4',
      name: 'Smartphone X',
      sku: 'TECH-003',
      description: 'Latest smartphone with advanced camera system',
      price: 899.99,
      cost: 650.00,
      stockQuantity: 32,
      category: 'Electronics',
      tags: ['smartphone', 'premium'],
      companyId: '1',
      createdAt: new Date('2025-04-20'),
      updatedAt: new Date('2025-07-01'),
    },
    {
      id: '5',
      name: 'Smart Watch',
      sku: 'TECH-004',
      description: 'Fitness tracking smartwatch with heart rate monitor',
      price: 249.99,
      cost: 150.00,
      stockQuantity: 45,
      category: 'Electronics',
      tags: ['wearable', 'fitness'],
      companyId: '1',
      createdAt: new Date('2025-05-12'),
      updatedAt: new Date('2025-07-02'),
    },
  ];

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  };

  const getStockStatusBadge = (quantity: number) => {
    if (quantity <= 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (quantity < 10) {
      return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Low Stock</Badge>;
    } else {
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">In Stock</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Create a new product in your inventory. Fill out the information below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Product Name
                  </label>
                  <Input id="name" placeholder="Premium Laptop" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="sku" className="text-sm font-medium">
                    SKU
                  </label>
                  <Input id="sku" placeholder="TECH-001" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Input id="description" placeholder="High-performance laptop with 16GB RAM and 512GB SSD" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="price" className="text-sm font-medium">
                    Price
                  </label>
                  <Input id="price" type="number" placeholder="1499.99" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="cost" className="text-sm font-medium">
                    Cost
                  </label>
                  <Input id="cost" type="number" placeholder="1100.00" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="stockQuantity" className="text-sm font-medium">
                    Stock Quantity
                  </label>
                  <Input id="stockQuantity" type="number" placeholder="24" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category
                  </label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="office">Office Supplies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Save Product</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="furniture">Furniture</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="office">Office Supplies</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.sku}</TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span>{product.stockQuantity}</span>
                    {getStockStatusBadge(product.stockQuantity)}
                  </div>
                </TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit product</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Adjust stock</DropdownMenuItem>
                      <DropdownMenuItem>Add to order</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete product</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Products;