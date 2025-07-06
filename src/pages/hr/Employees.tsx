
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
import { Employee } from '@/types';

const Employees: React.FC = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - in a real app, this would come from Supabase
  const employees: Employee[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@company.com',
      phone: '+1 (555) 123-4567',
      position: 'Sales Manager',
      department: 'Sales',
      hireDate: new Date('2023-01-15'),
      salary: 75000,
      status: 'active',
      manager: 'Sarah Johnson',
      companyId: '1',
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date('2025-06-20'),
    },
    {
      id: '2',
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@company.com',
      phone: '+1 (555) 987-6543',
      position: 'Software Developer',
      department: 'Engineering',
      hireDate: new Date('2023-05-10'),
      salary: 85000,
      status: 'active',
      manager: 'Michael Brown',
      companyId: '1',
      createdAt: new Date('2023-05-10'),
      updatedAt: new Date('2025-06-25'),
    },
    {
      id: '3',
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@company.com',
      phone: '+1 (555) 456-7890',
      position: 'Engineering Director',
      department: 'Engineering',
      hireDate: new Date('2022-03-22'),
      salary: 120000,
      status: 'active',
      companyId: '1',
      createdAt: new Date('2022-03-22'),
      updatedAt: new Date('2025-07-01'),
    },
    {
      id: '4',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@company.com',
      phone: '+1 (555) 789-0123',
      position: 'VP of Sales',
      department: 'Sales',
      hireDate: new Date('2022-02-05'),
      salary: 110000,
      status: 'active',
      companyId: '1',
      createdAt: new Date('2022-02-05'),
      updatedAt: new Date('2025-06-15'),
    },
    {
      id: '5',
      firstName: 'Robert',
      lastName: 'Wilson',
      email: 'robert.wilson@company.com',
      phone: '+1 (555) 321-6547',
      position: 'Financial Analyst',
      department: 'Finance',
      hireDate: new Date('2023-11-30'),
      salary: 70000,
      status: 'on-leave',
      manager: 'Lisa Chen',
      companyId: '1',
      createdAt: new Date('2023-11-30'),
      updatedAt: new Date('2025-05-20'),
    },
  ];

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>;
      case 'on-leave':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">On Leave</Badge>;
      case 'terminated':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Terminated</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
              <DialogDescription>
                Create a new employee record. Fill out the information below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </label>
                  <Input id="lastName" placeholder="Smith" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="john.smith@company.com" />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </label>
                <Input id="phone" placeholder="+1 (555) 123-4567" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="position" className="text-sm font-medium">
                    Position
                  </label>
                  <Input id="position" placeholder="Sales Manager" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="department" className="text-sm font-medium">
                    Department
                  </label>
                  <Select>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="engineering">Engineering</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="hr">Human Resources</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="hireDate" className="text-sm font-medium">
                    Hire Date
                  </label>
                  <Input id="hireDate" type="date" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="salary" className="text-sm font-medium">
                    Salary
                  </label>
                  <Input id="salary" type="number" placeholder="75000" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Save Employee</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search employees..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Departments</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="engineering">Engineering</SelectItem>
            <SelectItem value="finance">Finance</SelectItem>
            <SelectItem value="hr">Human Resources</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Hire Date</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmployees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">
                  {employee.firstName} {employee.lastName}
                </TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{getStatusBadge(employee.status)}</TableCell>
                <TableCell>{employee.hireDate.toLocaleDateString()}</TableCell>
                <TableCell>{formatCurrency(employee.salary || 0)}</TableCell>
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
                      <DropdownMenuItem>View profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit employee</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Change department</DropdownMenuItem>
                      <DropdownMenuItem>Update status</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Terminate employee</DropdownMenuItem>
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

export default Employees;