//tab0对应index为myWork，tab1对应classWork
tab[0].index = "myWork";
tab[1].index = "classWork";
// content_header--鼠标点击tab页
tab[0].onclick = function () {
    //点击后添加状态类
    this.nextElementSibling.setAttribute("class", "tab");
    this.classList.add("tab_select");
    //刷新作品项和页码
    ShowItem();
};
tab[1].onclick = function () {
    this.previousElementSibling.setAttribute("class", "tab");
    this.classList.add("tab_select");
    ShowItem();
};
//打开网页默认点击我的作品
tab[0].nextElementSibling.setAttribute("class", "tab");
tab[0].classList.add("tab_select");

// 点击新建按钮
document.getElementsByClassName("btn")[1].onclick = function () {
    //显示弹窗
    document.getElementsByClassName("mask")[0].style.display = "block";
};

//创建作品项
function CreateItem(pic, author, title, time) {
    //整个item作品
    let obj_item = document.createElement("div");
    document.getElementsByClassName("content_main")[0].appendChild(obj_item);
    obj_item.className = "content_item";
    obj_item.style.paddingBottom = "50px";
    //作品头部、预览图、相关信息
    let obj_head = document.createElement("div");
    let obj_head_img = document.createElement("img");
    let obj_head_info = document.createElement("div");
    obj_item.appendChild(obj_head);
    obj_head.appendChild(obj_head_img);
    obj_head.appendChild(obj_head_info);
    obj_head.style.position = "relative";
    obj_head.style.height = "213px";
    obj_head_info.className = "content_item_headinfo";
    obj_head_img.src = pic;
    obj_head_img.style.width = "357px";
    obj_head_img.style.height = "213px";
    //往图片下方框中添加名字和时间
    let obj_head_infoName = document.createElement("div");
    let obj_head_infoTime = document.createElement("div");
    obj_head_info.appendChild(obj_head_infoName);
    obj_head_info.appendChild(obj_head_infoTime);
    obj_head_infoName.className = "content_item_headinfo_text";
    obj_head_infoName.classList.add("content_item_headinfo_name");
    obj_head_infoTime.className = "content_item_headinfo_text";
    obj_head_infoName.innerHTML = author;
    obj_head_infoTime.innerHTML = time;
    //作品的操作按钮
    let obj_body = document.createElement("div");
    obj_item.appendChild(obj_body);
    obj_body.className = "content_item_body";
    let obj_body_btn1 = document.createElement("div");
    obj_body.appendChild(obj_body_btn1);
    obj_body_btn1.className = "content_item_btn";
    // obj_body_btn1.innerHTML="<img src='./images/edit.png' class='content_item_edit'><span class='content_item_text'>编辑</span>" ;
    obj_body_btn1.innerHTML = "<div class='content_item_edit'></div><span class='content_item_text'>编辑</span>"
    let obj_body_btn2 = document.createElement("div");
    obj_body.appendChild(obj_body_btn2);
    obj_body_btn2.className = "content_item_btn";
    // obj_body_btn2.innerHTML="<img src='./images/play.png' class='content_item_play'><span class='content_item_text'>播放</span>" ;
    obj_body_btn2.innerHTML = "<div class='content_item_play'></div><span class='content_item_text'>播放</span>"
    let obj_body_btn3 = document.createElement("div");
    obj_body.appendChild(obj_body_btn3);
    obj_body_btn3.className = "content_item_btn";
    // obj_body_btn3.innerHTML="<img src='./images/del.png' class='content_item_delete'><span class='content_item_text'>删除</span>" ;
    obj_body_btn3.innerHTML = "<div class='content_item_delete'></div><span class='content_item_text'>删除</span>"
//作品名
    let obj_foot = document.createElement("div");
    obj_item.appendChild(obj_foot);
    obj_foot.className = "content_item_footerText";
    obj_foot.innerHTML = title;
}

//删除作品项
function DeleteItem() {
    //清空所有子元素
    $(".content_main").empty();
}

//删除页码按钮
function DeletePageBtn() {
    $(".content_footer").empty();
}

