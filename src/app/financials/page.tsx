
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Landmark, FileText, Percent, BookOpen } from "lucide-react";

export default function FinancialsPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-background">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Financial Management</h1>
        <Landmark className="h-8 w-8 text-primary" />
      </div>

      <Card className="shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="bg-muted/30 p-6 border-b border-border">
          <CardTitle className="text-xl text-foreground">Contractor Financial Guide</CardTitle>
          <CardDescription className="text-muted-foreground">Information and resources for managing finances as a contractor in India.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="gst-billing" className="border-b border-border last:border-b-0">
              <AccordionTrigger className="text-lg hover:no-underline hover:text-primary p-6 data-[state=open]:bg-accent/10">
                <div className="flex items-center">
                  <Percent className="mr-3 h-5 w-5 text-accent" /> GST Billing & Invoicing
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2 p-6 pt-0 bg-card">
                <p>Understanding GST invoices is crucial. Key components include:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>GSTIN of supplier and recipient.</li>
                  <li>Invoice number and date.</li>
                  <li>HSN/SAC codes for goods/services.</li>
                  <li>Taxable value and tax rate (CGST, SGST, IGST).</li>
                  <li>Place of supply.</li>
                </ul>
                <p className="mt-2">Ensure you use compliant accounting software or methods for generating GST invoices. Maintain proper records for ITC (Input Tax Credit) claims.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="tender-booking" className="border-b border-border last:border-b-0">
              <AccordionTrigger className="text-lg hover:no-underline hover:text-primary p-6 data-[state=open]:bg-accent/10">
                 <div className="flex items-center">
                  <FileText className="mr-3 h-5 w-5 text-accent" /> Tender Booking & Financials
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2 p-6 pt-0 bg-card">
                <p>When bidding for tenders, consider these financial aspects:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Earnest Money Deposit (EMD):</strong> A security deposit submitted with the bid. Usually refunded to unsuccessful bidders.</li>
                  <li><strong>Performance Security/Bank Guarantee:</strong> Submitted by the successful bidder to guarantee project completion.</li>
                  <li><strong>Cost Estimation:</strong> Accurately estimate material, labor, overheads, and profit margins.</li>
                  <li><strong>Working Capital:</strong> Ensure you have sufficient funds to manage cash flow during the project execution.</li>
                  <li><strong>Payment Terms:</strong> Understand the payment schedule (e.g., milestone-based payments) mentioned in the tender document.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="billing-cycles" className="border-b-0"> {/* last:border-b-0 removed from AccordionItem and applied here */}
              <AccordionTrigger className="text-lg hover:no-underline hover:text-primary p-6 data-[state=open]:bg-accent/10">
                 <div className="flex items-center">
                   <BookOpen className="mr-3 h-5 w-5 text-accent" /> Billing Cycles & Payment Tracking
                 </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2 p-6 pt-0 bg-card">
                <p>Effective billing and payment tracking are key to financial health:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
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
      
      <Card className="shadow-xl rounded-lg mt-6">
          <CardHeader className="bg-muted/30 p-6 border-b border-border">
            <CardTitle className="text-xl text-foreground">Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              The information provided on this page is for general guidance only and should not be considered as professional financial or legal advice. 
              Contractors should consult with qualified financial advisors, chartered accountants, and legal professionals for advice tailored to their specific circumstances and to ensure compliance with all applicable laws and regulations.
            </p>
          </CardContent>
        </Card>
    </div>
  );
}
