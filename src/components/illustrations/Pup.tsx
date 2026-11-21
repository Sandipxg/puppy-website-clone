/**
 * Teddy, the TeddyPups mascot.
 *
 * One SVG rig (legs, tail, body, haunch, head, ears, face) posed by a small
 * table of transforms. Every pose shares the same parts, so animating between
 * poses is just interpolating these numbers.
 */

export type PupPose = "peek" | "walk" | "sit" | "bow" | "snug" | "sniff";

export type PoseSpec = {
  shadow: number;
  body: { y: number; rotate: number; opacity: number };
  backLegs: number; // opacity of bf + bn
  front: [number, number]; // ff, fn rotation
  tail: number;
  haunch: { y: number; opacity: number };
  head: { x: number; y: number; rotate: number };
  ears: [number, number];
  /** 0 = eyes open, 1 = happy squint */
  happy: number;
  tongue: number;
  ledge: number;
};

export const POSES: Record<PupPose, PoseSpec> = {
  peek: {
    shadow: 0,
    body: { y: 0, rotate: 0, opacity: 0 },
    backLegs: 1,
    front: [0, 0],
    tail: -20,
    haunch: { y: 0, opacity: 0 },
    head: { x: 0, y: 4, rotate: 0 },
    ears: [-6, 6],
    happy: 0,
    tongue: 1,
    ledge: 1,
  },
  walk: {
    shadow: 0.12,
    body: { y: 0, rotate: 0, opacity: 1 },
    backLegs: 1,
    front: [0, 0],
    tail: -6,
    haunch: { y: 0, opacity: 0 },
    head: { x: 0, y: 0, rotate: 0 },
    ears: [0, 0],
    happy: 0,
    tongue: 1,
    ledge: 0,
  },
  sit: {
    shadow: 0.12,
    body: { y: -2, rotate: -24, opacity: 1 },
    backLegs: 0,
    front: [24, 24],
    tail: 34,
    haunch: { y: 1.44, opacity: 1 },
    head: { x: -10, y: -6, rotate: 0 },
    ears: [0, 0],
    happy: 0,
    tongue: 1,
    ledge: 0,
  },
  bow: {
    shadow: 0.12,
    body: { y: 2, rotate: 15, opacity: 1 },
    backLegs: 1,
    front: [-67, -73],
    tail: -32,
    haunch: { y: -0.9, opacity: 0 },
    head: { x: 14, y: 30, rotate: 0 },
    ears: [0, 0],
    happy: 1,
    tongue: 1,
    ledge: 0,
  },
  sniff: {
    shadow: 0.12,
    body: { y: 0, rotate: 7, opacity: 1 },
    backLegs: 1,
    front: [0, 0],
    tail: -6,
    haunch: { y: 0, opacity: 0 },
    head: { x: 16, y: 32, rotate: 9 },
    ears: [0, 0],
    happy: 0,
    tongue: 1,
    ledge: 0,
  },
  snug: {
    shadow: 0,
    body: { y: 0, rotate: 0, opacity: 0 },
    backLegs: 1,
    front: [0, 0],
    tail: -20,
    haunch: { y: 0, opacity: 0 },
    head: { x: 0, y: 9, rotate: 4 },
    ears: [3, -3],
    happy: 0,
    tongue: 0,
    ledge: 1,
  },
};

const INK = "#2a170e";
const FUR = "#f2be6b";
const FUR_DARK = "#e4a352";
const CREAM = "#fbe3b4";

const stroke = { stroke: INK, strokeWidth: 3.4, strokeLinejoin: "round", strokeLinecap: "round" } as const;
const thin = { stroke: INK, strokeWidth: 2.4, strokeLinejoin: "round", strokeLinecap: "round", fill: "none" } as const;

function Leg({ x, y, rotate = 0, opacity, fill, top, foot }: {
  x: number;
  y: number;
  rotate?: number;
  opacity?: number;
  fill: string;
  top: number; // half-width at the hip
  foot: 25 | 27;
}) {
  const end = foot === 27 ? [18, 27, 34, 36, 33] : [16, 25, 32, 34, 31];
  const [mid, toe, sole, base, heel] = end;
  const d = `M-${top} -14 C-${top} 4 -12 ${mid} -12 ${toe} C-12 ${sole} -7 ${base} 0 ${base} C9 ${base} 13 ${heel} 13 ${toe} C13 ${mid} ${top} 4 ${top} -14`;
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} opacity={opacity}>
      <path d={`${d}Z`} fill={fill} />
      <path d={d} {...stroke} fill="none" />
      <path d={`M-3.5 ${foot + 2} v5 M4.5 ${foot + 2} v5`} {...thin} />
    </g>
  );
}

