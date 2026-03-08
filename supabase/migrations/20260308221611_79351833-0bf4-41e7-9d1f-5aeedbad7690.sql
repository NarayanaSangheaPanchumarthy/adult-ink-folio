
-- Articles table for all content types
CREATE TABLE public.articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL CHECK (category IN ('books', 'news', 'articles', 'journals', 'stories', 'celebrities')),
  source TEXT NOT NULL DEFAULT 'ai' CHECK (source IN ('ai', 'user', 'scraped', 'news_api')),
  read_time TEXT NOT NULL DEFAULT '5 min',
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  image_url TEXT,
  external_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Everyone can read published articles
CREATE POLICY "Anyone can read published articles"
  ON public.articles FOR SELECT
  USING (is_published = true);

-- Authenticated users can insert their own articles
CREATE POLICY "Authenticated users can submit articles"
  ON public.articles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own articles
CREATE POLICY "Users can update own articles"
  ON public.articles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Users can delete their own articles
CREATE POLICY "Users can delete own articles"
  ON public.articles FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Service role policy for AI/scraped content (no user_id)
CREATE POLICY "Service role can manage all articles"
  ON public.articles FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Trigger for updated_at
CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.articles;