//创建页码按钮，传入作品项个数和json
function CreatePageBtn(ItemLength, data) {
    //创左箭头
    let obj_btnleft = document.createElement("div");
    document.getElementsByClassName("content_footer")[0].appendChild(obj_btnleft);
    obj_btnleft.className = "footer_page";
    obj_btnleft.innerHTML = "<";
    //左箭头注册事件
    obj_btnleft.onclick = function (ev) {
        let obj_select = document.getElementsByClassName("footer_page_select")[0];
        //页码为1，则不动
        if (obj_select == document.getElementsByClassName("content_footer")[0].children[1]) {
        }
        //页码不为1则向上一页
        else {
            //删除所有页码的点击态类
            for (let j = 0; j <= Math.ceil(ItemLength / 8); j++) {
                document.getElementsByClassName("footer_page")[j].classList.remove("footer_page_select");
            }
            //给当前页码的上一个兄弟加上点击态类
            obj_select.previousElementSibling.classList.add("footer_page_select");
            //点击左箭头，触发页码上一个兄弟的点击事件
            obj_select.previousElementSibling.onclick();
        }
    };

    //循环创建页码按钮，每八个项创建一个（不足八个创一个,向上取整）
    for (let i = 1; i <= Math.ceil(ItemLength / 8); i++) {
        let obj_btn = document.createElement("div");
        document.getElementsByClassName("content_footer")[0].appendChild(obj_btn);
        obj_btn.className = "footer_page";
        obj_btn.innerHTML = i;
        obj_btn.index = i;
        obj_btn.onclick = function (ev) {
            //删除所有页码按钮点击态
            for (let j = 0; j <= Math.ceil(ItemLength / 8); j++) {
                document.getElementsByClassName("footer_page")[j].classList.remove("footer_page_select");
            }
            //给当前按钮设置点击态
            obj_btn.classList.add("footer_page_select");
            // 点击任意页码后删除当前项，并新建对应的作品项
            DeleteItem();
            //若当前为全部课程
            if (INDEX.sidebarINDEX == 0) {
                let currentCount = 0;
                for (let j = 1; j < 6; j++) {
                    now = INDEX.tabINDEX + j;
                    for (let k = 0; k < data[now].length; k++) {
                        //循环一次记录一次---作品项计数从1开始
                        currentCount++;
                        //当前页码需要创建显示的作品项,判断第几页显示对应索引项：页码1显示1-8，页码2显示9-16
                        if (currentCount > (this.index - 1) * 8 && currentCount <= this.index * 8)
                            CreateItem(data[now][k].pic, data[now][k].auther, data[now][k].title, data[now][k].time);
                    }
                }
            }
            else {
                //根据页码读取json文件中对应索引的作品项（页码1：显示1-8，页码2：显示9-16....）
                for (let k = (this.index - 1) * 8; k < this.index * 8; k++) {
                    //判断如果还未读取完json值则创建作品项
                    if (k < ItemLength) {
                        CreateItem(data[now][k].pic, data[now][k].auther, data[now][k].title, data[now][k].time);
                    }
                }
            }
        }
    }

    //超过八个项默认选中第一页
    document.getElementsByClassName("content_footer")[0].children[1].classList.add("footer_page_select");
    //创右箭头
    let obj_btnright = document.createElement("div");
    document.getElementsByClassName("content_footer")[0].appendChild(obj_btnright);
    obj_btnright.className = "footer_page";
    obj_btnright.innerHTML = ">";
    //右箭头注册事件
    obj_btnright.onclick = function (ev) {
        let obj_select = document.getElementsByClassName("footer_page_select")[0];
        //页码为最后一页，则不动
        if (obj_select == document.getElementsByClassName("content_footer")[0].lastElementChild.previousElementSibling) {
        }
        //页码不为最后一页则向下一页
        else {
            //删除所有页码的点击态类
            for (let j = 0; j <= Math.ceil(data[now].length / 8); j++) {
                document.getElementsByClassName("footer_page")[j].classList.remove("footer_page_select");
            }
            //给当前页码的下一个兄弟加上点击态类
            obj_select.nextElementSibling.classList.add("footer_page_select");
            //点击左箭头，触发页码下一个兄弟的点击事件
            obj_select.nextElementSibling.onclick();
        }
    };
}

