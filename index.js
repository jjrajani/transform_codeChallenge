class Iterator {
  constructor(props) {
    this.list = props.list;
    this.top = 0;
    this.inner = 0;
    this.hasValue = this.hasValueCheck(props.list);
  }

  hasValueCheck = list => {
    let hasValue = false;
    list.forEach(list => {
      if (hasValue) {
        return;
      }
      if (!list.length) {
        return;
      }
      list.forEach(v => {
        if (v !== undefined) {
          hasValue = true;
        }
      });
    });
    return hasValue;
  };

  next = () => {
    if (!this.hasValue) {
      throw new Error("There are no values");
    }
    if (!this.hasNext()) {
      throw new Error("There are no more");
    }
    let item = this.list[this.top][this.inner];
    if (item === undefined) {
      while (item === undefined) {
        this.doStep();
        item = this.list[this.top][this.inner];
      }
      return item;
    } else {
      this.doStep();
      return item;
    }
  };

  doStep = () => {
    if (this.list[this.top][this.inner + 1]) {
      this.inner++;
    } else {
      this.top++;
      this.inner = 0;
    }
  };

  hasNext = () => {
    if (!this.hasValue) {
      throw new Error("There are no values");
    }
    return this.top < this.list.length;
  };
}

let list = new Array(100000).fill([]);
// console.log("list", list);
list.push([1]);
const thisOne = new Iterator({
  // list: [[1, 2], [], [], [3], [undefined], [4, 5, 6]]
  // list: [[], [], [], []]
  list
});

console.log(thisOne.hasNext());
console.log(thisOne.next());
console.log(thisOne.next());
console.log(thisOne.next());
console.log(thisOne.next());
console.log(thisOne.next());
console.log(thisOne.next());
console.log(thisOne.next());
console.log(thisOne.hasNext());
