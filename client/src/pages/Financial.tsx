import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Financial() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Financial Reports</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Financial Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Financial reports and analytics will be displayed here. This section can include:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
            <li>Revenue tracking and analysis</li>
            <li>Profit and loss statements</li>
            <li>Cash flow reports</li>
            <li>Expense tracking</li>
            <li>Tax reports</li>
            <li>Financial forecasting</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
