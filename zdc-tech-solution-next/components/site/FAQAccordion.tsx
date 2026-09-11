"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { getIcon } from "@/lib/icons";
import { getFaqs } from "@/service/faq.service";
import { getApiErrorMessage, unwrapApiResponse } from "@/lib/public-api";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQAccordionProps {
  items: { question: string; answer: string }[];
}

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [faqs, setFaqs] = useState(items);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const loadFaqs = async () => {
      try {
        const response = await getFaqs();
        if (!active) return;
        const liveFaqs =
          unwrapApiResponse<FAQAccordionProps["items"]>(response) || [];
        if (liveFaqs.length) setFaqs(liveFaqs);
      } catch (requestError) {
        if (active) setError(getApiErrorMessage(requestError));
      }
    };
    void loadFaqs();
    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="mx-auto max-w-3xl">
      {error && (
        <p className="mb-4 text-center text-xs text-amber-300">{error}</p>
      )}
      <Accordion type="single" collapsible className="w-full space-y-4">
        {faqs.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <AccordionItem
              value={`item-${index}`}
              className="rounded-xl border border-border bg-card shadow-sm px-5 transition-colors hover:border-primary/30 data-[state=open]:border-primary/40"
            >
              <AccordionTrigger className="text-base font-medium text-foreground hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground pb-4">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          </motion.div>
        ))}
      </Accordion>
    </div>
  );
}
