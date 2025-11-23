import Link from 'next/link';
import { categories } from '@/lib/placeholder-data';
import { Card, CardContent } from '@/components/ui/card';

export default function CategoriesSection() {
  return (
    <section className="section-spacing bg-background">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
          Explore by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link href="/categories" key={category.name}>
              <Card className="group flex flex-col items-center justify-center p-6 aspect-square rounded-2xl border-transparent bg-secondary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]">
                <CardContent className="p-0 flex flex-col items-center justify-center gap-4">
                  <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <category.icon className="h-8 w-8 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground">{category.name}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
