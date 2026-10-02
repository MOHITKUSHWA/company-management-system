'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
export default function Home() {

  const router = useRouter();

  router.push("/auth/login");

  return null;

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Navbar */}
      <nav className="border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              P
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              ProManage
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button className="cursor-pointer" variant="ghost" onClick={() => router.push('/auth/login')}>Log in</Button>
            <Button className="cursor-pointer" onClick={() => router.push('/auth/register')}>Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground mb-6 leading-[1.1]">
              Manage teams <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">
                without the chaos.
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
              The all-in-one platform for modern companies to manage employees,
              assign projects, and track progress effortlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/register">
                <Button size="lg" className="h-12 px-8 text-base cursor-pointer">
                  Start for free <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 px-8 text-base cursor-pointer"
                >
                  Live Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Abstract Background Image */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none md:opacity-100 md:w-[60%] md:-right-20 md:top-0 mix-blend-multiply dark:mix-blend-lighten">
          <img
            src={'/assets/modern_abstract_saas_hero_background_with_geometric_shapes_and_soft_gradients.png'}
            alt="Abstract Geometry"
            className="object-cover w-full h-full mask-image-gradient"
            style={{
              maskImage: "linear-gradient(to left, black, transparent)",
            }}
          />
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-card p-8 rounded-2xl shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Company Control</h3>
              <p className="text-muted-foreground">
                Manage your entire workforce from a single dashboard. Create
                profiles, assign roles, and track performance.
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Project Management</h3>
              <p className="text-muted-foreground">
                Create projects, assign teams, and set deadlines. Keep everyone
                aligned and moving forward.
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-sm border">
              <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Employee Focus</h3>
              <p className="text-muted-foreground">
                Give your team a clear view of their tasks. No more confusion
                about what needs to be done next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted-foreground">
            © 2024 ProManage Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground">
              Terms
            </a>
            <a href="#" className="hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
