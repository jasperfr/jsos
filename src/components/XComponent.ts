abstract class XComponent {
  $element: any
  components: Array<XComponent> = []

  constructor(element) {
    this.$element = element;
  }

  css(data: object): XComponent {
    this.$element.css(data);
    return this;
  }

  on(event: string, func: Function): XComponent {
    this.$element.on(event, (e) => func(e));
    return this;
  }

  add(component): XComponent {
    this.components.push(component);
    return this;
  }

  clear(): XComponent {
    this.components = [];
    return this;
  }

  refresh(): XComponent {
    this.$element.empty();
    for(let component of this.components) {
      this.$element.append(component.start());
    }
    return this;
  }

  start(): any {
    for (let component of this.components) {
      this.$element.append(component.start());
    }
    return this.$element
  }
}