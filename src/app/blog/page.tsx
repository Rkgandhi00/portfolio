// app/blog/page.tsx
"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, Tag, Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn, formatDate } from '@/lib/utils';

// Define types for the blog
type BlogCategory = 'React' | 'Next.js' | 'TypeScript' | 'Web Development' | 'DevOps' | 'Career' | 'Tutorials' | 'API Design';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  readingTime: number;
  categories: BlogCategory[];
  featured?: boolean;
}

// Sample blog data
const blogPosts: BlogPost[] = [
  {
    id: 'using-nextjs-app-router',
    title: 'Using Next.js App Router for Better Performance',
    excerpt: 'Explore how the App Router in Next.js 13+ improves application performance and developer experience.',
    content: 'This is a placeholder for the full blog content. In a real application, this would be stored in a database or as MDX files.',
    coverImage: '/api/placeholder/800/450',
    publishedAt: '2023-12-10T10:00:00Z',
    readingTime: 6,
    categories: ['Next.js', 'Web Development', 'Tutorials'],
    featured: true
  },
  {
    id: 'typescript-generics',
    title: 'Mastering TypeScript Generics for Flexible Components',
    excerpt: 'Learn how to use TypeScript generics to create highly reusable and type-safe components in React applications.',
    content: 'This is a placeholder for the full blog content. In a real application, this would be stored in a database or as MDX files.',
    coverImage: '/api/placeholder/800/450',
    publishedAt: '2023-11-28T10:00:00Z',
    readingTime: 8,
    categories: ['TypeScript', 'React', 'Tutorials']
  },
  {
    id: 'ci-cd-pipelines',
    title: 'Setting Up CI/CD Pipelines for Modern Web Applications',
    excerpt: 'A comprehensive guide to creating efficient CI/CD pipelines for web applications using GitHub Actions and Azure DevOps.',
    content: 'This is a placeholder for the full blog content. In a real application, this would be stored in a database or as MDX files.',
    coverImage: '/api/placeholder/800/450',
    publishedAt: '2023-11-15T10:00:00Z',
    readingTime: 10,
    categories: ['DevOps', 'Tutorials', 'Web Development']
  },
  {
    id: 'react-server-components',
    title: 'Understanding React Server Components',
    excerpt: 'Dive deep into React Server Components and learn how they change the way we build React applications.',
    content: 'This is a placeholder for the full blog content. In a real application, this would be stored in a database or as MDX files.',
    coverImage: '/api/placeholder/800/450',
    publishedAt: '2023-10-22T10:00:00Z',
    readingTime: 7,
    categories: ['React', 'Next.js', 'Web Development']
  },
  {
    id: 'rest-vs-graphql',
    title: 'REST vs GraphQL: Choosing the Right API Architecture',
    excerpt: 'Compare REST and GraphQL API architectures to determine which is best suited for different types of applications.',
    content: 'This is a placeholder for the full blog content. In a real application, this would be stored in a database or as MDX files.',
    coverImage: '/api/placeholder/800/450',
    publishedAt: '2023-10-05T10:00:00Z',
    readingTime: 9,
    categories: ['API Design', 'Web Development']
  },
  {
    id: 'frontend-developer-journey',
    title: 'My Journey as a Frontend Developer: Lessons Learned',
    excerpt: 'Reflections on my career path, challenges faced, and valuable lessons learned as a frontend developer.',
    content: 'This is a placeholder for the full blog content. In a real application, this would be stored in a database or as MDX files.',
    coverImage: '/api/placeholder/800/450',
    publishedAt: '2023-09-18T10:00:00Z',
    readingTime: 5,
    categories: ['Career', 'Web Development']
  },
  {
    id: 'typescript-tips',
    title: '10 TypeScript Tips for Cleaner Code',
    excerpt: 'Practical TypeScript tips and tricks to write more maintainable, readable, and bug-free code.',
    content: 'This is a placeholder for the full blog content. In a real application, this would be stored in a database or as MDX files.',
    coverImage: '/api/placeholder/800/450',
    publishedAt: '2023-09-02T10:00:00Z',
    readingTime: 6,
    categories: ['TypeScript', 'Tutorials']
  },
  {
    id: 'optimizing-react-apps',
    title: 'Performance Optimization Techniques for React Applications',
    excerpt: 'Learn how to identify and fix performance bottlenecks in your React applications for a smoother user experience.',
    content: 'This is a placeholder for the full blog content. In a real application, this would be stored in a database or as MDX files.',
    coverImage: '/api/placeholder/800/450',
    publishedAt: '2023-08-25T10:00:00Z',
    readingTime: 8,
    categories: ['React', 'Web Development', 'Tutorials'],
    featured: true
  },
];

