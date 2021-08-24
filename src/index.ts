type ButtonOptions = {
  onclick: () => void;
  classes?: string;
};

type InputOptions = {
  setvalue: (value: string) => unknown;
  onchange?: () => void;
  classes?: string;
};

type ListOptions = {
  onclick?: () => void;
  render: (value: any, i: number) => void;
};

type GroupOptions = {
  classes: string;
};

type TextOptions = {
  elementType?: string;
  classes?: string;
};

type StackOptions = {
  value: Array<any>;
  classes?: string;
};

type TextType = {
  value: string;
  type: string;
};

type ListItem = HTMLElement | string;

type UIElements = {
  onMount: any;
  changeData: any;
  Button: (value: string, options: ButtonOptions) => unknown;
  List: (value: ListItem[], options: ListOptions) => void;
  Input: (value: string, options: InputOptions) => HTMLElement;
  Group: (items: Array<any>, options?: GroupOptions) => void;
  Stack: (type: "column" | "row", options: StackOptions) => void;
  TextView: (value: string, options?: TextOptions) => unknown;
  Spacer: () => unknown;
};

type Constructor = {
  root: string;
  data?: object;
  view: (Element: UIElements) => unknown;
  elements?: UIElements;
};

class UIApp {
  root: string;
  data: any;
  elements: UIElements;
  view: (Element: UIElements) => unknown;
  constructor(params: Constructor) {
    const { root, view, data } = params;

    const elements: UIElements = {
      Button: this.Button,
      onMount: this.onMount,
      changeData: this.changeData,
      List: this.List,
      Group: this.Group,
      Stack: this.Stack,
      Input: this.Input,
      TextView: this.TextView,
      Spacer: this.Spacer,
    };

    this.root = root;
    this.data = data;
    this.view = view;
    this.elements = elements;
  }

  render() {
    this.view(this.elements);
  }

  onMount(code: () => void) {
    window.addEventListener("loadedmetadata", () => this.render());
    code();
  }

  changeData = (changeTo: any) => {
    this.data = { ...this.data, ...changeTo };
    const body: HTMLElement = document.querySelector(this.root)!;

    // re-render app
    body.innerHTML = "";
    this.view(this.elements);
    return null;
  };

  TextView = (value: string, options?: TextOptions) => {
    const renderElement: HTMLElement = document.querySelector(this.root)!;

    const el: HTMLElement = document.createElement(
      `${
        options != undefined && options?.elementType != undefined
          ? options?.elementType
          : "p"
      }`
    );
    el.className = `${
      options && options?.classes != undefined ? options?.classes : ""
    }`;
    el.innerHTML = value;

    return renderElement.appendChild(el) as unknown;
  };

  Button = (value: string, options: ButtonOptions) => {
    const renderElement: HTMLElement = document.querySelector(this.root)!;
    const { onclick, classes } = options;
    const el = document.createElement("button");
    el.innerHTML = value;

    if (options != undefined) {
      el.className = `${classes}`;
      el.onclick = onclick;
    }
    return renderElement.appendChild(el) as unknown;
  };

  Input = (value: string, options: InputOptions) => {
    const renderElement: HTMLElement = document.querySelector(this.root)!;
    const el: HTMLInputElement = document.createElement("input")!;

    const { setvalue, classes, onchange } = options!;

    el.value = value;
    el.innerHTML = value;
    el.className = `${classes}`;

    if (onchange != undefined) {
      el.addEventListener("change", () => onchange());
    }

    el.addEventListener("change", (e: any) => {
      const body = document.querySelector(this.root)!;

      setvalue(e.target.value);
      // re-render app
      body.innerHTML = "";
      this.view(this.elements);
    });

    return renderElement.appendChild(el);
  };

  List = (value: ListItem[], options: ListOptions) => {
    const { render } = options;

    if (options != undefined) {
      for (let i = 0; i < value.length; i++) {
        render(value[i], i);
      }
    }
  };

  Stack = (type: "column" | "row", options: StackOptions) => {
    const renderElement: HTMLElement = document.querySelector(this.root)!;
    const { value, classes } = options;

    const el = document.createElement("div");
    el.className = `
    flex 
    ${type == "column" ? "flex-col" : "flex-row"} 
    ${options && classes != undefined ? classes : ""}`;

    for (let i = 0; i < value.length; i++) {
      el.append(value[i]);
    }

    return renderElement.appendChild(el) as unknown;
  };

  Group = (items: Array<any>, options?: GroupOptions) => {
    const renderElement: HTMLElement = document.querySelector(this.root)!;
    const el = document.createElement("div");
    el.className = `${options?.classes}`;

    if (items != undefined) {
      for (let i = 0; i < items.length; i++) {
        el.append(items[i]);
      }
    }
    return renderElement.appendChild(el) as unknown;
  };

  Spacer = () => {
    const renderElement: HTMLElement = document.querySelector(this.root)!;
    const el = document.createElement("div");
    el.className = "flex-1";

    return renderElement.appendChild(el) as unknown;
  };
}
