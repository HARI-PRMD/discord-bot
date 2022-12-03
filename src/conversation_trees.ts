export var goodMorningStory: any = [];
goodMorningStory[0] = {
  text: "Good Morning!",
  options: [],
};
goodMorningStory[1] = {
  text: "Are you feeling refreshed? (yes/no)",
  options: [
    { response: "yes", next: 2 },
    { response: "no", next: 3 },
  ],
};
goodMorningStory[2] = {
  text: "I am happy you are",
  options: [{ response: "ANY", next: 4 }],
};
goodMorningStory[3] = {
  text: "Aww maybe you should sleep in!",
  options: [{ response: "ANY", next: 4 }],
};
goodMorningStory[4] = {
  text: "anyways enjoy your day I'll catch up with u later!",
  options: [],
};

//   { m: "gm!" },
//   // { m: "This is my new game." },
//   {
//     question: "Are you feeling refreshed?",
//     answers: [
//       { m: "yes", next: "like_yes" },
//       { m: "no", next: "like_no" },
//     ],
//   },
//   { label: "like_yes", m: "I am happy you do", next: "like_end" },
//   { label: "like_no", m: "Aww maybe you should sleep in!", next: "like_end" },
//   {
//     label: "like_end",
//     m: "okay then cya around later today!",
//     next: "convo_end",
//   },
// ];
