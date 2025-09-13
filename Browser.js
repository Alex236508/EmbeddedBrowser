javascript:(function(){
    var e=document.getElementById("rusic-container");
    if(e)e.remove();
    var s=document.createElement("script");
    s.src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
    s.onload=function(){init();};
    document.head.appendChild(s);

    function init(){
        var st=document.createElement("style");
        st.innerHTML=`
            @keyframes glowEffect {
                0% { box-shadow: 0 0 10px white; }
                50% { box-shadow: 0 0 20px black; }
                100% { box-shadow: 0 0 10px white; }
            }
        `;
        document.head.appendChild(st);

        var c=document.createElement("div");
        c.id="rusic-container";
        c.style.cssText="position:fixed;z-index:999999;top:100px;left:100px;width:800px;height:600px;border:2px solid white;resize:both;overflow:hidden;background:url('https://plus.unsplash.com/premium_photo-1683133681452-07ee1fc4ffca?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGFic3RyYWN0JTIwd2hpdGV8ZW58MHx8MHx8fDA%3D') no-repeat center center;background-size:cover;animation:glowEffect 3s infinite alternate;border-radius:12px;";

        var h=document.createElement("div");
        h.id="rusic-header";
        h.style.cssText="width:100%;height:30px;background:#6C7A89;cursor:move;color:white;font-family:sans-serif;padding-left:10px;line-height:30px;user-select:none;";
        h.textContent="Embedded Browser";

        var cl=document.createElement("div");
        cl.innerHTML="❌";
        cl.style.cssText="position:absolute;top:5px;right:10px;color:white;font-weight:bold;font-size:18px;cursor:pointer;background:#6C7A89;padding:5px;border-radius:3px;";
        cl.onclick=function(){c.remove();};

        var tb=document.createElement("div");
        tb.id="rusic-toolbar";
        tb.style.cssText="display:flex;align-items:center;background:rgba(255,255,255,0.8);padding:5px;";

        var backBtn=document.createElement("button");
        backBtn.innerHTML="←";
        backBtn.style.cssText="width:30px;margin:5px;padding:5px;background:#6C7A89;color:white;border:none;cursor:pointer;";

        var fwdBtn=document.createElement("button");
        fwdBtn.innerHTML="→";
        fwdBtn.style.cssText="width:30px;margin:5px;padding:5px;background:#6C7A89;color:white;border:none;cursor:pointer;";

        var inp=document.createElement("input");
        inp.type="text";
        inp.placeholder="Enter website URL or search...";
        inp.style.cssText="width:calc(100% - 160px);margin:5px;padding:5px;border:1px solid #ccc;font-size:14px;";
        inp.id="rusic-url-input";

        var goBtn=document.createElement("button");
        goBtn.innerHTML="Go";
        goBtn.style.cssText="width:50px;margin:5px;padding:5px;background:#6C7A89;color:white;border:none;cursor:pointer;";

        var fsBtn=document.createElement("button");
        fsBtn.innerHTML="⛶";
        fsBtn.style.cssText="width:30px;margin:5px;padding:5px;background:#6C7A89;color:white;border:none;cursor:pointer;margin-left:auto;";
        fsBtn.onclick=function(){
            if(c.style.position==="fixed"){
                c.style.position="absolute";
                c.style.top="100px";c.style.left="100px";
                c.style.width="800px";c.style.height="600px";
            } else {
                c.style.position="fixed";
                c.style.top="0";c.style.left="0";
                c.style.width="100vw";c.style.height="100vh";
            }
        };

        var i=document.createElement("iframe");
        i.style.cssText="width:100%;height:calc(100% - 70px);border:none;";
        i.id="rusic-modal";
        i.src = "https://boxcat.radio-zvez.info";

        var historyArray=[],currentIndex=-1;
        backBtn.onclick=function(){
            if(currentIndex>0){
                currentIndex--;
                loadNewURL(historyArray[currentIndex]);
            }
        };
        fwdBtn.onclick=function(){
            if(currentIndex<historyArray.length-1){
                currentIndex++;
                loadNewURL(historyArray[currentIndex]);
            }
        };
        goBtn.onclick=function(){
            var url=inp.value.trim();
            if(!url.startsWith("http")){
                url="https://www.google.com/search?q="+encodeURIComponent(url);
            }
            try{new URL(url)}catch(e){alert("Invalid URL.");return;}
            if(currentIndex<historyArray.length-1){
                historyArray=historyArray.slice(0,currentIndex+1);
            }
            historyArray.push(url);
            currentIndex=historyArray.length-1;
            loadNewURL(url);
        };

        h.appendChild(cl);
        tb.appendChild(backBtn);
        tb.appendChild(fwdBtn);
        tb.appendChild(inp);
        tb.appendChild(goBtn);
        tb.appendChild(fsBtn);
        c.appendChild(h);
        c.appendChild(tb);
        c.appendChild(i);
        document.body.appendChild(c);

        var p1=0,p2=0,p3=0,p4=0;
        h.onmousedown=function(e){
            e.preventDefault();
            p3=e.clientX;p4=e.clientY;
            document.onmouseup=stopDrag;
            document.onmousemove=doDrag;
        };
        function doDrag(e){
            e.preventDefault();
            p1=p3-e.clientX;p2=p4-e.clientY;
            p3=e.clientX;p4=e.clientY;
            c.style.top=(c.offsetTop-p2)+"px";
            c.style.left=(c.offsetLeft-p1)+"px";
        }
        function stopDrag(){
            document.onmouseup=null;
            document.onmousemove=null;
        }

        function loadNewURL(u){
            gsap.to(c,{duration:0.5,borderRadius:"50%",scale:0.9});
            setTimeout(function(){
                i.src=u;
                inp.value=u;
                gsap.to(c,{duration:0.5,borderRadius:"12px",scale:1});
            },500);
        }

        // Toggle browser with "H"
        document.addEventListener("keydown",function(ev){
            if(ev.key.toLowerCase()==="h" && !ev.target.matches("input, textarea")){
                c.style.display=c.style.display==="none"?"block":"none";
            }
        });

        // Toggle topbar with Shift+F
        document.addEventListener("keydown",function(ev){
            if(ev.key.toLowerCase()==="f" && ev.shiftKey && !ev.target.matches("input, textarea")){
                let head=document.getElementById("rusic-header");
                let tool=document.getElementById("rusic-toolbar");
                let hidden=head.style.display==="none";
                head.style.display=hidden?"block":"none";
                tool.style.display=hidden?"flex":"none";
                i.style.height=hidden?"calc(100% - 70px)":"100%";
            }
        });
    }
})();