//切换时刷新作品项和页码按钮
function ShowItem() {
    //获取当前值
    INDEX.sidebarINDEX = document.getElementsByClassName("this_select")[0].index;
    INDEX.tabINDEX = document.getElementsByClassName("tab_select")[0].index;
    now = INDEX.tabINDEX + INDEX.sidebarINDEX;
    //删除之前项和页码按钮
    DeleteItem();
    DeletePageBtn();
    //新建作品项
    $.getJSON('http://localhost/101VRProject/json/work_data.json', function (data) {
        //用于记录作品项个数
        countAll = 0;
        //显示全部课程
        if (INDEX.sidebarINDEX == 0) {
            //用于判断json文件中空项目的个数
            var emptyCount = 0;
            //遍历json中作品个数，最大只显示八个项
            for (let i = 1; i < 6; i++) {
                now = INDEX.tabINDEX + i;
                //判断json文件是否为空，五个课程都为空则显示缺省
                if (data[now].length) {
                    //循环打印出所有课程
                    for (let j = 0; j < data[now].length; j++) {
                        countAll++;
                        //小于等于八个只显示一页
                        if (countAll <= 8) {
                            CreateItem(data[now][j].pic, data[now][j].auther, data[now][j].title, data[now][j].time);
                        }
                    }
                }
                else {
                    emptyCount++;
                    if (emptyCount == 5) {
                        let obj = document.createElement("div");
                        document.getElementsByClassName("content_main")[0].appendChild(obj);
                        obj.className = "default_img";
                    }
                }

            }
            //大于八个显示页码
            if (countAll > 8) {
                //    创建页码
                CreatePageBtn(countAll, data);
            }
        }
        //显示课程X,刷新作品项和页码
        else {
            //判断课程是否为空
            if (data[now].length) {
                //刷新作品项
                for (; countAll < data[now].length; countAll++) {
                    //作品项小于等于八个创建0-7
                    if (countAll < 8) {
                        CreateItem(data[now][countAll].pic, data[now][countAll].auther, data[now][countAll].title, data[now][countAll].time);
                    }
                }
                //作品项大于八个增加页码,上一个循环后countALL值多加了1所以要大于8才创建页码
                if (countAll > 8) {
                    CreatePageBtn(data[now].length, data);
                }
                console.log(countAll);
            }
            //空则显示缺省
            else {
                let obj = document.createElement("div");
                document.getElementsByClassName("content_main")[0].appendChild(obj);
                obj.className = "default_img";
            }
        }
    });
    //删除搜索框值
    document.getElementsByClassName("search_input")[0].value = "";
}

//搜索框功能
document.getElementsByClassName("search_btn")[0].onclick = function () {
    //获取当前值
    INDEX.sidebarINDEX = document.getElementsByClassName("this_select")[0].index;
    INDEX.tabINDEX = document.getElementsByClassName("tab_select")[0].index;
    now = INDEX.tabINDEX + INDEX.sidebarINDEX;
    //临时json数组，用于存放搜索到的作品项
    var Json = {
        "myWork1": [],
        "myWork2": [],
        "myWork3": [],
        "myWork4": [],
        "myWork5": [],
        "classWork1": [],
        "classWork2": [],
        "classWork3": [],
        "classWork4": [],
        "classWork5": []
    };
    //搜索出来的项目个数
    var count = 0;

    //点击搜索后先删除所有项
    DeleteItem();
    DeletePageBtn();
    $.getJSON('http://localhost/101VRProject/json/work_data.json', function (data) {
        //显示全部课程
        if (INDEX.sidebarINDEX == 0) {
            //    循环所有作品项
            for (let i = 1; i < 6; i++) {
                now = INDEX.tabINDEX + i;
                for (let j = 0; j < data[now].length; j++) {
                    //判断值是否匹配,每匹配一次计数+1
                    if (data[now][j].title.indexOf(document.getElementsByClassName("search_input")[0].value) != -1) {
                        count++;
                        if (count <= 8) {
                            CreateItem(data[now][j].pic, data[now][j].auther, data[now][j].title, data[now][j].time);
                        }
                        Json[now].push(data[now][j]);
                    }

                }
            }
        }
        else {

            //循环遍历并匹配作品名与搜索框的值
            for (let i = 0; i < countAll; i++) {
                //判断值是否匹配,每匹配一次计数+1
                if (data[now][i].title.indexOf(document.getElementsByClassName("search_input")[0].value) != -1) {
                    count++;
                    //小于八项则创建
                    if (count <= 8) {
                        CreateItem(data[now][i].pic, data[now][i].auther, data[now][i].title, data[now][i].time);
                    }
                    //    匹配成功记录下作品项存入临时json数组
                    Json[now].push(data[now][i]);
                }
            }

        }
        if (count > 8) {
            CreatePageBtn(count, Json);
            console.log(count);
        }
    });

};

//搜索框中输入回车
document.getElementsByClassName("search_input")[0].onkeydown = function (ev) {
    if (ev.keyCode == 13) {
        document.getElementsByClassName("search_btn")[0].onclick();
    }
};

