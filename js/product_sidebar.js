$(document).ready(function () {

    // 以下是側邊欄選單設定

    //==============全域變數開始==============

    let tag_list = [];
    let tagsContainer = $("#tags_container");

    //==============全域變數結束==============



    //==============事件綁定開始==============

    $('.product_sidebar div').on('click', function () {
        product_sidebar_collapse($(this))
    });

    //宣告動作
    $(".button").on('click', function () {
        arrorw_rotate($(this))
    })

    $(".item").on("click", function () {

        tag = get_tag_text($(this))
        item_check_or_not($(this))
        tags_container_info(tag)
        is_tag_choose_show(tag_list.length)

    })

    $(".tag_choose").on('click', '.clear', function () {
        clear_tags_container();
    });

    $("#tags_container").on('click', '.bi-x-lg', function () {
        remove_item_checked($(this))
    });

    //==============事件綁定結束==============



    //==============funtcion宣告開始==============

    function arrorw_rotate(dom) {
        dom.next().toggleClass("show");
        dom.children().toggleClass("rotate")
    }

    function product_sidebar_collapse(dom) {
        dom.toggleClass("active");
    }

    function item_check_or_not(dom) {
        dom.toggleClass("checked");
    }

    function get_tag_text(dom) {
        return dom.find(">:first-child").text()
    }

    function add_tagsContainer_tag(tag) {
        tagsContainer.append(
            $('<span/>').addClass('tag').append(tag + '<i class="bi bi-x-lg"></i>')
        )
    }

    function remove_tagsContainer_tag(tag) {
        target = $(".tag:contains('" + tag + "')")
        target.remove()
    }

    function refresh_tag_list(tag) {
        if (tag_list.includes(tag)) {
            tag_list.splice(tag_list.indexOf(tag), 1)
            remove_tagsContainer_tag(tag)
        } else {
            tag_list.push(tag)
            add_tagsContainer_tag(tag)
        }
    }

    function tags_container_info(tag) {
        refresh_tag_list(tag)
    }

    function clear_tags_container() {
        $("#tags_container").empty();
        $(".checked").removeClass("checked");
        $(".tag_choose").removeClass("show");
        $("#banner").show();
        $(".hot_game").show();
        tag_list = [];
    }

    function remove_item_checked(dom) {

        $(dom).parent().remove();
        tag = dom.parent().text();
        $(".checked:contains('" + tag + "')").removeClass("checked");
        tag_list.splice(tag_list.indexOf(tag), 1)
        is_tag_choose_show(tag_list.length)

    }

    function is_tag_choose_show(length) {
        if (length == 0) {
            $(".tag_choose").removeClass("show");
            $("#banner").show();
            $(".hot_game").show();
        } else {
            $(".tag_choose").addClass("show");
            $("#banner").hide();
            $(".hot_game").hide();
        }
    }

});
    //==============funtcion宣告結束==============


    
    $('.sidebar_btn').click(function(){
        $('.product_sidebar').css("left","0");
    })
    $('.apply_choose').click(function(){
        $('.product_sidebar').css("left","-414px");
    })