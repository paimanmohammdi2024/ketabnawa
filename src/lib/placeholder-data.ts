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
  { id: 11, title: 'The Silent Patient', author: 'Alex Michaelides', price: '$18.00', coverImageId: 'scroll-11' },
  { id: 12, title: 'Project Hail Mary', author: 'Andy Weir', price: '$20.00', coverImageId: 'scroll-12' },
];

export const latestEbooks: Book[] = [
  { id: 1, title: 'شکاف کرونوس', author: 'جولیان ورس', price: '$۹.۹۹', coverImageId: 'ebook-1' },
  { id: 2, title: 'شهر نئونی', author: 'الکس دریک', price: '$۱۲.۹۹', coverImageId: 'ebook-2' },
  { id: 3, title: 'آخرین سوال', author: 'ایزاک آسیموف', price: '$۷.۹۹', coverImageId: 'ebook-3' },
  { id: 4, title: 'پروژه هیل مری', author: 'اندی ویر', price: '$۱۵.۰۰', coverImageId: 'ebook-4' },
  { id: 5, title: 'جنگل اسرار', author: 'الارا ونس', price: '$۸.۵۰', coverImageId: 'ebook-5' },
  { id: 6, title: 'بیمار خاموش', author: 'الکس مایکلیدیس', price: '$۱۱.۲۵', coverImageId: 'ebook-6' },
  { id: 7, title: 'اوردرایو استارلایت', author: 'زین هریس', price: '$۱۰.۹۹', coverImageId: 'ebook-7' },
  { id: 8, 'title': 'ذهنیت رشد', author: 'کارول دوک', price: '$۱۴.۵۰', coverImageId: 'ebook-8' },
];

export const categories: Category[] = [
  { name: 'خودسازی', icon: Heart },
  { name: 'ادبیات', icon: BookOpen },
  { name: 'روانشناسی', icon: BrainCircuit },
  { name: 'عاشقانه', icon: Heart },
  { name: 'کسب و کار', icon: Briefcase },
  { name: 'آموزش', icon: GraduationCap },
];

export const scrollingBooks: Book[] = [
    { id: 1, title: 'Book Title 1', author: 'Author 1', price: '$9.99', coverImageId: 'scroll-1' },
    { id: 2, title: 'Book Title 2', author: 'Author 2', price: '$12.99', coverImageId: 'scroll-2' },
    { id: 3, title: 'Book Title 3', author: 'Author 3', price: '$7.99', coverImageId: 'scroll-3' },
    { id: 4, title: 'Book Title 4', author: 'Author 4', price: '$15.00', coverImageId: 'scroll-4' },
    { id: 5, title: 'Book Title 5', author: 'Author 5', price: '$8.50', coverImageId: 'scroll-5' },
    { id: 6, title: 'Book Title 6', author: 'Author 6', price: '$11.25', coverImageId: 'scroll-6' },
    { id: 7, title: 'Book Title 7', author: 'Author 7', price: '$10.99', coverImageId: 'scroll-7' },
    { id: 8, title: 'Book Title 8', author: 'Author 8', price: '$14.50', coverImageId: 'scroll-8' },
    { id: 9, title: 'Book Title 9', author: 'Author 9', price: '$19.99', coverImageId: 'scroll-9' },
    { id: 10, title: 'Book Title 10', author: 'Author 10', price: '$22.50', coverImageId: 'scroll-10' },
    { id: 11, title: 'Book Title 11', author: 'Author 11', price: '$18.00', coverImageId: 'scroll-11' },
    { id: 12, title: 'Book Title 12', author: 'Author 12', price: '$20.00', coverImageId: 'scroll-12' },
    { id: 13, title: 'Book Title 13', author: 'Author 13', price: '$9.99', coverImageId: 'scroll-13' },
    { id: 14, title: 'Book Title 14', author: 'Author 14', price: '$12.99', coverImageId: 'scroll-14' },
];
