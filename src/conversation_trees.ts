export var story = [
  { m: "Hi!" },
  { m: "This is my new game." },
  {
    question: "Do you like it?",
    answers: [
      { m: "yes", next: "like_yes" },
      { m: "no", next: "like_no" },
    ],
  },
  { label: "like_yes", m: "I am happy you like my game!", next: "like_end" },
  { label: "like_no", m: "You made me sad!", next: "like_end" },
  { label: "like_end" },
  { m: "OK, let's change the topic" },
];
