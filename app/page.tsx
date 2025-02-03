import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, List } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[85vh] bg-gradient-to-br flex flex-col from-background to-muted">
      <Navbar />
      
      {/* Hero Section */}
      <div className="container h-full m-auto ">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Task Management Made Simple
          </h1>
          <p className="text-muted-foreground text-xl sm:text-2xl leading-relaxed">
            Organize your tasks, boost productivity, and achieve your goals with our intuitive task management system.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/auth">Get Started <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <List className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Organize Tasks</h3>
            <p className="text-muted-foreground">
              Create, organize, and manage your tasks with our intuitive interface.
            </p>
          </div>
          <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
            <p className="text-muted-foreground">
              Monitor task progress and stay on top of deadlines effortlessly.
            </p>
          </div>
          <div className="bg-card p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Achieve Goals</h3>
            <p className="text-muted-foreground">
              Turn your goals into actionable tasks and track your success.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}