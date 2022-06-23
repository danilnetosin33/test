
function toggleMenu(){
    document.getElementById('sideMenu').classList.toggle('hide')
}

Ractive.components["side-menu"] = Ractive.extend({
    template:
    `
        <div id="sideMenu">
        

<div style="text-align:right; width:100%">
<button id="closeBtn" style="padding:10px" type="button" class="btn-close btn-close-white" aria-label="Close" on-click="@global.toggleMenu()" ></button>
</div>
            {{yield}}
        </div>
    `,
    css:
    `
            #sideMenu{
                width:20%;
                height: 100%;
                position: fixed;
                display:flex;
                flex-direction: column;
                top:0;
                left:0;
                background-color: rgb(119, 97, 97);
                transition:1s
            }
            
            .hide{ 
                width:0 !important
            }

    `,
    onrender: function(){
        let self = this
        let menu = self.find('#sideMenu')
        let closeBtn = self.find('#closeBtn')


    }
})


let bodyRactive = new Ractive({
  target: "body",
  template: `
    <button id="openMenuBtn" on-click="@global.toggleMenu()">OPEN MENU</button>


        <side-menu>
            <nav class="navbar bg-light" >
            <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
          </div>
          <div class="container-fluid">
          <a class="navbar-brand" href="#">Navbar</a>
        </div>
        <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
      </div>
      <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
    </div>
    <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
  </div>
  <div class="container-fluid">
  <a class="navbar-brand" href="#">Navbar</a>
</div>
<div class="container-fluid">
<a class="navbar-brand" href="#">Navbar</a>
</div>
            </nav>
        </side-menu>
        <div id="content">
        content content
        </div>
    `,
});

let contentRactive = new Ractive({
  target: "#content",
  template: `
        HeLLO WORLD
    `,
});