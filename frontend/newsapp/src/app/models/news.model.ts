export interface News {
  id: number;
  title: string;
  content: string;
  author?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateNews {
  title: string;
  author?: string;
  image_url?: string;
  content: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface CreateNewsDto {
  title: string;
  content: string;
  author: string;
  image_url: string | null;
  created_at?: Date;
  updated_at?: Date;
}