import {
  DollarSign,
  Grid2x2Check,
  ReceiptText,
  Heart,
  BrushCleaning,
  Bubbles,
  CalendarDays,
  Home,
  Inbox,
  Settings,
  NotebookPen,
  CircleQuestionMark,
} from "lucide-react";

export const menu = [
  {
    title: "About",
    url: "about",
  },
  {
    title: "Services",
    url: "/services",
    items: [
      {
        title: "End of Lease Cleaning",
        url: "end-of-lease-cleaning",
      },
      { title: "Carpet Cleaning", url: "carpet-cleaning" },
      { title: "Deep Cleaning", url: "deep-cleaning" },
      { title: "Commercial Cleaning", url: "commercial-cleaning" },
      { title: "Window Cleaning", url: "window-cleaning" },
      { title: "Acid wash", url: "acid-wash" },
      { title: "Floor Polish", url: "floor-polish" },
      { title: "Pressure Wash", url: "pressure-wash" },
      { title: "Driveway Wash", url: "driveway-wash" },
      { title: "Tile and Grout Cleaning", url: "tile-and-grout-cleaning" },
    ],
  },
  {
    title: "FAQs",
    url: "/faqs",
  },
  {
    title: "Blog",
    url: "/blogs",
  },
  {
    title: "Contact",
    url: "/contact",
  },
];

export const AdminMenu = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Quotes",
    url: "#",
    icon: Inbox,
    subMenus: [
      {
        title: "Inbox",
        url: "/admin/inbox",
      },
      {
        title: "Accepted",
        url: "/admin/accepted",
      },
      {
        title: "Trash",
        url: "/admin/trash",
      },
    ],
  },
  {
    title: "Calendar",
    url: "/admin/calendar",
    icon: CalendarDays,
  },
  {
    title: "Blogs",
    url: "/admin/blogs",
    icon: NotebookPen,
  },
  // {
  //   title: "FAQs",
  //   url: "/admin/faqs",
  //   icon: CircleQuestionMark,
  // },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
    subMenus: [
      {
        title: "Profile",
        url: "/admin/profile",
      },
      {
        title: "Users",
        url: "/admin/users",
      },
      // {
      //   title: "Add User",
      //   url: "/admin/register",
      // },
      {
        title: "Change Password",
        url: "/admin/change-password",
      },
    ],
  },
];

