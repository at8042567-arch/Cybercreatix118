import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WhatsAppButtonProps {
  productName: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "xl" | "icon";
}

const WhatsAppButton = ({ productName, className, size = "lg" }: WhatsAppButtonProps) => {
  const phoneNumber = "966557677940";
  const message = encodeURIComponent(`I want to order: ${productName}`);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <Button
      variant="whatsapp"
      size={size}
      className={className}
      asChild
    >
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="h-5 w-5" />
        Order on WhatsApp
      </a>
    </Button>
  );
};

export default WhatsAppButton;
