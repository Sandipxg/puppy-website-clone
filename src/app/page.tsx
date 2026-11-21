import { Families } from "@/components/home/Families";
import { Hero } from "@/components/home/Hero";
import { Journey } from "@/components/home/Journey";
import { MeetThePups } from "@/components/home/MeetThePups";
import { Night } from "@/components/home/Night";
import { Passport } from "@/components/home/Passport";
import { Porch } from "@/components/home/Porch";
import { TwoWays } from "@/components/home/TwoWays";

/** One long day in Dubai: morning hero → golden hour → dusk → a starry porch. */
export default function HomePage() {
  return (
    <div className="tp-page">
      <Hero />
      <MeetThePups />
      <TwoWays />
      <Journey />
      <Passport />
      <Families />
      <Night />
      <Porch />
    </div>
  );
}
