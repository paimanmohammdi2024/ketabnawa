import type { LucideIcon } from 'lucide-react';
import { Heart, BookOpen, BrainCircuit, Briefcase, GraduationCap, Dices } from 'lucide-react';

export type Book = {
  id: number;
  title: string;
  author: string;
  price: string;
  coverImageId: string;
};

export type Category = {
  name: string;
  icon: LucideIcon;
};

export const popularAudiobooks: Book[] = [
  { id: 1, title: 'ذهن دیجیتال', author: 'آروین اش', price: '$۱۹.۹۹', coverImageId: 'audiobook-1' },
  { id: 2, title: 'پژواک‌های کوانتومی', author: 'اوا رستوا', price: '$۲۴.۹۹', coverImageId: 'audiobook-2' },
  { id: 3, title: 'سایبریا', author: 'کنجی تاناکا', price: '$۱۴.۹۹', coverImageId: 'audiobook-3' },
  { id: 4, title: 'نقطه صفر', author: 'لیلا چن', price: '$۲۹.۹۹', coverImageId: 'audiobook-4' },
  { id: 5, title: 'رویاهای مصنوعی', author: 'مارکوس ونس', price: '$۲۲.۵۰', coverImageId: 'audiobook-5' },
  { id: 6, title: 'معماری حافظه', author: 'ایلای ونس', price: '$۱۹.۹۹', coverImageId: 'audiobook-6' },
  { id: 7, title: 'شبکه زمزمه', author: 'سوفیا لیند', price: '$۲۴.۹۹', coverImageId: 'audiobook-7' },
  { id: 8, title: 'افق رویداد', author: 'کالب ریس', price: '$۱۴.۹۹', coverImageId: 'audiobook-8' },
  { id: 9, title: 'پارادوکس سازنده', author: 'نورا جونز', price: '$۲۹.۹۹', coverImageId: 'audiobook-9' },
  { id: 10, title: 'شهر شیشه‌ای', author: 'دیوید چن', price: '$۲۲.۵۰', coverImageId: 'audiobook-10' },
];

export const latestEbooks: Book[] = [
  { id: 1, title: 'شکاف کرونوس', author: 'جولیان ورس', price: '$۹.۹۹', coverImageId: 'ebook-1' },
  { id: 2, title: 'شهر نئونی', author: 'الکس دریک', price: '$۱۲.۹۹', coverImageId: 'ebook-2' },
  { id: 3, title: 'آخرین سوال', author: 'ایزاک آسیموف', price: '$۷.۹۹', coverImageId: 'ebook-3' },
  { id: 4, title: 'پروژه هیل مری', author: 'اندی ویر', price: '$۱۵.۰۰', coverImageId: 'ebook-4' },
  { id: 5, title: 'جنگل اسرار', author: 'الارا ونس', price: '$۸.۵۰', coverImageId: 'ebook-5' },
  { id: 6, title: 'بیمار خاموش', author: 'الکس مایکلیدیس', price: '$۱۱.۲۵', coverImageId: 'ebook-6' },
  { id: 7, title: 'اوردرایو استارلایت', author: 'زین هریس', price: '$۱۰.۹۹', coverImageId: 'ebook-7' },
  { id: 8, title: 'ذهنیت رشد', author: 'کارول دوک', price: '$۱۴.۵۰', coverImageId: 'ebook-8' },
];

export const categories: Category[] = [
  { name: 'خودسازی', icon: Heart },
  { name: 'ادبیات', icon: BookOpen },
  { name: 'روانشناسی', icon: BrainCircuit },
  { name: 'عاشقانه', icon: Heart },
  { name: 'کسب و کار', icon: Briefcase },
  { name: 'آموزش', icon: GraduationCap },
];
