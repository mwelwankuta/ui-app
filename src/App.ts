const counter = new UIApp({
  root: "#root",
  data: {
    count: 0,
  },
  view: ({ TextView, Stack, Button, Spacer }: UIElements) => {
    const { data, changeData } = counter;

    TextView(data.count, { classes: "text-center font-bold text-3xl" });
    Stack("row", {
      value: [
        Button("Increment (+)", {
          onclick: () => changeData({ count: data.count + 1 }),
        }),

        Button("Decrement (-)", {
          onclick: () => changeData({ count: data.count - 1 }),
        }),
      ],
      classes: "justify-evenly",
    });
    Spacer();
  },
});

counter.render();
