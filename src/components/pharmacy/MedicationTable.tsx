"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import { SAMPLE_METABOLITES } from "@/lib/constants";
import { ExternalLink, Filter } from "lucide-react";

export function MedicationTable() {
  const [domainFilter, setDomainFilter] = useState("All");

  const filteredMetabolites = SAMPLE_METABOLITES.filter((m) =>
    domainFilter === "All" ? true : m.domain === domainFilter
  );

  return (
    <Card padding={false}>
      <CardHeader className="px-6 pt-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Metabolite &amp; Spectral Reference Database</CardTitle>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Primary analytical features (m/z, RT, fragmentation) with biological metadata &amp; annotation scores.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
            >
              <option value="All">All Biological Domains</option>
              <option value="Plant Metabolomics">Plant Metabolomics</option>
              <option value="Agricultural Metabolomics">Agricultural Metabolomics</option>
              <option value="Livestock Metabolomics">Livestock Metabolomics</option>
              <option value="Environmental Metabolomics">Environmental Metabolomics</option>
              <option value="Human Metabolomics">Human Metabolomics</option>
            </select>
          </div>
        </div>
      </CardHeader>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Compound Name</TableHead>
            <TableHead>Biological Domain</TableHead>
            <TableHead>Platform</TableHead>
            <TableHead>Formula</TableHead>
            <TableHead>m/z [M+H]+</TableHead>
            <TableHead>Retention Time</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>Species Origin</TableHead>
            <TableHead>DOI Identifier</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredMetabolites.map((met) => (
            <TableRow key={met.id}>
              <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                {met.name}
              </TableCell>
              <TableCell>
                <Badge variant="info">{met.domain}</Badge>
              </TableCell>
              <TableCell>
                <span className="rounded bg-gray-100 px-2 py-0.5 font-mono text-[11px] text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                  {met.platform}
                </span>
              </TableCell>
              <TableCell className="font-mono text-xs text-rose-600 dark:text-rose-400 font-semibold">
                {met.formula}
              </TableCell>
              <TableCell className="font-mono text-xs text-gray-600 dark:text-gray-300">
                {met.mz.toFixed(4)}
              </TableCell>
              <TableCell className="text-xs text-gray-500">
                {met.retentionTime} min
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    met.confidenceScore >= 95
                      ? "success"
                      : met.confidenceScore >= 90
                      ? "info"
                      : "warning"
                  }
                >
                  {met.confidenceScore}%
                </Badge>
              </TableCell>
              <TableCell className="text-xs italic text-gray-600 dark:text-gray-400">
                {met.metadata.speciesName}
              </TableCell>
              <TableCell>
                {met.databaseIds.doi ? (
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-rose-600 dark:text-rose-400">
                    {met.databaseIds.doi.replace("10.5281/zenodo.", "")}
                    <ExternalLink className="h-3 w-3" />
                  </span>
                ) : (
                  <span className="text-xs text-gray-400">Curated</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
