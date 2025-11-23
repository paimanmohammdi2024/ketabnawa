import Link from 'next/link';
import { NawaBookLogo, TelegramIcon } from '@/components/icons';
import { Instagram, Youtube } from 'lucide-react';

const QuickLinks = [
  { name: 'خانه', href: '/' },
  { name: 'کتاب‌ها', href: '/books' },
  { name: 'کتاب‌های صوتی', href: '/audiobooks' },
  { name: 'دسته‌بندی‌ها', href: '/categories' },
];

const SocialLinks = [
  { name: 'اینستاگرام', href: '#', icon: Instagram },
  { name: 'تلگرام', href: '#', icon: TelegramIcon },
  { name: 'یوتیوب', href: '#', icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-background border-t mt-auto section-spacing pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* About Column */}
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <NawaBookLogo className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-foreground">کتاب نوا</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              دروازه آینده‌نگر شما به هزاران کتاب الکترونیکی و صوتی. ماجراجویی بعدی خود را با ما کشف کنید.
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-foreground">لینک‌های سریع</h3>
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
            <h3 className="font-semibold text-lg mb-4 text-foreground">با ما در ارتباط باشید</h3>
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
            © {new Date().getFullYear()} کتاب نوا. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}
