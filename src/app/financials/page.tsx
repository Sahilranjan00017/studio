'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Landmark, FileText, Percent, BookOpen } from "lucide-react";

export default function FinancialsPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-background">
      <div className="flex items-center justify-between space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Financial Management</h1>
        <Landmark className="h-8 w-8 text-primary" />
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">Contractor Financial Guide</CardTitle>
          <CardDescription>Information and resources for managing finances as a contractor in India.</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="gst-billing">
              <AccordionTrigger className="text-lg hover:no-underline hover:text-primary">
                <Percent className="mr-2 h-5 w-5 text-accent" /> GST Billing & Invoicing
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>Understanding GST invoices is crucial. Key components include:</p>
                <ul className="list-disc list-inside ml-4">
                  <li>GSTIN of supplier and recipient.</li>
                  <li>Invoice number and date.</li>
                  <li>HSN/SAC codes for goods/services.</li>
                  <li>Taxable value and tax rate (CGST, SGST, IGST).</li>
                  <li>Place of supply.</li>
                </ul>
                <p>Ensure you use compliant accounting software or methods for generating GST invoices. Maintain proper records for ITC (Input Tax Credit) claims.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="tender-booking">
              <AccordionTrigger className="text-lg hover:no-underline hover:text-primary">
                <FileText className="mr-2 h-5 w-5 text-accent" /> Tender Booking & Financials
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>When bidding for tenders, consider these financial aspects:</p>
                <ul className="list-disc list-inside ml-4">
                  <li><strong>Earnest Money Deposit (EMD):</strong> A security deposit submitted with the bid. Usually refunded to unsuccessful bidders.</li>
                  <li><strong>Performance Security/Bank Guarantee:</strong> Submitted by the successful bidder to guarantee project completion.</li>
                  <li><strong>Cost Estimation:</strong> Accurately estimate material, labor, overheads, and profit margins.</li>
                  <li><strong>Working Capital:</strong> Ensure you have sufficient funds to manage cash flow during the project execution.</li>
                  <li><strong>Payment Terms:</strong> Understand the payment schedule (e.g., milestone-based payments) mentioned in the tender document.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="billing-cycles">
              <AccordionTrigger className="text-lg hover:no-underline hover:text-primary">
                 <BookOpen className="mr-2 h-5 w-5 text-accent" /> Billing Cycles & Payment Tracking
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2">
                <p>Effective billing and payment tracking are key to financial health:</p>
                <ul className="list-disc list-inside ml-4">
                    <li><strong>Running Account (RA) Bills:</strong> Submit RA bills periodically based on work progress as per contract terms.</li>
                    <li><strong>Measurement Book:</strong> Maintain accurate records of work done, certified by the client/engineer, as a basis for billing.</li>
                    <li><strong>Invoice Submission:</strong> Submit GST-compliant invoices promptly with all supporting documents.</li>
                    <li><strong>Payment Follow-up:</strong> Regularly follow up on outstanding payments.</li>
                    <li><strong>Retention Money:</strong> Understand contract clauses related to retention money and its release.</li>
                    <li><strong>Reconciliation:</strong> Regularly reconcile your accounts with client statements.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      
      <Card className="shadow-md mt-6">
          <CardHeader>
            <CardTitle className="text-xl">Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The information provided on this page is for general guidance only and should not be considered as professional financial or legal advice. 
              Contractors should consult with qualified financial advisors, chartered accountants, and legal professionals for advice tailored to their specific circumstances and to ensure compliance with all applicable laws and regulations.
            </p>
          </CardContent>
        </Card>
    </div>
  );
}
