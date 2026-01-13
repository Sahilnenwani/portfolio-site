'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Tag,
  Twitter,
  Linkedin,
  Link as LinkIcon
} from 'lucide-react';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Sample blog content - In a real app, this would come from MDX files
const blogContent: Record<string, { content: string }> = {
  'building-scalable-microservices-nestjs': {
    content: `
## Introduction

Building scalable microservices is a critical skill for modern backend developers. In this article, we'll explore how to architect and implement microservices using NestJS, a progressive Node.js framework that brings enterprise-grade patterns to JavaScript.

## Why NestJS for Microservices?

NestJS provides a solid foundation for building microservices with its:

- **Modular Architecture**: Organize code into feature modules
- **Dependency Injection**: Built-in DI container for loose coupling
- **Transport Layer Abstraction**: Easy switching between TCP, Redis, Kafka, etc.
- **Built-in Patterns**: Guards, Interceptors, Pipes, and Filters

## The Outbox Pattern

One of the most important patterns for reliable event publishing is the Outbox Pattern. Here's how it works:

\`\`\`typescript
@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly outboxRepository: OutboxRepository,
  ) {}

  @Transactional()
  async createOrder(dto: CreateOrderDto): Promise<Order> {
    // Create the order
    const order = await this.orderRepository.create(dto);
    
    // Store the event in the outbox table (same transaction)
    await this.outboxRepository.create({
      aggregateId: order.id,
      eventType: 'ORDER_CREATED',
      payload: order,
    });
    
    return order;
  }
}
\`\`\`

## Multi-tenant Database Design

For SaaS applications, multi-tenancy is crucial. Here's a tenant-based sharding approach:

\`\`\`typescript
@Injectable()
export class TenantAwareRepository<T> {
  constructor(
    private readonly dataSource: DataSource,
    private readonly tenantService: TenantService,
  ) {}

  async findAll(): Promise<T[]> {
    const tenantId = this.tenantService.getCurrentTenantId();
    return this.repository.find({
      where: { tenantId },
    });
  }
}
\`\`\`

## Conclusion

Building microservices with NestJS gives you the best of both worlds: the productivity of Node.js with the architecture of enterprise frameworks. The patterns we discussed—Outbox, multi-tenancy, and event-driven communication—are essential for building reliable distributed systems.
    `,
  },
  'go-vs-nodejs-performance': {
    content: `
## The Eternal Debate

Both Go and Node.js are excellent choices for backend development, but they shine in different scenarios. Let's break down when to use each.

## Performance Benchmarks

In our tests migrating an import service from Node.js to Go, we saw:

- **60% faster processing** for CPU-intensive operations
- **Lower memory footprint** for concurrent operations
- **Better garbage collection** predictability

## When to Choose Go

\`\`\`go
// Go excels at CPU-intensive tasks
func ProcessLargeDataset(data []Record) []Result {
    results := make([]Result, len(data))
    
    // Leverage goroutines for parallel processing
    var wg sync.WaitGroup
    for i, record := range data {
        wg.Add(1)
        go func(idx int, r Record) {
            defer wg.Done()
            results[idx] = process(r)
        }(i, record)
    }
    
    wg.Wait()
    return results
}
\`\`\`

Go is ideal for:
- High-performance data processing
- System-level programming
- Services requiring predictable latency

## When to Choose Node.js

\`\`\`typescript
// Node.js shines with I/O-bound operations
async function handleMultipleAPICalls(ids: string[]): Promise<Data[]> {
  return Promise.all(
    ids.map(id => fetchFromExternalAPI(id))
  );
}
\`\`\`

Node.js is ideal for:
- API gateways and BFFs
- Real-time applications
- Rapid prototyping
- Teams with JavaScript expertise

## Our Recommendation

Use both! At Rewaa, we use Node.js/NestJS for our main API services and Go for performance-critical import/export operations. This hybrid approach gives us the best of both worlds.
    `,
  },
  'kafka-event-driven-architecture': {
    content: `
## Event-Driven Architecture with Kafka

Apache Kafka has become the backbone of modern distributed systems. Let's explore how to implement resilient event-driven patterns.

## Why Kafka?

- **Durability**: Messages are persisted to disk
- **Scalability**: Horizontal scaling with partitions
- **Ordering**: Guaranteed order within partitions
- **Replay**: Consumers can replay events

## Producer Implementation

\`\`\`typescript
@Injectable()
export class OrderEventProducer {
  constructor(
    @InjectKafka() private readonly kafka: KafkaClient,
  ) {}

  async publishOrderCreated(order: Order): Promise<void> {
    await this.kafka.emit('orders.created', {
      key: order.id,
      value: {
        orderId: order.id,
        customerId: order.customerId,
        items: order.items,
        total: order.total,
        createdAt: new Date().toISOString(),
      },
    });
  }
}
\`\`\`

## Consumer with Error Handling

\`\`\`typescript
@Controller()
export class InventoryConsumer {
  @EventPattern('orders.created')
  async handleOrderCreated(
    @Payload() data: OrderCreatedEvent,
    @Ctx() context: KafkaContext,
  ): Promise<void> {
    try {
      await this.inventoryService.reserveStock(data.items);
      await context.getConsumer().commitOffsets([{
        topic: 'orders.created',
        partition: context.getPartition(),
        offset: context.getMessage().offset,
      }]);
    } catch (error) {
      // Send to dead letter queue
      await this.dlqService.send(data, error);
    }
  }
}
\`\`\`

## Dead Letter Queue Pattern

Failed messages shouldn't block processing. Implement a DLQ:

\`\`\`typescript
@Injectable()
export class DeadLetterQueueService {
  async send(event: any, error: Error): Promise<void> {
    await this.kafka.emit('dlq.orders', {
      originalEvent: event,
      error: error.message,
      failedAt: new Date().toISOString(),
      retryCount: event.retryCount || 0,
    });
  }
}
\`\`\`

## Conclusion

Kafka provides the reliability and scalability needed for modern distributed systems. Combined with patterns like DLQ and the Outbox pattern, you can build systems that are both resilient and maintainable.
    `,
  },
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const post = blogPosts.find((p) => p.slug === slug);
  const content = blogContent[slug];

  if (!post) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen pt-24 pb-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-heading font-bold text-white mb-4">
              Post Not Found
            </h1>
            <Link 
              href="/blog"
              className="text-terminal-pink hover:underline font-mono"
            >
              ← Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-terminal-pink transition-colors font-mono text-sm mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>cd ~/blog</span>
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-2 py-1 text-xs font-mono bg-terminal-cyan/10 text-terminal-cyan rounded"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500 mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-500 font-mono mr-2">Share:</span>
              <button
                onClick={copyLink}
                className="p-2 bg-background-card border border-border rounded-lg text-zinc-500 hover:text-terminal-green hover:border-terminal-green/50 transition-all"
                title="Copy link"
              >
                <LinkIcon className="w-4 h-4" />
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background-card border border-border rounded-lg text-zinc-500 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-background-card border border-border rounded-lg text-zinc-500 hover:text-[#0077b5] hover:border-[#0077b5]/50 transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </motion.header>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-invert prose-lg max-w-none"
          >
            {/* Terminal-style excerpt */}
            <div className="bg-background-card border border-border rounded-xl p-4 mb-8 font-mono text-sm">
              <div className="text-terminal-green mb-2">$ cat excerpt.txt</div>
              <p className="text-zinc-400 m-0">{post.excerpt}</p>
            </div>

            {/* Article Content */}
            <div 
              className="
                prose-headings:font-heading prose-headings:text-white
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:text-terminal-green
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-zinc-400 prose-p:leading-relaxed
                prose-a:text-terminal-cyan prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-code:text-terminal-pink prose-code:bg-background-card prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                prose-pre:bg-background-card prose-pre:border prose-pre:border-border prose-pre:rounded-xl
                prose-ul:text-zinc-400 prose-li:text-zinc-400
                prose-blockquote:border-terminal-green prose-blockquote:text-zinc-400
              "
              dangerouslySetInnerHTML={{ __html: content?.content || '<p>Content coming soon...</p>' }}
            />
          </motion.div>

          {/* Author Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 p-6 bg-background-card border border-border rounded-xl"
          >
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-terminal-green/20 rounded-full flex items-center justify-center text-2xl font-heading font-bold text-terminal-green">
                SN
              </div>
              <div>
                <h3 className="font-heading font-semibold text-white mb-1">
                  Sahil Nenwani
                </h3>
                <p className="text-sm text-terminal-cyan font-mono mb-2">
                  Full Stack Developer
                </p>
                <p className="text-sm text-zinc-400">
                  Building scalable backend systems with Node.js, NestJS & Go. 
                  Passionate about distributed architectures and cloud solutions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Back to Blog */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-background-card border border-border rounded-xl font-mono text-sm text-zinc-400 hover:text-terminal-pink hover:border-terminal-pink/50 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all articles</span>
            </Link>
          </motion.div>
        </article>
      </main>
      <Footer />
    </>
  );
}

