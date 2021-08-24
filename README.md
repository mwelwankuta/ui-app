# UI Framework

a javascript ui framwork

## Creating a counter

```js
const app = new UIApp({
  root: "#root",
  data: {
    count: 0,
  },
  view: ({ TextView, Stack, Button }) => {
    const { data, changeData } = app;

    TextView(data.count);
    Stack("column", {
      value: [
        Button("+", {
          onclick: () => changeData({ count: data.count + 1 }),
        }),
        
        Button("Decrement", {
          onclick: () => changeData({ count: data.count - 1 }),
        }),
      ],
    });
  },
});

app.render();

```


## 🎩 Project Description
This project aims to use HTML and JavaScript in such a way that it takes aways manuel interaction with the dom

### 👉 Technologies Used :
 * TypeScript
 * TailwindCSS

<a id="bug"></a>
## 🐛 Bugs Reporting
Feel free to [open an issue](https://github.com/mwelwankuta/ui-app/issues) on GitHub if you find any bug.
