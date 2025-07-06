
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
import { Contact } from '@/types';

const Contacts: React.FC = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data - in a real app, this would come from Supabase
  const contacts: Contact[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      phone: '+1 (555) 123-4567',
      company: 'Acme Inc.',
      status: 'customer',
      tags: ['retail', 'vip'],
      assignedTo: 'Sarah Johnson',
      companyId: '1',
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date('2025-06-20'),
    },
    {
      id: '2',
      firstName: 'Emily',
      lastName: 'Davis',
      email: 'emily.davis@example.com',
      phone: '+1 (555) 987-6543',
      company: 'Tech Solutions',
      status: 'lead',
      tags: ['technology', 'new'],
      companyId: '1',
      createdAt: new Date('2025-05-10'),
      updatedAt: new Date('2025-06-25'),
    },
    {
      id: '3',
      firstName: 'Michael',
      lastName: 'Brown',
      email: 'michael.brown@example.com',
      phone: '+1 (555) 456-7890',
      company: 'Global Enterprises',
      status: 'prospect',
      tags: ['manufacturing'],
      assignedTo: 'Robert Wilson',
      companyId: '1',
      createdAt: new Date('2025-03-22'),
      updatedAt: new Date('2025-07-01'),
    },
    {
      id: '4',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@example.com',
      phone: '+1 (555) 789-0123',
      company: 'Retail Goods',
      status: 'customer',
      tags: ['retail'],
      companyId: '1',
      createdAt: new Date('2025-02-05'),
      updatedAt: new Date('2025-06-15'),
    },
    {
      id: '5',
      firstName: 'Robert',
      lastName: 'Wilson',
      email: 'robert.wilson@example.com',
      phone: '+1 (555) 321-6547',
      company: 'Finance Pro',
      status: 'inactive',
      tags: ['finance'],
      assignedTo: 'John Smith',
      companyId: '1',
      createdAt: new Date('2024-11-30'),
      updatedAt: new Date('2025-05-20'),
    },
  ];

  const filteredContacts = contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'lead':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Lead</Badge>;
      case 'prospect':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Prospect</Badge>;
      case 'customer':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Customer</Badge>;
      case 'inactive':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New Contact</DialogTitle>
              <DialogDescription>
                Create a new contact in your CRM. Fill out the information below.
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
                <Input id="email" type="email" placeholder="john.smith@example.com" />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </label>
                <Input id="phone" placeholder="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  Company
                </label>
                <Input id="company" placeholder="Acme Inc." />
              </div>
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">
                  Status
                </label>
                <Select>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="prospect">Prospect</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>Save Contact</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search contacts..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="lead">Lead</SelectItem>
            <SelectItem value="prospect">Prospect</SelectItem>
            <SelectItem value="customer">Customer</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow key={contact.id}>
                <TableCell className="font-medium">
                  {contact.firstName} {contact.lastName}
                </TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.company}</TableCell>
                <TableCell>{getStatusBadge(contact.status)}</TableCell>
                <TableCell>{contact.createdAt.toLocaleDateString()}</TableCell>
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
                      <DropdownMenuItem>Edit contact</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Add task</DropdownMenuItem>
                      <DropdownMenuItem>Add opportunity</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete contact</DropdownMenuItem>
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

export default Contacts;