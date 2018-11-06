var p_hd = document.getElementsByClassName("popup_header")[0];
var p_ft = document.getElementsByClassName("popup_footer")[0];
//弹窗主体部分
var wname = document.getElementsByClassName("works_name")[0];
var wname_id = document.getElementById("works_name_textid");
var wauthor = document.getElementsByClassName("works_author")[0];
var wauthor_id = document.getElementById("works_author_divid");
var wauthor_btn = document.getElementsByClassName("works_author_btn")[0];
var wimg = document.getElementsByClassName("works_img")[0];
var wimg_id = document.getElementById("works_img_imgid");
var wdetail = document.getElementsByClassName("works_detail")[0];
var wdetail_id = document.getElementById("works_detail_textid");
var wauthor_popup = document.getElementsByClassName("popup_author")[0];
var wauthor_popup_body_left = document.getElementsByClassName("popup_author_body_left_txt")[0];
var wauthor_popup_body_right = document.getElementsByClassName("popup_author_body_right")[0];
// 关闭窗口按钮
p_hd.querySelector("span").onclick = function (ev) {
    //关闭弹窗
    document.getElementsByClassName("mask")[0].style.display = "none";
    // 清空弹窗中所有文本内容,获取input标签内容用value
    wname_id.value = "";
    wname.querySelector("span").innerHTML = "";
    wauthor_id.value = "";
    wauthor.querySelector("span").innerHTML = "";
    wimg_id.value = "";
    wimg.querySelector("span").innerHTML = "";
    wdetail_id.value = "";
};

//点击确定提交
p_ft.querySelector("button").onclick = function () {
    //count用于计数，判断资源名、作者、图片都不为空count=3
    var count = 0;
    //资源名称
    if (!wname_id.value) {
        wname.querySelector("span").innerHTML = "资源名称不能为空";
    }
    else {
        wname.querySelector("span").innerHTML = "";
        count++;
    }
    // 作者
    if (!wauthor_id.firstElementChild) {
        console.log("d");
        wauthor.lastElementChild.innerHTML = "作者不能为空";
    }
    else {
        wauthor.lastElementChild.innerHTML = "";
        count++;
    }
    // 图片
    if (!wimg_id.value) {
        wimg.lastElementChild.innerHTML = "图片不能为空";
    }
    else {
        wimg.lastElementChild.innerHTML = "";
        count++;
    }
    // 提交成功后
    if (count == 3) {
        //添加数据到json文件中
        var fs=require("fs");
        var msg="1111";
        fs.writeFile("http://localhost/101VRProject/json/work_data.json",msg,'utf8',function (err) {
            if(err){
                console.log("失败"+err);

            }
            else{
                console.log("成功");
            }
        });
        $.ajax({
                type: "POST",
                url: "http://localhost/101VRProject/json/work_data.json",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({
                    "pic": "./images/bg2.png",
                    "auther": "李冉、徐佳佳、李婷婷、张二",
                    "time": "2016/08/04 10:50",
                    "title": "班级作品：郑和下西洋1"
                }),
                success: function () {
                    console.log("成功");
                    // alert("DATA SUCCESS" + data);
                }
            }
        );
        // console.log(data);
        // $.getJSON('http://localhost/101VRProject/json/work_data.json', function (data) {
        //     //作品提交至班级作品区课程一，即classWork1
        //     // $.each(data["classWork1"],function () {
        //     //     console.log(this);
        //     //
        //     // });
        //     $(data).append("1111");
        // });
        alert("提交成功");
        p_hd.querySelector("span").onclick();
    }
};

//点击作者按钮，弹出选择框
wauthor_btn.onclick = function () {
    //遮罩打开
    document.getElementsByClassName("mask")[1].style.display = "block";
    //作者弹窗左边成员点击------实现切换类
    for (let i = 0; i < wauthor_popup_body_left.children.length; i++) {
        //每次打开作者弹窗，初始化所有子元素的类
        document.getElementsByClassName("popup_author_body_item")[i].classList = "popup_author_body_item popup_author_body_left_txt_nor";
        document.getElementsByClassName("popup_author_body_item")[i].onclick = function () {
            this.classList.toggle("popup_author_body_txt_selected");
            this.classList.toggle("popup_author_body_left_txt_nor");
        };
    }
};