export const services = [
  {
    title: "End of Lease Cleaning",
    url: "end-of-lease-cleaning",
    icon: BrushCleaning,
    img: "https://fantasticservicesgroup.com.au/blog/wp-content/uploads/2019/11/End-of-lease-cleaning.jpg",
    des: "Thorough cleaning to ensure full bond refund and landlord approval.",
    checklist: [
      "Thoroughly clean and sanitize all bathrooms (toilets, showers, tubs, sinks, mirrors)",
      "Clean kitchen appliances inside and out (oven, microwave, fridge, dishwasher)",
      "Wipe down and sanitize all kitchen surfaces (countertops, backsplash, cabinets)",
      "Clean inside and outside of all cabinets and drawers",
      "Vacuum and mop all floors, including corners and edges",
      "Dust and cobweb all walls, ceilings, light fixtures, fans, and vents",
      "Clean all windows, window sills, and tracks inside and out",
      "Remove marks and stains from walls and touch up paint if needed",
      "Clean and polish all mirrors and glass surfaces",
      "Empty all trash bins and clean them thoroughly",
      "Clean and disinfect light switches, door handles, and skirting boards",
      "Vacuum carpets and shampoo or steam clean if necessary",
      "Clean inside and outside of all wardrobes and closets",
      "Wipe down blinds and curtains or launder if applicable",
      "Clean air conditioning and heating vents and filters",
      "Remove all cobwebs from corners and ceiling edges",
      "Clean external areas such as patios, balconies, and driveways",
    ],
  },
  {
    title: "Carpet Cleaning",
    url: "carpet-cleaning",
    icon: Bubbles,
    img: "https://img.choice.com.au/-/media/74fe12e385064f56baa7164473f2ca20.ashx",
    des: "Deep vacuuming and stain removal for fresh, clean, and allergen-free carpets.",
    checklist: [
      "Inspect carpet condition and identify stains or high-traffic areas",
      "Move light furniture (if required and agreed upon)",
      "Pre-vacuum entire carpeted area to remove loose dirt and debris",
      "Treat spots and stains with appropriate cleaning solutions",
      "Apply pre-spray treatment to loosen deep-set dirt and oils",
      "Agitate carpet fibers using a rotary or brush machine",
      "Perform hot water extraction or steam cleaning",
      "Use eco-friendly and pet-safe cleaning products",
      "Rinse carpets thoroughly to remove any residue",
      "Extract excess moisture using high-powered suction equipment",
      "Deodorize carpets to leave a fresh, clean scent",
      "Apply carpet protector (optional, if requested)",
      "Groom carpet fibers for even finish and faster drying",
      "Place protective pads under furniture legs (if moved)",
      "Final walk-through to ensure quality and customer satisfaction",
      "Provide carpet drying tips and estimated drying time",
    ],
  },
  {
    title: "Deep Cleaning",
    url: "deep-cleaning",
    icon: BrushCleaning,
    img: "https://msrservices.com.au/wp-content/uploads/bb-plugin/cache/Depositphotos_6153518_XL-scaled-landscape-feb002dbb564e0c79748aabb5bf27a98-61nmtru9b5hw.jpg",
    des: "Intensive cleaning targeting hidden dirt and grime for a fresh home.",
    checklist: [
      "Dust and cobweb ceilings, walls, vents, and light fixtures",
      "Clean and sanitize all surfaces, including countertops and shelves",
      "Wash baseboards, doors, door frames, and switch plates",
      "Clean inside and outside of all cabinets and drawers",
      "Deep clean kitchen appliances (oven, fridge, microwave, dishwasher)",
      "Scrub and sanitize sinks, tubs, showers, and toilets",
      "Clean mirrors and all glass surfaces",
      "Wipe down window sills and tracks",
      "Clean blinds and dust curtain rods",
      "Vacuum carpets thoroughly, including edges and corners",
      "Mop all hard floors with disinfectant",
      "Deep clean under and behind furniture (if accessible)",
      "Disinfect high-touch areas like handles, knobs, and switches",
      "Remove trash and sanitize bins",
      "Spot clean walls and remove marks or scuffs",
      "Vacuum and clean closet interiors",
      "Final inspection and touch-ups to ensure perfection",
    ],
  },
  {
    title: "Commercial Cleaning",
    url: "commercial-cleaning",
    icon: Bubbles,
    img: "https://www.maintenance-one.com/wp-content/uploads/2023/12/Essential-Tips-for-Choosing-the-Perfect-Commercial-Cleaning-Company-scaled.jpg",
    des: "Professional cleaning services to maintain a clean, safe, and productive workspace.",
    checklist: [
      "Empty all trash bins and replace liners",
      "Dust and wipe down all desks, tables, and work surfaces",
      "Sanitize high-touch areas (door handles, switches, phones, keyboards)",
      "Clean and disinfect restrooms (toilets, sinks, mirrors, dispensers)",
      "Refill soap, sanitizer, and paper supplies",
      "Vacuum carpets and rugs, including edges and corners",
      "Mop all hard floors with disinfectant solution",
      "Dust and clean baseboards, vents, and window sills",
      "Clean entrance glass doors and interior glass surfaces",
      "Wipe down light fixtures and remove cobwebs",
      "Clean kitchen or breakroom (countertops, appliances, sink)",
      "Disinfect shared equipment (copiers, printers, etc.)",
      "Dust blinds and remove smudges from walls if needed",
      "Clean inside elevators and wipe control panels",
      "Disinfect handrails and staircases",
      "Spot clean walls, doors, and scuff marks",
      "Final inspection to ensure all areas are clean and presentable",
    ],
  },
  {
    title: "Window Cleaning",
    url: "window-cleaning",
    icon: BrushCleaning,
    img: "https://static.independent.co.uk/s3fs-public/thumbnails/image/2015/04/21/09/Window%20Cleaning.jpg",
    des: "Streak-free cleaning to brighten windows and improve visibility inside and out.",
    checklist: [
      "Inspect windows for cracks, chips, or damage",
      "Remove cobwebs from corners, frames, and nearby surfaces",
      "Dust and wipe window frames and ledges",
      "Clean glass panes inside and out using streak-free solution",
      "Use squeegee or microfiber for a spotless finish",
      "Remove stickers, tape, or paint splatter from glass (if needed)",
      "Clean and vacuum window tracks",
      "Wipe down and sanitize window sills",
      "Remove and clean window screens (if applicable)",
      "Dry and reinstall screens securely",
      "Dust and clean blinds or shutters",
      "Wipe curtain rods or surrounding trim",
      "Clean sliding glass doors and tracks (if included)",
      "Polish any chrome or metal window handles",
      "Check and clean ventilation grilles near windows",
      "Final inspection to ensure no streaks, drips, or missed spots",
      "Clean surrounding walls or marks around the window area (if visible)",
    ],
  },
  {
    title: "Acid wash",
    url: "acid-wash",
    icon: Bubbles,
    img: "https://lh7-rt.googleusercontent.com/docsz/AD_4nXc9rm1Y1QC1Mq_8LrAhifbCk0HPFjst6ccY9I1jApTV30Qr7C-NDuIGCaW1zPhzaeoi2-RL1VwN8N3U4jv_f_YyAWBAMaXuuqiunWatG6-tCqHr5v3_-OgSD0UQ55l9550jHTuZUA_EJKvqpGxe1BHbiG_e?key=AghiMV8s0oSTjC6PoPyMsQ",
    des: "Powerful cleaning treatment to remove tough stains and buildup from surfaces.",
    checklist: [
      "Inspect surface for stains, buildup, and material compatibility",
      "Clear the area of any furniture, debris, or loose dirt",
      "Wear appropriate PPE (gloves, goggles, mask)",
      "Mask or cover nearby surfaces that should not be exposed to acid",
      "Pre-wet the surface to reduce acid absorption",
      "Mix acid solution to appropriate dilution ratio (based on surface type)",
      "Test acid on a small hidden area first",
      "Apply acid solution evenly across the target area",
      "Allow dwell time for acid to break down stains or residues",
      "Scrub surface manually or with machine (if needed)",
      "Rinse surface thoroughly with clean water",
      "Neutralize remaining acid using an alkaline rinse (e.g., baking soda solution)",
      "Rinse again and remove all neutralizer residues",
      "Inspect surface for streaks, damage, or missed spots",
      "Re-clean problem areas if necessary",
      "Dispose of acid and rinse water safely, per environmental guidelines",
    ],
  },
  {
    title: "Floor Polish",
    url: "floor-polish",
    icon: BrushCleaning,
    img: "https://media.istockphoto.com/id/629481486/photo/man-polishing-marble-floor-in-modern-office-building.jpg?s=612x612&w=0&k=20&c=c4BoM221GSpj-gDxGv8_zK4GSFpzz9YGZkQIPrLNqK8=",
    des: "Applying protective polish to restore shine and protect floors from wear.",
    checklist: [
      "Inspect flooring for scratches, stains, or damage",
      "Remove all furniture and obstacles from the area",
      "Sweep or vacuum floor to eliminate dust and debris",
      "Mop floor to remove sticky residue or surface grime",
      "Allow floor to dry completely before polishing",
      "Choose appropriate polish based on floor material (wood, vinyl, tile, etc.)",
      "Test polish in a small, inconspicuous area",
      "Apply floor polish evenly using a microfiber mop or applicator",
      "Work in sections to ensure uniform coverage",
      "Let polish dry for the recommended time (usually 20–30 minutes)",
      "Apply additional coats if required (typically 2–3 coats)",
      "Use a floor buffer or polishing machine for glossy finish (if needed)",
      "Buff in a circular motion to avoid streaks or lines",
      "Allow final coat to cure fully before walking on the surface",
      "Replace protective pads under furniture legs",
      "Clean and store equipment properly after use",
      "Conduct final inspection for shine, streaks, and overall finish",
    ],
  },
  {
    title: "Pressure Wash",
    url: "pressure-wash",
    icon: BrushCleaning,
    img: "https://images.squarespace-cdn.com/content/v1/57aa6b9929687f3a42e94228/1487874036037-1YXUYQFF0WY8TU9B2T5H/pressure-washing.jpg",
    des: "High-pressure water cleaning to remove dirt, grime, and mold from surfaces.",
    checklist: [
      "Inspect the surface for cracks, damage, or fragile areas",
      "Identify surface material to select correct pressure and nozzle",
      "Clear area of furniture, plants, vehicles, or debris",
      "Cover electrical outlets, lights, or delicate items nearby",
      "Wear proper safety gear (gloves, goggles, boots)",
      "Sweep or rinse surface to remove loose dirt and debris",
      "Pre-treat stains, grease, or mold with suitable detergent",
      "Set up pressure washer with appropriate PSI for the surface",
      "Test on a small area to ensure no damage",
      "Begin washing from top to bottom (for walls) or edges to center (for ground)",
      "Maintain consistent distance and motion to prevent streaks or damage",
      "Rinse off detergents thoroughly after application",
      "Pay extra attention to high-traffic or stained spots",
      "Avoid directing water into openings, cracks, or sensitive joints",
      "Inspect cleaned area for missed spots and rewash if needed",
      "Allow surface to dry completely",
      "Perform final cleanup and store all equipment safely",
    ],
  },
  {
    title: "Driveway Wash",
    url: "driveway-wash",
    icon: BrushCleaning,
    img: "https://h2gomobilewash.com/app/uploads/2020/05/power-vs-pressure-washing-whats-the-difference.jpg",
    des: "Thorough cleaning to remove oil stains, dirt, and debris from driveways.",
    checklist: [
      "Inspect driveway surface for cracks, stains, or damage",
      "Identify surface material (concrete, asphalt, pavers) to set correct pressure",
      "Clear driveway of vehicles, furniture, plants, and debris",
      "Sweep or blow off loose dirt, leaves, and dust",
      "Apply degreaser or pre-treatment to oil and grease stains",
      "Let pre-treatment dwell for recommended time",
      "Set up pressure washer with correct nozzle and PSI",
      "Test pressure on a small, hidden section to avoid damage",
      "Begin pressure washing from top to bottom or in sections",
      "Use overlapping strokes for consistent, even cleaning",
      "Focus on heavily stained or high-traffic areas",
      "Rinse surface thoroughly to remove residue and cleaning agents",
      "Avoid directing water toward doors, garage seals, or landscaped edges",
      "Repeat cleaning on stubborn spots if necessary",
      "Allow driveway to dry completely",
      "Apply sealant (optional, if included in service)",
      "Final inspection to ensure cleanliness and even finish",
    ],
  },
  {
    title: "Tile and Grout Cleaning",
    url: "tile-and-grout-cleaning",
    icon: BrushCleaning,
    img: "https://www.evergreencarpetcare.com/wp-content/uploads/2024/05/Top-5-Reasons-to-Opt-for-Professional-Tile-and-Grout-Cleaning-Services-blog-image.jpg",
    des: "Expert cleaning to remove dirt and restore shine to tiles and grout.",
    checklist: [],
  },
];

