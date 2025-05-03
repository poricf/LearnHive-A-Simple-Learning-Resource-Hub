export interface Resource {
  id: number;
  title: string;
  type_id: number;
  type: string;
  about: string;
  source: string;
  rating: number;
  ratingCount: number;
  category_id: number;
  category: string;
  subcategory: string;
  thumbnail: string;
  difficulty_id: number;
  difficulty: string;
  link: string;
  tags?: string[];
  bookmarked?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateResourceDTO {
  title: string;
  type_id: number;
  about: string;
  source: string;
  rating: number;
  ratingCount: number;
  category_id: number;
  thumbnail: string;
  difficulty_id: number;
  link: string;
}

export interface ResourceFilters {
  category?: number;
  type?: number;
} 