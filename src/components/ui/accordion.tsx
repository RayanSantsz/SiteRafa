import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

export const Accordion = AccordionPrimitive.Root

export const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className = '', ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={`faq-item ${className}`} {...props} />
))
AccordionItem.displayName = 'AccordionItem'

export const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, className = '', ...props }, ref) => (
  <AccordionPrimitive.Header className="faq-header">
    <AccordionPrimitive.Trigger ref={ref} className={`faq-trigger ${className}`} {...props}>
      <span>{children}</span>
      <ChevronDown aria-hidden="true" className="faq-chevron" size={21} strokeWidth={1.6} />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = 'AccordionTrigger'

export const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, className = '', ...props }, ref) => (
  <AccordionPrimitive.Content ref={ref} className={`faq-content ${className}`} {...props}>
    <div className="faq-content-inner">{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = 'AccordionContent'
