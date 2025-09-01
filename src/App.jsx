// src/App.jsx
import './index.css';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ConciergeOverlay from './ConciergeOverlay';
import {
  Home,
  Bell,
  MessageSquare,
  MessageCircle,
  User,
  ChevronLeft,
  ChevronDown,
  Utensils,
  Martini,
  Coffee,
  Footprints,
  Sparkles,
  X,
  Calendar,
  CalendarMinus2,
  Settings,
  WandSparkles,
  ChartNetwork,
  CalendarDays,
  UsersRound,
  PersonStanding,
} from 'lucide-react';

/* =========================
   SVG ICONS (inline, currentColor)
   ========================= */
const DinnerSVG = (props) => (
  <Utensils size={28} strokeWidth={1.6} {...props} />
);
const DrinksSVG = (props) => <Martini size={28} strokeWidth={1.6} {...props} />;
const RunSVG = (props) => <Footprints size={28} strokeWidth={1.6} {...props} />;
const CoffeeSVG = (props) => <Coffee size={28} strokeWidth={1.6} {...props} />;
const StarSVG = (props) => <Sparkles size={28} strokeWidth={1.6} {...props} />;
const WandSVG = (props) => (
  <WandSparkles size={28} strokeWidth={1.6} {...props} />
);

// Put these near your other-icon helpers (top of file)
export const SparkleOutline = ({ className = '', ...rest }) => (
  <svg viewBox="0 0 24 24" className={className} {...rest}>
    {/* 4-point star (outline) */}
    <path
      d="M12 2 L14 9.5 L22 12 L14 14.5 L12 22 L10 14.5 L2 12 L10 9.5 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
  </svg>
);

export const SparkleFilled = ({ className = '', ...rest }) => (
  <svg viewBox="0 0 24 24" className={className} {...rest}>
    {/* 4-point star (filled) */}
    <path
      d="M12 2 L14 9.5 L22 12 L14 14.5 L12 22 L10 14.5 L2 12 L10 9.5 Z"
      fill="currentColor"
    />
  </svg>
);

/* =========================
   STOCK AVATARS
   ========================= */
// Small stock avatar set (round-friendly crops)
export const STOCK_AVATARS = [
  {
    name: 'Max',
    avatar:
      'https://substackcdn.com/image/fetch/$s_!hlpF!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F3e358cc4-da0c-4477-8eca-695d91c6ebc2_512x512.jpeg',
  },
  {
    name: 'Jasmine',
    avatar:
      'https://media.licdn.com/dms/image/v2/C5603AQHnGAepOOSNBw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1641949824070?e=1759363200&v=beta&t=J5uVXkfbTVfryZzCumh9pgQFE1mmr5fOGXKz05ISE80',
  },
  {
    name: 'Jack',
    avatar:
      'https://media.licdn.com/dms/image/v2/C5603AQELJvtGVn9u1A/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1556121480529?e=1759363200&v=beta&t=n1y3tFH8qJQYcaLXRXzy6ucfsSG_QPRGWb16Z_woJhY',
  },
  {
    name: 'Mia',
    avatar:
      'https://media.licdn.com/dms/image/v2/D4E03AQEE31vl8eJjyw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1669659989975?e=1759363200&v=beta&t=XItexq2JQwSDSXL8jrnclZEjy-VBnNhVewK7Mx08za8',
  },
  {
    name: 'Chase',
    avatar:
      'https://media.licdn.com/dms/image/v2/D4E03AQHeyg2hx9S7EQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1688682594042?e=1759363200&v=beta&t=SiVgW3gpwpXfeQd_QUzbkXaYUk5-51WEHLgD_zqMH6Y',
  },
  {
    name: 'Rue',
    avatar:
      'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?q=80&w=256&auto=format&fit=crop&crop=faces',
  },
  {
    name: 'Brian',
    avatar:
      'https://media.licdn.com/dms/image/v2/D4E03AQE9aSVopyqlww/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1689521780159?e=1759363200&v=beta&t=DeVeWP_YpIKir6Z2YVqlJ0Va-r98ztDl1dNsp8cWr5Q',
  },
  {
    name: 'June',
    avatar:
      'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=256&auto=format&fit=crop&crop=faces',
  },
  {
    name: 'Ira',
    avatar:
      'https://images.unsplash.com/photo-1544005314-94ddf0286df2?q=80&w=256&auto=format&fit=crop&crop=faces',
  },
  {
    name: 'Zoe',
    avatar:
      'https://media.licdn.com/dms/image/v2/D4E03AQF-jfVlUw6W2Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728661236107?e=1759363200&v=beta&t=4d-MkaOrV8I_7l8VWVbquewHNAdbnAlqLgmWBdIxfX4',
  },
  {
    name: 'Oliver',
    avatar:
      'https://media.licdn.com/dms/image/v2/C4E03AQEIP2z2Vltl_Q/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1538607446235?e=1759363200&v=beta&t=FYx66_WCHxrdrg_SaG0mezLcFSIoHtGWn8r7a02FcCk',
  },
  {
    name: 'Nia',
    avatar:
      'https://images.unsplash.com/photo-1524504388940-d8c2e04f1e9a?q=80&w=256&auto=format&fit=crop&crop=faces',
  },
];

export const SOCIAL_CLUB_PARTICIPANTS = [
  STOCK_AVATARS[0],
  STOCK_AVATARS[1],
  STOCK_AVATARS[2],
  STOCK_AVATARS[3],
  STOCK_AVATARS[4],
  STOCK_AVATARS[5],
  STOCK_AVATARS[6],
  STOCK_AVATARS[7],
  STOCK_AVATARS[8],
  STOCK_AVATARS[9],
  STOCK_AVATARS[10],
];

export const SOCIAL_CLUB_TAGS = [
  { label: 'Reggaeton & Dembow' },
  { label: 'Indie film' },
  { label: 'Salsa competitions' },
  { label: 'New languages' },
];

export const DINNER_PARTICIPANTS = [
  STOCK_AVATARS[0],
  STOCK_AVATARS[6],
  STOCK_AVATARS[4],
  STOCK_AVATARS[9],
  STOCK_AVATARS[10],
  STOCK_AVATARS[11],
];

export const DINNER_DOMAINS = [
  { label: 'All know & clicked with Isaure' },
  { label: '3 expat pairings' },
  { label: 'Love Ethiopian food' },
];

export const BREAKFAST_PARTICIPANTS = [STOCK_AVATARS[0], STOCK_AVATARS[6]];

export const BREAKFAST_DOMAINS = [
  { label: 'Asking strangers for weird things' },
  { label: 'Doing something for 1,000+ days in a row' },
];

/* =========================
   THEMES / COPY
   ========================= */
const inviteTheme = {
  'Dinner & Explore': {
    img: 'https://images.unsplash.com/photo-1562050344-f7ad946cee35?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // warm dinner
    Icon: DinnerSVG,
  },
  Drinks: {
    img: 'https://plus.unsplash.com/premium_photo-1723122130796-c789b419cb34?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // nightclub-y
    Icon: DrinksSVG,
  },
  Run: {
    img: 'https://plus.unsplash.com/premium_photo-1727443897436-c89c6c8a002d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // sunrise runner
    Icon: RunSVG,
  },
  Breakfast: {
    img: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNvZmZlZSUyMHNob3B8ZW58MHx8MHx8fDA%3D', // coffee
    Icon: CoffeeSVG,
    body: "We found someone we think you should meet — because you both can't seem to shake the what-ifs of your art.",
  },
  'Social Club': {
    img: 'https://images.unsplash.com/photo-1620680741198-837aae83d9b2?q=80&w=770&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // moody venue
    Icon: StarSVG,
    body: 'An eight-week series for salsa dreamers. Same 9-12 person group, new steps each week.',
  },
  CustomDinner: {
    img: 'https://images.unsplash.com/photo-1667256058569-ef0bb5140470?q=80&w=1118&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    Icon: WandSVG,
    body: "A table just opened up tonight. You'll find both familiar & new faces at dinner with you.",
  },
};

const classicInvites = [
  { day: 'Wednesday', emoji: '🍽️', title: 'Dinner & Explore', time: '7:00 PM' },
  { day: 'Thursday', emoji: '🍹', title: 'Drinks', time: '8:00 PM' },
  { day: 'Friday', emoji: '🍽️', title: 'Dinner & Explore', time: '7:00 PM' },
  { day: 'Saturday', emoji: '🏃', title: 'Run', time: '10:00 AM' },
];

