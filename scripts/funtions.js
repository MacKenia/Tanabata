var css = "/*\n\
* Hi，我的宝儿！\n\
* 又是一个情人节到了！\n\
* 我这个前端工程师又该上线了！\n\
* 如这个页面。就是个什么也没有的网页。\n\
* 我的工作就是给这种空白的页面加点儿东西。\n\
* 嗯~横屏和竖屏还是要区分的\n\
* 现在是";

if (window.innerHeight > window.innerWidth) css += "竖屏";
else css += "横屏";

css += "\n*/\n\
\n\
/* 首先给所有元素加上过渡效果 */\n\
* {\n\
    -webkit-transition: all 0.5s;\n\
    transition: all 0.5s;\n\
}\n\
\n\
/* 白色背景太单调了。来点背景 */\n\
body, html {\n\
    background-color: #1c1e26;\n\
    color: #fff;\n\
}\n\
\n\
/* 文字不太好看 */\n\
#code {\n\
    overflow: auto;\n\
    border: 1px solid;\n\
    font-family: consolas;\n\
    font-size: ";

if (window.innerHeight > window.innerWidth) css += "28px";
else css += "14px";

css += ";\n\
    line-height: 1.4;\n\
    padding: 16px;\n\
    margin: 32px;\n\
}\n\
\n\
/* 这些代码颜色都一样。加点儿高亮区别来 */\n\
.token .selector {\n\
    color: rgb(86,194,234);\n\
}\n\
\n\
.token .property {\n\
    color: rgb(48,170,215);\n\
}\n\
\n\
.token .punctuation {\n\
    color: rgb(241,215,0);\n\
}\n\
\n\
.token .function {\n\
    color: rgb(10,242,157);\n\
}\n\
\n\
.token .comment {\n\
    color: rgb(149,149,149);\n\
}\n\
\n\
/*\n\
* 宝贝，今天教你写代码。\n\
* 用代码画一个爱心。\n\
*/\n\
\n\
/* 首先，来一个画板 */\n\
#live {\n\
    background-color: #fff;\n\
    display: flex;\n\
    justify-content: center;\n\
    align-items: center;\n\
    margin: 32px;\n\
}\n\
\n\
/* 画一个方块，当左心室和右心室 */\n\
.heart {\n\
    position: absolute;\n\
    background: #E88D8D;\n\
    width: 100px;\n\
    height: 100px;\n\
    border-radius: 20px;\n\
    transform: rotate(45deg);\n\
}\n\
\n\
/* 画上左心房 */\n\
.heart::before {\n\
    content: '';\n\
    width: 100px;\n\
    height: 100px;\n\
    background: #E88D8D;\n\
    border-radius: 50%;\n\
    position: absolute;\n\
    left: -36px;\n\
    top: -1px;\n\
}\n\
\n\
/* 再画上右心房 */\n\
.heart::after {\n\
    content: '';\n\
    width: 100px;\n\
    height: 100px;\n\
    background: #E88D8D;\n\
    border-radius: 50%;\n\
    position: absolute;\n\
    right: 0px;\n\
    top: -36px;\n\
}\n\
\n\
/* 太单调了，让心跳动起来 */\n\
@keyframes throb {\n\
  0% {\n\
    transform: scale(1) rotate(45deg);\n\
    opacity: 1;\n\
  }\n\
\n\
  100% {\n\
    transform: scale(1.65) rotate(45deg);\n\
    opacity: 0;\n\
  }\n\
}\n\
\n\
.bounce {\n\
    transition: all;\n\
    animation: throb 1s infinite ease-out;\n\
}\n\
\n\
/*\n\
* Ok，完成！\n\
* 宝贝，七夕快乐！\n\
*/\n\
";

function hearts() {
    heart_list = ["💖", "💗", "🧡", "💙", "💝", "💕", "💛", "💜"];
    heart_color = [
        "red",
        "pink",
        "orange",
        "blue",
        "red",
        "red",
        "yellow",
        "purple",
    ];
    tar = parseInt((Math.random() * 10) % heart_color.length);
    return [heart_list[tar], heart_color[tar]];
}

function processor_old(s) {
    for (let i = 0; i < s.length; i++) {
        console.log(s[i]);
        if (s[i] == "." || s[i] == "@") {
            s.splice(i++, 0, '<span class="selector">');
            while (s[i] != " " && s[i] != "{") {
                i++;
            }
            s.splice(i++ + 1, 0, "</span>");
        }
        if (s[i] == "{") {
            s.splice(i++, 0, '<span class="punctuation">');
            s.splice(i++ + 1, 0, "</span>");
            while (i++) {
                if (s[i] == "{") {
                    s.splice(i++, 0, '<span class="property">');
                    while (s[i] != ":") {
                        i++;
                    }
                    s.splice(i++ + 1, 0, "</span>");
                    while (i++) {
                        if (
                            ((s[i - 3] == ":" && s[i - 1] == " ") ||
                                (s[i - 1] == ":" && s[i].length == 1)) &&
                            s[i] != " "
                        ) {
                            s.splice(i++, 0, '<span class="function">');
                            while (s[i] != ";") {
                                i++;
                                if (s[i] == "(" || s[i] == ")") {
                                    s.splice(
                                        i++,
                                        0,
                                        '<span class="punctuation">'
                                    );
                                    s.splice(i++ + 1, 0, "</span>");
                                }
                            }
                            s.splice(i++ + 1, 0, "</span>");
                            break;
                        }
                    }
                }
                if (s[i] == "(" || s[i] == ")") {
                    s.splice(i++, 0, '<span class="punctuation">');
                    s.splice(i++ + 1, 0, "</span>");
                }
                if (s[i] == "}") {
                    s.splice(i++, 0, '<span class="punctuation">');
                    s.splice(i++ + 1, 0, "</span>");
                    break;
                }
            }
        }
        if (s[i] == "/") {
            s.splice(i++, 0, '<span class="comment"');
            while (s[++i] != "/") {}
            s.splice(i++ + 1, 0, "</span>");
        }
    }
    let ss = "";
    for (let i in s) {
        ss += s[i];
    }
    return ss;
}

