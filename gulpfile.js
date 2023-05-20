
const {
    src,
    dest,
    series,
    parallel,
    watch
} = require('gulp');

function defaultTask(cb) {
    console.log('hello gulp4');
    cb();
}

exports.do = defaultTask;

//============= sass ================= 
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const sourcemaps = require("gulp-sourcemaps");

function sassstyle() {
    return (src("./sass/style.scss")
        .pipe(sourcemaps.init())
        //編譯 sass
        .pipe(sass.sync().on("error", sass.logError))
        .pipe(sourcemaps.write())
        //css 壓縮
        // .pipe(cleanCSS())
        // 跨瀏覽器
        .pipe(autoprefixer({ cascade: false, }))
        .pipe(dest("./dist/css"))
    );
}

exports.style = sassstyle;

//============= reset.css ================= 

function resetCss() {
    return src(['css/reset.css']).pipe(dest('dist/css'))
}

exports.resetCss = resetCss;


//============ html  ====================
const fileinclude = require("gulp-file-include");

function html() {
    return src("./*.html")
        .pipe(fileinclude({
            prefix: "@@",
            basepath: "@file",
        }))
        .pipe(dest("./dist/"));
}

exports.t = html;

// function watchTask() {
//     watch(["./sass/*.scss", "./sass/**/*.scss"], sassstyle);
//     watch(["./*.html", "./layout/*.html"], html);
// }

// exports.w = watchTask;


//============ layout html  ====================
function layoutHTml() {
    return src(['layout/*.html']).pipe(dest('dist/layout'))
}

//===========沒有壓縮過的圖片 開發用==========
function img_orgin() {
    return src(['pic/img/*.*', 'pic/img/**/*.*']).pipe(dest('dist/pic/img'))
}


// ============ 壓縮js檔 ============

const uglify = require("gulp-uglify");
function ugjs() {
    return src("js/*.js")
        .pipe(uglify())
        .pipe(dest("dist/js"));
}

exports.jsmin = ugjs;

// ============ 轉json ============

function jjson() {
    return src("./js/config/*.json")
        .pipe(dest("dist/js/config"));
}
exports.jj = jjson;

//============ 清除舊檔案 ============
const clean = require('gulp-clean');

function clear() {
    return src('dist', { read: false, allowEmpty: true })
        //不去讀檔案結構，增加刪除效率  / allowEmpty : 允許刪除空的檔案
        .pipe(clean({ force: true })); //強制刪除檔案
}

exports.c = clear

// ============ vue ============

function vue() {
    return src(['./vendors/vue/*.js']).pipe(dest('dist/vendors/vue'))
}

// ============ 要在外層新增資料夾複製我!!!!!!!!!!!!!!!!!! ============

// function 自訂義檔名() {
//     return src(['來源路徑']).pipe(dest('dist/ 打包後路徑'))
// }


//============ 瀏覽器同步 ============
const browserSync = require("browser-sync");
const reload = browserSync.reload;

function browser(done) {
    browserSync.init({
        server: {
            baseDir: "./dist",
            index: "index.html",
        },
        port: 3000,
    });
    watch(["./sass/*.scss", "./sass/**/*.scss"], sassstyle).on("change", reload);
    watch(["./*.html", "./layout/*.html"], html).on("change", reload);
    watch(["./pic/img/*.*", "./pic/img/**/*.*"], img_orgin).on("change", reload);
    watch(["./js/config/*.json"], jjson).on("change", reload);
    watch(["./js/*.js", "./js/**/*.js"], ugjs).on("change", reload);
    done();

}
exports.default = browser;

// 開發用
exports.dev = series(parallel(html, layoutHTml, sassstyle, resetCss, img_orgin, ugjs, jjson, vue), browser)
//如有新增資料夾，parallel內也要新增!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// 上線用
// exports.online = series(clear, parallel(html, sassstyle, img, babel5))
