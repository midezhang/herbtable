import { TopNav } from "@/components/TopNav";
import { Hero } from "@/components/Hero";
import { ConcernGrid } from "@/components/ConcernGrid";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <TopNav />
      <main className="flex-1">
        <Hero />
        <ConcernGrid />
      </main>
      <Footer />
    </>
  );
}