export const comments = [
  {
    text: "Awesome! It was such a relief to have my home clean. The women who cleaned were very nice and approachable. I'm already planning my next cleaning project.",
    author: "Cindy Lowing",
  },
];

export const Commitment = [
  {
    title: "Instant Quotes",
    description:
      "Other cleaning companies perform a walkthrough before giving you an estimate. Sabin Cleaning Servies was the first to innovate over-the-phone pricing. We provide estimates solely based on the size of your home and the frequency of your cleanings.",
    icon: Grid2x2Check,
  },
  {
    title: "No Rescheduling Fees",
    description:
      "Your life is busy. Your schedule changes. The next thing you know, people are visiting when you least expect it. We get it! We understand that our customers' lives are busy, and your cleaning service should relieve stress in every way. Need to reschedule? Not a problem.",
    icon: DollarSign,
  },
  {
    title: "No Contracts",
    description:
      "We realize our customers don't want to get locked into lengthy contracts. Sometimes when you're stuck in a contract, the quality can deteriorate over time. We choose to earn your loyalty with each and every cleaning.",
    icon: ReceiptText,
  },
  {
    title: "We Love Our Customers",
    description:
      "Why do customers return and refer us? Because no one takes care of you like we do. Experience the difference.",
    icon: Heart,
  },
];

