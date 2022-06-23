let properties = Object.keys(schema.properties);

console.log(properties);

Ractive.components["builder"] = Ractive.extend({
  data: { schema },
  template: `
<div id='queryBuilder'>

    <div id="props">
        <button class="spectrum-Picker spectrum-Picker--sizeM" aria-haspopup="listbox" style="width: 200px">
            <span class="spectrum-Picker-label"> properties </span>
        </button>
        <div class="spectrum-Popover spectrum-Popover--bottom spectrum-Picker-popover" style="width: 200px; height:60vh">
            <ul class="spectrum-Menu" role="listbox">
                <li style="display:flex;flex-direction:column" class="spectrum-Menu-item" role="option" tabindex="0">
                    <span class="spectrum-Menu-itemLabel">no property</span>
                </li>
            {{#each  schema.properties: index}}
                {{#if .type == "array"}}
                    <li style="display:flex;flex-direction:column" class="spectrum-Menu-item" role="option" tabindex="0">
                        <span style="font-size:larger" class="spectrum-Menu-itemLabel">{{index}}</span>
                        <span style="color:blue; margin-top:10px" class="spectrum-Menu-itemLabel" >{{.type}} </span>
                    </li>
                    {{#each .items.properties:index}}
                        <li style="display:flex;flex-direction:column; background-color:#ecf6ff;" class="spectrum-Menu-item" role="option" tabindex="0">
                            <span style="font-size:larger" class="spectrum-Menu-itemLabel">{{index}}</span>
                            <span style="color:blue; margin-top:10px" class="spectrum-Menu-itemLabel" >{{.type}} </span>
                        </li>
                        <li class="spectrum-Menu-divider" role="separator"></li>
                    {{/each}}
                {{else}}
                    <li style="display:flex;flex-direction:column" class="spectrum-Menu-item" role="option" tabindex="0">
                        <span style="font-size:larger" class="spectrum-Menu-itemLabel">{{index}}</span>
                        <span style="color:blue; margin-top:10px" class="spectrum-Menu-itemLabel" >{{.type}} </span>
                        </li>
                    <li class="spectrum-Menu-divider" role="separator"></li>
                {{/if}}
            {{/each}}
            </ul>
        </div>
    </div>

    <div id="conditions">
            <button class="spectrum-Picker spectrum-Picker--sizeM" aria-haspopup="listbox" style="width: 120px">
                <span style="text-align: center;" class="spectrum-Picker-label"> {{condition}} </span>
            </button>
            <div class="spectrum-Popover spectrum-Popover--bottom spectrum-Picker-popover" style="width: 120px">
                <ul class="spectrum-Menu" role="listbox">
                    <li style="display:flex;flex-direction:column; background-color:#ecf6ff;" class="spectrum-Menu-item" role="option" tabindex="0">
                        <span class="spectrum-Menu-itemLabel">$contains</span>
                    </li>
                </ul>
            </div>
    </div>

    <div id="value">
        <div class="spectrum-Textfield">
            <input class="spectrum-Textfield-input" aria-invalid="false" type="text" placeholder="Enter value...">
        </div>
    </div>
</div>


    <div id="result">
    {{#if condition == "$contains"}}
        {{prop}} ~> {{condition}} ("{{value}}")
    {{/if}}
    </div>
    `,
  css: `
        #queryBuilder{
            display:flex;
            flex-direction:row;
        }
        #queryBuilder div{
            margin-right:20px;
        }
    `,
  onrender: function () {
    let self = this;

    let selectBtn = document.querySelectorAll(".spectrum-Picker");
    let menu = document.querySelectorAll(".spectrum-Popover");
    let props = Array.from(
      document.querySelectorAll("#props .spectrum-Menu-item")
    );
    let conditions = Array.from(
      document.querySelectorAll("#conditions .spectrum-Menu-item")
    );
    let value = document.querySelector("#value input");
    selectBtn.forEach((el, index) => {
      el.onclick = function () {
        menu[index].classList.toggle("is-open");
      };
    });

    props.forEach((el) => {
      el.onclick = function () {
        let val = el.innerText.split("\n");
        selectBtn[0].innerText = val[0] + "(" + val[1] + ")";
        self.set("prop", val[0]);
      };
    });
    conditions.forEach((el) => {
      el.onclick = function () {
        self.set("condition", el.innerText);
      };
    });

    value.oninput = () => {
      self.set("value", value.value);
    };
  },
});

let ractive = new Ractive({
  target: "body",
  template: `
    <builder/>


    `,
});
