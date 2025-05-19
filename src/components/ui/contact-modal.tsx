"use client"

import { Dialog, DialogContent, DialogTitle } from "@/src/components/ui/dialog"
import { ContactForm } from "@/src/components/contact/contact-form"

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogTitle className="sr-only">Contact Form</DialogTitle>
        <ContactForm variant="modal" onClose={onClose} />
      </DialogContent>
    </Dialog>
  )
} 