const itineraryCopy = {
  'Dinner & Explore': {
    Wednesday: {
      title: 'Dinner & Game-Night',
      bullets: [
        "🍽️Table game: 'What are you building?'",
        '🎲Continue to a curated venue for a group game-night',
      ],
    },
    Friday: {
      title: 'Dinner & Rooftop Jazz',
      bullets: [
        '🍽️Dinner with 5 others matched on passions',
        '☕Continue to a rooftop jazz bar reserved for Timeleft members',
      ],
    },
  },
  Drinks: {
    Thursday: {
      title: 'Conversation-forward cocktails',
      bullets: [
        'Intimate drinks & conversation in a cozy bar',
        'Prompt cards to keep it flowing',
      ],
    },
  },
  Run: {
    Saturday: {
      title: 'Easy group run (all paces)',
      bullets: [
        '📍 Meeting point: In the heart of NYC ',
        '👟 Route: Loop of your choice (5, 7, or 9 km)',
        '☕ Coffee or quick bite after the run (Optional)',
      ],
    },
  },
};

const breakfastProfile = {
  gender: 'Female',
  ageRange: '28–31',
  building: 'A non-profit for artists to share works-in-progress',
  proudOf: 'Put on the opening night of the Eras Tour in Glendale, AZ',
};

/* =========================
   HELPERS
   ========================= */
function dateKey(d) {
  const k = new Date(d);
  k.setHours(0, 0, 0, 0);
  return k.toISOString();
}
function weekdayToIndex(day) {
  const map = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  return map[day];
}
function nextTwoDatesForWeekday(weekdayIndex) {
  const results = [];
  const now = new Date();
  for (let i = 0; i < 21; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    if (d.getDay() === weekdayIndex) results.push(new Date(d));
    if (results.length === 2) break;
  }
  return results;
}
function nextTwoDays() {
  const out = [];
  const now = new Date();
  for (let i = 1; i <= 2; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    out.push(d);
  }
  return out;
}

function getTonight() {
  const out = [];
  const now = new Date();
  for (let i = 0; i < 1; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    out.push(d);
  }
  return out;
}

function nextWeekdayDate(weekdayName) {
  const map = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };
  const target = map[weekdayName];
  const now = new Date();
  for (let i = 1; i <= 14; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    if (d.getDay() === target) return d;
  }
  return new Date(); // fallback today
}