function processor(s) {
    if (typeof s == "string") s = s.split("");
    for (let i = 0; i < s.length; i++) {
        if (s[i] == "." || s[i] == "@" || s[i] == "*" || s[i] >= "a" && s[i] <= "z") {
            s.splice(i++, 0, '<span class="selector">');
            while (s[i] != "{") {
                i++;
            }
            s.splice(i, 0, "</span>");
        } else if (s[i] == "{") {
            s.splice(i++, 0, '<span class="punctuation">');
            s.splice(i++ + 1, 0, "</span>");
            while (s[i++] != "}") {
                if (s[i] >= "0" && s[i] <= "9") {
                    s.splice(i++, 0, '<span class="selector">');
                    while (s[i++] != "%") {}
                    s.splice(i + 1, 0, "</span>");
                    while (s[i++] != "{") {}
                    s.splice(i - 1, 0, '<span class="punctuation">');
                    s.splice(i++ + 1, 0, "</span>");
                    while (s[i++] != "}") {
                        if (
                            (s[i - 1] == "{" ||
                                s[i - 1] == " " ||
                                s[i - 1] == ";") &&
                            s[i] != " " && s[i] != "}"
                        ) {
                            s.splice(i++, 0, '<span class="property">');
                            while (s[i++] != ":") {}
                            s.splice(i++, 0, '<span class="function">');
                            while (s[i++] != ";") {
                                if (s[i] == "(" || s[i] == ")") {
                                    s.splice(
                                        i++,
                                        0,
                                        '<span class="punctuation">'
                                    );
                                    s.splice(i++ + 1, 0, "</span>");
                                }
                            }
                            s.splice(i++, 0, "</span>");
                            s.splice(i++, 0, "</span>");
                        }
                    }
                    s.splice(i - 1, 0, '<span class="punctuation">');
                    s.splice(i++ + 1, 0, "</span>");
                } else if (
                    (s[i - 1] == "{" || s[i - 1] == " " || s[i - 1] == ";") &&
                    s[i] != " "
                ) {
                    s.splice(i++, 0, '<span class="property">');
                    while (s[i++] != ":") {}
                    s.splice(i++, 0, '<span class="function">');
                    while (s[i++] != ";") {
                        if (s[i] == "(" || s[i] == ")") {
                            s.splice(i++, 0, '<span class="punctuation">');
                            s.splice(i++ + 1, 0, "</span>");
                        }
                    }
                    s.splice(i++, 0, "</span>");
                    s.splice(i++, 0, "</span>");
                }
            }
            s.splice(i - 1, 0, '<span class="punctuation">');
            s.splice(i++ + 1, 0, "</span>");
        } else if (s[i] == "/" && s[i + 1] == "*") {
            s.splice(i++, 0, '<span class="comment">');
            while (i++) {
                if (s[i] == "/" && s[i - 1] == "*") break;
            }
            s.splice(i + 1, 0, "</span>");
        }
    }
    return s;
}

function typing(dom, dat) {
    // const data = dat.split("");
    const css_raw = css.split("");
    const data = processor(dat);
    
    console.log(data);
    let index = 0;
    let token_index = 0;
    let counter = 0;
    let gap = 40;

    $("head").append('<style id="s">')

    dom.innerHTML = "";
    
    // function writing() {
    //   if (index < data.length) {
    //     dom.innerHTML += data[index ++]
    //     requestAnimationFrame(writing)
    //   }
    // }
    // writing()

    function writing() {
        if (index < data.length) {
            if (data[index].length == 1) {
                dom.innerHTML += data[index];
                document.getElementById("s").innerHTML += css_raw[counter++];
                if (counter == css_raw.length) setTimeout(()=>{document.getElementById("snow").style.display = "block";}, 1000);
                document.getElementById("code").scrollTop+=100; // 元素自增距离顶部
            } else {
                if (data[index].length == 7) {
                    dom = dom.parentNode;
                } else {
                    dom.innerHTML += data[index];
                    dom = document.querySelectorAll("span")[token_index++];
                    // console.log(dom);
                }
            }
            // console.log(dom.innerHTML);
            setTimeout(writing.bind(this), gap, ++index);
        }
    }
    writing();
}

