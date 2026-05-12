-- Testimonials table
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  quote text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  avatar_url text,
  display_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published testimonials"
  ON public.testimonials FOR SELECT
  USING (is_published = true);

CREATE POLICY "Admins can manage testimonials"
  ON public.testimonials FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON public.testimonials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trust partners table
CREATE TABLE public.trust_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  icon_name text NOT NULL DEFAULT 'Award',
  display_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.trust_partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active trust partners"
  ON public.trust_partners FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage trust partners"
  ON public.trust_partners FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_trust_partners_updated_at
  BEFORE UPDATE ON public.trust_partners
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed testimonials
INSERT INTO public.testimonials (name, title, quote, rating, display_order) VALUES
  ('Eleanor Vance', 'Editor-in-Chief, The Atelier', 'LuxeRead has replaced three of my subscriptions. The curation is impeccable and the typography alone is worth the price.', 5, 1),
  ('Marcus Holloway', 'Author & Literary Critic', 'Finally, a reading platform that respects long-form journalism. Every visit feels like stepping into a private library.', 5, 2),
  ('Priya Anand', 'Professor of Comparative Literature', 'The breadth across journals, fiction and biography is rare. I''ve discovered more great writers here in a month than all of last year.', 5, 3),
  ('James Okafor', 'Senior Strategist', 'A genuinely premium product. Real-time news that doesn''t feel like a doom-scroll, and book excerpts that hook you instantly.', 5, 4);

-- Seed trust partners
INSERT INTO public.trust_partners (name, icon_name, display_order) VALUES
  ('The Editorial Quarterly', 'Newspaper', 1),
  ('Literary Review', 'BookOpen', 2),
  ('Prestige Awards', 'Award', 3),
  ('Global Press', 'Globe', 4),
  ('Quill & Ink', 'Feather', 5),
  ('Royal Reads', 'Crown', 6);