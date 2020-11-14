abstract class XComponent {
  $element: any
  components: Array<XComponent> = []

  constructor(element) {
    this.$element = element;
  }

  css(data: object): void {
    this.$element.css(data);
  }

  on(event: string, func: Function): void {
    this.$element.on(event, func);
  }

  add(component): void {
    this.components.push(component);
  }

  clear(): void {
    this.components = [];
  }

  refresh(): void {
    this.$element.empty();
    for(let component of this.components) {
      this.$element.append(component.start());
    }
  }

  start(): any {
    for (let component of this.components) {
      this.$element.append(component.start());
    }
    return this.$element
  }
}