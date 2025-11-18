"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Expense } from "@/app/page"
import { Brain, TrendingUp, Calendar, DollarSign } from 'lucide-react'

interface AIInsightsProps {
  expenses: Expense[]
}

export function AIInsights({ expenses }: AIInsightsProps) {
  // Calculate insights
  const calculateInsights = () => {
    if (expenses.length === 0) {
      return {
        peakSpendingPeriod: "No data",
        averageDailySpending: 0,
        nextMonthPrediction: 0,
      }
    }

    // Group expenses by week
    const weeklySpending: Record<string, number> = {}
    expenses.forEach((expense) => {
      const date = new Date(expense.date)
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay())
      const weekKey = weekStart.toISOString().split("T")[0]
      weeklySpending[weekKey] = (weeklySpending[weekKey] || 0) + expense.amount
    })

    // Find peak spending week
    let maxSpending = 0
    let peakWeek = ""
    Object.entries(weeklySpending).forEach(([week, amount]) => {
      if (amount > maxSpending) {
        maxSpending = amount
        peakWeek = week
      }
    })

    const peakDate = new Date(peakWeek)
    const peakSpendingPeriod = peakWeek
      ? `Week of ${peakDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`
      : "Current period"

    // Calculate average daily spending
    const sortedExpenses = [...expenses].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    const firstDate = new Date(sortedExpenses[0].date)
    const lastDate = new Date(sortedExpenses[sortedExpenses.length - 1].date)
    const daysDiff = Math.max(
      1,
      Math.ceil((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24))
    )
    const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    const averageDailySpending = totalSpent / daysDiff

    // Simple linear regression for next month prediction
    // Calculate trend from last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    const recentExpenses = expenses.filter(
      (expense) => new Date(expense.date) >= thirtyDaysAgo
    )
    const recentTotal = recentExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    
    // Predict next month based on recent trend (with 10% growth factor)
    const nextMonthPrediction = recentTotal * 1.1

    return {
      peakSpendingPeriod,
      averageDailySpending,
      nextMonthPrediction,
    }
  }

  const insights = calculateInsights()

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          <CardTitle>AI-Powered Insights</CardTitle>
        </div>
        <CardDescription>Smart analysis of your spending patterns</CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex flex-col gap-2 rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">Peak Spending Period</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-primary">
              {insights.peakSpendingPeriod}
            </p>
            <p className="text-xs text-muted-foreground">When you spend the most</p>
          </div>

          <div className="flex flex-col gap-2 rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span className="text-sm font-medium">Daily Average</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-accent">
              ${insights.averageDailySpending.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">Your average daily spending</p>
          </div>

          <div className="flex flex-col gap-2 rounded-lg border bg-card p-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">Next Month Forecast</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-chart-3">
              ${insights.nextMonthPrediction.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">Predicted spending trend</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