//主体部分中动态创建一个作品项
//原始函数
// function CreateItem() {
//     //整个item作品
//     let obj_item=document.createElement("div");
//     document.getElementsByClassName("content_main")[0].appendChild(obj_item);
//     obj_item.className="content_item";
//     obj_item.style.paddingBottom="50px";
//     //作品头部、预览图、相关信息
//     let obj_head=document.createElement("div");
//     let obj_head_img=document.createElement("img");
//     let obj_head_info=document.createElement("div");
//     obj_item.appendChild(obj_head);
//     obj_head.appendChild(obj_head_img);
//     obj_head.appendChild(obj_head_info);
//     obj_head.style.position="relative";
//     obj_head.style.height="213px";
//     obj_head_info.style.position="absolute";
//     obj_head_info.style.backgroundColor="rgba(0,0,0,0.6)";
//     obj_head_info.style.height="34px";
//     obj_head_info.style.width="357px";
//     obj_head_info.style.bottom="0px";
//     obj_head_img.src="./images/bg2.png";
//     //作品的操作按钮
//     let obj_body=document.createElement("div");
//     obj_item.appendChild(obj_body);
//     obj_body.style.backgroundColor="#fafbfd";
//     obj_body.style.height="58px";
//     obj_body.style.width="357px";
//     let obj_body_btn1=document.createElement("div");
//     obj_body.appendChild(obj_body_btn1);
//     obj_body_btn1.className="content_item_btn";
//     // obj_body_btn1.innerHTML="<img src='./images/edit.png' class='content_item_edit'><span class='content_item_text'>编辑</span>" ;
//     obj_body_btn1.innerHTML="<div class='content_item_edit'></div><span class='content_item_text'>编辑</span>"
//     let obj_body_btn2=document.createElement("div");
//     obj_body.appendChild(obj_body_btn2);
//     obj_body_btn2.className="content_item_btn";
//     // obj_body_btn2.innerHTML="<img src='./images/play.png' class='content_item_play'><span class='content_item_text'>播放</span>" ;
//     obj_body_btn2.innerHTML="<div class='content_item_play'></div><span class='content_item_text'>播放</span>"
//     let obj_body_btn3=document.createElement("div");
//     obj_body.appendChild(obj_body_btn3);
//     obj_body_btn3.className="content_item_btn";
//     // obj_body_btn3.innerHTML="<img src='./images/del.png' class='content_item_delete'><span class='content_item_text'>删除</span>" ;
//     obj_body_btn3.innerHTML="<div class='content_item_delete'></div><span class='content_item_text'>删除</span>"
// //作品名
//     let obj_foot=document.createElement("div");
//     obj_item.appendChild(obj_foot);
//     obj_foot.className="content_item_footerText";
//     obj_foot.innerHTML="静夜思";
// }


// dataAfter=JSON.stringify(data,function (key, value) {
//     // return data["myWork1"];
//     // if(key=="myWork1"){
//     //     return value;
//     // }
// });
// console.log(dataAfter);

