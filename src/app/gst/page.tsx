
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ReceiptIndianRupee, BarChart3, CheckSquare, Info } from "lucide-react";

const gstSlabs = [
  { rate: "5%", items: "Cement, Bricks (certain types), Sand, Aggregate (basic construction materials may fall here depending on classification and notifications)." },
  { rate: "12%", items: "Many works contracts related to construction of affordable housing, government projects, etc. (subject to specific conditions and notifications)." },
  { rate: "18%", items: "Most works contract services for construction, including commercial and residential projects (default rate for many construction services), Marble, Granite, Tiles, Paints, Electrical fittings, Plumbing fixtures." },
  { rate: "28%", items: "Luxury items, certain types of cement if not under lower slabs, Air conditioning units etc. (less common for core construction but may apply to specific components)." },
];

export default function GstInfoPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-background">
      <div className="flex items-center justify-between space-y-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">GST Information for Contractors</h1>
        <ReceiptIndianRupee className="h-8 w-8 text-primary" />
      </div>

      <Card className="shadow-xl rounded-lg overflow-hidden">
        <CardHeader className="bg-muted/30 p-6 border-b border-border">
          <CardTitle className="text-xl text-foreground">Understanding GST in Construction</CardTitle>
          <CardDescription className="text-muted-foreground">Key GST aspects relevant to contractors in India.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="gst-slabs" className="border-b border-border last:border-b-0">
              <AccordionTrigger className="text-lg hover:no-underline hover:text-primary p-6 data-[state=open]:bg-accent/10">
                <div className="flex items-center">
                 <BarChart3 className="mr-3 h-5 w-5 text-accent" /> GST Slabs for Construction Materials & Services
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2 p-6 pt-0 bg-card">
                <p>GST rates for construction materials and services can vary. It's crucial to refer to the latest GST notifications and consult with a tax professional. Here's a general overview (rates and items are indicative and subject to change):</p>
                <ul className="list-none space-y-3 mt-2">
                  {gstSlabs.map(slab => (
                    <li key={slab.rate} className="p-4 border border-border rounded-md bg-muted/20 shadow-sm">
                      <strong className="text-foreground block mb-1">{slab.rate}:</strong> {slab.items}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 italic text-sm"><strong>Note:</strong> HSN/SAC codes determine the applicable GST rate. Works contracts often have specific rate structures.</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="itc-benefits" className="border-b border-border last:border-b-0">
              <AccordionTrigger className="text-lg hover:no-underline hover:text-primary p-6 data-[state=open]:bg-accent/10">
                <div className="flex items-center">
                  <CheckSquare className="mr-3 h-5 w-5 text-accent" /> Input Tax Credit (ITC) for Contractors
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2 p-6 pt-0 bg-card">
                <p>Contractors can generally claim ITC on goods and services used for providing taxable construction services. This means you can offset the GST paid on your inputs (like cement, steel, architect fees) against the GST collected from your clients.</p>
                <p className="font-semibold text-foreground/90 mt-2">Key conditions for claiming ITC:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>You must have a valid tax invoice.</li>
                  <li>The goods/services must have been received.</li>
                  <li>The supplier must have paid the tax to the government.</li>
                  <li>You must have filed your GST returns.</li>
                </ul>
                <p className="mt-2">Certain items might have restrictions on ITC (e.g., goods/services for personal consumption, some specific blocked credits).</p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="gst-tenders" className="border-b-0">
              <AccordionTrigger className="text-lg hover:no-underline hover:text-primary p-6 data-[state=open]:bg-accent/10">
                <div className="flex items-center">
                  <Info className="mr-3 h-5 w-5 text-accent" /> GST Considerations in Tenders
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground space-y-2 p-6 pt-0 bg-card">
                <p>When quoting for tenders, GST implications are significant:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li><strong>Quoting Prices:</strong> Clearly state whether your quoted prices are inclusive or exclusive of GST. Most government tenders require GST to be quoted separately or as per a defined structure.</li>
                  <li><strong>HSN/SAC Codes:</strong> Ensure correct HSN/SAC codes are used for items in your BOQ to apply the right GST rates.</li>
                  <li><strong>ITC Impact:</strong> Your ability to claim ITC will affect your overall project cost and competitiveness. Factor this into your bidding.</li>
                  <li><strong>Reverse Charge Mechanism (RCM):</strong> Be aware if RCM applies to any services you procure (e.g., services from Goods Transport Agencies, legal services from an advocate).</li>
                  <li><strong>Compliance:</strong> Non-compliance with GST can lead to penalties and affect your eligibility for future tenders.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card className="shadow-xl rounded-lg mt-6">
          <CardHeader className="bg-muted/30 p-6 border-b border-border">
            <CardTitle className="text-xl text-foreground">Important Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              GST laws and regulations are complex and subject to frequent changes. The information provided here is for general awareness only and should not be taken as professional tax advice. 
              It is highly recommended that contractors consult with a qualified Chartered Accountant or GST practitioner for specific guidance related to their business and to ensure full compliance with current GST laws.
            </p>
          </CardContent>
        </Card>
    </div>
  );
}
