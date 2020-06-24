class TableLayout extends Component {
  constructor(id) {
    super(id, 'TableLayout', $(`<table class="table-layout" style="width: 100%; height: 100%;"></table>`));
    this.components = [];
    this.gridx = 0;
    this.gridy = 0;
    this.sizex = 1;
    this.sizey = 1; 
    return this;
  }

  add(component) {
    this.components.push({
      component: component,
      x: this.gridx,
      y: this.gridy,
      w: this.sizex,
      h: this.sizey
    });
    return this;
  }

  setTableDimensions(x, y, colspan, rowspan) {
    this.gridx = x;
    this.gridy = y;
    this.sizex = colspan;
    this.sizey = rowspan;
    return this;
  }

  start() {
    let _x = Math.max.apply(Math, this.components.map(o => o.x ));
    let _y = Math.max.apply(Math, this.components.map(o => o.y ));
    console.log(_y);
    for(let y = 0; y <= _y; y++) {
      let $tr = $('<tr>');
      for(let x = 0; x <= _x; x++) {
        let xycomponent = this.components.filter(c => c.x == x && c.y == y)[0];
        if(xycomponent === undefined) continue;
        let $el = $(`<td colspan="${xycomponent.w}" rowspan="${xycomponent.h}">`)
          .append(
            xycomponent.component.start());
        $tr.append($el);
      }
      this.$element.append($tr);
    }
    return this.$element;
  }
}