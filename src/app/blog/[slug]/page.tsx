import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  // In a real application, you would fetch the blog post data based on the slug
  // For now, we use a placeholder post
  const post = {
    slug,
    title: 'Getting Started with Morr.ai',
    date: '2024-03-15',
    author: 'Morr.ai Team',
    category: 'Tutorial',
    readTime: '5 min read',
    content: `
      <p>Welcome to Morr.ai! This guide will help you get started with our AI-powered productivity platform.</p>
      
      <h2>Setting Up Your Workspace</h2>
      <p>First, create your account and set up your workspace. Choose a name that reflects your team or organization.</p>
      
      <h2>Connecting Your Tools</h2>
      <p>Morr.ai works best when connected to your existing tools. Start by integrating your most-used applications like Slack, Google Drive, or your CRM.</p>
      
      <h2>Your First Search</h2>
      <p>Once your integrations are set up, try your first unified search across all your connected tools. Simply type your query in natural language.</p>
      
      <h2>Setting Up AI Agents</h2>
      <p>Configure AI agents to automate routine tasks and provide proactive insights. Start with meeting briefs or sales insights.</p>
      
      <h2>Next Steps</h2>
      <p>Explore our documentation, join our community, and reach out to our support team if you need any help getting started.</p>
    `
  };

  return (
    <div className="w-full min-h-[90vh] bg-background relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,75,0.1)_0%,transparent_65%)]" />
      </div>

      <div className="container relative px-4 md:px-6 py-16 space-y-12 z-10">
        {/* Back Button */}
        <div>
          <Button variant="outline" asChild>
            <Link href="/blog">← Back to Blog</Link>
          </Button>
        </div>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground/60">
              <span className="text-primary/80">{post.category}</span>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground/80">
              By {post.author}
            </p>
          </div>

          {/* Article Content */}
          <Card className="p-8 md:p-12 bg-black/40 backdrop-blur-xl border-primary/10">
            <div 
              className="prose prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </Card>

          {/* Author Bio / CTA */}
          <Card className="p-6 bg-black/40 backdrop-blur-xl border-primary/10">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold text-primary/90">Ready to get started?</h3>
                <p className="text-muted-foreground/80">
                  Join thousands of teams using Morr.ai to boost their productivity.
                </p>
              </div>
              <Button size="lg">Start Free Trial</Button>
            </div>
          </Card>

          {/* Related Posts */}
          <div className="pt-12">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-black/40 backdrop-blur-xl border-primary/10 hover:border-primary/20 transition-all">
                <Link href="/blog/ai-powered-productivity" className="block space-y-2">
                  <h3 className="text-xl font-semibold text-primary/90">AI-Powered Productivity</h3>
                  <p className="text-muted-foreground/70">Learn how AI is transforming workplace productivity.</p>
                </Link>
              </Card>
              <Card className="p-6 bg-black/40 backdrop-blur-xl border-primary/10 hover:border-primary/20 transition-all">
                <Link href="/blog/security-best-practices" className="block space-y-2">
                  <h3 className="text-xl font-semibold text-primary/90">Security Best Practices</h3>
                  <p className="text-muted-foreground/70">Essential security considerations for AI tools.</p>
                </Link>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

