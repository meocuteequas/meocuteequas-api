export interface Article {
  id: string;
  title: string;
  content: string;
  language: 'en' | 'vi';
  created_at: Date;
  updated_at: Date;
}
