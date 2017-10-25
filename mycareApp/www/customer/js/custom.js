$( document ).ready(function() {
    $(".users .ui-block-a").click(function(e)
    {
    	e.preventDefault();	
    	$(".loading_div").css('opacity','1');
    	setTimeout(function() {
    		$("#loading_div").css('opacity','0');
        		$.mobile.changePage( "#page2", { transition: "slide"});
    	}, 2500);  
    });
    
    $(".users .ui-block-b").click(function(e) {
    	e.preventDefault();
    	$(".loading_div").css('opacity','1');
    	setTimeout(function() {
    		$(".loading_div").css('opacity','0');
        		$.mobile.changePage( "#page3", { transition: "slide"});
    	}, 2500);
    });
    
    
    
    $(".users .ui-block-c").click(function(e) {
    	e.preventDefault();
    	$(".loading_div").css('opacity','1');
    	setTimeout(function() {
    		$(".loading_div").css('opacity','0');
        		$.mobile.changePage( "#page4", { transition: "slide"});
    	}, 2500); 
    });
    
   $('#sign_in').click(function(e)
    {
    	e.preventDefault();
    	window.location='profile.html';
    });
   
   
   $('#create_account').click(function(e)
    {
		e.preventDefault();
	    window.location='index.html#page2';
	});
   
   
   
   $('#calendar').click(function(e)
		    {
				e.preventDefault();
			    window.location='calendar.html';
			});
  
   //$(".ui-datepicker-inline").prepend("<div>hello world</div>");
   
   
   $(".view").click(function(e)
   {
	   e.preventDefault();
	   window.location='profile_nurses.html';
   });
   
   
   var d = $('#comments_div');
   d.scrollTop(d.prop("scrollHeight"));
   
   
   $("#confirm").click(function(e) {
	   $.mobile.changePage( "#payment", { transition: "slide"});
   });
   
   
   
   
   $(".days_of_week").click(function(e)
		   {
			   e.preventDefault();
			   window.location='timeline_daily.html';
		   });
   
   
   $(".empty_to_full").click(function()
			{
				if (!$(this).hasClass('full')) {
					$(this).attr('src', 'images/full_star.png'); 
					$(this).addClass('full')
				} else  {
					$(this).attr('src', 'images/empty_star.png');
					$(this).removeClass('full')
				}
			});
   
   
});