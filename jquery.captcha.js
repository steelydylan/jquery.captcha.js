/**
 * captha.jquery.js v.0.1
 * Copyright steelydylan
 * <http://horicdesign.com/>
 * Released under the MIT license.
 */
(function($){
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext('2d');    
    /*ランダムな文字列を取得*/
    var getRandText = function(limit){
        var ret = "";
        var strings = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var length = strings.length;
        for(var i = 0; i < limit; i++){
            ret += strings.charAt(Math.floor(Math.random()*length));
        }
        return ret;
    };
    /*変換用関数*/
    var twirl = function(px,py,width,height){
        var x = px - width/2;
        var y = py - height/2;
        var r = Math.sqrt(x*x+y*y);
        var maxr = width/2;
        if(r > maxr){
            return {x:px,y:py};
        }
        var a = Math.atan2(y,x);
        a += 1 - r / maxr;
        var dx = Math.cos(a) * r;
        var dy = Math.sin(a) * r;
        return {x:Math.floor(dx+width/2),y:Math.floor(dy+height/2)}
    }
    $.fn.extend({
        /*幅、高さ、文字の長さ*/
        setCaptcha:function(opt){
            var opt = $.extend({
                width:300,/*画像の幅*/
                height:100,/*画像の高さ*/
                func:"twirl",/*文字の歪ませ方*/
                length:5,/*文字の長さ*/
                size:50,/*文字サイズ*/
                font:"'Meiryo'",/*フォントカラー*/
                color:"red",/*CAPTCHA画像の色*/
                form:"#form",/*フォームのクラス名もしくはidを指定*/
                hook:function(){alert("入力された文字とCAPTCHA画像が違います");}/*処理が通らなかった時のコールバック*/
            },opt);
            var width = opt.width;
            var height = opt.height;
            var length = opt.length;
            var func = opt.func;
            var string = getRandText(length);
            var size = opt.size;
            canvas.width = width;
            canvas.height = height;
            ctx.font = size + "px " + opt.font;
            var cX = parseInt(size) * string.length / 2;
            var cY = parseInt(size) / 2;
            var lineHeight = ctx.measureText('a').width * 1.5;
            ctx.translate(width/2-size/2+15,height/2);
            ctx.fillStyle = opt.color;
            ctx.fillText(string,0,lineHeight);
            var $that = $(this);
            /*認証部分、認証されなければ処理を止めてフック関数が動く*/
            $(opt.form).on("submit",function(e){
                if(string != $that.val()){
                    e.preventDefault();
                    opt.hook();
                }
            })
            ctx.restore();
            var ImageData = ctx.getImageData(0,0,width,height);
            var data = ImageData.data;
            for(var y = 0; y < height; y++){
                for(var x = 0; x < width; x++){
                    if(func == "twirl"){
                        var t = twirl(x,y,width,height);
                    }
                    for(var k = 0; k < 4; k++){
                        data[(x+y*width)*4+k] = data[(t.x+t.y*width)*4+k];
                    }
                }
            }
            ctx.clearRect(0,0,width,height);
            ctx.restore();
            ctx.putImageData(ImageData,-width/4,0);//put image data back
            var $img = $("<img>");
            $img.attr("src",canvas.toDataURL());
            $img.insertBefore($(this));
        }
    });
})(jQuery);