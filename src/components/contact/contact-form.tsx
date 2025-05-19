"use client"

import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Twitter,
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import Link from 'next/link';

// Contact form initial state
type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

interface ContactFormProps {
  variant?: 'page' | 'modal';
  onClose?: () => void;
}

export function ContactForm({ variant = 'page', onClose }: ContactFormProps) {
  // Contact form state
  const [formData, setFormData] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      // In a real application, you would send this data to your backend
      console.log('Form submitted:', formData);
      setFormStatus('success');
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setFormStatus('idle');
        if (onClose) onClose();
      }, 3000);
    }, 1500);
  };

  return (
    <div className={`${variant === 'page' ? 'py-16 bg-accent/5' : ''}`}>
      <div className="container mx-auto px-4">
        {variant === 'page' && (
          <h2 className="text-3xl font-bold mb-12 text-center">
            Get In Touch
          </h2>
        )}
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <a href="mailto:contact@rushabhgandhi.dev" className="text-muted-foreground hover:text-primary transition-colors">
                        contact@rushabhgandhi.dev
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <a href="tel:+15551234567" className="text-muted-foreground hover:text-primary transition-colors">
                        +1 (555) 123-4567
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 text-primary" />
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-muted-foreground">San Francisco, California</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-xl font-semibold mb-6">Connect</h3>
                <div className="flex space-x-4">
                  <Button variant="outline" size="icon" asChild>
                    <Link href="https://linkedin.com/in/rushabhgandhi" target="_blank" aria-label="LinkedIn">
                      <Linkedin className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="https://github.com/rushabhgandhi" target="_blank" aria-label="GitHub">
                      <Github className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon" asChild>
                    <Link href="https://twitter.com/rushabhgandhi" target="_blank" aria-label="Twitter">
                      <Twitter className="h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Feel free to reach out on any platform. I typically respond within 24 hours.
                </p>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name <span className="text-primary">*</span>
                      </label>
                      <Input 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        disabled={formStatus === 'submitting' || formStatus === 'success'}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email <span className="text-primary">*</span>
                      </label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your email address"
                        disabled={formStatus === 'submitting' || formStatus === 'success'}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input 
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What is this regarding?"
                      disabled={formStatus === 'submitting' || formStatus === 'success'}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message <span className="text-primary">*</span>
                    </label>
                    <Textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Your message"
                      rows={6}
                      disabled={formStatus === 'submitting' || formStatus === 'success'}
                      required
                    />
                  </div>
                  
                  {formStatus === 'error' && (
                    <div className="bg-destructive/10 text-destructive p-3 rounded-md flex items-start">
                      <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">{errorMessage}</p>
                    </div>
                  )}
                  
                  {formStatus === 'success' && (
                    <div className="bg-green-500/10 text-green-500 p-3 rounded-md flex items-start">
                      <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-sm">Your message has been sent successfully. I'll get back to you soon!</p>
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={formStatus === 'submitting' || formStatus === 'success'}
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <span className="mr-2">Sending</span>
                        <span className="animate-spin">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                          </svg>
                        </span>
                      </>
                    ) : formStatus === 'success' ? (
                      <>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Sent Successfully
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 