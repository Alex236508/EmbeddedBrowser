! function() {
    var e = document.getElementById("rusic-container");
    e && e.remove();
    var t = document.createElement("script");
    t.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js", t.onload = function() {
        ! function() {
            var e = Math.min;

            function t(t) {
                var n = Math.max;
                t.preventDefault(), y = w - t.clientX, g = v - t.clientY, w = t.clientX, v = t.clientY;
                let o = r.offsetTop - g,
                    i = r.offsetLeft - y;
                o = n(0, e(window.innerHeight - r.offsetHeight, o)), i = n(0, e(window.innerWidth - r.offsetWidth, i)), r.style.top = o + "px", r.style.left = i + "px"
            }

            function n() {
                document.onmouseup = null, document.onmousemove = null
            }

            function o(e) {
                gsap.to(r, {
                    duration: .5,
                    borderRadius: "50%",
                    scale: .9
                }), setTimeout((function() {
                    f.src = "http://localhost:3000/proxy?url=" + encodeURIComponent(e), p.value = e, gsap.to(r, {
                        duration: .5,
                        borderRadius: "12px",
                        scale: 1
                    })
                }), 500)
            }
            var i = document.createElement("style");
            i.innerHTML = "@keyframes glowEffect {0% { box-shadow: 0 0 10px white; }50% { box-shadow: 0 0 20px black; }100% { box-shadow: 0 0 10px white; }}#rusic-container { resize: both; }", document.head.appendChild(i);
            var r = document.createElement("div");
            r.id = "rusic-container", r.style.cssText = "position:fixed;z-index:999999;top:100px;left:100px;width:800px;height:600px;border:2px solid white;overflow:hidden;background:url('https://plus.unsplash.com/premium_photo-1683133681452-07ee1fc4ffca?w=900&auto=format&fit=crop&q=60') no-repeat center center;background-size:cover;animation:glowEffect 3s infinite alternate;border-radius:12px;";
            var s = document.createElement("div");
            s.id = "rusic-header", s.style.cssText = "width: 100%;height: 30px;background: #6C7A89;cursor: move;color: white;font-family: sans-serif;padding-left: 30px; /* leave space for X */line-height: 30px;user-select: none;position: relative;\n", s.textContent = "Embedded Browser";
            var l = document.createElement("div");
            l.innerHTML = "❌", l.style.cssText = "position: absolute;top: 0;left: 5px;font-size: 16px;line-height: 30px;cursor: pointer;color: white;background: none;border: none;padding: 0;\n", l.onclick = function() {
                r.remove()
            }, s.insertBefore(l, s.firstChild);
            var d = document.createElement("div");
            d.id = "rusic-toolbar", d.style.cssText = "display:flex;align-items:center;background:rgba(255,255,255,0.8);padding:5px;";
            var a = document.createElement("button");
            a.innerHTML = "←", a.style.cssText = "width:30px;margin:5px;padding:5px;background:#6C7A89;color:white;border:none;cursor:pointer;";
            var c = document.createElement("button");
            c.innerHTML = "→", c.style.cssText = "width:30px;margin:5px;padding:5px;background:#6C7A89;color:white;border:none;cursor:pointer;";
            var p = document.createElement("input");
            p.type = "text", p.placeholder = "Enter website URL or search...", p.style.cssText = "width:calc(100% - 160px);margin:5px;padding:5px;border:1px solid #ccc;font-size:14px;", p.id = "rusic-url-input";
            var h = document.createElement("button");
            h.innerHTML = "Go", h.style.cssText = "width:50px;margin:5px;padding:5px;background:#6C7A89;color:white;border:none;cursor:pointer;";
            var u = document.createElement("button");
            u.innerHTML = "⛶", u.style.cssText = "width:30px;margin:5px;padding:5px;background:#6C7A89;color:white;border:none;cursor:pointer;margin-left:auto;", u.onclick = function() {
                r.classList.contains("fullscreen") ? (r.classList.remove("fullscreen"), r.style.top = "100px", r.style.left = "100px", r.style.width = "800px", r.style.height = "600px") : (r.classList.add("fullscreen"), r.style.top = "0", r.style.left = "0", r.style.width = "100vw", r.style.height = "100vh")
            };
            var f = document.createElement("iframe");
            f.style.cssText = "width:100%;height:calc(100% - 70px);border:none;", f.id = "rusic-modal", f.src = "https://blrublrbuerigieroklghlvyavmliarelhsmuazuka.realonesflow.infinityfreeapp.com/";
            var m = [],
                x = -1;
            a.onclick = function() {
                0 < x && (x--, o(m[x]))
            }, c.onclick = function() {
                x < m.length - 1 && (x++, o(m[x]))
            }, h.onclick = function() {
                var e = p.value.trim();
                e.startsWith("http") || (e = "https://www.google.com/search?q=" + encodeURIComponent(e));
                try {
                    new URL(e)
                } catch (e) {
                    return void alert("Invalid URL.")
                }
                x < m.length - 1 && (m = m.slice(0, x + 1)), m.push(e), x = m.length - 1, o(e)
            }, s.appendChild(l), d.appendChild(a), d.appendChild(c), d.appendChild(p), d.appendChild(h), d.appendChild(u), r.appendChild(s), r.appendChild(d), r.appendChild(f), document.body.appendChild(r);
            var y = 0,
                g = 0,
                w = 0,
                v = 0;
            s.onmousedown = function(e) {
                e.preventDefault(), w = e.clientX, v = e.clientY, document.onmouseup = n, document.onmousemove = t
            };
            let b = new ResizeObserver((() => {
                let t = e(r.offsetWidth, window.innerWidth - r.offsetLeft),
                    n = e(r.offsetHeight, window.innerHeight - r.offsetTop);
                t < r.offsetWidth && (r.style.width = t + "px"), n < r.offsetHeight && (r.style.height = n + "px")
            }));
            b.observe(r);
            let k = {
                top: r.style.top,
                left: r.style.left,
                width: r.style.width,
                height: r.style.height
            };
            document.addEventListener("keydown", (e => {
                e.shiftKey && "s" === e.key.toLowerCase() && !e.target.matches("input, textarea") && ("none" === r.style.display ? (r.style.display = "block", b.disconnect(), r.style.top = k.top, r.style.left = k.left, r.style.width = k.width, r.style.height = k.height, r.style.transform = "scale(1)", r.style.borderRadius = "12px", b.observe(r)) : (k.top = r.style.top, k.left = r.style.left, k.width = r.style.width, k.height = r.style.height, r.style.display = "none"))
            })), document.addEventListener("keydown", (function(e) {
                if ("f" === e.key.toLowerCase() && e.shiftKey && !e.target.matches("input, textarea")) {
                    let e = document.getElementById("rusic-header"),
                        t = document.getElementById("rusic-toolbar"),
                        n = "none" === e.style.display;
                    e.style.display = n ? "block" : "none", t.style.display = n ? "flex" : "none", f.style.height = n ? "calc(100% - 70px)" : "100%"
                }
            }))
        }()
    }, document.head.appendChild(t)
}();
