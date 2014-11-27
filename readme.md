jquery.captcha.js
==========

jQuery plugin for fake image CAPTCHA

Download
--------

- [jquery.captcha.js](https://raw.githubusercontent.com/steelydylan/jquery.captcha.js/master/jquery.captcha.js)

Documentation
-------------

- Japanese
	- <http://steelydylan.github.io/jquery.captcha.js>

Usage
---

```html
<script src="jquery.js"></script>
<script src="jquery.captcha.js"></script>
<script>
	$(function(){
		$("#captcha").captcha({
			width:300,
			height:200,
			color:"#FF0000",
			size:50,
			length:5,
			hook:function(){
				alert("認証用画像と入力された値が一致しません");
			},
			form:".form",
		});
	});
</script>
<form class="form">
	<input type="text" id="captcha" />
	<input type="submit" value="送信"/>
</form>