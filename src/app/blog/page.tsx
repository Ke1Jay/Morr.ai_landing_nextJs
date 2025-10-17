import React from 'react';
import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BlogPage() {
  const blogPosts = [
    {
      slug: 'getting-started-with-morr-ai',
      title: 'Getting Started with Morr.ai',
      excerpt: 'Learn how to set up your workspace and connect your first integrations.',
      date: '2024-03-15',
      category: 'Tutorial',
      readTime: '5 min read'
    },
    {
      slug: 'ai-powered-productivity',
      title: 'How AI is Transforming Workplace Productivity',
      excerpt: 'Discover the latest trends in AI-driven productivity tools and workflows.',
      date: '2024-03-10',
      category: 'Insights',
      readTime: '8 min read'
    },
    {
      slug: 'security-best-practices',
      title: 'Security Best Practices for AI Tools',
      excerpt: 'Essential security considerations when implementing AI in your organization.',
      date: '2024-03-05',
      category: 'Security',
      readTime: '6 min read'
    }
  ];

  return (
    <div className="w-full min-h-[90vh] flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,75,0.1)_0%,transparent_65%)]" />
      </div>

      <div className="container relative px-4 md:px-6 py-16 space-y-12 z-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-block">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary/80">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse mr-2" />
              <span>Blog</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Insights & Updates
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground/80 max-w-3xl mx-auto">
            Stay up to date with the latest news, tutorials, and insights from the Morr.ai team.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="group relative p-6 bg-black/40 backdrop-blur-xl border-primary/10 hover:border-primary/20 transition-all duration-300">
              <Link href={`/blog/${post.slug}`} className="block space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground/60">
                    <span className="text-primary/80">{post.category}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-primary/90 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground/70">
                    {post.excerpt}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground/60">{post.date}</span>
                  <span className="text-primary/80 group-hover:text-primary transition-colors">
                    Read more →
                  </span>
                </div>
              </Link>
            </Card>
          ))}
        </div>

        {/* Newsletter CTA */}
        <Card className="p-8 bg-black/40 backdrop-blur-xl border-primary/10 text-center space-y-4 mt-16">
          <h2 className="text-2xl font-bold text-primary/90">Subscribe to Our Newsletter</h2>
          <p className="text-muted-foreground/80 max-w-xl mx-auto">
            Get the latest updates, insights, and tips delivered directly to your inbox.
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 bg-black/20 border border-primary/20 rounded-lg focus:outline-none focus:border-primary/40 text-foreground"
            />
            <Button>Subscribe</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

