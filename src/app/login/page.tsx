import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import { NawaBookLogo } from '@/components/icons';

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-4 futuristic-gradient">
      <Button asChild variant="outline" className="absolute top-6 left-6 rounded-full !pr-4">
        <Link href="/">
          <ArrowLeft className="ml-2 h-4 w-4" />
          بازگشت به خانه
        </Link>
      </Button>

      <Card className="w-full max-w-sm glass-card">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <NawaBookLogo className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-2xl">ورود به حساب کاربری</CardTitle>
          <CardDescription>
            برای دسترسی به کتابخانه خود وارد شوید
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">ایمیل</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                required
                dir="ltr"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">رمز عبور</Label>
                <Link
                  href="#"
                  className="text-sm text-primary hover:underline"
                >
                  فراموشی رمز؟
                </Link>
              </div>
              <Input id="password" type="password" required dir="ltr" />
            </div>
            <Button type="submit" className="w-full">
              ورود
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            حساب کاربری ندارید؟{' '}
            <Link href="/register" className="text-primary hover:underline">
              ثبت‌نام کنید
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
