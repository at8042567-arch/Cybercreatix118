import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileNav from "@/components/MobileNav";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useProduct } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, CheckCircle, Copy, Upload, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PAYMENT_NUMBER = "+92 3234459971";

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product");
  const { data: product, isLoading } = useProduct(productId || undefined);
  const { toast } = useToast();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    paymentMethod: "",
    transactionId: "",
    amountPaid: "",
    orderNotes: "",
  });

  // Update amount when product loads
  useState(() => {
    if (product?.price) {
      setFormData(prev => ({ ...prev, amountPaid: product.price.toString() }));
    }
  });

  const formatPrice = (price: number) => {
    return `PKR ${price.toLocaleString()}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Number copied to clipboard",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.paymentMethod || !formData.transactionId || !formData.amountPaid) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    // Show success state
    setIsSubmitted(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
        <MobileNav />
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background pb-16 md:pb-0">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 animate-pulse-glow">
              <CheckCircle className="h-10 w-10 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold mb-4">
              Payment Request <span className="text-gradient">Submitted!</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-8">
              Your payment confirmation request has been sent. You will receive your digital product within 24 hours after verification.
            </p>
            <div className="rounded-xl border border-border/50 bg-card/50 p-6 mb-8 text-left">
              <h3 className="font-semibold mb-4">Order Summary:</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Product:</span>
                  <span className="text-foreground">{product?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount:</span>
                  <span className="text-foreground">{formatPrice(Number(formData.amountPaid))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="text-foreground capitalize">{formData.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span>Transaction ID:</span>
                  <span className="text-foreground">{formData.transactionId}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
              <WhatsAppButton productName={product?.name || "my order"} />
            </div>
          </div>
        </main>
        <Footer />
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link
          to={product ? `/product/${product.id}` : "/products"}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Payment Instructions */}
          <div>
            <h1 className="font-display text-3xl font-bold mb-6">
              Manual <span className="text-gradient">Payment</span>
            </h1>

            {/* Payment Number - Shows when payment method selected */}
            {formData.paymentMethod && (
              <div className="rounded-xl border-2 border-primary/50 bg-primary/5 p-6 mb-6 animate-in fade-in slide-in-from-top-2">
                <h3 className="font-display font-semibold mb-2 text-primary">
                  Send Payment To:
                </h3>
                <div className="flex items-center justify-between p-4 rounded-lg bg-card/80 border border-border/50">
                  <div>
                    <span className="text-sm text-muted-foreground capitalize">{formData.paymentMethod}</span>
                    <p className="font-mono text-xl font-bold text-foreground">{PAYMENT_NUMBER}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(PAYMENT_NUMBER)}
                    className="shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-3">
                  After sending payment, enter your transaction details below.
                </p>
              </div>
            )}

            {/* Payment Instructions */}
            <div className="rounded-xl border border-border/50 bg-card/50 p-6 mb-6">
              <h3 className="font-display font-semibold mb-4">Payment Instructions</h3>
              <p className="text-muted-foreground mb-4">
                1. Select your payment method below<br />
                2. Send payment to the number shown<br />
                3. Enter your transaction details<br />
                4. Submit and wait for confirmation
              </p>
              
              <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                <span className="text-sm text-muted-foreground">Payment Number (EasyPaisa / JazzCash)</span>
                <p className="font-mono font-bold text-lg">{PAYMENT_NUMBER}</p>
              </div>
            </div>

            {/* WhatsApp Option */}
            <div className="rounded-xl border border-border/50 bg-card/50 p-6">
              <h3 className="font-display font-semibold mb-2">Need Help?</h3>
              <p className="text-muted-foreground mb-4">
                You can also place your order directly via WhatsApp for faster processing.
              </p>
              <WhatsAppButton productName={product?.name || "a product"} />
            </div>
          </div>

          {/* Checkout Form */}
          <div>
            <div className="rounded-xl border border-border/50 bg-card/50 p-6">
              {/* Product Summary */}
              {product && (
                <div className="mb-6 pb-6 border-b border-border/50">
                  <h3 className="font-display font-semibold mb-4">Order Summary</h3>
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="font-display text-2xl font-bold text-primary/50">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{product.name}</h4>
                      <p className="text-sm text-muted-foreground capitalize">
                        {product.category.replace("-", " ")}
                      </p>
                    </div>
                    <span className="font-display font-bold text-gradient">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="font-display font-semibold">Your Details</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="bg-muted/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-muted/50"
                      required
                    />
                  </div>
                </div>

                <h3 className="font-display font-semibold pt-4">Payment Details</h3>

                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Payment Method *</Label>
                  <Select
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                  >
                    <SelectTrigger className="bg-muted/50">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easypaisa">EasyPaisa</SelectItem>
                      <SelectItem value="jazzcash">JazzCash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transactionId">Transaction ID *</Label>
                    <Input
                      id="transactionId"
                      placeholder="Enter transaction ID"
                      value={formData.transactionId}
                      onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                      className="bg-muted/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amountPaid">Amount Paid (PKR) *</Label>
                    <Input
                      id="amountPaid"
                      type="number"
                      placeholder="Enter amount"
                      value={formData.amountPaid || product?.price || ""}
                      onChange={(e) => setFormData({ ...formData, amountPaid: e.target.value })}
                      className="bg-muted/50"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="receipt">Upload Receipt (Optional)</Label>
                  <div className="flex items-center justify-center w-full">
                    <label
                      htmlFor="receipt"
                      className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-border/50 rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="h-6 w-6 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Click to upload receipt</p>
                      </div>
                      <input id="receipt" type="file" className="hidden" accept="image/*" />
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="orderNotes">Order Notes (Optional)</Label>
                  <Textarea
                    id="orderNotes"
                    placeholder="Any additional notes..."
                    value={formData.orderNotes}
                    onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                    className="bg-muted/50 min-h-[100px]"
                  />
                </div>

                <Button type="submit" variant="neon" size="xl" className="w-full">
                  Submit Payment Confirmation
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
};

export default Checkout;
