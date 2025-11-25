import { Button } from '@/components/ui/button';
import { Headset } from 'lucide-react';

export default function SupportSection() {
  return (
    <>
      <section className="py-16 text-center animate-fade-in">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold">سوالی دارید؟</h2>
          <p className="mt-2 text-muted-foreground opacity-70">
            ما اینجاییم تا کمکتون کنیم
          </p>
        </div>
      </section>

      <Button
        aria-label="پشتیبانی"
        className="fixed bottom-6 left-6 z-50 h-14 w-14 rounded-full shadow-lg transition-transform duration-300 ease-in-out hover:scale-110 dark:support-button-glow animate-bounce-in"
      >
        <Headset className="h-7 w-7" />
        <span className="sr-only">پشتیبانی</span>
      </Button>
    </>
  );
}
