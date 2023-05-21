// 愛心收藏
var heartsList = document.querySelectorAll('.bi-suit-heart');

heartsList.forEach(function (heart) {

    // 綁定滑鼠懸停事件
    heart.addEventListener('mouseenter', function (e) {
        if (!heart.classList.contains("bi-suit-heart-fill") || !heart.classList.contains("bi-suit-heart-clicked")) {
            heart.classList.remove("bi-suit-heart");
            heart.classList.add("bi-suit-heart-fill");
            e.stopPropagation();
        }
    });

    // 綁定滑鼠離開事件
    heart.addEventListener('mouseleave', function (e) {
        if (!heart.classList.contains("bi-suit-heart-fill") || !heart.classList.contains("bi-suit-heart-clicked")) {
            heart.classList.remove("bi-suit-heart-fill");
            heart.classList.add("bi-suit-heart");
            e.stopPropagation();
        }
    });

    heart.addEventListener('click', function (e) {
        if (!heart.classList.contains("bi-suit-heart-clicked")) {
            heart.classList.remove("bi-suit-heart");
            heart.classList.add("bi-suit-heart-fill");
            heart.classList.add("bi-suit-heart-clicked");
            e.preventDefault();
            e.stopPropagation();
        } else {
            heart.classList.remove("bi-suit-heart-fill");
            heart.classList.add("bi-suit-heart");
            heart.classList.remove("bi-suit-heart-clicked");
            e.preventDefault();
            e.stopPropagation();
        }
    });

});