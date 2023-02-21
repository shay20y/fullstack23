export default class FoodsItem {
    constructor(_parent, _item, _index ,_deleteFood) {
        this.parent = _parent
        this.index = _index;
        this.deleteFood = _deleteFood;
        this.id = _item._id
        this.name = _item.name;
        this.price = _item.price;
        this.cals = _item.cals;
    }

    render() {
        let tr = document.createElement("tr");
        tr.className = "";
        document.querySelector(this.parent).append(tr);
        tr.innerHTML = `

    <td>${this.index+1}</td>
    <td>${this.name}</td>
    <td>${this.price}</td>
    <td>${this.cals}</td>
    <td><button class="x_btn btn bg-danger">X</button></td>
    `
    let xBtn = tr.querySelector(".x_btn");
    xBtn.addEventListener("click",() => {
        window.confirm("Delete food?") && this.deleteFood(this.id);
    }) 
    }
}