export function Pup({
  pose = "sit",
  spec,
  label,
  facing = "right",
}: {
  pose?: PupPose;
  /** An explicit (e.g. interpolated) pose; overrides `pose`. */
  spec?: PoseSpec;
  label?: string;
  facing?: "left" | "right";
}) {
  const p = spec ?? POSES[pose];
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true as const };
  return (
    <svg viewBox="0 0 300 240" focusable="false" style={{ overflow: "visible" }} {...a11y}>
      <g data-p="root" transform={facing === "left" ? "translate(300 0) scale(-1 1)" : undefined}>
        <ellipse data-p="shadow" cx="150" cy="230" rx="92" ry="7" fill={INK} opacity={p.shadow} />
        <g
          data-p="body"
          transform={`translate(0 ${p.body.y}) rotate(${p.body.rotate} 196 206)`}
          opacity={p.body.opacity}
        >
          {/* far legs (front leg on the far side is a touch narrower) */}
          <g data-p="bf"><Leg x={94} y={192} fill={FUR_DARK} top={14} foot={27} opacity={p.backLegs} /></g>
          <g data-p="ff">
            <g transform={`translate(168 192) rotate(${p.front[0]})`}>
              <path d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14Z" fill={FUR_DARK} />
              <path d="M-11 -14 C-11 4 -12 18 -12 27 C-12 34 -7 36 0 36 C9 36 13 33 13 27 C13 18 11 4 11 -14" {...stroke} fill="none" />
              <path d="M-3.5 29 v5 M4.5 29 v5" {...thin} />
            </g>
          </g>
          <g data-p="tail" transform={`rotate(${p.tail} 84 150)`}>
            <path d="M86 152 C80 146 76 140 74 136" {...stroke} strokeWidth={9} fill="none" />
            <path d="M86 152 C80 146 76 140 74 136" stroke={FUR} strokeWidth={4} fill="none" strokeLinecap="round" />
            <path
              d="M70.0 110.0Q78.1 105.0 80.9 113.7Q90.5 114.8 86.7 123.2Q93.4 129.9 84.7 134.0Q85.2 143.1 75.8 141.0Q70.0 148.3 64.2 141.0Q54.8 143.1 55.3 134.0Q46.6 129.9 53.3 123.2Q49.5 114.8 59.1 113.7Q61.9 105.0 70.0 110.0Z"
              fill={FUR}
              {...stroke}
            />
          </g>
          <g data-p="bn"><Leg x={110} y={194} fill={FUR} top={15} foot={25} opacity={p.backLegs} /></g>
          <path
            d="M76.8 175.6Q69.0 167.9 78.2 160.7Q76.6 151.8 90.3 147.3Q95.2 138.9 110.9 137.9Q121.6 131.3 136.7 134.0Q151.1 130.5 162.9 136.4Q178.7 136.4 185.3 144.5Q199.7 148.2 199.7 157.1Q210.3 163.7 203.9 171.9Q208.7 180.4 197.0 186.3Q195.3 195.2 180.3 198.0Q172.3 205.7 156.6 204.8Q143.7 210.0 130.0 205.6Q114.5 207.4 105.1 200.2Q89.7 198.3 86.3 189.6Q73.6 184.3 76.8 175.6Z"
            fill={FUR}
            {...stroke}
          />
          <path
            d="M182.7 196.4Q169.4 196.9 166.6 183.0Q156.1 174.1 162.3 161.5Q159.6 147.6 171.9 142.2Q178.2 129.7 191.0 134.0Q203.3 128.7 210.5 140.8Q223.1 145.2 221.3 159.3Q228.4 171.5 218.5 181.0Q216.6 195.1 203.2 195.7Q193.3 205.1 182.7 196.4Z"
            fill={FUR}
            {...stroke}
          />
          <g data-p="fn">
            <g transform={`translate(186 194) rotate(${p.front[1]})`}>
              <path d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14Z" fill={FUR} />
              <path d="M-12 -14 C-12 4 -12 16 -12 25 C-12 32 -7 34 0 34 C9 34 13 31 13 25 C13 16 12 4 12 -14" {...stroke} fill="none" />
              <path d="M-3.5 27 v5 M4.5 27 v5" {...thin} />
            </g>
          </g>
        </g>

        <g data-p="haunch" opacity={p.haunch.opacity} transform={`translate(0 ${p.haunch.y})`}>
          <path
            d="M80.0 204.0Q75.1 194.9 85.7 189.9Q88.4 180.2 100.7 181.2Q110.0 174.6 119.3 181.2Q131.6 180.2 134.3 189.9Q144.9 194.9 140.0 204.0Q144.9 213.1 134.3 218.1Q131.6 227.8 119.3 226.8Q110.0 233.4 100.7 226.8Q88.4 227.8 85.7 218.1Q75.1 213.1 80.0 204.0Z"
            fill={FUR}
            {...stroke}
          />
          <path
            d="M112 214 C126 212 142 214 146 221 C148 226 144 229 136 229 L116 229 C108 229 104 224 106 219 Z"
            fill={FUR}
            {...stroke}
          />
          <path d="M132 222v5M139 222v5" {...thin} />
        </g>

        <g data-p="head" transform={`translate(${p.head.x} ${p.head.y}) rotate(${p.head.rotate} 212 100)`}>
          {/* collar + heart tag */}
          <path d="M178 146 Q212 162 246 146 L246 154 Q212 170 178 154 Z" fill="#a24a1a" {...stroke} strokeWidth={3} />
          <path
            d="M212 160 C212 156 206 155 206 159.4 C206 163 212 166.6 212 168.4 C212 166.6 218 163 218 159.4 C218 155 212 156 212 160 Z"
            fill={CREAM}
            {...stroke}
            strokeWidth={2.4}
          />
          <path
            data-p="earL"
            d="M177.1 78.7Q186.9 70.8 186.6 87.4Q196.0 89.9 189.9 105.5Q195.2 117.3 185.5 126.0Q184.7 142.8 175.2 141.2Q168.7 156.5 162.9 145.3Q153.1 153.2 153.4 136.6Q144.0 134.1 150.1 118.5Q144.8 106.7 154.5 98.0Q155.3 81.2 164.8 82.8Q171.3 67.5 177.1 78.7Z"
            fill={FUR_DARK}
            {...stroke}
            transform={`rotate(${p.ears[0]} 174 82)`}
          />
          <path
            data-p="earR"
            d="M246.9 78.7Q252.7 67.5 259.2 82.8Q268.7 81.2 269.5 98.0Q279.2 106.7 273.9 118.5Q280.0 134.1 270.6 136.6Q270.9 153.2 261.1 145.3Q255.3 156.5 248.8 141.2Q239.3 142.8 238.5 126.0Q228.8 117.3 234.1 105.5Q228.0 89.9 237.4 87.4Q237.1 70.8 246.9 78.7Z"
            fill={FUR_DARK}
            {...stroke}
            transform={`rotate(${p.ears[1]} 250 82)`}
          />
          <path
            d="M212.0 54.0Q223.4 48.2 231.5 57.5Q244.5 56.1 248.1 67.5Q260.7 70.7 259.1 82.4Q269.4 89.7 263.0 100.0Q269.4 110.3 259.1 117.6Q260.7 129.3 248.1 132.5Q244.5 143.9 231.5 142.5Q223.4 151.8 212.0 146.0Q200.6 151.8 192.5 142.5Q179.5 143.9 175.9 132.5Q163.3 129.3 164.9 117.6Q154.6 110.3 161.0 100.0Q154.6 89.7 164.9 82.4Q163.3 70.7 175.9 67.5Q179.5 56.1 192.5 57.5Q200.6 48.2 212.0 54.0Z"
            fill={FUR}
            {...stroke}
          />
          <path
            d="M195.0 52.0Q190.7 45.8 200.0 43.5Q203.2 36.9 212.0 40.0Q220.8 36.9 224.0 43.5Q233.3 45.8 229.0 52.0Q233.3 58.2 224.0 60.5Q220.8 67.1 212.0 64.0Q203.2 67.1 200.0 60.5Q190.7 58.2 195.0 52.0Z"
            fill={FUR}
            {...stroke}
            strokeWidth={3}
          />
          <path d="M188 120 C188 106 200 100 212 100 C224 100 236 106 236 120 C236 133 225 140 212 140 C199 140 188 133 188 120 Z" fill={CREAM} />
          <circle cx="181" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
          <circle cx="243" cy="116" r="7" fill="#f9b9a6" opacity="0.85" />
          <g data-p="eyes">
            <g data-p="open" opacity={1 - p.happy}>
              <g data-p="blink">
                <ellipse cx="194" cy="98" rx="7.4" ry="8.6" fill={INK} />
                <ellipse cx="230" cy="98" rx="7.4" ry="8.6" fill={INK} />
                <circle cx="196.6" cy="94.6" r="2.7" fill="#fff" />
                <circle cx="232.6" cy="94.6" r="2.7" fill="#fff" />
                <circle cx="192" cy="101.2" r="1.2" fill="#fff" />
                <circle cx="228" cy="101.2" r="1.2" fill="#fff" />
              </g>
            </g>
          </g>
          <path
            data-p="happy"
            d="M186.5 101 Q194 91.5 201.5 101 M222.5 101 Q230 91.5 237.5 101"
            {...stroke}
            fill="none"
            opacity={p.happy}
          />
          <path data-p="shut" d="M186.5 97 Q194 103.5 201.5 97 M222.5 97 Q230 103.5 237.5 97" {...stroke} fill="none" opacity={0} />
          <path d="M204.5 111.5 Q212 107.2 219.5 111.5 Q218.2 118.4 212 120 Q205.8 118.4 204.5 111.5 Z" fill={INK} />
          <path
            d="M212 120 V124.5 M212 124.5 Q207.2 129.6 202.8 125.2 M212 124.5 Q216.8 129.6 221.2 125.2"
            {...stroke}
            strokeWidth={3}
            fill="none"
          />
          <path
            data-p="tongue"
            d="M207.6 127.4 Q212 136.6 216.4 127.4 Z"
            fill="#e98c8c"
            stroke={INK}
            strokeWidth={2.2}
            strokeLinejoin="round"
            opacity={p.tongue}
          />
        </g>

        {/* paws resting on a ledge (quilt / basket rim) */}
        <g data-p="ledge" opacity={p.ledge}>
          <path
            d="M175 159 C175 148 181 142 190 142 C199 142 205 148 205 159 Z M219 159 C219 148 225 142 234 142 C243 142 249 148 249 159 Z"
            fill={FUR}
            {...stroke}
          />
          <path d="M186 153 v-4.5 M194 153 v-4.5 M230 153 v-4.5 M238 153 v-4.5" {...thin} />
        </g>
      </g>
    </svg>
  );
}

