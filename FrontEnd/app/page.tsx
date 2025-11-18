"use client";

import { useState } from "react";
import { ExpenseSummary } from "@/components/expense-summary";
import { ExpenseList } from "@/components/expense-list";
import { CategoryBreakdown } from "@/components/category-breakdown";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { UserProfile } from "@/components/user-profile";
import { BudgetInput } from "@/components/budget-input";
import { ThemeToggle } from "@/components/theme-toggle";

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  paymentMethod: string;
}

const mockExpenses: Expense[] = [
  {
    id: "1",
    description: "Grocery shopping",
    amount: 142.5,
    category: "Food",
    date: "2025-11-15",
    paymentMethod: "Credit Card",
  },
  {
    id: "2",
    description: "Gas station",
    amount: 65.0,
    category: "Transportation",
    date: "2025-11-14",
    paymentMethod: "Debit Card",
  },
  {
    id: "3",
    description: "Electric bill",
    amount: 89.75,
    category: "Utilities",
    date: "2025-11-12",
    paymentMethod: "Bank Transfer",
  },
  {
    id: "4",
    description: "Netflix subscription",
    amount: 15.99,
    category: "Entertainment",
    date: "2025-11-10",
    paymentMethod: "Credit Card",
  },
  {
    id: "5",
    description: "Restaurant dinner",
    amount: 78.5,
    category: "Food",
    date: "2025-11-08",
    paymentMethod: "Credit Card",
  },
  {
    id: "6",
    description: "Uber ride",
    amount: 22.3,
    category: "Transportation",
    date: "2025-11-07",
    paymentMethod: "Cash",
  },
  {
    id: "7",
    description: "Gym membership",
    amount: 45.0,
    category: "Health",
    date: "2025-11-05",
    paymentMethod: "Credit Card",
  },
  {
    id: "8",
    description: "Coffee shop",
    amount: 12.75,
    category: "Food",
    date: "2025-11-03",
    paymentMethod: "Cash",
  },
];

export default function DashboardPage() {
  const [expenses] = useState<Expense[]>(mockExpenses);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  const totalSpent = monthlyExpenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  return (
    <main className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-xl font-bold text-balance">
                  ExpenseTrack
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link href="/add-expense">
                <Button size="sm" className="h-9">
                  <Plus className="mr-1 sm:mr-2 h-4 w-4" />
                  <span className="hidden xs:inline">Add Expense</span>
                  <span className="xs:hidden">Add</span>
                </Button>
              </Link>
              <ThemeToggle />
              <UserProfile
                name="Al-Yazid Al-Mukhaini"
                email="alyazidt@gmail.com"
                imageUrl="/user-avatar.png"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
        <div className="grid gap-6 mb-6">
          <BudgetInput totalSpent={totalSpent} />
        </div>

        <div className="grid gap-6 mb-6">
          <ExpenseSummary expenses={expenses} />
        </div>

        <div className="grid gap-6 mb-6">
          <CategoryBreakdown expenses={expenses} />
        </div>

        <div className="grid gap-6">
          <ExpenseList expenses={expenses} />
        </div>
      </div>
    </main>
  );
}