// 判断内容主体部分内容是否为空---空则显示缺省
// if(!document.getElementsByClassName("content_main")[0].firstElementChild){
//     var obj=document.createElement("div");
//     document.getElementsByClassName("content_main")[0].appendChild(obj);
//     obj.className="default_img";
// }else {
//     Item();
// }
// var tpl = '<li>'+
//             '<div class="vr-card-item vr-card-item1">'+
//                 '<div class="vr-card-box">'+
//                     '<div class="vr-card-item__bd">'+
//                         '<img src="<%pic%>" alt="" class="vr-card-item__pic">'+
//                         '<div class="vr-card-item__info">'+
//                             '<div class="vr-card-item__name"><%auther%></div>'+
//                             '<div class="vr-card-item__data"><%time%></div>'+
//                         '</div>'+
//                     '</div>'+
//                     '<div class="vr-card-item__btns">'+
//                         '<div class="vr-btn vr-card-btn">'+
//                             '<i class="vr-icon vr-icon-edit"></i>'+
//                             '<span class="vr-btn__txt">编辑</span>'+
//                         '</div>'+
//                         '<div class="vr-btn vr-card-btn">'+
//                             '<i class="vr-icon vr-icon-play"></i>'+
//                             '<span class="vr-btn__txt">播放</span>'+
//                         '</div>'+
//                         '<div class="vr-btn vr-card-btn">'+
//                             '<i class="vr-icon vr-icon-delete"></i>'+
//                             '<span class="vr-btn__txt">删除</span>'+
//                         '</div>'+
//                     '</div>'+
//                 '</div>'+
//                 '<div class="vr-card-item_ft"><%title%></div>'+
//             '</div>'+
//             '</li>';
// var nowTab = 0; //初始化当前选项卡为我的作品
// var tplEngine = function(tpl, data) {
//     var re =/<%([^%>]+)?%>/g;
//     while(match = re.exec(tpl)) {
//         tpl = tpl.replace(match[0], data[match[1]]);
//     }
//
//     return tpl;
// }
// $.getJSON('http://127.0.0.1:8080/work_data.json',function(data) {
//     var myWorkCount = 0,classWorkCount = 0;
//     for(var i = 1; i < 6; i++) {
//         myWork = "myWork"+i;
//         classWork = "classWork"+i;
//         $.each(data[myWork],function(key,value) {
//             if(myWorkCount >= 8) return;
//             myWorkCount++;
//             $('.js-my-work').append(tplEngine(tpl,value));
//         });
//         $.each(data[classWork],function(key,value) {
//             if(classWorkCount >= 8) return;
//             classWorkCount++;
//             $('.js-class-work').append(tplEngine(tpl,value));
//         });
//         if(myWorkCount == 0) {
//             document.getElementsByClassName('vr-resoure__no')[0].style.display = 'block';
//         }
//         if(classWorkCount == 0) {
//             document.getElementsByClassName('vr-resoure__no')[1].style.display = 'block';
//         }
//     }
// });
// // juqery
// // $('.js-tab').on('click',function(){
// //     var num = $(this).index(); //li的索引
// //     $(this).addClass('tab-active').siblings('li').removeClass('tab-active');
// //     $('.js-tab-content').eq(num).show().siblings('.js-tab-content').hide();
// // });
// // 原生JS
// var tabLi = document.getElementsByClassName('js-tab');
// var tabContent = document.getElementsByClassName('js-tab-content');
// for(var i = 0; i < tabLi.length; i++) {
//     tabLi[i].index = i;
//     tabLi[i].onclick = function() {
//         // 如果'暂无可用资源'存在，则隐藏起来
//         var resoure =document.getElementsByClassName('vr-resoure__no')[nowTab];
//         if(resoure.style.display == 'block') {
//             resoure.style.display = 'none';
//         }
//
//         // 切换时，搜索框的值清空
//         var queryInput = document.getElementsByClassName('vr-search__input');
//         for(var i = 0; i < queryInput.length; i++) {
//             queryInput[i].value = '';
//         }
//
//         this.classList.add('tab-active');
//         var tabSibling = siblingElems(this);
//         for(var j = 0; j < tabSibling.length; j++) {
//             tabSibling[j].classList.remove('tab-active');
//         }
//         tabContent[this.index].style.display = "block";
//         tabCSB = siblingElems(tabContent[this.index]);
//         tabCSB[0].style.display = 'none';
//
//         // 记录当前的选项卡
//         nowTab = this.index;
//         // 选项卡切换时，清除之前的选项卡的分页，在新的选项卡生成新的分页
//         var pageContent =document.getElementsByClassName('vr-page')[0];
//         var workCount = 0;
//         pageContent.innerHTML = '';
//         if(nowSidebar == 0) {
//             if(this.index == 0) {
//                 workCount = GROBLE.myWorkCount;
//             } else {
//                 workCount = GROBLE.classWorkCount;
//             }
//         } else {
//             if(this.index == 0) {
//                 workCount = GROBLE['myWork'+nowSidebar];
//             } else {
//                 workCount = GROBLE['classWork'+nowSidebar];
//             }
//         }
//         page({
//             class: 'vr-page'
//             , nowNum: 1
//             , pageNum: 8
//             , allNum: Math.ceil(workCount / 8)
//         });
//
//         //  选项卡切换时，清除之前的选项卡的数据，在新的选项卡生成新的数据
//         var tabList = document.getElementsByClassName('vr-card-list');
//         var tabName = ['myWork','classWork'];
//         while(child = tabList[nowTab].childNodes[0]){
//             tabList[nowTab].removeChild(child);
//         }
//         $.getJSON('http://127.0.0.1:8080/work_data.json',function(data){
//             var workCount = 0;
//             if(nowSidebar == 0) {
//                 for(var i = 1; i < 6; i++) {
//                     $.each(data[tabName[nowTab]+i],function(key,value) {
//                         if(workCount >= 8) return;
//                         workCount++;
//                         $(tabList[nowTab]).append(tplEngine(tpl,value));
//                     });
//                 }
//             } else {
//                 $.each(data[tabName[nowTab]+nowSidebar],function(key,value) {
//                     if(workCount >= 8) return;
//                     workCount++;
//                     $(tabList[nowTab]).append(tplEngine(tpl,value));
//                 });
//             }
//         });
//     }
// }