/** A posed Teddy placed in the layout ("stop"), with its speech bubble slot. */
export function PupStop({
  pose,
  className,
  label,
  act,
  lane,
  behind,
}: {
  pose: PupPose;
  className?: string;
  label?: string;
  act?: string;
  lane?: boolean;
  behind?: boolean;
}) {
  return (
    <div
      data-pup-stop="true"
      data-pose={pose}
      data-facing="right"
      data-act={act}
      data-lane={lane ? "true" : undefined}
      data-behind={behind ? "true" : undefined}
      className={`pup-stop ${className ?? ""}`}
    >
      <div className="pup-buddy" data-facing="right">
        <Pup pose={pose} label={label} />
        <span aria-hidden="true" className="pup-bubble" data-show="false" />
      </div>
    </div>
  );
}

/** Teddy without a layout "stop" — for cards, booths and tags. */
export function PupBuddy({
  pose,
  className,
  label,
  facing = "right",
}: {
  pose: PupPose;
  className?: string;
  label?: string;
  facing?: "left" | "right";
}) {
  return (
    <div className={`pup-buddy ${className ?? ""}`} data-facing={facing}>
      <Pup pose={pose} label={label} facing={facing} />
      <span aria-hidden="true" className="pup-bubble" data-show="false" />
    </div>
  );
}