// Get all unique categories
const allCategories: BlogCategory[] = Array.from(
  new Set(blogPosts.flatMap(post => post.categories))
) as BlogCategory[];

export default function BlogPage() {
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<BlogCategory[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const [featuredPost, ...regularPosts] = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Filter blog posts based on search query and selected categories
  const filteredPosts = regularPosts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategories = selectedCategories.length === 0 || 
      selectedCategories.some(category => post.categories.includes(category));
    
    return matchesSearch && matchesCategories;
  });

  // Toggle category selection
  const toggleCategory = (category: BlogCategory) => {
    setSelectedCategories(current => 
      current.includes(category) 
        ? current.filter(c => c !== category) 
        : [...current, category]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero Section with Search */}
      <section className="container mx-auto px-4 mb-16">
        <div className="text-center max-w-3xl mx-auto">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Blog
          </motion.h1>
          <motion.div 
            className="h-1 w-20 bg-primary mx-auto mb-8"
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
          <motion.p 
            className="text-lg text-muted-foreground mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Thoughts, tutorials, and insights on web development
          </motion.p>
          
          <motion.div 
            className="max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
            
            <div className="flex justify-center mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowFilters(!showFilters)}
                className="text-xs"
              >
                <Filter size={14} className="mr-1" />
                {showFilters ? 'Hide Filters' : 'Filter by Category'}
              </Button>
              
              {(searchQuery || selectedCategories.length > 0) && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="text-xs ml-2"
                >
                  <X size={14} className="mr-1" />
                  Clear Filters
                </Button>
              )}
            </div>
            
            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 mt-4 justify-center">
                    {allCategories.map(category => (
                      <Button
                        key={category}
                        variant={selectedCategories.includes(category) ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleCategory(category)}
                        className="text-xs rounded-full"
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Featured Post</h2>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300"
          >
            <Link href={`/blog/${featuredPost.id}`} className="block">
              <div className="grid grid-cols-1 md:grid-cols-5 min-h-[300px]">
                <div className="md:col-span-2 relative overflow-hidden">
                  <Image 
                    src={featuredPost.coverImage} 
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {featuredPost.categories.map(category => (
                        <span 
                          key={category} 
                          className="inline-flex items-center text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                        >
                          <Tag size={12} className="mr-1" />
                          {category}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {formatDate(featuredPost.publishedAt)}
                    </span>
                    <span className="mx-3">•</span>
                    <span className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {featuredPost.readingTime} min read
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">
            {selectedCategories.length > 0 ? (
              <>Filtered Posts ({filteredPosts.length})</>
            ) : searchQuery ? (
              <>Search Results ({filteredPosts.length})</>
            ) : (
              <>Latest Posts</>
            )}
          </h2>
          
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                  className="bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all hover:shadow-xl"
                >
                  <Link href={`/blog/${post.id}`} className="block">
                    <div className="relative h-48 overflow-hidden">
                      <Image 
                        src={post.coverImage} 
                        alt={post.title}
                        fill
                        style={{objectFit: "cover"}}
                        className="transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.slice(0, 2).map(category => (
                          <span 
                            key={category} 
                            className="text-xs bg-accent/50 text-accent-foreground px-2 py-1 rounded-full"
                          >
                            {category}
                          </span>
                        ))}
                        {post.categories.length > 2 && (
                          <span className="text-xs bg-accent/50 text-accent-foreground px-2 py-1 rounded-full">
                            +{post.categories.length - 2}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-3 line-clamp-2 hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {formatDate(post.publishedAt)}
                        </span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {post.readingTime} min read
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <h3 className="text-xl font-medium mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
              <Button onClick={clearFilters}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div 
          className="max-w-4xl mx-auto bg-card border border-border rounded-xl p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Background decorative elements */}
          <div className="absolute -right-16 -top-16 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
          <div className="absolute -left-16 -bottom-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
          
          <div className="relative z-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              Subscribe to my newsletter to receive updates on new articles, tutorials, and tips on web development.
            </p>
            
            <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-grow"
                required
              />
              <Button type="submit">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">
              I respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}