# 1.自定义覆盖物

```
class WindowOverlay extends BMapGL.Overlay {
    constructor(option) {
        super()
        // 这里的this是这个覆盖物实例对象
        this._center = option.position;
        this._type = option.type;
        this._data = option.data;
    }
    // new的时候自动调用此方法
    initialize(map) {
        // 保存map对象实例   
        this._map = map;
        // 这里通过挂在this的方法可以拿到new对象时候的参数
        const detalData = this._data
        // 创建div元素，作为自定义覆盖物的容器   
        const div = document.createElement("div");
        div.innerHTML = `
        <img src="${polyImg[this._type]}" alt="" style="pointer-events: none;">
        <div class="markinfo" style="pointer-events: none;">
            <span style="color:${detalData.eventStatus == 1 ? "#FF6464" : "#184F73"}">${detalData.eventStatus == 1 ? "待处理" : "处理中"}</span>
            <img src="${detalData.eventStatus == 1 ? polygonRightRed : polygonRightBlue}" alt="">
        </div>`
        div.className = "markWindow"
        // // 可以根据参数设置元素样式   
        div.style.position = "absolute";
        div.type = this._type;
        div.style.boxShadow = detalData.eventStatus == 1 ? "0px 10px 10px rgba(163, 14, 14, 0.281)" : "0px 16px 29px -11px rgba(0,44,71,0.7700)";
        // 三个事件监听
        div.addEventListener("mouseover", function (e) {
            vue.$store.dispatch('eventPop/hoverMarkWindow', {
                top: this.offsetTop,
                left: this.offsetLeft,
                show: true,
                data: detalData,
                type: this.type,
            })
        })
        div.addEventListener("mouseout", function (e) {
            vue.$store.dispatch('eventPop/hoverMarkWindow', { show: false })
        })
        div.addEventListener("click", function (e) {
            vue.$store.dispatch('eventPop/changeEventDetal', true)
        })
        // 将div添加到覆盖物容器中
        map.getPanes().markerPane.appendChild(div);
        // 保存div实例   
        this._div = div;
        // 需要将div元素作为方法的返回值，当调用该覆盖物的show、hide方法，或者对覆盖物进行移除时，API都将操作此元素。   
        return div;
    }
    draw() {
        let position = this._map.pointToOverlayPixel(this._center);
        this._div.style.left = position.x - 2 + "px";
        this._div.style.top = position.y - 95 + "px";
    }
    show() {
        if (this._div) {
            this._div.style.display = "";
        }
    }
    hide() {
        if (this._div) {
            this._div.style.display = "none";
        }
    }
}
```

class上挂载的方法可以在每一个实例上调用，可从此窥见ES6中class的用法
