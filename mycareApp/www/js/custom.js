$(document).ready(function () {    
    localStorage.clear();
    //localStorage.setItem('MAIN_URL', 'http://localhost:8188/projects/mycare/public/');
    localStorage.setItem('MAIN_URL', 'http://server.multiframes.com/~mycare/public/');
    $(".users .ui-block-a").click(function(e)
    {
    	e.preventDefault();	
    	$(".loading_div").css('opacity','1');
    	setTimeout(function() {
    		$("#loading_div").css('opacity','0');
    		$.mobile.changePage("customer/index.html", { transition: "slide" });
    	}, 2500);  
    });
    
    $(".users .ui-block-b").click(function(e) {
    	e.preventDefault();
    	$(".loading_div").css('opacity','1');
    	setTimeout(function() {
    		$(".loading_div").css('opacity','0');
    	    //$.mobile.changePage("nurse/index.html", { transition: "slide" });
    		location.href = "nurse_index.html";
    	}, 2500);
    });
    
    $(".users .ui-block-c").click(function(e) {
    	e.preventDefault();
    	$(".loading_div").css('opacity','1');
    	setTimeout(function() {
    		$(".loading_div").css('opacity','0');
    		$.mobile.changePage("organizer/index.html", { transition: "slide" });
    	}, 2500); 
    });
});