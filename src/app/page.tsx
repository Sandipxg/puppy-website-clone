import { Hero } from "@/components/home/Hero";
import { MeetThePups } from "@/components/home/MeetThePups";
import { TwoWays } from "@/components/home/TwoWays";

/** One long day in Dubai: morning hero → golden hour → dusk → a starry porch. */
export default function HomePage() {
  return (
    <div className="tp-page">
      <Hero />
      <MeetThePups />
      <TwoWays />
    </div>
  );
}