function formatLongDate(d) {
  return new Date(d).toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

const DARK_VIEWS = new Set(['club', 'breakfast', 'customDinner']);
const isDarkView = (v) => DARK_VIEWS.has(v);

/* =========================
   COMPONENTS
   ========================= */

function Nav({ view, setView, dark }) {
  const items = [
    { id: 'home', label: 'Home', Icon: Home },
    { id: 'messages', label: 'Chat', Icon: MessageCircle },
    { id: 'events', label: 'Events', Icon: CalendarMinus2 },
    { id: 'profile', label: 'Profile', Icon: User },
  ];

  const bg = dark
    ? 'bg-gray text-white border-white/10'
    : 'bg-[fff7eb]/80 text-black border-black/10';

  const activeColor = dark ? 'text-white' : 'text-black';
  const idleColor = dark ? 'text-white/60' : 'text-black/60';

  return (
    <nav
      className={`fixed z-50 border
           /* bottom bar on mobile */
           bottom-0 left-0 right-0 h-16 px-2 flex items-center justify-around
           /* sidebar on md+ */s
           md:top-0 md:left-0 md:bottom-0 md:h-full md:w-48 md:flex md:flex-col md:items-stretch md:justify-start md:py-2
           backdrop-blur ${bg}`}
    >
      {/* Timeleft Logo*/}
      <button
        onClick={() => setView('home')}
        className="hidden md:block px-2 py-3 m-2 rounded-xl flex items-center gap-2 hover:bg-black/5"
        aria-label="Go Home"
      >
        <img
          src={
            dark
              ? 'https://timeleft.com/staging/wp-content/uploads/sites/10/2024/06/timeleft-logo-white.png'
              : 'https://timeleft.com/wp-content/uploads/2023/08/logo_black.svg'
          }
          alt="Timeleft Logo"
          className="w-auto h-8" // keeps consistent size
        />
      </button>

      {/* Other Nav Items (Dynamic) */}
      {items.map(({ id, label, Icon }) => {
        const active = view === id || (id === 'home' && view === 'home');
        const NAV_ICON_SIZE = 22; // try 20–24; 22 tends to look balanced

        return (
          <button
            key={id}
            onClick={() =>
              setView(
                id === 'home'
                  ? 'home'
                  : id === 'events'
                  ? 'events'
                  : id === 'messages'
                  ? 'messages'
                  : id === 'profile'
                  ? 'profile'
                  : view
              )
            } // wire others later
            className={`w-full min-h-[56px]
              flex flex-col md:flex-row
              items-center md:items-center
              justify-center md:justify-start
              gap-1 md:gap-3
              px-0 md:px-4 py-1 md:py-2
              rounded-lg hover:bg-black/5
              ${active ? activeColor : idleColor}`}
            aria-current={active ? 'page' : undefined}
          >
            <Icon
              strokeWidth={2}
              className="flex-none w-6 h-6 md:w-[22px] md:h-[22px]"
            />
            <span className="text-[14px] leading-4 md:text-[15px] md:leading-5 font-medium text-center md:text-left mt-0.5 md:mt-0">
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

function Countdown({ duration, className = '' }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  useEffect(() => {
    const id = setInterval(() => setTimeLeft((t) => (t > 0 ? t - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);
  const fmt = (s) => {
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${d}d ${h}h ${m}m ${sec}s`;
  };
  return (
    <span className={`font-bold flex items-center mt-1 mb-1 ${className}`}>
      ⏳ Time left: {fmt(timeLeft)}
    </span>
  );
}

export function StarsProgress({
  total = 8,
  filled = 4,
  className = '',
  size = 18,
}) {
  return (
    <div
      className={
        'inline-flex items-center gap-[6px] rounded-full px-3 py-1 ' +
        'bg-black/45 border border-white/15 backdrop-blur-md ' +
        className
      }
    >
      {Array.from({ length: total }).map((_, i) =>
        i < filled ? (
          <SparkleFilled
            key={i}
            className="w-[18px] h-[18px] text-[#f59d24ff] filter animate-pulse drop-shadow-[0_0_6px_rgba(255,220,120,0.65)]"
            style={{ width: size, height: size }}
          />
        ) : (
          <SparkleOutline
            key={i}
            className="w-[18px] h-[18px] text-white/70"
            style={{ width: size, height: size }}
          />
        )
      )}
    </div>
  );
}

function NewBadge() {
  return (
    <span
      className="top-0 -translate-y-1/2 z-30"
      style={{
        position: 'absolute',
        top: '0px',
        right: '12px',
        backgroundColor: '#ee7766ff',
        color: 'white',
        fontSize: '14px',
        fontWeight: 'bold',
        padding: '2px 8px',
        borderRadius: '8px', // rounded rectangle
        border: '1px solid black', // darker border like screenshot
        boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
      }}
    >
      Limited Time
    </span>
  );
}

// GroupSummary.jsx
// participants: [{ avatar: 'https://...', name: 'Alice' }, ...]
export function GroupSummary({
  title = 'Group',
  size, // e.g. 12 (optional)
  participants = [], // array of { avatar, name }
  subtitle, // small text under avatars (optional)
  listTitle = 'Shared Interests',
  items = [], // array of { icon: <…>, label: string }
  className = '',
}) {
  const shown = participants.slice(0, 5);
  const extra = Math.max(0, participants.length - shown.length);

  return (
    <section
      className={`reveal d3 rounded-2xl bg-white/[.04] border border-white/10 p-5 mt-6 ${className}`}
    >
      <h3 className="text-2xl font-semibold mb-4">{title}</h3>

      <div className="mb-5">
        <div className="text-sm text-gray-500 mb-2">
          Participants{' '}
          {size
            ? `(${participants.length}/${size})`
            : `(${participants.length})`}
        </div>

        <div className="flex -space-x-3 items-center">
          {shown.map((p, i) => (
            <img
              key={i}
              src={p.avatar}
              alt={p.name || 'participant'}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-white dark:ring-black/40"
            />
          ))}
          {extra > 0 && (
            <div className="w-9 h-9 rounded-full bg-gray-200 grid place-items-center text-xs font-semibold ring-2 ring-white">
              +{extra}
            </div>
          )}
        </div>

        {subtitle && <p className="mt-3 text-base text-gray-400">{subtitle}</p>}
      </div>

      {listTitle && (
        <div className="text-sm font-semibold text-gray-500 mb-2">
          {listTitle}
        </div>
      )}

      {items?.length > 0 && (
        <ul className="space-y-2">
          {items.map((it, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-2 h-2 rounded-md bg-neutral-100">
                {it.icon ?? '•'}
              </span>
              <span className="font-small">{it.label}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function InviteCard({
  day,
  title,
  time,
  onChoose,
  Icon,
  imageUrl,
  body,
  countdownDuration,
  ctaLabel = 'Choose date',
  cardHeight = 304,
  personalized,
}) {
  const Outer = ({ children }) =>
    personalized ? (
      <div className="animated-border rounded-2xl">{children}</div>
    ) : (
      <div className="rounded-2xl">{children}</div>
    );

  return (
    <div className="shrink-0 snap-start">
      {/* weekday above card (same width as card) */}

      <Outer>
        <div className="group relative w-[20rem] h-[25rem] rounded-xl overflow-visible">
          {/* Conditionally render badge */}
          {personalized && <NewBadge />}

          {imageUrl && (
            <img
              src={imageUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover rounded-xl z-0 transition-all duration-500 ease-out filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-[1.015] group-hover:translate-y-[-2px]"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/45 to-black/70 z-0 rounded-xl transition-all duration-500 ease-out filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-[1.015] group-hover:translate-y-[-2px]" />

          <div className="relative h-full p-4 text-white flex flex-col">
            <div className="mt-6 flex flex-col items-center gap-1">
              {Icon && (
                <Icon className="w-8 h-8 text-white opacity-90" aria-hidden />
              )}
              <div className="font-serif text-2xl font-regular">{title}</div>
              <div className="text-white/90 italic">{day}</div>
              <div className="text-white/90">{time}</div>
              {body && (
                <div className="mt-1 text-sm text-white/85 text-center">
                  {body}
                </div>
              )}
            </div>
            <div className="mt-auto mb-4 flex flex-col items-center gap-2">
              {/* Centered progress/counter pill */}
              {title === 'Timeleft Salsa Series' ? (
                <StarsProgress filled={3} total={8} className="mt-1 mb-1" />
              ) : typeof countdownDuration === 'number' ? (
                <div className="animate-pulse mt-1 mb-1 rounded-full px-4 py-0 bg-gradient-to-r from-[#facaf5] to-[#ec790d] backdrop-blur-md border border-white/15 shadow-md">
                  <Countdown
                    className="text-white text-xs tracking-wide"
                    duration={countdownDuration}
                  />
                </div>
              ) : null}

              <button
                onClick={onChoose}
                className="px-4 py-1 rounded-full text-white text-sm font-semibold bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-200"
              >
                {ctaLabel ?? 'Choose date'}
              </button>
            </div>
          </div>
        </div>
      </Outer>
    </div>
  );
}

function DayHeaderCarousel({
  days,
  children,
  showHeaders = true,
  dark = false,
}) {
  const ref = React.useRef(null);
  const [active, setActive] = React.useState(0);
  const [progress, setProgress] = React.useState(0); // 0..1

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      // active index (closest card to left edge)
      const cards = [...el.querySelectorAll('[data-card]')];
      const left0 = el.getBoundingClientRect().left;
      let idx = 0,
        min = Infinity;
      cards.forEach((c, i) => {
        const left = Math.abs(c.getBoundingClientRect().left - left0);
        if (left < min) {
          min = left;
          idx = i;
        }
      });
      setActive(idx);

      // progress
      const max = el.scrollWidth - el.clientWidth;
      setProgress(max > 0 ? el.scrollLeft / max : 0);
    };

    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToIndex = (i) => {
    const scroller = ref.current;
    if (!scroller) return;
    const card = scroller.querySelector(`[data-card][data-index="${i}"]`);
    if (card) scroller.scrollTo({ left: card.offsetLeft, behavior: 'smooth' });
    setActive(i);
  };

  const trackColor = dark ? 'bg-white/15' : 'bg-black/10';
  const fillColor = dark
    ? 'bg-white'
    : 'bg-gradient-to-r from-[#facaf5] to-[#ec790d]';
  const hdrActive = dark ? 'text-white' : 'text-black';
  const hdrIdle = dark ? 'text-white/60' : 'text-black/60';
  const lineActive = dark ? 'bg-white' : 'bg-black';
  const lineIdle = dark ? 'bg-white/20' : 'bg-black/20';

  return (
    <div className="w-full">
      {showHeaders && (
        <div className="mb-3 w-full">
          <div className="flex w-full">
            {days.map((d, i) => (
              <button
                key={d}
                type="button"
                onClick={() => scrollToIndex(i)}
                className="flex-1 px-2"
              >
                <div
                  className={`text-center uppercase tracking-wide text-xs font-semibold pb-2 transition-colors ${
                    i === active ? hdrActive : hdrIdle
                  }`}
                >
                  {d}
                </div>
                <div
                  className={`h-[2px] rounded transition-colors ${
                    i === active ? lineActive : lineIdle
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Wrapper holds scroller + separate progress bar */}
      <div className="relative">
        {/* SCROLLER */}
        <div
          ref={ref}
          className="overflow-x-auto overflow-y-visible pt-4 pb-4 snap-x snap-mandatory scroll-smooth progress-scroll"
        >
          <div className="flex gap-4 w-max">
            {React.Children.map(children, (child, idx) => (
              <div data-card data-index={idx}>
                {child}
              </div>
            ))}
          </div>
        </div>

        {/* PROGRESS (outside scroller, does not move) */}
        <div className="h-[6px] relative items-center">
          <div className={`h-[2px] rounded ${trackColor}`} />
          <div
            className={`h-[3px] rounded absolute left-0 top-0 ${fillColor} transition-[width] duration-150`}
            style={{ width: `${Math.max(0, Math.min(1, progress)) * 100}%` }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
function StatCard({
  icon: Icon,
  iconBg = 'bg-orange-100',
  iconColor = 'text-orange-600',
  value,
  label,
}) {
  return (
    <div className="rounded-2xl bg-[#F1EBE1] p-4 sm:p-5 min-h-[112px] flex flex-col justify-between">
      <div
        className={`inline-flex items-center justify-center w-9 h-9 rounded-xl ${iconBg}`}
      >
        <Icon className={`w-5 h-5 ${iconColor}`} aria-hidden />
      </div>

      <div className="mt-3 align-top">
        <div className="text-2xl font-semibold text-black leading-none">
          {value}
        </div>
        <div className="text-[15px] text-gray-700 mt-1">{label}</div>
      </div>
    </div>
  );
}

/* =========================
   MAIN APP
   ========================= */
export default function App() {
  const [view, setView] = useState('home'); // home | chooseDate | breakfast | confirm | club | confirmed
  const [selectedDateISO, setSelectedDateISO] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null); // {day,title,time,emoji,detailedTitle}
  const dark = isDarkView(view);
  const [overlay, setOverlay] = useState({ open: false, mode: 'planner' });

  const handleSubmit = () => {
    alert('Submitted!');
    setOverlay((s) => ({ ...s, open: false }));
  };

  const goChooseDate = (day, title, time, emoji) => {
    setSelectedEvent({ day, title, time, emoji });
    setSelectedDateISO(null);
    setView('chooseDate');
  };

  const goBreakfast = () => {
    setSelectedEvent({ title: 'Breakfast', time: '9:00 AM', emoji: '☕' });
    setSelectedDateISO(null);
    setView('breakfast');
  };

  const club = {
    emoji: '✨',
    title: 'The 6-Week Creative Builders Circle',
    tagline: 'A fixed cohort to build momentum together.',
    startsWeekday: 'Wednesday',
    startsTime: '7:00 PM',
    neighborhood: 'Westside (rotating venues)',
    countdownSeconds: 4 * 7 * 24 * 3600,
    heroImg:
      'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?auto=format&fit=crop&w=1600&q=80',
    bullets: [
      'Duration: 4 weeks • 90 minutes each',
      'Group size: 12–15 (fixed cohort)',
      'Locations: rotating third spaces across the Westside',
      'Format: weekly wins • critique • accountability pairs',
    ],
  };

  const goConfirm = (override = {}) => {
    setSelectedEvent((prev) => ({ ...prev, ...override }));
    setView('confirm');
  };

  useEffect(() => {
    // Scroll to top when view changes
    window.scrollTo({ top: 0, behavior: 'instant' }); // use 'smooth' if you want animation
  }, [view]);

  // CODE TO SUPPORT CHAT OVERLAY STATE CHANGE/MODES, BUTTON, AUTO EFFECTS
  const [conciergeOpen, setConciergeOpen] = useState(false);
  const [conciergeMode, setConciergeMode] = useState('planner'); // "planner" | "post"

  function openConcierge(mode = 'planner') {
    setConciergeMode(mode);
    setConciergeOpen(true);
  }
  function closeConcierge() {
    setConciergeOpen(false);
  }

  // 1) Force via URL param (?concierge=planner|feedback)
  useEffect(() => {
    const force = new URLSearchParams(window.location.search).get('concierge');
    if (
      force === 'planner' ||
      force === 'feedback' ||
      force === 'general_assistant'
    )
      openConcierge(force);
  }, []);

  // 2) Auto-open feedback 5s after reaching the confirmed page
  useEffect(() => {
    if (view !== 'confirmed') return;
    const id = setTimeout(() => openConcierge('feedback'), 5500);
    return () => clearTimeout(id);
  }, [view]);

  // 3) Show planner once per tab session when landing on home
  useEffect(() => {
    if (view !== 'home') return;
    if (sessionStorage.getItem('planner_shown') === '1') return;
    openConcierge('planner');
    sessionStorage.setItem('planner_shown', '1');
  }, [view]);

  useEffect(() => {
    if (conciergeOpen) {
      console.log('[overlay open]', conciergeMode, 'view=', view);
    }
  }, [conciergeOpen, conciergeMode, view]);

  const headerFont = { fontFamily: 'FixelText, Inter, system-ui, sans-serif' };
  const serifFont = {
    fontFamily: 'Playfair Display, Inter, system-ui, sans-serif',
  };

  /* ---------- Views ---------- */

  const renderHome = () => {
    return (
      <div
        className="flex-1 bg-[#fff7eb] p-6 overflow-x-hidden max-w-5xl mx-auto px-6 page-fade"
        style={headerFont}
      >
        {/* Banner */}
        <div className="relative overflow-hidden mb-4">
          {/* <img
            src="https://images.unsplash.com/photo-1661037177531-646f11829db6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c2FudGElMjBtb25pY2F8ZW58MHx8MHx8fDA%3D"
            alt="banner"
            className="w-full h-48 object-cover bg-transparent opacity-0"
          /> */}
          <div className="relative inset-0 bg-black/40 items-left justify-center text-black font-bold text-xl bg-transparent py-4">
            <div className="flex items-center justify-between mb-6">
              <div className="text-medium font-regular">Hi Maxime 👋</div>
              <button
                onClick={() => setView('notifications')}
                className="p-2 rounded-full bg-white shadow-md hover:bg-black/5"
                aria-label="notifications"
                title="notifications"
              >
                <Bell strokeWidth={2} className="flex-none w-[22px] h-[22px]" />
              </button>
            </div>
            <div className="text-5xl font-light mt-6" style={serifFont}>
              Meet people in
            </div>
            <div
              className="text-5xl font-light text-[#938f8c] mt-2 mb-6"
              style={serifFont}
            >
              New York
            </div>
            <span className="relative rounded-full text-sm font-medium text-gray-600 cursor-pointer mt-6 px-4 py-2 bg-[#ede8de]">
              Williamsburg <ChevronDown className="inline" />
            </span>
          </div>
        </div>

        <hr className="border-[#f7dfc8] mb-4" />

        {/* Classic Invites */}
        <h2
          className="text-2xl md:text-3xl mb-1 font-semibold tracking-wide"
          style={serifFont}
        >
          Classic Timeleft Invites
        </h2>
        <h3 className="text-lg font-normal text-gray-700 mb-3">
          5 people are waiting for you
        </h3>

        <DayHeaderCarousel
          days={['Wednesday', 'Thursday', 'Friday', 'Saturday']}
        >
          {classicInvites.map(({ day, emoji, title, time }, idx) => {
            const theme = inviteTheme[title] || {};
            return (
              <InviteCard
                key={`${day}-${title}`}
                day={day}
                title={title}
                time={time}
                Icon={theme.Icon}
                imageUrl={theme.img}
                onChoose={() => goChooseDate(day, title, time, emoji)}
              />
            );
          })}
        </DayHeaderCarousel>

        <hr className="border-[#f7dfc8] my-6" />

        {/* Personalized */}
        <div className="flex items-center gap-2">
          <h2
            className="text-2xl md:text-3xl mb-1 font-semibold tracking-wide"
            style={serifFont}
          >
            Invites just for Maxime
          </h2>
          <span className="bg-[#00a089ff] text-white text-[11px] font-semibold px-2 py-0.5 rounded-md h-5 flex items-center">
            PERSONALIZED
          </span>
        </div>
        <h3 className="text-lg font-normal text-gray-700 mb-3">
          As a member, you'll receive personalized invites here when we think
          we've found a great fit.
        </h3>

        <DayHeaderCarousel days={['Now', 'Cohorts']} showHeaders={false}>
          {/* Breakfast */}
          <InviteCard
            day="Expires this week"
            title="Breakfast"
            Icon={inviteTheme['Breakfast'].Icon}
            imageUrl={inviteTheme['Breakfast'].img}
            body="We found someone dreaming about the same things as you. Grab coffee this week while you can."
            countdownDuration={43200}
            ctaLabel="View & Schedule"
            onChoose={goBreakfast}
            cardHeight={336}
            personalized
          />
          {/* Social Club */}
          <InviteCard
            day="5 weeks Remaining"
            title="Timeleft Salsa Series"
            Icon={inviteTheme['Social Club'].Icon}
            imageUrl={inviteTheme['Social Club'].img}
            body={inviteTheme['Social Club'].body}
            countdownDuration={2419200}
            ctaLabel="Next Experience"
            onChoose={() => setView('club')}
            cardHeight={336}
            personalized
          />
          {/* Group Pairing / Couple's Dinner */}
          <InviteCard
            day="Expires Tonight"
            title="Couples Dinner"
            Icon={inviteTheme['CustomDinner'].Icon}
            imageUrl={inviteTheme['CustomDinner'].img}
            body={inviteTheme['CustomDinner'].body}
            countdownDuration={18600}
            ctaLabel="RSVP"
            onChoose={() => setView('customDinner')}
            cardHeight={336}
            personalized
          />
        </DayHeaderCarousel>
      </div>
    );
  };

  const renderChooseDate = () => {
    const { day, title, time } = selectedEvent || {};
    const weekdayIdx = weekdayToIndex(day);
    const nextTwo = nextTwoDatesForWeekday(weekdayIdx);
    const copy = (itineraryCopy[title] && itineraryCopy[title][day]) || {
      title: 'Itinerary',
      bullets: ['Add details here…'],
    };
    const headerLabel = title;

    return (
      <div
        className="flex-1 bg-[#fff7eb] p-6 overflow-x-hidden max-w-3xl mx-auto px-6 page-fade"
        style={headerFont}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setView('home')}
              className="p-2 -ml-2 rounded-full hover:bg-black/5"
              aria-label="Back"
            >
              <svg width="20" height="20">
                <path
                  d="M12 4 6 10l6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold">Your {headerLabel}</h1>
          </div>

          <div className="mb-4">
            <span className="font-bold">What date would you like to book?</span>
            <span className="text-gray-600"> (Required)</span>
          </div>

          <div className="flex flex-col gap-4">
            {nextTwo.map((d) => {
              const longDate = formatLongDate(d);
              const iso = dateKey(d);
              return (
                <label
                  key={iso}
                  onClick={() => setSelectedDateISO(iso)}
                  className={`bg-white rounded-2xl px-5 py-4 flex items-center justify-between cursor-pointer transition-all duration-150
                    ring-2 ring-transparent
                    ${
                      selectedDateISO === iso
                        ? 'shadow-[0_8px_#1f1f1f] border border-black'
                        : 'shadow-sm'
                    }`}
                >
                  <div className="pr-4">
                    <div className="font-bold">{copy.title}</div>
                    <div className="font-bold text-lg">{longDate}</div>
                    <div className="text-sm text-gray-600 mb-2">{time}</div>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700">
                      {copy.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  </div>
                  <input
                    type="radio"
                    name="dateChoice"
                    className="h-5 w-5"
                    style={{ accentColor: '#e8420aff' }}
                    checked={selectedDateISO === iso}
                    onChange={() => setSelectedDateISO(iso)}
                  />
                </label>
              );
            })}
          </div>

          <div className="mt-8">
            <button
              disabled={!selectedDateISO}
              onClick={() => goConfirm({ detailedTitle: copy.title })}
              className={`w-full rounded-full py-3 text-center font-bold ${
                selectedDateISO
                  ? 'bg-black text-white'
                  : 'bg-gray-300 text-gray-500'
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderBreakfast = () => {
    const options = nextTwoDays();
    const neighborhoods = ['Williamsburg', 'East Village / LES'];
    return (
      // Entire Page
      <div
        className="flex-1 bg-black text-white relative overflow-hidden"
        style={headerFont}
      >
        {/* Banner + [a] Match Info Profile + [b] Date Selection + [c] Two Buttons  */}
        <div className="mx-auto">
          {/* Banner */}
          <div className="relative rounded-xl h-[35vh] min-h-[20vh] bg-transparent text-white overflow-hidden mt-0">
            {/* Image */}
            <img
              src={inviteTheme['Breakfast'].img}
              alt=""
              className="absolute inset-0 w-full h-full object-cover hero-float opacity-70 z-0"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-1" />

            {/* Info within Image */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="font-serif reveal d1 text-3xl md:text-4xl font-medium tracking-wide">
                <button
                  onClick={() => setView('home')}
                  className="p-2 -ml-2 rounded-full border border-white/10 hover:bg-white/5"
                  aria-label="Back"
                >
                  <svg width="20" height="20">
                    <path
                      d="M12 4 6 10l6 6"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </button>
                {/* <span>☕</span> */}
                <span className="mx-2 font-thin">Maxime & Brian</span>
              </div>
              <div className="reveal d2 mt-2 px-4 text-white/80 text-lg md:text-base font-bold">
                Your obsessions match. Your timelines align. Can we set up a
                breakfast or coffee this week?
              </div>
              <div className="reveal d3 mt-4 rounded-full px-4 py-1 bg-gradient-to-r from-[#facaf5] to-[#ec790d] backdrop-blur-md border border-white/15 shadow-md animate-pulse">
                <Countdown
                  duration={43200}
                  className="text-white text-xs tracking-wide"
                />
              </div>
            </div>
          </div>

          {/* [a] Match Info Profile */}
          <div className="max-w-2xl mx-auto px-6 pb-16 -mt-2">
            <GroupSummary
              title="Why you two?"
              size={2}
              participants={BREAKFAST_PARTICIPANTS}
              subtitle="Because when Maxime set himself the mission of having 100
              coffees with strangers, Brian was collecting the diary
              entries of hundreds. Maxime's built social clubs & apps; Brian
              helped bring one-fifth of the Eras Tour to life — you’re both
              obsessed with human connection, just in different formats.
              There's also the strange habits: Maxime’s intense training, Brian’s 1,978-day Duolingo streak.
              But beneath the hustle, you share a soft spot for L’Auberge Espagnole — that messy, beautiful story of strangers colliding. Breakfast wouldn't be just pastries & coffee — it’d be two people comparing notes on belonging."
              listTitle="Commonalities"
              items={BREAKFAST_DOMAINS}
            />

            {/* Compatibility Reading */}
            {/* <div
              className="reveal d2 text-white/60 font-medium text-xl text-lg mt-6"
              style={serifFont}
            >
              Why you two?
            </div>

            <div className="reveal d3 mt-2 rounded-2xl bg-white/[.04] border border-white/10 p-5">
              <div className="font-regular">
                <p>
                  Because when Maxime set himself the mission of having 100
                  coffees with strangers, Brian was busy collecting the diary
                  entries of hundreds. Maxime's built social clubs & apps; Brian
                  helped bring one-fifth of the Eras Tour to life — you’re both
                  obsessed with human connection, just in different formats.
                  There's also the strange habits that reveal dedication:
                  Maxime’s Iron-man training, Brian’s 1,973-day Duolingo streak.
                  But beneath the hustle, you share a soft spot for
                  <span className="italic"> L’Auberge Espagnole </span> — that
                  messy, beautiful story of strangers colliding into meaning.
                </p>
                <p className="mt-4">
                  Breakfast wouldn't be just pastries & coffee — it’d be two
                  people who treat life like a social experiment comparing notes
                  on belonging.
                </p>
              </div>
            </div> */}
            {/* [b] Date Selection */}
            <div className="reveal font-serif font-light text-xl d4 mt-4 mb-4">
              <span className="text-white/70">Pick a time & neighborhood</span>
              <span className="text-gray-600"> (Required)</span>
            </div>
            {/* [b] Date Selection Options */}
            <div className="reveal d4 flex flex-col gap-4">
              {options.map((d, idx) => {
                const longDate = formatLongDate(d);
                const iso = dateKey(d);
                const hood = neighborhoods[idx] || neighborhoods[0];
                return (
                  <label
                    key={iso}
                    onClick={() => setSelectedDateISO(iso)}
                    className={`rounded-2xl p-5 mb-4 bg-white/[.04] border border-white/10 px-5 py-4 flex items-center justify-between cursor-pointer transition-all duration-150
                    ring-2 ring-transparent
                    ${
                      selectedDateISO === iso
                        ? 'shadow-[0_8px_#f2a68a] border border-[#f2a68a]'
                        : 'shadow-sm'
                    }`}
                  >
                    <div className="pr-4">
                      <div className="font-bold text-white/60">
                        1x1 Breakfast / Coffee
                      </div>
                      <div className="font-bold text-lg text-white">
                        {longDate}
                      </div>
                      <div className="text-sm text-white/70 mb-1">9:00 AM</div>
                      <div className="inline-flex items-center text-xs font-semibold bg-white/10 text-white px-2 py-1 rounded-full">
                        {hood}
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="dateChoice"
                      className="h-5 w-5"
                      style={{ accentColor: '#e8420aff' }}
                      checked={selectedDateISO === iso}
                      onChange={() => setSelectedDateISO(iso)}
                    />
                  </label>
                );
              })}
            </div>
            {/* [c] Two Buttons / Preferences */}
            <div className="mt-0 mb-4 text-xs italic text-gray-300">
              You both listed the above dates as preferred days for a breakfast
            </div>
            <div className="mt-2 mb-6 flex justify-center">
              <button className="px-6 py-3 rounded-full text-white text-sm font-semibold bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-200">
                Edit My Preferences
              </button>
            </div>
            <div className="mt-4 mb-8">
              <button
                disabled={!selectedDateISO}
                onClick={() =>
                  goConfirm({ detailedTitle: '1x1 Breakfast with Brian' })
                }
                className={`w-full rounded-full py-3 text-center text-white font-bold font-semibold bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-200${
                  selectedDateISO
                    ? 'bg-white/10 text-white'
                    : 'bg-white/30 text-gray-500'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSocialClub = () => {
    return (
      <>
        {/* Whole Body */}
        <div
          className="flex-1 bg-black text-white relative overflow-hidden"
          style={headerFont}
        >
          {/* Narrow Container */}
          <div className="mx-auto">
            {/* Banner*/}
            <div className="relative rounded-xl h-[35vh] min-h-[20vh] bg-transparent text-white relative overflow-hidden mt-0">
              {/* Image */}
              <img
                src={inviteTheme['Social Club'].img}
                alt=""
                className="absolute inset-0 w-full h-full object-cover hero-float opacity-70 z-0"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-1" />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                {/* Header + Back Button */}
                <div
                  className="reveal d1 text-3xl md:text-4xl font-thin tracking-wide"
                  style={serifFont}
                >
                  <button
                    onClick={() => setView('home')}
                    className="p-2 -ml-2 rounded-full border border-white/10 hover:bg-white/5"
                    aria-label="Back"
                  >
                    <svg width="20" height="20">
                      <path
                        d="M12 4 6 10l6 6"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </button>
                  ✨ 8-Week Salsa Series
                </div>
                <div className="reveal d2 mt-2 text-white/80 text-sm md:text-base">
                  Become the person you want, together.
                </div>
                <div className="reveal d2 mt-2 text-white/80 italic text-sm md:text-base">
                  5 weeks remaining
                </div>

                {/* Centered progress/counter pill */}
                <StarsProgress filled={3} total={8} className="mt-1 mb-1" />
                {/* <div className="animate-pulse reveal d3 mt-4 rounded-full px-4 py-1 bg-red-700/90 backdrop-blur-md border border-white/15 shadow-md"></div> */}
              </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 pb-16 -mt-2">
              <GroupSummary
                title="Your Group"
                size={12}
                participants={SOCIAL_CLUB_PARTICIPANTS}
                subtitle="We matched this group because you all dreamed about learning salsa & bachata for years, but never had the right crew to commit. Big classes were intimidating alone and accountability buddies hard to find in your circle. So we found them & an 8-week class for you to tackle together; same faces, new steps each week. Ándale pues!"
                listTitle="Shared Interests"
                items={SOCIAL_CLUB_TAGS}
              />

              {/* Pills*/}
              {/* <div className="reveal d3 mt-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sm">
                  Makers
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sm">
                  Accountability
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sm">
                  Feedback culture
                </span>
              </div> */}

              {/* Club Information Block */}
              <div className="reveal d4 mt-6 rounded-2xl bg-white/[.04] border border-white/10 p-5">
                <h3 className="text-2xl font-semibold mb-4">Details</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <div className="text-white/60 text-xs">Next session</div>
                    <div className="font-bold">Next Wednesday • 7:00 PM</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs">Next Venue</div>
                    <div className="font-bold">
                      Piel Canela Dancers (rotating venues)
                    </div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs">
                      Remaining Sessions
                    </div>
                    <div className="font-bold">5 (of 8) weeks</div>
                  </div>
                  <div>
                    <div className="text-white/60 text-xs">Group size</div>
                    <div className="font-bold">8–12 (fixed cohort)</div>
                  </div>
                </div>
                <div className="mt-4 text-white/60 text-xs">What to expect</div>
                <ul className="mt-1 list-disc list-inside space-y-1 text-sm">
                  <li>Weekly review</li>
                  <li>New solo & partner work</li>
                  <li>80% required attendance</li>
                  <li>(Optional) Post-class drinks with your group</li>
                </ul>

                <div className="reveal d4 mt-4 text-xs text-white/60">
                  Exact locations shared each week. If the cohort fills, we’ll
                  offer the next start date.
                </div>
              </div>

              {/* Offering Explanation */}
              <div
                className="reveal d2 text-white/60 font-med text-xl text-lg mt-6"
                style={serifFont}
              >
                How do Timeleft "Series" work?
              </div>
              <p className="reveal d2 mt-2 text-sm italic text-white/90">
                A fixed cohort to build momentum together, available to Timeleft
                subscribers. We all dream about taking the next step in becoming
                who we want: a salsa dancer, full-time musician, entepreneur, or
                simply drawer. Yet the difficulty finding the people and
                opportunities that encourage action & keep us accountable too
                often stops us from taking a step forward.
              </p>
              <p className="reveal d2 mt-2 text-sm italic text-white/90">
                So let Timeleft do it for you: over time let us know the things
                you want to do & who you want to become in your time left, and
                we'll find you the rocket, fuel, & crew to go do it.
              </p>

              <div className="mt-8">
                <button
                  onClick={() => {
                    const startDate = nextWeekdayDate(club.startsWeekday);
                    setSelectedEvent({
                      // canonical event fields used by renderConfirm/renderConfirmed
                      title: '8-Week Salsa Series: Session #4',
                      detailedTitle: club.title, // what you want shown in Event row
                      emoji: club.emoji,
                      day: club.startsWeekday,
                      time: club.startsTime,
                    });
                    setSelectedDateISO(dateKey(startDate)); // so confirmed page shows the right date
                    setView('confirmed');
                  }}
                  className="w-full rounded-full py-3 font-bold bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-200"
                >
                  Confirm next session
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderCustomDinner = () => {
    const options = getTonight();
    const neighborhoods = ['Williamsburg', 'East Village / LES'];
    return (
      // Entire Page
      <div
        className="flex-1 bg-black/80 text-white relative overflow-hidden"
        // style={headerFont}
      >
        {/* Banner + [a] Match Info Profile + [b] Date Selection + [c] Two Buttons  */}
        <div className="mx-auto">
          {/* Banner */}
          <div className="relative rounded-xl h-[35vh] min-h-[20vh] bg-transparent text-white overflow-hidden mt-0">
            {/* Image */}
            <img
              src={inviteTheme['CustomDinner'].img}
              alt=""
              className="absolute inset-0 w-full h-full object-cover hero-float opacity-70 z-0"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-1" />

            {/* Info within Image */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div
                className="reveal d1 text-2xl md:text-4xl font-serif font-light tracking-wide"
                style={serifFont}
              >
                <button
                  onClick={() => setView('home')}
                  className="p-2 -ml-2 rounded-full border border-white/10 hover:bg-white/5"
                  aria-label="Back"
                >
                  <svg width="20" height="20">
                    <path
                      d="M12 4 6 10l6 6"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </button>
                {/* <span>☕</span> */}
                <span className="mx-2">Couples Dinner</span>
              </div>
              <div className="reveal d2 mt-2 px-4 text-white/80 text-lg md:text-base font-bold">
                We’ve set a table for three pairs — because sometimes the best
                nights aren’t planned weeks in advance.
              </div>
              <div className="reveal d3 mt-4 rounded-full px-4 py-1 bg-gradient-to-r from-[#facaf5] to-[#ec790d] backdrop-blur-md border border-white/15 shadow-md animate-pulse">
                <Countdown
                  duration={18600}
                  className="text-white text-xs tracking-wide"
                />
              </div>
            </div>
          </div>

          {/* [a] Match Info Profile */}
          <div className="max-w-2xl mx-auto px-6 pb-16 -mt-2">
            {/* Group Description */}
            {/* <div
              className="reveal d2 text-white/60 font-light text-xl mt-6"
              style={serifFont}
            >
              Why this group?
            </div>
            <div className="reveal d3 mt-2 rounded-2xl bg-white/[.04] border border-white/10 p-5">
              <div className="font-regular">
                <p className="mt-0">
                  You'll sit with both familiar & new faces:
                </p>
                <ul className="mt-4 list-disc list-inside space-y-0">
                  <li>
                    Isaure + partner → a past connection who brings warmth and
                    good conversation.
                  </li>
                  <li>
                    A new pair → someone Isaure clicked with recently, and whose
                    husband is also an expat entrepreneur{' '}
                  </li>
                </ul>
                <p className="mt-4">
                  <span>Think of it as a </span>
                  <span className="italic">L’Auberge Espagnole </span>
                  <span>
                    little moment — strangers, familiar faces, and the potential
                    for something meaningful colliding over wine and dinner. You
                    in?
                  </span>
                </p>
              </div>
            </div> */}

            <GroupSummary
              title="Tonight’s table"
              size={6}
              participants={DINNER_PARTICIPANTS}
              subtitle="You'll sit with familiar & new faces: Isaure & partner who you've connected with before, and a new pair that Isaure has clicked with who also is an expat entrepreneuer. A little ~L'Auberge Espagnole~ moment — strangers, familiar faces, and the potential for connection over wine and dinner."
              listTitle="Commonalities"
              items={DINNER_DOMAINS}
            />

            {/* [b] Date Selection */}
            <div
              className="reveal d4 font-serif font-light text-xl mt-4 mb-4"
              style={serifFont}
            >
              <span className="text-white/70">Confirm your seat</span>
              <span className="text-gray-600"> (Required)</span>
            </div>
            {/* [b] Date Selection Options */}
            <div className="reveal d4 flex flex-col gap-4">
              {options.map((d, idx) => {
                const longDate = formatLongDate(d);
                const iso = dateKey(d);
                const hood = neighborhoods[idx] || neighborhoods[0];
                return (
                  <label
                    key={iso}
                    onClick={() => setSelectedDateISO(iso)}
                    className={`rounded-2xl p-5 mb-4 bg-white/[.04] border border-white/10 px-5 py-4 flex items-center justify-between cursor-pointer transition-all duration-150
                    ring-2 ring-transparent
                    ${
                      selectedDateISO === iso
                        ? 'shadow-[0_8px_#f2a68a] border border-[#f2a68a]'
                        : 'shadow-sm'
                    }`}
                  >
                    <div className="pr-4">
                      <div className="font-bold text-white/60">
                        🍷 Tonight’s Couples Dinner
                      </div>
                      <div className="font-bold text-lg text-white">
                        {longDate}
                      </div>
                      <div className="text-sm text-white/70 mb-1">7:30 PM</div>
                      <div className="inline-flex items-center text-xs font-semibold bg-white/10 text-white px-2 py-1 rounded-full">
                        {hood}
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="dateChoice"
                      className="h-5 w-5"
                      style={{ accentColor: '#e8420aff' }}
                      checked={selectedDateISO === iso}
                      onChange={() => setSelectedDateISO(iso)}
                    />
                  </label>
                );
              })}
            </div>
            <div className="mt-2 mb-6 flex justify-center">
              <button className="px-6 py-3 rounded-full text-white text-sm font-semibold bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-200">
                Edit My Preferences
              </button>
            </div>
            <div className="mt-4 mb-8">
              <button
                disabled={!selectedDateISO}
                onClick={() =>
                  goConfirm({
                    title: 'Couples Dinner',
                    time: '7:30pm',
                    detailedTitle: 'Couples Dinner',
                    emoji: '🍷',
                  })
                }
                className={`w-full rounded-full py-3 text-center text-white font-bold font-semibold bg-white/10 backdrop-blur-md border border-white/20 shadow-lg hover:bg-white/20 transition-all duration-200${
                  selectedDateISO
                    ? 'bg-white/10 text-white'
                    : 'bg-white/30 text-gray-500'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderConfirm = () => {
    const { day, title, time, emoji, detailedTitle } = selectedEvent || {};
    const dateStr = selectedDateISO ? formatLongDate(selectedDateISO) : '';

    const finalTitle = detailedTitle || title || '';
    const finalEmoji = emoji || inviteTheme[title]?.emoji || '';

    return (
      <div
        className="flex-1 bg-[#fff7eb] p-6 overflow-x-hidden max-w-3xl mx-auto px-6 page-fade"
        style={headerFont}
      >
        <div className="max-w-3xl mx-auto pb-24">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() =>
                setView(
                  title === 'Breakfast'
                    ? 'breakfast'
                    : title === 'Couples Dinner'
                    ? 'customDinner'
                    : 'chooseDate'
                )
              }
              className="p-2 -ml-2 rounded-full hover:bg-black/5"
              aria-label="Back"
            >
              <svg width="20" height="20">
                <path
                  d="M12 4 6 10l6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </button>
            <h1 className="text-xl font-bold">Your {title}</h1>
          </div>

          <div className="bg-white rounded-2xl border border-black p-5 mb-4">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600">Event</div>
                <div className="text-lg font-bold">
                  {finalEmoji} {finalTitle}
                </div>
              </div>
              <div className="border-t border-dashed"></div>
              <div>
                <div className="text-sm text-gray-600">Date</div>
                <div className="text-lg font-bold">{dateStr}</div>
              </div>
              <div className="border-t border-dashed"></div>
              <div>
                <div className="text-sm text-gray-600">Time</div>
                <div className="text-lg font-bold">{time}</div>
              </div>
              <div className="border-t border-dashed"></div>
              <div>
                <div className="text-sm text-gray-600">Cost</div>
                <div className="text-lg font-bold">Included in membership</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-black p-5">
            <div className="space-y-5">
              <div>
                <div className="text-sm text-gray-600">Budget</div>
                <div className="text-lg font-bold">$, $$</div>
              </div>
              <div className="border-t border-dashed"></div>
              <div>
                <div className="text-sm text-gray-600">Dietary preferences</div>
                <div className="text-lg font-bold">No restrictions</div>
              </div>
              <div className="border-t border-dashed"></div>
              <div>
                <div className="text-sm text-gray-600">Language</div>
                <div className="text-lg font-bold">English</div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <button className="px-6 py-3 rounded-full font-bold bg-white border border-black hover:bg-white/70 transition-all duration-200">
              Edit my preferences
            </button>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setView('confirmed')}
              className="w-full rounded-full py-3 text-white font-bold bg-black backdrop-blur-md border border-white/20 shadow-lg hover:gray-700 transition-all duration-200"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderConfirmed = () => {
    const dateStr = selectedDateISO
      ? formatLongDate(new Date(selectedDateISO))
      : '';
    const isBreakfast = (selectedEvent?.title || '')
      .toLowerCase()
      .includes('breakfast');

    const itineraryTitle =
      selectedEvent?.title &&
      selectedEvent?.day &&
      itineraryCopy[selectedEvent.title] &&
      itineraryCopy[selectedEvent.title][selectedEvent.day]
        ? itineraryCopy[selectedEvent.title][selectedEvent.day].title
        : null;

    const detailedTitle = isBreakfast
      ? selectedEvent?.detailTitle || 'Breakfast / Coffee'
      : itineraryTitle || selectedEvent?.title || 'Your Event';

    const displayEmoji =
      selectedEvent?.emoji ||
      (selectedEvent?.title === 'Dinner & Explore'
        ? '🍽️'
        : selectedEvent?.title === 'Drinks'
        ? '🍹'
        : selectedEvent?.title === 'Run'
        ? '🏃'
        : isBreakfast
        ? '☕'
        : '✨');

    return (
      <div className="flex-1 bg-[#fff7eb] p-6 overflow-hidden max-w-3xl mx-auto px-6 page-fade relative">
        {/* simple confetti */}
        <style>{`
          @keyframes fall {
            0% { transform: translateY(-20vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            100% { transform: translateY(110vh) rotate(360deg); opacity: 0; }
          }
          .confetti {
            position: absolute; top: -10vh;
            width: 8px; height: 14px; border-radius: 2px;
            animation: fall linear forwards;
          }       
        `}</style>

        {[...Array(40)].map((_, i) => (
          <span
            key={i}
            className="confetti"
            style={{
              left: `${(i * 97) % 100}%`,
              background: [
                '#FF6B35',
                '#FFD166',
                '#06D6A0',
                '#118AB2',
                '#EF476F',
              ][i % 5],
              animationDuration: `${5 + (i % 4)}s`,
              animationDelay: `${(i % 10) * 0.12}s`,
            }}
          />
        ))}

        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
          <div
            className="text-4xl mb-4 font-regular tracking-wide"
            style={serifFont}
          >
            Making the most of your
          </div>
          <img
            src="https://timeleft.com/wp-content/uploads/2023/08/logo_black.svg"
            alt="Timeleft Logo"
            className="w-32 h-auto mx-auto mb-4"
          />

          <div className="mt-2 text-xl font-bold">
            {displayEmoji} Your spot at {detailedTitle} is confirmed
          </div>
          <div className="mt-1 text-lg text-gray-700">
            for {selectedEvent?.time || '—'} on {dateStr || '—'}
          </div>
        </div>
      </div>
    );
  };

  function renderProfile() {
    return (
      <div className="flex-1 bg-[#fff7eb] text-[#1f1f1f] p-6 overflow-x-hidden">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-serif text-3xl font-regular">Profile</h1>
            <button
              className="p-2 rounded-full hover:bg-black/5"
              aria-label="Settings"
              title="Settings"
            >
              <Settings
                strokeWidth={2}
                className="flex-none w-[22px] h-[22px]"
              />
            </button>
          </div>

          {/* Avatar / name / edit */}

          <div className="flex items-center gap-4">
            {/* Avatar */}
            <img
              src="https://substackcdn.com/image/fetch/$s_!hlpF!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fbucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com%2Fpublic%2Fimages%2F3e358cc4-da0c-4477-8eca-695d91c6ebc2_512x512.jpeg"
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-1 border-white shadow"
            />

            {/* Text stack */}
            <div className="flex flex-col">
              <span className="text-2xl font-semibold text-gray-900">
                Maxime
              </span>
              <button className="text-md font-semibold text-gray-500 hover:text-gray-800 inline-flex items-center gap-1">
                Edit profile <span className="text-gray-400">›</span>
              </button>
            </div>
          </div>

          <div className="mt-6">
            <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
              <StatCard
                icon={CalendarDays}
                iconBg="bg-orange-100"
                iconColor="text-orange-500"
                value={1}
                label="Dinner"
              />
              <StatCard
                icon={UsersRound}
                iconBg="bg-green-100"
                iconColor="text-green-600"
                value={3}
                label="People met"
              />
              <StatCard
                icon={PersonStanding}
                iconBg="bg-pink-100"
                iconColor="text-pink-600"
                value={0}
                label="Connections"
              />
            </div>
          </div>

          {/* ---- Member card (platinum / dark) ---- */}
          <div
            className="reveal d2 text-black/70 font-medium text-xl text-lg mt-6 mb-2"
            style={serifFont}
          >
            Member Cards
          </div>
          <div className="mb-6">
            <div className="reveal d3 pt-8 pb-8 relative rounded-2xl overflow-hidden border border-black/20 shadow-xl">
              {/* background image + gradient */}
              <img
                src="https://images.unsplash.com/photo-1730544531296-ea17ddc154fd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.45),rgba(0,0,0,0.75))]" />
              {/* content */}
              <div className="relative px-5 py-6 text-white">
                <div className="text-[10px] tracking-[0.2em] uppercase opacity-80">
                  Membership
                </div>
                <div className="mt-1 text-2xl font-extrabold">
                  Timeleft Member
                </div>
                <div className="mt-1 text-sm opacity-90">Global Access</div>

                <div className="mt-5 flex items-center gap-2">
                  <div className="h-6 w-3 rounded-full bg-white/90 backdrop-blur-sm" />
                  <div className="text-xs opacity-90">
                    Present this card to access exclusive Timeleft spaces in
                    cities around the world.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Your Bookings */}
          <button className="w-full bg-transparent rounded-2xl p-5 text-left flex items-center justify-between border border-black/70 mb-3 reveal d2">
            <div className="flex items-center gap-3">
              <Calendar
                strokeWidth={2}
                className="flex-none w-[22px] h-[22px]"
              />
              <div className="font-extrabold">Your Bookings</div>
            </div>
            <span className="text-2xl leading-none">›</span>
          </button>

          {/* Help Center */}
          <button className="w-full bg-transparent rounded-2xl p-5 text-left flex items-center justify-between border border-black/70 mb-5 reveal d2">
            <div className="flex items-center gap-3">
              <Calendar
                strokeWidth={2}
                className="flex-none w-[22px] h-[22px]"
              />
              <div className="font-extrabold">Help Center</div>
            </div>
            <span className="text-2xl leading-none">›</span>
          </button>

          {/* Guide card */}
          <div className="bg-transparent rounded-2xl p-5 border border-black/70 reveal d2">
            <div className="font-extrabold text-lg mb-2">Guide</div>
            <div className="text-[17px] font-semiboldtext-gray-700 mb-4">
              Discover our 6 steps to talking to strangers and having
              unforgettable dinners.
            </div>
            <div className="flex">
              <button className="ml-auto px-6 py-3 rounded-full border border-black bg-white font-bold">
                Check it out
              </button>
            </div>
          </div>

          {/* Back to Home (optional) */}
          <div className="h-10" />
        </div>
      </div>
    );
  }

  function renderNotifications() {
    return (
      <div className="flex-1 bg-[#fff7eb] text-[#1f1f1f] p-6 overflow-x-hidden">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-serif text-3xl font-regular">Notifications</h1>
          </div>

          {/* Notification Block */}
          <div className="flex flex-col items-center py-auto mb-6 h-full">
            <Bell strokeWidth={2} className="flex-none w-[44px] h-[44px]" />
            <div className="mt-3 text-2xl font-bold text-gray-500">
              No notifications
            </div>
            <div className="mt-3 text-lg font-regular text-gray-500">
              Be notified of updates to your dinner
            </div>
          </div>

          {/* Back to Home (optional) */}
          <div className="h-10" />
        </div>
      </div>
    );
  }

  function renderEvents() {
    return (
      <div className="flex-1 bg-[#fff7eb] text-[#1f1f1f] p-6 overflow-x-hidden">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-serif text-3xl font-regular">Events</h1>
          </div>

          {/* Events Block */}
          <div className="flex flex-col py-auto mb-6 h-full">
            <div className="mt-3 text-2xl font-bold mb-4">Past</div>
            <div className="w-full max-w-2xl mx-auto">
              <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-gray-200">
                {/* Left side: icon + text */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100">
                    {/* Fork/Knife Icon (Lucide or custom SVG) */}
                    <Utensils
                      className="w-8 h-8 text-gray-400 opacity-90 p-1.5"
                      aria-hidden
                    />
                  </div>
                  <div>
                    <div className="text-gray-900 font-semibold">Dinner</div>
                    <div className="text-gray-500 text-sm">
                      Wednesday, August 27, 2025
                    </div>
                  </div>
                </div>

                {/* Right arrow */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Back to Home (optional) */}
          <div className="h-10" />
        </div>
      </div>
    );
  }

  function renderMessages() {
    return (
      <div className="flex-1 bg-[#fff7eb] text-[#1f1f1f] p-6 overflow-x-hidden">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="font-serif text-3xl font-regular">Chat</h1>
          </div>

          {/* Avatar / name / edit */}
          <div className="flex flex-col items-center mb-6">
            <MessageCircle
              strokeWidth={2}
              className="flex-none w-[44px] h-[44px] opacity-60"
            />
            <div className="mt-3 text-2xl font-bold text-gray-500">
              No connections yet
            </div>
            <div className="mt-3 text-md text-center font-regular text-gray-500">
              Join dinners and give feedback to discover compatible connections.
              Start your journey now!
            </div>
            <button
              onClick={() => setView('home')}
              className="mt-4 px-6 py-3 rounded-full border border-black bg-black font-bold text-white"
            >
              Book My Seat
            </button>
          </div>

          {/* Back to Home (optional) */}
          <div className="h-10" />
        </div>
      </div>
    );
  }

  const renderCurrent = () =>
    view === 'home'
      ? renderHome()
      : view === 'chooseDate'
      ? renderChooseDate()
      : view === 'breakfast'
      ? renderBreakfast()
      : view === 'confirm'
      ? renderConfirm()
      : view === 'club'
      ? renderSocialClub()
      : view === 'customDinner'
      ? renderCustomDinner()
      : view === 'confirmed'
      ? renderConfirmed()
      : view === 'profile'
      ? renderProfile()
      : view === 'notifications'
      ? renderNotifications()
      : view === 'events'
      ? renderEvents()
      : view === 'messages'
      ? renderMessages()
      : null;

  /* ---------- Layout (left nav + view switch) ---------- */
  return (
    <div
      className={`${
        dark ? 'bg-[#0b0c0e] text-white' : 'bg-[#fff7eb] text-[#1f1f1f]'
      } min-h-screen`}
      style={headerFont}
    >
      {/* Nav (left on md+, bottom on mobile) */}
      <Nav view={view} setView={setView} dark={dark} />

      {/* Content wrapper: add space for nav (pb on mobile, ml on desktop) */}
      <div className="pt-0 pb-40 md:pb-0 md:ml-40">
        <div className="items-center">
          {/* Attach the overlay */}
          <ConciergeOverlay
            open={conciergeOpen}
            mode={conciergeMode}
            onClose={closeConcierge}
            onSubmit={(payload) => {
              console.log('Got payload', payload);
              closeConcierge();
            }}
          />
        </div>

        {/* Global orb, shows on Home (or all pages if you want) */}
        <button
          onClick={() => openConcierge('general_assistant')}
          className="fixed bottom-24 right-10 z-50 flex items-center justify-center w-16 h-16 blur-[1.5px] rounded-full 
             bg-gradient-to-t from-pink-300 to-orange-400 animate-pulse text-white shadow-xl
             transition-transform hover:scale-105 md:bottom-10"
        >
          {/* inner icon */}
          <span className="relative z-20 text-white/95 text-xl"></span>

          {/* solid core */}
          <span
            aria-hidden
            className="absolute z-10 size-16 rounded-full bg-gradient-to-t
             from-pink-300 to-orange-400 shadow-[0_12px_28px_rgba(0,0,0,.35)]
             transition-transform duration-300 hover:scale-110"
          />

          {/* big soft glow layers (no hard edge) */}
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-gradient-to-t
            from-pink-300 to-orange-40
             blur-2xl opacity-60 animate-pulse"
          />
          <span
            aria-hidden
            className="absolute inset-0 rounded-full bg-gradient-to-t
            from-pink-200 to-orange-40
             blur-[90px] opacity-40"
          />
        </button>

        {/* force re-animate on view change if you’re using page-fade */}
        <div key={view} className="page-fade">
          {view === 'home'
            ? renderHome()
            : view === 'chooseDate'
            ? renderChooseDate()
            : view === 'breakfast'
            ? renderBreakfast()
            : view === 'confirm'
            ? renderConfirm()
            : view === 'club'
            ? renderSocialClub()
            : view === 'customDinner'
            ? renderCustomDinner()
            : view === 'confirmed'
            ? renderConfirmed()
            : view === 'profile'
            ? renderProfile()
            : view === 'notifications'
            ? renderNotifications()
            : view === 'events'
            ? renderEvents()
            : view === 'messages'
            ? renderMessages()
            : null}
        </div>
      </div>
    </div>
  );
}