export const faqsData = [
  {
    question: "Do I need to be home while my house is being cleaned?",
    answer:
      "Not at all! One of our many goals at Sabin Cleaning Services is to be a convenience to our customers and not put a halt to their day.",
  },
  {
    question: "Why does my house not smell “clean”?",
    answer: `Sabin Cleaning Services is a 100% green, environmentally friendly cleaning company, meaning all of the products we use are non-toxic, non-abrasive, and essentially odorless. Although we could add a manufactured fragrance to our products, not everyone likes the same scent.`,
  },
  {
    question: "Can I have the same crew member each time?",
    answer:
      "As much as we wish we could guarantee this, it doesn't always work out that way. Our service center managers do what they can to ensure you have a crew member that you feel comfortable with or will be the best match for your home. Ideally, we like to have 2-3 crew members familiar with your home should a particular crew member not be available for your scheduled cleaning for any reason.",
  },
  {
    question: "Should I leave a tip?",
    answer:
      "As with any service provided, like going to a restaurant or a hair salon, tipping is encouraged.",
  },
  {
    question: "How many crewmembers are you sending to my house?",
    answer:
      "Typically, we only send one crewmember to a cleaning. This ensures more accountability in the home, and gives our crewmembers more hours! However, sometimes we will send more than one crewmember should it be a larger job.",
  },
  {
    question: "Do I need to leave out cleaning products?",
    answer:
      "We provide and bring all of our own green and eco-friendly cleaning products.",
  },
  {
    question: "Can I change my cleaning plans and rotate rooms?",
    answer:
      "Absolutely! We can create and tailor custom cleaning plans that will best fit your unique lifestyle and your home!",
  },
  {
    question: "What if I have a pet?",
    answer:
      "We love pets! We are happy to clean your home with your pet(s) there, but we do ask that you put them in a safe place where they will not be in the way of our cleaning crew.",
  },
  {
    question:
      "I have lots of collectibles and nic-nacs - How should we handle that?",
    answer:
      "That is up to you. We don't go inside cabinets to dust routinely, but items out in the open will be moved and dusted unless you specify otherwise. Obviously, homes with lots of things to dust take longer than those without, so it will inevitably be reflected in the price of cleaning your home. If you have a particular item or items that you especially cherish and would like to minimize the risk of that item being broken or damaged, we will be happy to note such things and leave them alone. Unfortunately accidents do happen, but let's minimize the risk where you see fit.",
  },
  {
    question: "Is there a better day of the week to be cleaned?",
    answer:
      "The old inclination of “getting it cleaned for the weekend” is now counter-balanced by “It stays cleaner, longer, if I get it done on Monday or Tuesday.” So, you decide. Then, ask for your preference, and we will work with you as much as our schedule and your geography allows us.",
  },
  {
    question: "What if I have a special request?",
    answer:
      "We are happy to accommodate special requests. Just let us know what you need, and we will do our best to make it happen.",
  },
  {
    question: "Do you clean windows?",
    answer:
      "The routine we offer is inside and out of the front storm door, the back patio door, and inside of the window over the kitchen sink, all weather permitting. Beyond that, you are better off calling a professional window washing company to clean your windows.",
  },
];

