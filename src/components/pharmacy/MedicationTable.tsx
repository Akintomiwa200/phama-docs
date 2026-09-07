"use client";

import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { SAMPLE_MEDICATIONS } from "@/lib/constants";
import { formatCurrency, getStockStatus } from "@/lib/helpers";

export function MedicationTable() {
  return (
    <Card padding={false}>
      <CardHeader className="px-6 pt-6">
        <div className="flex items-center justify-between">
          <CardTitle>Medications</CardTitle>
          <Button size="sm">Add Medication</Button>
        </div>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Dosage</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Expiry</TableHead>
            <TableHead>Manufacturer</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {SAMPLE_MEDICATIONS.map((med) => {
            const status = getStockStatus(med.stock);
            return (
              <TableRow key={med.id}>
                <TableCell className="font-medium">{med.name}</TableCell>
                <TableCell>
                  <Badge variant="info">{med.category}</Badge>
                </TableCell>
                <TableCell>{med.dosage}</TableCell>
                <TableCell>{formatCurrency(med.price)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      status === "in-stock"
                        ? "success"
                        : status === "low-stock"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {med.stock} units
                  </Badge>
                </TableCell>
                <TableCell>{med.expiryDate}</TableCell>
                <TableCell>{med.manufacturer}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}
