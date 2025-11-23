import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden futuristic-gradient animate-fade-in">
      <div className="container mx-auto px-4 section-spacing text-center flex flex-col items-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
          کتاب بعدی خود را کشف کنید
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          هزاران کتاب الکترونیکی و صوتی در دستان شماست.
        </p>
        <div className="mt-10">
          <Button size="lg" className="rounded-full text-lg px-8 py-6" asChild>
            <Link href="/books">مرور کتابخانه</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