//作者弹窗--关闭按钮
wauthor_popup.querySelector("span").onclick = function () {
    //遮罩关闭
    document.getElementsByClassName("mask")[1].style.display = "none";
};

//作者弹窗--添加按钮,1.左侧选中类添加到右侧。2.右侧选中类清除
document.getElementsByClassName("popup_author_body_btns")[0].children[0].onclick = function () {
    // 记录添加前右侧成员length
    let length = wauthor_popup_body_right.children.length;
    //将左侧所有选中的成员添加到右侧
    //添加选中的元素到右侧
    $(".popup_author_body_right").append(wauthor_popup_body_left.getElementsByClassName("popup_author_body_txt_selected"));
    //并把选中类变为未选中,大于length即是从左侧添加进来的成员
    for (; length < wauthor_popup_body_right.children.length; length++) {
        $(".popup_author_body_right").children().eq(length).attr("class", "popup_author_body_item popup_author_body_left_txt_nor");
    }
    //删除选中类
    $(".popup_author_body_left_txt").remove("popup_author_body_txt_selected");
};

// 作者弹窗--删除按钮
document.getElementsByClassName("popup_author_body_btns")[0].children[1].onclick = function () {
    //记录删除前左侧成员length
    let length = wauthor_popup_body_left.children.length;
    //往左侧添加，右侧的具有popup_author_body_txt_selected类的成员
    $(".popup_author_body_left_txt").append(wauthor_popup_body_right.getElementsByClassName("popup_author_body_txt_selected"));
    //左侧所有类变为未选中，大于length即是从右侧侧添加进来的成员
    for (; length < wauthor_popup_body_left.children.length; length++) {
        $(".popup_author_body_left_txt").children().eq(length).attr("class", "popup_author_body_item popup_author_body_left_txt_nor");
    }
    // 删除选中类
    $(".popup_author_body_right").remove("popup_author_body_txt_selected");
};

//作者弹窗--搜索框
document.getElementsByClassName("popup_author_body_left_search")[0].onkeydown = function (ev) {
    //按下回车
    if (ev.keyCode == 13) {
        //    触发搜索按钮
    }
};

//作者弹窗--确定按钮
document.getElementsByClassName("popup_author_footer")[0].querySelector("button").onclick = function () {
    //关闭作者弹窗
    wauthor_popup.querySelector("span").onclick();
//    清空作者栏
    document.getElementById("works_author_divid").innerHTML = "";
//    循环读取右侧成员存入作者栏
    for (let i = 0; i < wauthor_popup_body_right.children.length; i++) {
        let odiv = document.createElement("div");
        let oname = document.createElement("span");
        let obtn = document.createElement("a");
        //div放名字和删除按钮
        document.getElementById("works_author_divid").appendChild(odiv);
        odiv.className = "works_author_item";
        //作者名
        odiv.appendChild(oname);
        oname.innerHTML = wauthor_popup_body_right.children[i].innerHTML;
        // 小删除按钮
        odiv.appendChild(obtn);
        obtn.className = "works_author_itembtn";
        obtn.onclick = function (ev) {

            //    每删除一个，作者弹窗右侧栏对应项移动到左侧栏
            $(".popup_author_body_right").children().each(function () {
                if (this.innerHTML == oname.innerHTML) {
                    //右侧项移动到左侧，appendChild只能传一个节点
                    wauthor_popup_body_left.appendChild(this);
                }
            });
            //点击删除按钮删除当前项
            odiv.remove();
        };
    }


};

/// /
// function uploadImage(){
//     var files = document.getElementById('works_imgid');
//     files.onchange = function () {
//         var file = files.files[0];
//         var txt = document.getElementsByClassName('work-pic__tip')[0];
//         if(file == null) {
//             txt.innerText = '点击上传图片';
//             return ;
//         }
//         fileType = file.type;
//         if(fileType.match(/\/jpeg|\/gif|\/png|\/bmp/i)){
//             if(file && file.name!=''){
//                 txt.innerText = file.name;
//             } else {
//                 txt.innerText = '';
//             }
//         } else {
//             txt.innerText = '只能上传图片(jpg gif png bmp)';
//             txt.style.color = '#FF5722';
//             files.value = null;
//         }
//     }
// }