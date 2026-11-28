export type ScenarioStepItem =
  | string
  | {
      text: string
      remark?: string
    }

export interface PrototypeScenario {
  id: string
  number: number
  tag: string
  title: string
  prompt: string
  steps: ScenarioStepItem[]
  highlight: string
}

export const SCENARIOS: PrototypeScenario[] = [
  {
    id: "share-plan",
    number: 1,
    tag: "Pre-Trip",
    title: "Ditch the Spreadsheet",
    prompt:
      'Before the trip, John’s sister asks, "Where’s the spreadsheet?" Turn his Ask Maps draft into a live link instead.',
    steps: [
      "Open Ask Maps",
      "Open chat history",
      "Select the 2-day plan",
      "Tap Save Plan",
      "Navigate to You screen and select the Singapore food trail plan",
      "Tap Share link",
    ],
    highlight:
      "Opening hours and transit details stay live inside the link — no spreadsheets, no new apps.",
  },
  {
    id: "bounce-light-mode",
    number: 2,
    tag: "Day 1 · 1:07 PM",
    title: "Fill a 2-Hour Gap Under the Sun",
    prompt:
      "You finish at Kobashi early, with Green Oasis only at 3:30 PM. Compare nearby options and fix the screen glare for John’s mum.",
    steps: [
      "Tap the '+' under the Kobashi location card",
      "Tap Bounce",
      {
        text: "Toggle Light Mode for bright sunlight visibility",
        remark: "Optional: slide down the drawer to see the map and options expand",
      },
      "Spot Maxwell Food Centre (4 mins away) and tap to add it",
    ],
    highlight:
      "One-tap light mode fixes outdoor glare, and nearby detours slot in without everyone Googling separately.",
  },
  {
    id: "add-boat-quay",
    number: 3,
    tag: "Day 1 · Evening",
    title: "Add a New Dinner Suggestion",
    prompt:
      'Following along on her phone, John’s sister asks: "How about Boat Quay for dinner and a river walk?"',
    steps: [
      "Scroll down and tap the '+' under the Loulouca location card",
      "Tap Search",
      "Type Boat Quay in search bar above",
      "Add Boat Quay at 8:30 PM",
    ],
    highlight:
      "Search and add new stops right inside the itinerary—no jumping back to the main screen.",
  },
  {
    id: "drag-reorder",
    number: 4,
    tag: "Day 1 · Reschedule",
    title: "Fix the Timing Clash",
    prompt:
      "John’s mum spots a problem: everyone just ate, and 8:30 PM puts dinner after dessert at Loulouca.",
    steps: [
      {
        text: "Drag Maxwell Food Centre down to 3:30 PM",
        remark: 'Note: complete task "Fill a 2-Hour Gap Under the Sun" first.',
      },
      {
        text: "Tap the timing for Boat Quay and update to 6:00pm",
        remark: 'Note: complete task "Add a New Dinner Suggestion" first.',
      },
    ],
    highlight:
      "Drag to move or tap to edit the time—adjusting the schedule takes seconds, and Maps recalculates every route automatically.",
  },
  {
    id: "revisit-kahve",
    number: 5,
    tag: "Day 1 · En Route",
    title: "Slot In a Morning Favourite",
    prompt:
      "As they walk, John’s dad asks if they can grab coffee from Kahve, the spot he loved that morning.",
    steps: [
      "Tap Revisit",
      "Select Kahve",
      {
        text: "Insert it right after Maxwell Food Centre",
        remark: 'Note: complete task "Fill a 2-Hour Gap Under the Sun" first.',
      },
    ],
    highlight:
      "No re-searching — Kahve slots cleanly into 5:00 PM right before their river stroll.",
  },
]
