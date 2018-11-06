//获取json中数据并显示作品项
$.getJSON('http://localhost/101VRProject/json/work_data.json', function (data) {
    //将所有json值遍历，并存储1.我的作品总个数 2.班级作品总个数 3.各个myWork的个数 4.各个classWork的个数（全部课程，我的作品/班级作品）
    var myWorkCount = 0, classWorkCount = 0;
    for (let i = 1; i < 6; i++) {
        var myWork = "myWork" + i;
        var classWork = "classWork" + i;
        $.each(data[myWork], function () {
            INDEX.myWorkCount++;
            myWorkCount++;
        });
        $.each(data[classWork], function () {
            INDEX.classWorkCount++;
            classWorkCount++;
        });
        //记录侧边栏每一项的作品个数
        INDEX[myWork] = myWorkCount;
        INDEX[classWork] = classWorkCount;
        console.log(myWork + "-------" + INDEX[myWork]);
        console.log(classWork + "-------" + INDEX[classWork]);
        myWorkCount = 0;
        classWorkCount = 0;
    }
    console.log(INDEX.myWorkCount);
    console.log(INDEX.classWorkCount);

    /*默认状态显示(全部课程,我的作品)*/
    ShowItem();

    // /*默认状态显示(全部课程,我的作品)*/
    // for (INDEX.sidebarINDEX = 1; INDEX.sidebarINDEX < 6; INDEX.sidebarINDEX++) {
    //     now = INDEX.tabINDEX + INDEX.sidebarINDEX;
    //     //循环打印出所有课程
    //     for (var i = 0; i < data[now].length; i++) {
    //         //小于等于八个只显示一页
    //         if (countAll < 8) {
    //             CreateItem(data[now][i].pic, data[now][i].auther, data[now][i].title, data[now][i].time);
    //             // console.log(count);
    //         }
    //         countAll++;
    //     }
    // }
    // //一页最多显示八个项,超过八个项放入第二页,并创建页码按钮
    // if (countAll >= 8) {
    //     // CreatePageBtn(countAll,data);
    //     //创左箭头
    //     let obj_btnleft = document.createElement("div");
    //     document.getElementsByClassName("content_footer")[0].appendChild(obj_btnleft);
    //     obj_btnleft.className = "footer_page";
    //     obj_btnleft.innerHTML = "<";
    //     //左箭头注册事件
    //     obj_btnleft.onclick = function (ev) {
    //         let obj_select = document.getElementsByClassName("footer_page_select")[0];
    //         //页码为1，则不动
    //         if (obj_select == document.getElementsByClassName("content_footer")[0].children[1]) {
    //         }
    //         //页码不为1则向上一页
    //         else {
    //             //删除所有页码的点击态类
    //             for (let j = 0; j <= Math.ceil(countAll / 8); j++) {
    //                 document.getElementsByClassName("footer_page")[j].classList.remove("footer_page_select");
    //             }
    //             //给当前页码的上一个兄弟加上点击态类
    //             obj_select.previousElementSibling.classList.add("footer_page_select");
    //             //    删除当前作品，新建作品项
    //
    //         }
    //     };
    //
    //     //循环创建页码按钮，每八个项创建一个（不足八个创一个,向上取整）
    //     for (var i = 1; i <= Math.ceil(countAll / 8); i++) {
    //         let obj_btn = document.createElement("div");
    //         document.getElementsByClassName("content_footer")[0].appendChild(obj_btn);
    //         obj_btn.className = "footer_page";
    //         obj_btn.innerHTML = i;
    //         obj_btn.index = i;
    //         obj_btn.onclick = function (ev) {
    //             for (let j = 0; j <= Math.ceil(countAll / 8); j++) {
    //                 document.getElementsByClassName("footer_page")[j].classList.remove("footer_page_select");
    //             }
    //             obj_btn.classList.add("footer_page_select");
    //             //切换页码时，获取当前要索引的json
    //             INDEX.sidebarINDEX = document.getElementsByClassName("this_select")[0].index;
    //             INDEX.tabINDEX = document.getElementsByClassName("tab_select")[0].index;
    //             now = INDEX.tabINDEX + INDEX.sidebarINDEX;
    //             // 点击任意页码后删除当前项，并新建对应的作品项
    //             DeleteItem();
    //             //侧边栏为全部课程时，循环遍历json文件，并将索引记录为currentCount
    //             if (INDEX.sidebarINDEX == 0) {
    //                 let currentCount = 0;
    //                 for (INDEX.sidebarINDEX = 1; INDEX.sidebarINDEX < 6; INDEX.sidebarINDEX++) {
    //                     now = INDEX.tabINDEX + INDEX.sidebarINDEX;
    //                     for (let i = 0; i < data[now].length; i++) {
    //                         //循环一次记录一次---作品项个数从1开始
    //                         currentCount++;
    //                         //当前页码需要创建显示的作品项,判断第几页显示对应索引项：页码1显示1-8，页码2显示9-16
    //                         if (currentCount > (this.index - 1) * 8 && currentCount <= this.index * 8)
    //                             CreateItem(data[now][i].pic, data[now][i].auther, data[now][i].title, data[now][i].time);
    //                     }
    //                 }
    //             }
    //             else {
    //                 //根据页码读取json文件中对应索引的作品项（页码1：显示1-8，页码2：显示9-16....）
    //                 for (let i = (this.index - 1) * 8; i < this.index * 8; i++) {
    //                     //判断如果还未读取完json值则创建作品项
    //                     if (i < data[now].length) {
    //                         CreateItem(data[now][i].pic, data[now][i].auther, data[now][i].title, data[now][i].time);
    //                     }
    //                 }
    //             }
    //             // console.log(now);
    //         }
    //
    //     }
    //
    //     //超过八个项默认选中第一页
    //     document.getElementsByClassName("content_footer")[0].children[1].classList.add("footer_page_select");
    //     //创右箭头
    //     let obj_btnright = document.createElement("div");
    //     document.getElementsByClassName("content_footer")[0].appendChild(obj_btnright);
    //     obj_btnright.className = "footer_page";
    //     obj_btnright.innerHTML = ">";
    //     //右箭头注册事件
    //     obj_btnright.onclick = function (ev) {
    //         let obj_select = document.getElementsByClassName("footer_page_select")[0];
    //         //页码为最后一页，则不动
    //         if (obj_select == document.getElementsByClassName("content_footer")[0].lastElementChild.previousElementSibling) {
    //
    //         }
    //         //页码不为最后一页则向下一页
    //         else {
    //             //删除所有页码的点击态类
    //             for (let j = 0; j <= Math.ceil(countAll / 8); j++) {
    //                 document.getElementsByClassName("footer_page")[j].classList.remove("footer_page_select");
    //             }
    //             //给当前页码的下一个兄弟加上点击态类
    //             obj_select.nextElementSibling.classList.add("footer_page_select");
    //         }
    //     };
    //
    // }
});
