"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from 'lucide-react'
import Link from "next/link"
import type { Expense } from "@/app/page"

const mockExpenses: Expense[] = [
  {
    id: "1",
    description: "Grocery shopping",
    amount: 142.50,
    category: "Food",
    date: "2025-11-15",
    paymentMethod: "Credit Card",
  },
  {
    id: "2",
    description: "Gas station",
    amount: 65.00,
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
    amount: 78.50,
    category: "Food",
    date: "2025-11-08",
    paymentMethod: "Credit Card",
  },
  {
    id: "6",
    description: "Uber ride",
    amount: 22.30,
    category: "Transportation",
    date: "2025-11-07",
    paymentMethod: "Cash",
  },
  {
    id: "7",
    description: "Gym membership",
    amount: 45.00,
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
]

export default function AllExpensesPage() {
  const [expenses] = useState<Expense[]>(mockExpenses)

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-5xl">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">All Expenses</CardTitle>
            <CardDescription>Complete list of your transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium">{expense.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        {expense.category}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {expense.paymentMethod}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(expense.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-bold text-lg">
                      ${expense.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
