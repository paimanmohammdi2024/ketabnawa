import Link from 'next/link';
import { BookNovaLogo, TelegramIcon } from '@/components/icons';
import { Instagram, Youtube } from 'lucide-react';

const QuickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Books', href: '/books' },
  { name: 'Audiobooks', href: '/audiobooks' },
  { name: 'Categories', href: '/categories' },
];

const SocialLinks = [
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'Telegram', href: '#', icon: TelegramIcon },
  { name: 'YouTube', href: '#', icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t mt-auto section-spacing pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Column */}
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BookNovaLogo className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground">BookNova</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Your futuristic gateway to thousands of ebooks and audiobooks. Discover your next adventure with us.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Quick Links</h3>
            <ul className="space-y-3">
              {QuickLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">Connect With Us</h3>
            <div className="flex space-x-4">
              {SocialLinks.map((social) => (
                <Link key={social.name} href={social.href} aria-label={social.name} className="text-muted-foreground hover:text-primary transition-colors">
                  <social.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} BookNova. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
