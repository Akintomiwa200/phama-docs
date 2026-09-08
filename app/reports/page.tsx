"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { InventoryChart } from "@/components/dashboard/InventoryChart";
import { DATASET_CONTRIBUTIONS, FEATURE_TABLES_DATA } from "@/lib/constants";
import { Upload, FileCheck, Copy, Check, ExternalLink } from "lucide-react";

export default function ReportsPage() {
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [copiedDoi, setCopiedDoi] = useState<string | null>(null);

  // Upload Form state
  const [datasetTitle, setDatasetTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [institution, setInstitution] = useState("");
  const [domain, setDomain] = useState("Plant Metabolomics");
  const [sampleCount, setSampleCount] = useState("48");
  const [generatedDoi, setGeneratedDoi] = useState<string | null>(null);

  const handleGenerateDoi = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoi = `10.5281/zenodo.AMDB-2026-DS${Math.floor(100 + Math.random() * 900)}`;
    setGeneratedDoi(newDoi);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDoi(text);
    setTimeout(() => setCopiedDoi(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Data Repositories &amp; Community Contributions
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Public repositories (MetaboLights, GNPS, Workbench), literature datasets, and community DOI publication framework.
          </p>
        </div>
        <Button onClick={() => setSubmitModalOpen(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Submit Dataset &amp; Claim DOI
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <RevenueChart />
        <InventoryChart />
      </div>

      {/* Community Dataset Contributions & DOIs */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Citable Datasets &amp; Contributor Attribution</CardTitle>
              <CardDescription>
                Datasets registered with persistent DOIs, author metadata, institutional affiliations, and citation standards.
              </CardDescription>
            </div>
            <Badge variant="success">DOI Framework Active</Badge>
          </div>
        </CardHeader>
        <div className="space-y-4 p-6 pt-0">
          {DATASET_CONTRIBUTIONS.map((ds) => (
            <div
              key={ds.id}
              className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/50"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-semibold text-rose-600 dark:text-rose-400">
                  {ds.doi}
                </span>
                <Badge variant="info">{ds.domain}</Badge>
              </div>

              <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">
                {ds.title}
              </h3>

              <p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                {ds.metadataDescription}
              </p>

              <div className="grid gap-2 text-xs text-gray-500 dark:text-gray-400 sm:grid-cols-2">
                <div>
                  <strong>Authors:</strong> {ds.authors.join(", ")}
                </div>
                <div>
                  <strong>Institution:</strong> {ds.institution}
                </div>
                <div>
                  <strong>Data Source:</strong> {ds.publicSource}
                </div>
                <div>
                  <strong>Samples / Feature Tables:</strong> {ds.sampleCount} samples ({ds.featureTableCount} tables)
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between rounded-lg bg-white p-2.5 dark:bg-gray-800">
                <span className="font-mono text-[11px] text-gray-600 dark:text-gray-300 truncate max-w-xl">
                  {ds.citationFormat}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(ds.citationFormat)}
                >
                  {copiedDoi === ds.citationFormat ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Feature Tables Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Processed Feature Tables Repository</CardTitle>
          <CardDescription>
            Aligned LC-MS/MS, GC-MS, and NMR peak matrices with biological species and geographic metadata.
          </CardDescription>
        </CardHeader>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {FEATURE_TABLES_DATA.map((ft) => (
            <div key={ft.id} className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                    {ft.title}
                  </span>
                  <Badge variant="default">{ft.publicRepoSource}</Badge>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Species: <span className="italic">{ft.species}</span> &middot; Region: {ft.geographicRegion}
                </p>
                <p className="text-[11px] font-mono text-gray-400">
                  {ft.detectedFeatures} aligned features &middot; {ft.sampleCount} samples &middot; {ft.alignmentMethod}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-rose-500">{ft.doi}</span>
                <Button variant="outline" size="sm">
                  <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                  Inspect Table
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Modal for Submission */}
      <Modal
        isOpen={submitModalOpen}
        onClose={() => {
          setSubmitModalOpen(false);
          setGeneratedDoi(null);
        }}
        title="Submit Dataset & Claim Persistent DOI"
      >
        {!generatedDoi ? (
          <form onSubmit={handleGenerateDoi} className="space-y-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Upload feature tables, spectral libraries, and biological metadata. Submitters receive formal scholarly attribution and a registered DOI.
            </p>
            <Input
              label="Dataset Title"
              placeholder="e.g. Phytochemical Analysis of Sahelian Medicinal Species"
              value={datasetTitle}
              onChange={(e) => setDatasetTitle(e.target.value)}
              required
            />
            <Input
              label="Authors / Contributors"
              placeholder="e.g. Dr. A. Oladipo, Prof. K. Mensah"
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
              required
            />
            <Input
              label="Institutional Affiliation"
              placeholder="e.g. University of Lagos & AMDB Consortium"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              required
            />
            <div>
              <label className="mb-1 block text-xs font-medium text-gray-700 dark:text-gray-300">
                Biological Domain
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white p-2.5 text-sm text-gray-900 outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
              >
                <option value="Plant Metabolomics">Plant Metabolomics</option>
                <option value="Agricultural Metabolomics">Agricultural Metabolomics</option>
                <option value="Livestock Metabolomics">Livestock Metabolomics</option>
                <option value="Environmental Metabolomics">Environmental Metabolomics</option>
                <option value="Human Metabolomics">Human Metabolomics</option>
              </select>
            </div>
            <Input
              label="Sample Count"
              type="number"
              value={sampleCount}
              onChange={(e) => setSampleCount(e.target.value)}
              required
            />
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSubmitModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                <FileCheck className="mr-1.5 h-4 w-4" />
                Assign DOI &amp; Publish
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
              <Check className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Dataset Published &amp; DOI Registered!
            </h3>
            <p className="font-mono text-sm font-semibold text-rose-600 dark:text-rose-400">
              {generatedDoi}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Your contributed dataset &ldquo;{datasetTitle}&rdquo; has been assigned a persistent DOI with author attribution to {authors}.
            </p>
            <div className="pt-3">
              <Button
                onClick={() => {
                  setSubmitModalOpen(false);
                  setGeneratedDoi(null);
                }}
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}