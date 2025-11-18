"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Expense } from "@/app/page";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

interface ExpenseListProps {
  expenses: Expense[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Food: "hsl(var(--chart-1))",
  Transportation: "hsl(var(--chart-2))",
  Utilities: "hsl(var(--chart-3))",
  Entertainment: "hsl(var(--chart-4))",
  Health: "hsl(var(--chart-5))",
  Shopping: "hsl(var(--chart-1))",
  Education: "hsl(var(--chart-2))",
  Other: "hsl(var(--chart-3))",
};

export function ExpenseList({ expenses }: ExpenseListProps) {
  // Prepare chart data - group by date
  const dateGroups: Record<string, number> = {};
  expenses.forEach((expense) => {
    const date = new Date(expense.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    dateGroups[date] = (dateGroups[date] || 0) + expense.amount;
  });

  const chartData = Object.entries(dateGroups)
    .map(([date, total]) => ({ date, total }))
    .reverse()
    .slice(-7); // Last 7 days

  return (
    <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg sm:text-xl">
                Recent Expenses
              </CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                Your latest transactions
              </CardDescription>
            </div>
            <Link href="/all-expenses">
              <Button variant="ghost" size="sm">
                See All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 sm:space-y-3">
            {expenses.slice(0, 5).map((expense) => (
              <div
                key={expense.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors gap-2 sm:gap-0"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium text-sm sm:text-base">
                      {expense.description}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {expense.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {expense.paymentMethod}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(expense.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-bold text-base sm:text-lg">
                    ${expense.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
