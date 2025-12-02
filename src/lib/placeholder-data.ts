import type { LucideIcon } from 'lucide-react';
import { Heart, BookOpen, BrainCircuit, Briefcase, GraduationCap, Dices } from 'lucide-react';

export type Book = {
  id: number;
  title: string;
  author: string;
  price: string;
  coverImageId: string;
  category: string;
};

export type LibraryItem = {
    id: number;
    title: string;
    author: string;
    coverImageId: string;
    progress: number; 
    type: 'ebook' | 'audiobook';
    category: string;
    duration?: string;
};


export type Category = {
  name: string;
  icon: LucideIcon;
};

export const popularAudiobooks: (Book & { duration: string })[] = [
  { id: 1, title: 'ذهن دیجیتال', author: 'آروین اش', price: '$۱۹.۹۹', coverImageId: 'audiobook-1', category: 'علمی-تخیلی', duration: '۷ ساعت و ۲۳ دقیقه' },
  { id: 2, title: 'پژواک‌های کوانتومی', author: 'اوا رستوا', price: '$۲۴.۹۹', coverImageId: 'audiobook-2', category: 'علمی-تخیلی', duration: '۹ ساعت و ۱۱ دقیقه' },
  { id: 3, title: 'سایبریا', author: 'کنجی تاناکا', price: '$۱۴.۹۹', coverImageId: 'audiobook-3', category: 'علمی-تخیلی', duration: '۵ ساعت و ۱۲ دقیقه' },
  { id: 4, title: 'نقطه صفر', author: 'لیلا چن', price: '$۲۹.۹۹', coverImageId: 'audiobook-4', category: 'علمی-تخیلی', duration: '۱۱ ساعت و ۲ دقیقه' },
  { id: 5, title: 'رویاهای مصنوعی', author: 'مارکوس ونس', price: '$۲۲.۵۰', coverImageId: 'audiobook-5', category: 'علمی-تخیلی', duration: '۹ ساعت و ۴۵ دقیقه' },
  { id: 6, title: 'معماری حافظه', author: 'ایلای ونس', price: '$۱۹.۹۹', coverImageId: 'audiobook-6', category: 'علمی-تخیلی', duration: '۸ ساعت و ۳ دقیقه' },
  { id: 7, title: 'شبکه زمزمه', author: 'سوفیا لیند', price: '$۲۴.۹۹', coverImageId: 'audiobook-7', category: 'علمی-تخیلی', duration: '۱۰ ساعت و ۱ دقیقه' },
  { id: 8, title: 'افق رویداد', author: 'کالب ریس', price: '$۱۴.۹۹', coverImageId: 'audiobook-8', category: 'علمی-تخیلی', duration: '۶ ساعت و ۵۵ دقیقه' },
  { id: 9, title: 'پارادوکس سازنده', author: 'نورا جونز', price: '$۲۹.۹۹', coverImageId: 'audiobook-9', category: 'علمی-تخیلی', duration: '۱۲ ساعت و ۱۵ دقیقه' },
  { id: 10, title: 'شهر شیشه‌ای', author: 'دیوید چن', price: '$۲۲.۵۰', coverImageId: 'audiobook-10', category: 'علمی-تخیلی', duration: '۷ ساعت و ۵۰ دقیقه' },
  { id: 11, title: 'The Silent Patient', author: 'Alex Michaelides', price: '$18.00', coverImageId: 'scroll-11', category: 'معمایی', duration: '۸ ساعت و ۴۸ دقیقه' },
  { id: 12, title: 'Project Hail Mary', author: 'Andy Weir', price: '$20.00', coverImageId: 'scroll-12', category: 'علمی-تخیلی', duration: '۱۶ ساعت و ۱۰ دقیقه' },
];

export const latestEbooks: Book[] = [
  { id: 101, title: 'شکاف کرونوس', author: 'جولیان ورس', price: '$۹.۹۹', coverImageId: 'ebook-1', category: 'علمی-تخیلی' },
  { id: 102, title: 'شهر نئونی', author: 'الکس دریک', price: '$۱۲.۹۹', coverImageId: 'ebook-2', category: 'سایبرپانک' },
  { id: 103, title: 'آخرین سوال', author: 'ایزاک آسیموف', price: '$۷.۹۹', coverImageId: 'ebook-3', category: 'کلاسیک' },
  { id: 104, title: 'پروژه هیل مری', author: 'اندی ویر', price: '$۱۵.۰۰', coverImageId: 'ebook-4', category: 'علمی-تخیلی' },
  { id: 105, title: 'جنگل اسرار', author: 'الارا ونس', price: '$۸.۵۰', coverImageId: 'ebook-5', category: 'فانتزی' },
  { id: 106, title: 'بیمار خاموش', author: 'الکس مایکلیدیس', price: '$۱۱.۲۵', coverImageId: 'ebook-6', category: 'معمایی' },
  { id: 107, title: 'اوردرایو استارلایت', author: 'زین هریس', price: '$۱۰.۹۹', coverImageId: 'ebook-7', category: 'فضایی' },
  { id: 108, 'title': 'ذهنیت رشد', author: 'کارول دوک', price: '$۱۴.۵۰', coverImageId: 'ebook-8', category: 'خودسازی' },
];

export const categories: Category[] = [
  { name: 'خودسازی', icon: Heart },
  { name: 'ادبیات', icon: BookOpen },
  { name: 'روانشناسی', icon: BrainCircuit },
  { name: 'عاشقانه', icon: Heart },
  { name: 'کسب و کار', icon: Briefcase },
  { name: 'آموزش', icon: GraduationCap },
];

export const myLibraryItems: LibraryItem[] = [
    { id: 104, title: 'پروژه هیل مری', author: 'اندی ویر', coverImageId: 'ebook-4', progress: 100, type: 'ebook', category: 'علمی-تخیلی' },
    { id: 1, title: 'ذهن دیجیتال', author: 'آروین اش', coverImageId: 'audiobook-1', progress: 30, type: 'audiobook', duration: '۷ ساعت و ۲۳ دقیقه', category: 'علمی-تخیلی' },
    { id: 108, title: 'ذهنیت رشد', author: 'کارول دوک', coverImageId: 'ebook-8', progress: 20, type: 'ebook', category: 'خودسازی' },
    { id: 3, title: 'سایبریا', author: 'کنجی تاناکا', coverImageId: 'audiobook-3', progress: 100, type: 'audiobook', duration: '۵ ساعت و ۱۲ دقیقه', category: 'علمی-تخیلی' },
    { id: 106, title: 'بیمار خاموش', author: 'الکس مایکلیدیس', coverImageId: 'ebook-6', progress: 0, type: 'ebook', category: 'معمایی' },
    { id: 5, title: 'رویاهای مصنوعی', author: 'مارکوس ونس', coverImageId: 'audiobook-5', progress: 0, type: 'audiobook', duration: '۹ ساعت و ۴۵ دقیقه', category: 'علمی-تخیلی' },
];
