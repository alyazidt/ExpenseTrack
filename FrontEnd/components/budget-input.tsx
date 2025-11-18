"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Pencil, Check, X, DollarSign, TrendingDown, TrendingUp } from 'lucide-react'
import { Progress } from "@/components/ui/progress"

interface BudgetInputProps {
  totalSpent: number
}

export function BudgetInput({ totalSpent }: BudgetInputProps) {
  const [budget, setBudget] = useState(2000)
  const [isEditing, setIsEditing] = useState(false)
  const [tempBudget, setTempBudget] = useState(budget.toString())

  const remaining = budget - totalSpent
  const percentage = (totalSpent / budget) * 100
  const isOverBudget = percentage > 100

  const handleSave = () => {
    const newBudget = parseFloat(tempBudget)
    if (!isNaN(newBudget) && newBudget > 0) {
      setBudget(newBudget)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setTempBudget(budget.toString())
    setIsEditing(false)
  }

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl sm:text-2xl">Monthly Budget</CardTitle>
          </div>
          {!isEditing && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center flex-1">
                <span className="text-2xl font-bold mr-2">$</span>
                <Input
                  type="number"
                  value={tempBudget}
                  onChange={(e) => setTempBudget(e.target.value)}
                  className="text-2xl font-bold h-12"
                  autoFocus
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleSave}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <DollarSign className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-3xl sm:text-4xl font-bold">${budget.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Monthly budget</p>
                </div>
              </div>
              <div className="text-right">
                {isOverBudget ? (
                  <div className="flex items-center gap-2 text-destructive">
                    <TrendingUp className="h-5 w-5" />
                    <div>
                      <p className="text-xl font-bold">${Math.abs(remaining).toFixed(2)}</p>
                      <p className="text-sm font-medium">Over budget</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingDown className="h-5 w-5" />
                    <div>
                      <p className="text-xl font-bold">${remaining.toFixed(2)}</p>
                      <p className="text-sm font-medium">Remaining</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Spent</span>
              <span className="font-semibold">${totalSpent.toFixed(2)}</span>
            </div>
            <Progress 
              value={Math.min(percentage, 100)} 
              className="h-3"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{percentage.toFixed(1)}% of budget used</span>
              {isOverBudget && (
                <span className="text-destructive font-semibold">
                  {(percentage - 100).toFixed(1)}% over
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
