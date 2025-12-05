import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/data/products";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data || []).map((p): Product => ({
        id: p.id,
        name: p.name,
        description: p.description || "",
        price: Number(p.price),
        original_price: p.original_price ? Number(p.original_price) : undefined,
        category: p.category,
        image: p.image || "/placeholder.svg",
        badge: p.badge || undefined,
        features: p.features || [],
        rating: Number(p.rating) || 5.0,
        reviews: p.reviews || 0,
      }));
    },
  });
};

export const useProduct = (id: string | undefined) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return {
        id: data.id,
        name: data.name,
        description: data.description || "",
        price: Number(data.price),
        original_price: data.original_price ? Number(data.original_price) : undefined,
        category: data.category,
        image: data.image || "/placeholder.svg",
        badge: data.badge || undefined,
        features: data.features || [],
        rating: Number(data.rating) || 5.0,
        reviews: data.reviews || 0,
      } as Product;
    },
    enabled: !!id,
  });
};
