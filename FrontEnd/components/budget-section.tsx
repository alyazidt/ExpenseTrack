"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { Expense } from "@/app/page"
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react'

interface BudgetSectionProps {
  expenses: Expense[]
}

export function BudgetSection({ expenses }: BudgetSectionProps) {
  // Calculate monthly totals
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  const monthlyExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date)
    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    )
  })

  const totalSpent = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  
  // Mock budget data - you can make this dynamic
  const budgets = [
    { category: "Food", limit: 500, spent: 233.75, color: "hsl(var(--chart-1))" },
    { category: "Transportation", limit: 300, spent: 87.30, color: "hsl(var(--chart-2))" },
    { category: "Utilities", limit: 200, spent: 89.75, color: "hsl(var(--chart-3))" },
    { category: "Entertainment", limit: 150, spent: 15.99, color: "hsl(var(--chart-4))" },
  ]

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0)
  const budgetPercentage = (totalSpent / totalBudget) * 100

  return (
    <div className="grid gap-6 md:grid-cols-2">


      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Category Budgets</CardTitle>
          <CardDescription className="text-sm">Track spending by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {budgets.map((budget) => {
              const percentage = (budget.spent / budget.limit) * 100
              const isOverBudget = percentage > 100
              
              return (
                <div key={budget.category} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{budget.category}</span>
                    <span className={isOverBudget ? "text-destructive font-semibold" : "text-muted-foreground"}>
                      ${budget.spent.toFixed(2)} / ${budget.limit.toFixed(2)}
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className="h-2"
                    style={{ 
                      // @ts-ignore
                      "--progress-background": budget.color 
                    }}
                  />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