export const footerLinks = [
  {
    title: "Our Services",
    items: [
      { title: "End of Lease Cleaning", url: "end-of-lease-cleaning" },
      { title: "Carpet Cleaning", url: "carpet-cleaning" },
      { title: "Deep Cleaning", url: "deep-cleaning" },
      { title: "Commercial Cleaning", url: "commercial-cleaning" },
      { title: "Window Cleaning", url: "window-cleaning" },
      { title: "Acid wash", url: "acid-wash" },
      { title: "Floor Polish", url: "floor-polish" },
      { title: "Pressure Wash", url: "pressure-wash" },
      { title: "Driveway Wash", url: "driveway-wash" },
      { title: "Tile and Grout Cleaning", url: "tile-and-grout-cleaning" },
    ],
  },
];

export const dummyChartData = [
  { month: "January", accepted: 3, rejected: 1, pending: 2 },
  { month: "February", accepted: 2, rejected: 2, pending: 1 },
  { month: "March", accepted: 4, rejected: 0, pending: 3 },
  { month: "April", accepted: 5, rejected: 1, pending: 2 },
  { month: "May", accepted: 2, rejected: 3, pending: 1 },
  { month: "June", accepted: 3, rejected: 2, pending: 2 },
  { month: "July", accepted: 2, rejected: 1, pending: 1 },
  { month: "August", accepted: 4, rejected: 2, pending: 0 },
  { month: "September", accepted: 3, rejected: 1, pending: 2 },
  { month: "October", accepted: 2, rejected: 0, pending: 3 },
  { month: "November", accepted: 5, rejected: 1, pending: 1 },
  { month: "December", accepted: 4, rejected: 2, pending: 1 },
];
