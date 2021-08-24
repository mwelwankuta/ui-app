"use strict";
const app = new UIApp({
    root: "#root",
    data: {
        count: 0,
    },
    view: ({ TextView, Stack, Button, Spacer }) => {
        const { data, changeData } = app;
        Stack("column", {
            value: [
                TextView(data.count, {
                    classes: "font-semibold text-3xl mb-4 text-center",
                }),
                TextView(`the value is ${data.count}`),
            ],
            classes: "items-center",
        });
        Stack("row", {
            value: [
                Button("Increment", {
                    onclick: () => changeData({ count: data.count + 1 }),
                    classes: "rounded-sm shadow bg-red-500 p-2 text-white",
                }),
                Button("Decrement", {
                    onclick: () => changeData({ count: data.count - 1 }),
                    classes: "rounded-sm shadow bg-red-500 p-2 text-white",
                }),
            ],
            classes: "justify-between",
        });
        Spacer();
    },
});
app.render();