const mix = (a: number, b: number, t: number) => a + (b - a) * t;

/** Blend two poses (t = 0 → a, t = 1 → b). */
export function lerpPose(a: PoseSpec, b: PoseSpec, t: number): PoseSpec {
  return {
    shadow: mix(a.shadow, b.shadow, t),
    body: { y: mix(a.body.y, b.body.y, t), rotate: mix(a.body.rotate, b.body.rotate, t), opacity: mix(a.body.opacity, b.body.opacity, t) },
    backLegs: mix(a.backLegs, b.backLegs, t),
    front: [mix(a.front[0], b.front[0], t), mix(a.front[1], b.front[1], t)],
    tail: mix(a.tail, b.tail, t),
    haunch: { y: mix(a.haunch.y, b.haunch.y, t), opacity: mix(a.haunch.opacity, b.haunch.opacity, t) },
    head: { x: mix(a.head.x, b.head.x, t), y: mix(a.head.y, b.head.y, t), rotate: mix(a.head.rotate, b.head.rotate, t) },
    ears: [mix(a.ears[0], b.ears[0], t), mix(a.ears[1], b.ears[1], t)],
    happy: mix(a.happy, b.happy, t),
    tongue: mix(a.tongue, b.tongue, t),
    ledge: mix(a.ledge, b.ledge, t),
  };
}
