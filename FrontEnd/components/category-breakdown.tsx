"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pie, PieChart, ResponsiveContainer, Cell, Legend } from "recharts";
import type { Expense } from "@/app/page";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface CategoryBreakdownProps {
  expenses: Expense[];
}

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export function CategoryBreakdown({ expenses }: CategoryBreakdownProps) {
  // Calculate category totals for current month
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const thisMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() === currentMonth &&
      expenseDate.getFullYear() === currentYear
    );
  });

  const categoryTotals: Record<string, number> = {};
  thisMonthExpenses.forEach((expense) => {
    categoryTotals[expense.category] =
      (categoryTotals[expense.category] || 0) + expense.amount;
  });

  const chartData = Object.entries(categoryTotals)
    .map(([category, total]) => ({
      category,
      total,
    }))
    .sort((a, b) => b.total - a.total);

  const topThree = chartData.slice(0, 3);

  return (
    <Card className="w-[40%]">
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Top Categories</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Your highest spending categories this month
        </CardDescription>
      </CardHeader>
      <CardContent>
        {topThree.length > 0 ? (
          <ChartContainer
            config={{
              total: {
                label: "Amount",
                color: "hsl(var(--chart-1))",
              },
            }}
            className="h-[150px] sm:h-[200px] md:h-[250px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Pie
                  data={topThree}
                  dataKey="total"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ category, total }) => `$${total.toFixed(2)}`}
                >
                  {topThree.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
          <p className="text-sm text-muted-foreground text-center py-8">
            No expenses recorded yet
          </p>
        )}
      </CardContent>
    </Card>
  );
}
